export const Category = [
  {
    id: 0,
    value: "Slide",
  },
  {
    id: 1,
    value: "Exercise",
  },
  {
    id: 2,
    value: "Test",
  },
] as const;

export const Content = [
  {
    id: 0,
    value: "Unit",
  },
  {
    id: 1,
    value: "Review",
  },
];

export const Upload = [
  {
    id: 0,
    value: "PowerPoint",
  },
  {
    id: 1,
    value: "Pdf",
  },
  {
    id: 2,
    value: "Zip",
  },
  {
    id: 3,
    value: "Rar",
  },
];

export type CategoryId = (typeof Category)[number]["id"];
export type ContentType = (typeof Content)[number]["id"];
export type UploadType = (typeof Upload)[number]["id"];

