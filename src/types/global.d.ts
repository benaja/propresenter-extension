import { actions } from "../api/electron/actions";
import { settings } from "../api/electron/settings";

declare global {
  interface Window {
    settings: typeof settings;
    actions: typeof actions;
  }
}
