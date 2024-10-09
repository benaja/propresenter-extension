import Store from "electron-store";

export type StoreType = {
  settings: {
    port: string;
    songLibraryName: string;
    songMacroName: string;
    defaultMacroName: string;
    churchtoolsUrl: string;
    churchtoolsUser: string;
    churchtoolsPassword: string;
  };
};

const defaults: StoreType = {
  settings: {
    port: "5001",
    songLibraryName: "Lieder",
    songMacroName: "Lieder Ansicht",
    defaultMacroName: "Standard Ansicht",
    churchtoolsUrl: "https://demo.church.tools",
    churchtoolsUser: "",
    churchtoolsPassword: "",
  },
};

export const store = new Store<StoreType>(defaults);
