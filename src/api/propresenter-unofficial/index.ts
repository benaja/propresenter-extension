import protobuf from "protobufjs";
import * as fs from "node:fs";
import { type rv } from "./proto/presentation";
import { assetPath } from "../../utils/path";
import { app, dialog } from "electron";
// import { randomUUID } from "node:crypto";
// import { Buffer } from "node:buffer";
// import { Transform } from "node:stream";

export function requestFolderAccess() {
  return new Promise<string>((resolve, reject) => {
    dialog
      .showOpenDialog({
        properties: ["openDirectory"],
        title: "Select ProPresenter Library Folder",
        message:
          "Select the ProPresenter library folder containing your songs.",
      })
      .then((result) => {
        if (!result.canceled) {
          resolve(result.filePaths[0]);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function readPresentationFile(path: string) {
  return new Promise<rv.data.Presentation>((resolve, reject) => {
    protobuf.load(assetPath("proto/presentation.proto"), function (err, root) {
      console.log("Loaded proto file");
      if (err) {
        return reject(err);
      }

      const Presentation = root.lookupType("Presentation");

      // Load the binary ProPresenter file
      const buffer = fs.readFileSync(path);

      // Decode the binary data
      const message = Presentation.decode(buffer);

      // Convert to a JavaScript object
      const object = Presentation.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // See ConversionOptions
      }) as rv.data.Presentation;

      resolve(object);
    });
  });
}
