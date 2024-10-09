import { makeRequest } from "./network";

export type Song = {
  uuid: string;
  name: string;
  index: number;
};

export async function fetchLibraryElements(library: string) {
  const response = await makeRequest(`library/${library}`);
  return response.items as Song[];
}
