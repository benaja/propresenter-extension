import { ipcMain, ipcRenderer } from "electron";
import { client, useChurchToolsClient } from "../churchtools";
import { store, type StoreType } from "../../store";
import { fetchLibraryElements, Song } from "../propresenter-official/library";
import { fetchPresentation } from "../propresenter-official/presentations";
import {
  readPresentationFile,
  requestFolderAccess,
} from "../propresenter-unofficial";

async function createSongIfNotExist(song: Song) {
  const presentation = await fetchPresentation(song.uuid);

  const file = await readPresentationFile(presentation.presentation_path);

  const client = useChurchToolsClient();
  let searchSongs = (await client.get("/songs", {
    name: file.name,
  })) as { id: number; name: string; ccli: string }[];

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
