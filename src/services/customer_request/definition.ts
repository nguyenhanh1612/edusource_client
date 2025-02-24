export interface HiringPost {
    id: number;
    file: string;
    title: string;
    description: string;
    createdAt: number;
    deletedAt: number;
    customerId: number;
    customerName: string;
    staffId: number;
    staffName: string;
    requirementCate: string;
    hashTags: string;
    bookImg: string;
    requirementCateImg: string;
    customerAvt: string;
}