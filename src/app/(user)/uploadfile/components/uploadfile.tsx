"use client";

import React, { useEffect, useState } from "react";
import UploadPhoto from "@/components/upload-file";
import useCreateProductForm from "../hooks/useCreateProduct";
import { categoryType, contentType, TCategory, TContent, TUpload, uploadType } from "@/const/product";
import useGetAllBook from "@/components/header/useGetAllBook";

function UploadFile() {
    const {
        register,
        handleSubmit,
        onSubmit,
        watch,
        errors,
        setValue,
        isPending,
    } = useCreateProductForm();

    const handleFormSubmit = (data: any, onSubmit: (data: any, callback: () => void) => void, setFilePreview: React.Dispatch<React.SetStateAction<string | null>>) => {
        console.log("Raw data:", data);

        console.log("Errors:", data.errors);

        const formattedData = {
            ...data,
            category: Number(data.category) as 0 | 1 | 2,
            contentType: Number(data.contentType) as 0 | 1,
            uploadType: Number(data.uploadType) as 0 | 1 | 2 | 3,
        };

        console.log("Formatted data:", formattedData);

        onSubmit(formattedData, () => setFilePreview(null));
    };

    const { getAllBookApi, isPending: isLoadingBooks } = useGetAllBook();
    const [category, setCategory] = useState<TCategory>(categoryType[0]);
    const [content, setContent] = useState<TContent>(contentType[0]);
    const [upload, setUpload] = useState<TUpload>(uploadType[0]);

    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [otherImages, setOtherImages] = useState<File[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string | null>(null);
    const [books, setBooks] = useState<API.Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<string>("");

    const fetchAllBooks = async () => {
        let allBooks: API.Book[] = [];
        let pageIndex = 1;
        let pageSize = 10;
        let totalPages = 1; 

        while (pageIndex <= totalPages) {
            const response = await getAllBookApi({ pageIndex, pageSize });

            if (response && response.value.data) {
                allBooks = [...allBooks, ...response.value.data.items];
                totalPages = response.value.data.totalPages; 
            }

            pageIndex++; 
        }

        setBooks(allBooks);
    };

    useEffect(() => {
        fetchAllBooks();
    }, []);


    const handleFileSelect = (selectedFile: File | null, preview: string | null) => {
        setValue("mainImage", selectedFile);
        setFilePreview(preview);
    };

    const handleOtherImagesSelect = (files: FileList | null) => {
        if (files) {
            const imageArray = Array.from(files);
            setOtherImages(imageArray);
            setValue("otherImages", imageArray);
        }
    };

    const handleFileUpload = (selectedFile: File | null, preview: string | null) => {
        setValue("file", selectedFile);
        setSelectedFiles(preview);
    };


    return (
        <div className="flex min-h-screen items-center justify-center py-10">
            <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
                <div className="flex justify-center">
                    <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Upload Form</h1>
                </div>

                <form onSubmit={handleSubmit((data) => handleFormSubmit(data, onSubmit, setFilePreview))}>
                    <div className="grid grid-cols-1 mt-5 mx-7">
                    <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Chọn sách</label>
                        <select
                            id="book-select"
                            value={selectedBook}
                            onChange={(e) => setSelectedBook(e.target.value)}
                            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            
                        >
                            <option value="">-- Chọn một cuốn sách --</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Tiêu đề</label>
                        <input
                            {...register("name")}
                            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Tiêu đề"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Mô tả</label>
                            <input
                                {...register("description")}
                                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Mô tả"
                            />
                            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Giá</label>
                            <input
                                {...register("price", { valueAsNumber: true })}
                                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="number"
                                placeholder="Giá"
                            />
                            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Thể loại</label>
                        <select
                            {...register("category", { valueAsNumber: true })}
                            onChange={(e) => {
                                const selectedCategory = categoryType.find(c => c.id === Number(e.target.value));
                                setCategory(selectedCategory || categoryType[0]);
                                setValue("category", selectedCategory?.id ?? 0);

                            }}
                            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                            <option value="0">Slide</option>
                            <option value="1">Bài tập</option>
                            <option value="2">Bài kiểm tra</option>
                        </select>

                        {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Nội dung</label>
                        <select
                            {...register("contentType", { valueAsNumber: true })}
                            onChange={(e) => {
                                const selectedContent = contentType.find(c => c.id === Number(e.target.value));
                                setContent(selectedContent || contentType[0]);
                                setValue("contentType", selectedContent?.id ?? 0);
                            }}
                            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                            <option value="0">Unit</option>
                            <option value="1">Review</option>
                        </select>

                        {errors.contentType && <p className="text-red-500 text-xs">{errors.contentType.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 font-semibold">Tệp tải lên</label>
                        <select
                            {...register("uploadType", { valueAsNumber: true })}
                            onChange={(e) => {
                                const selectedUpload = uploadType.find(u => u.id === Number(e.target.value));
                                setUpload(selectedUpload || uploadType[0]);
                                setValue("uploadType", selectedUpload?.id ?? 0);
                            }}
                            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                            <option value="0">PowerPoint</option>
                            <option value="1">Pdf</option>
                            <option value="2">Zip</option>
                            <option value="3">Rar</option>
                        </select>

                        {errors.uploadType && <p className="text-red-500 text-xs">{errors.uploadType.message}</p>}
                    </div>


                    <UploadPhoto
                        onFileUpload={handleFileUpload}
                        onMainImageSelect={handleFileSelect}
                        onOtherImagesSelect={handleOtherImagesSelect}

                    />

                    <div className="flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5">
                        <button
                            type="button"
                            className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                            onClick={() => setFilePreview(null)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-auto rounded-lg shadow-xl font-medium text-white px-4 py-2 ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-700"}`}
                            disabled={isPending}
                        >
                            {isPending ? "Đang tạo..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadFile;




