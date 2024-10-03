import { triggerMacro } from "./api/macros";
import { fetchActivePresentation } from "./api/presentations";
import { store, type StoreType } from "./store";

export function startPresentationListener() {
  let lastPresentation: string | null = null;
  async function setPresentationViewByLibrary() {
    try {
      const response = await fetchActivePresentation();
      if (!response.presentation) {
        lastPresentation = null;
        return;
      }

      if (lastPresentation === response.presentation.presentation_path) {
        return;
      }
      lastPresentation = response.presentation.presentation_path;
      console.log(
        "Presentation changed to",
        response.presentation.presentation_path
      );

      const settings = store.get("settings") as StoreType["settings"];

      const presentationPath = response.presentation.presentation_path;
      const regex = /[\/\\]/g;
      const library =
        presentationPath.split(regex)[presentationPath.split(regex).length - 2];

      if (library === settings.songLibraryName) {
        console.log("This is a song");
        triggerMacro(settings.songMacroName);
      } else {
        console.log("This is not a song");
        triggerMacro(settings.defaultMacroName);
      }
    } catch (e) {
      console.log(e);
    }
  }

  setInterval(setPresentationViewByLibrary, 500);
}
