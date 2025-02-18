declare namespace REQUEST {
  type GetProduct = {
    name?: string;
    price?: number;
    category?: import("@/const/product").CategoryId;
    description?: string;
    ContentType?: import("@/const/product").ContentType;
    Unit?: number;
    UploadType?: import("@/const/product").UploadType;
    TotalPage?: number;
    Size?: number;
    Rating?: number;
    IsPublic?: boolean;
    IsApproved?: boolean;
    BookId?: string;
    pageIndex?: number;
    pageSize?: number;
  };

  type GetProductPurchased = {
    name?: string;
    price?: number;
    category?: import("@/const/product").CategoryId;
    description?: string;
    ContentType?: import("@/const/product").ContentType;
    Unit?: number;
    UploadType?: import("@/const/product").UploadType;
    TotalPage?: number;
    Size?: number;
    Rating?: number;
    IsPublic?: boolean;
    IsApproved?: boolean;
    BookId?: string;
    pageIndex?: number;
    pageSize?: number;
  };

  type GetProductById = {
    id?: string;
  };

  type GetProductByIdByUser = {
    id?: string;
  };

  type TCreateProduct = {
    name: string;
    price: number;
    category: number;
    description: string;
    contentType: number;
    unit: int;
    uploadType: number;
    totalPage: number;
    size: number | null;
    bookId: string;
    file?: File;
    mainImage?: File;
    otherImages?: File[];
  };
}

declare namespace API {
  type Product = {
    id: string;
    name: string;
    category: import("@/const/product").CategoryId;
    unit: number;
    description: string;
    contentType: import("@/const/product").ContentType;
    uploadType: import("@/const/product").UploadType;
    totalPage: number;
    size: number;
    imageUrl: string;
    fileUrl: string;
    rating: number;
    isPublic: boolean;
    isApproved: boolean;
    listImages: string[] | null;
    isPurchased: boolean;
  };

  type ProductPurchased = {
    id: string;
    name: string;
    category: import("@/const/product").CategoryId;
    unit: number;
    description: string;
    contentType: import("@/const/product").ContentType;
    uploadType: import("@/const/product").UploadType;
    totalPage: number;
    size: number;
    imageUrl: string;
    fileUrl: string;
    rating: number;
    isPublic: boolean;
    isApproved: boolean;
    listImages: string[] | null;
    isPurchased: boolean;
  };

  type ResponseDataProduct = {
    items: Product[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  type ResponseDataProductPurchased = {
    items: ProductPurchased[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  type Unit = {
    id: string;
    name: string;
    price: number;
    category: import("@/const/product").CategoryId;
    unit: number;
    description: string;
    contentType: import("@/const/product").ContentType;
    uploadType: import("@/const/product").UploadType;
    totalPage: number;
    size: number;
    imageUrl: string;
    fileUrl: string;
    rating: number;
    isPublic: boolean;
    isApproved: boolean;
    listImages: string[];
    book: {
      name: string;
      imageUrl: string;
      gradeLevel: number;
      category: import("@/const/product").CategoryId;
    };
    isPurchased: boolean;
  };

  type UnitByUser = {
    id: string;
    name: string;
    price: number;
    category: import("@/const/product").CategoryId;
    unit: number;
    description: string;
    contentType: import("@/const/product").ContentType;
    uploadType: import("@/const/product").UploadType;
    totalPage: number;
    size: number;
    imageUrl: string;
    fileUrl: string;
    rating: number;
    isPublic: boolean;
    isApproved: boolean;
    listImages: string[];
    book: {
      name: string;
      imageUrl: string;
      gradeLevel: number;
      category: import("@/const/product").CategoryId;
    };
    isPurchased: boolean;
  };

  type ResponseDataUnit = {
    data: Unit;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  type ResponseDataUnitByUser = {
    data: UnitByUser;
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
