import { makeRequest } from "./network.ts";

export async function triggerMacro(macroName: string | number) {
  await makeRequest(`macro/${macroName}/trigger`);
  return null;
}
