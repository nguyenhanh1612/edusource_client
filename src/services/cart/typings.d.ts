declare namespace REQUEST {
  type GetProductFromCart = {
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
    BookId?: string;
    pageIndex?: number;
    pageSize?: number;
  };

  type AddProductToCart = {
    productId?: string;
  };

  type DeleteCart = {
    productId?: string;
  };
}

declare namespace API {
  type ProductCart = {
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
    listImages: string[] | null;
  };

  type ResponseDataProduct = {
    items: ProductCart[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

}
