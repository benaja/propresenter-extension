// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { settings } from "./api/electron/settings";
import { actions } from "./api/electron/actions";

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
}

function registerListener(channel: string, callback: (...args: any[]) => void) {
  ipcRenderer.on(channel, callback);

  // return a function to remove the listener
  return () => {
    ipcRenderer.removeListener(channel, callback);
  };
}

function registerEndpoints(endpoints: string[], listeners: string[] = []) {
  const api = listeners.reduce((acc, listener) => {
    acc[listener] = (callback) => registerListener(listener, callback);
    return acc;
  }, {});

  return endpoints.reduce((acc, endPoint) => {
    acc[endPoint] = (...args) =>
      ipcRenderer.invoke(endPoint, ...args).catch((e) => {
        const errorMessage = e.message;

        // Extract the JSON part of the message
        const jsonPart = errorMessage.replace(
          /Error invoking remote method '.*': /,
          ""
        );

        console.log(jsonPart);

        throw new Error(jsonPart);
      });

    return acc;
  }, api);
}

// registerContextBridge(settings, "settings");

contextBridge.exposeInMainWorld("settings", settings);
contextBridge.exposeInMainWorld(
  "actions",
  registerEndpoints(["syncProPresenterSongs"])
);

// Expose the API to the renderer process
