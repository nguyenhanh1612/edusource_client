declare namespace REQUEST {}

declare namespace API {
  type TUser = {
    CropAvatarUrl: string;
    FirstName: string;
    LastName: string;
  };

  type TGetUserNeedSupport = {
    Read: bool;
    User: TUser;
    UserId: string;
    Content: string;
  };

  type TMessage = {
    Content?: string;
    SenderId?: string;
    ReceiverId?: string;
  };
}
