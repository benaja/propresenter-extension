import { app } from "electron";
import path from "path";

export function srcPath() {
  if (process.env.NODE_ENV === "development") {
    return path.resolve(app.getAppPath(), "src");
  } else {
    return path.resolve(process.resourcesPath);
  }
}

export function assetPath(asset: string) {
  return path.resolve(srcPath(), "assets", asset);
}
