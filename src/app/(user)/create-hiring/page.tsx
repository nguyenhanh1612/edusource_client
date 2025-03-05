"use client";

import { contentType } from "@/const/product";
import useToast from "@/hooks/use-toast";
import { createHiringPostAPI } from "@/services/customer_request/api-service";
import { CreateHiringPostRequest } from "@/services/customer_request/definition";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePage = () => {
    const { addToast } = useToast();
    const router = useRouter();

    const [isCateDropdownOpen, setIsCateDropdownOpen] = useState(false);
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);

    const [searchTermCategory, setSearchTermCategory] = useState("");
    const [searchTermBook, setSearchTermBook] = useState("");

    const [formData, setFormData] = useState<Partial<CreateHiringPostRequest>>({
        title: "",
        description: "",
        requirementCate: "",
        bookId: "",
        requirementCateImg: "",
        sourceType: 0,
        fileType: 0,
        contentType: 0

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCategorySelect = (category: string) => {
        setFormData((prev) => ({
            ...prev,
            requirementCate: category,
            requirementCateImg: categoryImageMap[category]
        }));
        setIsCateDropdownOpen(false);
        setSearchTermCategory(""); // Reset search after selection
    };

    const handleBookSelect = (book: string) => {
        setFormData((prev) => ({
            ...prev,
            bookName: book,
            bookImg: bookImgMap[book]
        }));
        setIsBookDropdownOpen(false);
        setSearchTermBook(""); // Reset search after selection
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await createHiringPostAPI(formData as CreateHiringPostRequest);
            addToast({ description: "Hiring Post created successfully!", type: "success", duration: 5000 });
            router.push("/personal-hiring-post");
        } catch (error) {
            addToast({ description: "Failed to create Hiring Post. Please try again.", type: "error", duration: 5000 });
        }
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto p-8 shadow-xl rounded-xl mt-20 mb-16 min-h-[900px] bg-white/90 backdrop-blur-lg">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1218737747/vector/learning-online-e-learning-video-call-chat-with-class-distance-education.jpg?s=612x612&w=0&k=20&c=fFFwc3CTP4XtvmruZLiK8EzAbzvAxJL_kw5BsA7z7w8=')] bg-cover bg-center bg-no-repeat opacity-20 rounded-xl"></div>

            {/* Form Content */}
            <div className="relative z-10 p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Post</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title (required)"
                        className="w-full border-2 border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        required
                    />

                    {/* Theme Selection */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Select theme"
                            value={formData.requirementCate}
                            readOnly
                            onClick={() => setIsCateDropdownOpen(!isCateDropdownOpen)}
                            className="w-full border-2 border-gray-300 p-4 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                        {isCateDropdownOpen && (
                            <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTermCategory}
                                    onChange={(e) => setSearchTermCategory(e.target.value)}
                                    className="w-full p-4 border-b text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                />
                                {Object.keys(categoryImageMap)
                                    .filter((cat) =>
                                        cat.toLowerCase().includes(searchTermCategory.toLowerCase())
                                    )
                                    .map((category, index) => (
                                        <div
                                            key={index}
                                            className="p-4 hover:bg-blue-100 cursor-pointer text-lg transition"
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description (required)"
                        className="w-full border-2 border-gray-300 p-4 rounded-lg text-lg h-80 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        required
                    ></textarea>
                    {/* Content Type: Unit or Review */}
                    <div className="grid grid-cols-1">
                        <label className="text-gray-600 font-semibold">Unit or Review</label>
                        <select
                            name="contentType"
                            value={formData.contentType}
                            onChange={handleChange}
                            className="py-3 px-4 rounded-lg border-2 border-gray-300 mt-1 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                        >
                            <option value="">Select Content Type</option>
                            <option value="0">Unit</option>
                            <option value="1">Review</option>
                        </select>
                    </div>

                    {/* Source Type */}
                    <div className="grid grid-cols-1">
                        <label className="text-gray-600 font-semibold">Source Type</label>
                        <select
                            name="sourceType"
                            value={formData.sourceType}
                            onChange={handleChange}
                            className="py-3 px-4 rounded-lg border-2 border-gray-300 mt-1 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                        >
                            <option value="">Select Source Type</option>
                            <option value="0">Slide</option>
                            <option value="1">Bài tập</option>
                            <option value="2">Bài kiểm tra</option>
                        </select>
                    </div>


                    {/* Book Selection */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Select a book"
                            value={formData.bookId}
                            readOnly
                            onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)}
                            className="w-full border-2 border-gray-300 p-4 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                        {isBookDropdownOpen && (
                            <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTermBook}
                                    onChange={(e) => setSearchTermBook(e.target.value)}
                                    className="w-full p-4 border-b text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                />
                                {Object.keys(bookImgMap)
                                    .filter((bo) =>
                                        bo.toLowerCase().includes(searchTermBook.toLowerCase())
                                    )
                                    .map((book, index) => (
                                        <div
                                            key={index}
                                            className="p-4 hover:bg-blue-100 cursor-pointer text-lg transition"
                                            onClick={() => handleBookSelect(book)}
                                        >
                                            {book}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* File Type */}
                    <div className="grid grid-cols-1">
                        <label className="text-gray-600 font-semibold">File Type</label>
                        <select
                            name="fileType"
                            value={formData.fileType}
                            onChange={handleChange}
                            className="py-3 px-4 rounded-lg border-2 border-gray-300 mt-1 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition">
                            <option value="0">PowerPoint</option>
                            <option value="1">PDF</option>
                            <option value="2">ZIP</option>
                            <option value="3">RAR</option>
                        </select>
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 text-lg rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </div>


    );

};

export default CreatePage;

const categoryImageMap: Record<string, string> = {
    "Adventure": "https://source.unsplash.com/150x150/?adventure",
    "Mystery": "https://source.unsplash.com/150x150/?mystery,detective",
    "Fantasy": "https://source.unsplash.com/150x150/?fantasy,magic",
};

const bookImgMap: Record<string, string> = {
    "English 1": "https://source.unsplash.com/150x150/?abc,alphabet",
    "Math 1": "https://source.unsplash.com/150x150/?math,numbers",
    "Science 1": "https://source.unsplash.com/150x150/?science,laboratory",
};
