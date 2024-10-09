import { store } from "../../store";

export async function makeRequest(url: string, options?: RequestInit) {
  const port = store.get("settings")?.port;

  if (!url.startsWith("http")) {
    url = url.startsWith("/")
      ? `http://localhost:${port}/v1${url}`
      : `http://localhost:${port}/v1/${url}`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // check if the response is JSON
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}
