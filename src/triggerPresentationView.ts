import { triggerMacro } from "./api/macros.ts";
import { fetchActivePresentation } from "./api/presentations.ts";

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

      const presentationPath = response.presentation.presentation_path;
      const library =
        presentationPath.split("/")[presentationPath.split("/").length - 2];

      if (library === "Lieder") {
        console.log("This is a song presentation");
        triggerMacro("Lieder Ansicht");
      } else {
        console.log("This is not a song presentation");
        triggerMacro("Normale Ansicht");
      }
    } catch (e) {
      console.log(e);
    }
  }

  setInterval(setPresentationViewByLibrary, 500);
}
