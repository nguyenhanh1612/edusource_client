export interface HiringPostDetailResponse {
    id: string;
    file: string;
    demoFile: string,
    title: string;
    description: string;
    createdAt: Date;
    deletedAt: Date;
    customerId: string;
    customerName: string;
    staffId: string;
    staffName: string;
    requirementCate: string;
    bookImg: string;
    bookName: string;
    requirementCateImg: string;
    customerAvt: string;
    status: string,
    sourceType: number,
    fileType: number,
    contentType: number
    /* comment region below */
}


export interface CreateHiringPostRequest {
    title: string,
    description: string,
    requirementCate: string,
    bookId: string,
    requirementCateImg: string,
    sourceType: number,
    fileType: number,
    contentType: number
}

export interface HiringPostListResponse {
    id: string;
    title: string;
    staffId: string;
    staffName: string;
    description: string;
    createdAt: Date;
    customerAvt: string;
    customerName: string;
    requirementCate: string;
    requirementCateImg: string;
    bookName: string;
    bookImg: string;
    status: string
}