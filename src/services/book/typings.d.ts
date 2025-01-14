declare namespace REQUEST {
  type GetBooks = {
    id?: string;
    name?: string;
    pageIndex: number;
    pageSize: number;
    category?: number;
    gradeLevel?: number;
  };
}

declare namespace API {
  type Book = {
    id: string;
    name: string;
    imageUrl: string;
    gradeLevel: number;
    category: number;
  };

  type ResponseData = {
    items: Book[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
