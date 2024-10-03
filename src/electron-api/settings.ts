import { store, type StoreType } from "../store";

export const settings = {
  getSettings() {
    return (store.get("settings") ?? {}) as StoreType["settings"];
  },
  setSettings(settings: StoreType["settings"]) {
    store.set("settings", settings);
  },
};
