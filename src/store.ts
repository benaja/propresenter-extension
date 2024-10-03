import Store from "electron-store";

export type StoreType = {
  settings: {
    port: string;
    songLibraryName: string;
    songMacroName: string;
    defaultMacroName: string;
  };
};

const defaults: StoreType = {
  settings: {
    port: "5001",
    songLibraryName: "Lieder",
    songMacroName: "Lieder Ansicht",
    defaultMacroName: "Standard Ansicht",
  },
};

export const store = new Store<StoreType>(defaults);
