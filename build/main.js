"use strict";
const electron = require("electron");
const path = require("path");
async function makeRequest(url, options) {
  if (!url.startsWith("http")) {
    url = url.startsWith("/") ? `http://localhost:5001/v1${url}` : `http://localhost:5001/v1/${url}`;
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }
  return response.json();
}
async function triggerMacro(macroName) {
  await makeRequest(`macro/${macroName}/trigger`);
  return null;
}
async function fetchActivePresentation() {
  const response = await makeRequest("presentation/active");
  return response;
}
function startPresentationListener() {
  let lastPresentation = null;
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
      const presentationPath = response.presentation.presentation_path;
      const regex = /[\/\\]/g;
      const library = presentationPath.split(regex)[presentationPath.split(regex).length - 2];
      if (library === "Lieder") {
        console.log("This is a song");
        triggerMacro("Lieder Ansicht");
      } else {
        console.log("This is not a song");
        triggerMacro("Normale Ansicht");
      }
    } catch (e) {
      console.log(e);
    }
  }
  setInterval(setPresentationViewByLibrary, 500);
}
if (require("electron-squirrel-startup")) {
  electron.app.quit();
}
const createWindow = () => {
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  });
  {
    mainWindow.loadURL("http://localhost:5173");
  }
  mainWindow.webContents.openDevTools();
};
electron.app.on("ready", createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
startPresentationListener();
