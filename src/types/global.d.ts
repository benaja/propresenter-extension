import { settings } from "../electron-api/settings";

declare global {
  interface Window {
    settings: typeof settings;
  }
}
