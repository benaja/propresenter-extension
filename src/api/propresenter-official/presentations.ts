import { makeRequest } from "./network";

export type Slide = {
  enabled: boolean;
  notes: string;
  text: string;
  label: string;
  size: {
    width: number;
    height: number;
  };
};

export type Group = {
  name: string;
  color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  slides: Slide[];
};

export type Presentation = {
  id: {
    uuid: string;
    name: string;
    index: number;
  };
  groups: Group[];
  has_timeline: boolean;
  presentation_path: string;
  destination: string;
};

export async function fetchActivePresentation() {
  const response = await makeRequest("presentation/active");
  return response as { presentation: Presentation | null };
}

export async function fetchPresentation(id: string) {
  const response = await makeRequest(`presentation/${id}`);
  return response.presentation as Presentation;
}
