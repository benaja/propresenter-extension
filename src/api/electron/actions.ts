import { ipcMain, ipcRenderer } from "electron";
import { useChurchToolsClient } from "../churchtools";
import { store, type StoreType } from "../../store";
import { fetchLibraryElements, Song } from "../propresenter-official/library";
import { fetchPresentation } from "../propresenter-official/presentations";
import {
  readPresentationFile,
  requestFolderAccess,
} from "../propresenter-unofficial";

const client = useChurchToolsClient();

function parseErrorMessage(e) {
  if (e.response.data) {
    if (e.response.data.errors) {
      return (
        e.response.data.message +
        ": " +
        e.response.data.errors.map((error) => error.message).join("\n")
      );
    }

    return `${e}`;
  }
}

async function createSongIfNotExist(song: Song) {
  const presentation = await fetchPresentation(song.uuid);

  const file = await readPresentationFile(presentation.presentation_path);

  let searchSongs: { id: number; name: string; ccli: string }[] = [];
  try {
    searchSongs = (await client.get("/songs", {
      name: file.name,
    })) as { id: number; name: string; ccli: string }[];
  } catch (e) {
    throw new Error(parseErrorMessage(e));
  }

  // Because the api cant search for ccli numbers, we filter the results manually
  // This is because sometimes two songs can have the same name, but different ccli numbers
  if (file.ccli && file.ccli.songNumber) {
    searchSongs = searchSongs.filter(
      (s) => s.ccli === `${file.ccli.songNumber}`
    );
  }

  if (searchSongs.length > 0) {
    console.log("Song already exists");
    return;
  }

  try {
    const result = await client.oldApi("churchservice/ajax", "addNewSong", {
      bezeichnung: file.name,
      ccli: file.ccli ? file.ccli.songNumber : "",
      author: file.ccli ? file.ccli.author : "",
      songcategory_id: "0",
      copyright: "",
      tonality: "",
      bpm: "",
      beat: "",
    });
  } catch (e) {
    throw new Error(parseErrorMessage(e));
  }
}

export const actions = {
  async syncProPresenterSongs() {
    const settings = store.get("settings") as StoreType["settings"];

    if (!settings.songLibraryName) {
      throw new Error("No song library name set");
    }

    const songs = await fetchLibraryElements(settings.songLibraryName);

    await requestFolderAccess();

    for (const song of songs) {
      await createSongIfNotExist(song);
    }
  },
};

ipcMain.handle("syncProPresenterSongs", actions.syncProPresenterSongs);
