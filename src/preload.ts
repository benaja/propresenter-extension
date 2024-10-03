// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";
import { settings } from "./electron-api/settings";

function registerContextBridge(api, name) {
  const exposedApi: Partial<typeof api> = {};

  for (const key in api) {
    if (typeof api[key] === "function") {
      exposedApi[key] = (...args: unknown[]) => {
        return api[key](...args);
      };
    } else {
      exposedApi[key] = api[key]; // If the value is not a function, just expose it directly
    }
  }

  contextBridge.exposeInMainWorld(name, exposedApi);
}

registerContextBridge(settings, "settings");

// Expose the API to the renderer process
