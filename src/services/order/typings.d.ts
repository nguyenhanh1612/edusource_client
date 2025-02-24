declare namespace REQUEST {
  type CreateOrder = {};

  type GetAllOrders = {
    SortType: SortType;
    IsSortASC: boolean;
    pageIndex: number;
    pageSize: number;
  };
}

declare namespace API {
  type Account = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    cropAvatarUrl: string;
    genderType: number;
  };

  type OrderDetail = {
    id: string;
    productName: string;
    price: number;
    quantity: number;
  };

  type Order = {
    id: string;
    totalAmount: number;
    paymentAmount: number;
    paidAt: string;
    description: string;
    orderCode: number;
    account: Account;
    orderDetails: OrderDetail[];
  };

  type ResponseDataGetAllOrders = {
    items: Order[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
