export interface HiringPostDetailResponse {
    id: number;
    file: string;
    title: string;
    description: string;
    createdAt: string;
    deletedAt: string;
    customerId: string;
    customerName: string;
    staffId: string;
    staffName: string;
    requirementCate: string;
    bookImg: string;
    requirementCateImg: string;
    customerAvt: string;
    bookName: string;
    demoFile: string;
    fileType: string;
    contentType: string;
    sourceType: string;
    status: string;
    price: number;
}


export interface CreateHiringPostRequest {
    id: number;
    file: string;
    title: string;
    description: string;
    createdAt: string;
    deletedAt: string;
    customerId: string;
    customerName: string;
    staffId: string;
    staffName: string;
    requirementCate: string;
    bookImg: string;
    requirementCateImg: string;
    customerAvt: string;
    bookName: string;
    demoFile: string;
    fileType: string;
    contentType: string;
    sourceType: string;
    status: string;
    price: number;
}

export interface HiringPostListResponse {
    id: number;
    file: string;
    title: string;
    description: string;
    createdAt: string;
    deletedAt: string;
    customerId: string;
    customerName: string;
    staffId: string;
    staffName: string;
    requirementCate: string;
    bookImg: string;
    requirementCateImg: string;
    customerAvt: string;
    bookName: string;
    demoFile: string;
    fileType: string;
    contentType: string;
    sourceType: string;
    status: string;
    price: number;
}

export interface BookSelectBoxResponse {
    id: number;
    name: string;
    img: string;
}

export interface CommentUser {
    id: number
    createdAt: string,
    userName: string,
    content: string
    postId: number,
}