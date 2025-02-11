export type TCategory = {
  id: number;
  type: string;
};
export type TContent = {
  id: number;
  type: string;
};
export type TUpload = {
  id: number;
  type: string;
};
export const categoryType: TCategory[] = [
  {
    id: 0,
    type: "Slide",
  },
  {
    id: 1,
    type: "Exercise",
  },
  {
    id: 2,
    type: "Test",
  },
] as const;

export const contentType: TContent[] = [
  {
    id: 0,
    type: "Unit",
  },
  {
    id: 1,
    type: "Review",
  },
];

export const uploadType: TUpload[] = [
  {
    id: 0,
    type: "PowerPoint",
  },
  {
    id: 1,
    type: "Pdf",
  },
  {
    id: 2,
    type: "Zip",
  },
  {
    id: 3,
    type: "Rar",
  },
];



