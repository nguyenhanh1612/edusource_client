"use client";

import useToast from "@/hooks/use-toast";
import { createHiringPostAPI } from "@/services/customer_request/api-service";
import { HiringPost } from "@/services/customer_request/definition";
import { useAppSelector } from "@/stores/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePage = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const userName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
    const { addToast } = useToast();
    const router = useRouter();

    const [isCateDropdownOpen, setIsCateDropdownOpen] = useState(false);
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);

    const [searchTermCategory, setSearchTermCategory] = useState("");
    const [searchTermBook, setSearchTermBook] = useState("");

    const [formData, setFormData] = useState<Partial<HiringPost>>({
        file: "",
        title: "",
        description: "",
        createdAt: new Date(),
        deletedAt: undefined,
        customerId: user?.userId,
        customerName: userName,
        staffId: "",
        staffName: "",
        requirementCate: "",
        hashTags: "",
        bookImg: "",
        bookName: "",
        requirementCateImg: "",
        customerAvt: user?.fullAvatarLink
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            const response = await createHiringPostAPI(formData as HiringPost);
            addToast({ description: "Hiring Post created successfully!", type: "success", duration: 5000 });
            router.push("/personal-hiring-post");
        } catch (error) {
            addToast({ description: "Failed to create Hiring Post. Please try again.", type: "error", duration: 5000 });
        }
    };

    return (


        <div className="relative w-full max-w-screen-lg mx-auto p-10 shadow-2xl rounded-xl mt-32 mb-20 min-h-[1200px]">
            {/* Background with Opacity */}
            <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1218737747/vector/learning-online-e-learning-video-call-chat-with-class-distance-education.jpg?s=612x612&w=0&k=20&c=fFFwc3CTP4XtvmruZLiK8EzAbzvAxJL_kw5BsA7z7w8=')] bg-cover bg-center bg-no-repeat opacity-30"></div>

            {/* Form Container */}
            <div className="relative z-10 bg-white/80 p-8 rounded-xl">
                <div className="w-full max-w-screen-lg mx-auto p-12">

                    <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased spacing */}
                        {/* Title */}
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title (required)"
                            className="w-full border p-5 text-m rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />

                        {/* Category Selection */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Select a category"
                                value={formData.requirementCate}
                                readOnly
                                onClick={() => setIsCateDropdownOpen(!isCateDropdownOpen)}
                                className="w-full border p-5 text-m rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                            {isCateDropdownOpen && (
                                <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTermCategory}
                                        onChange={(e) => setSearchTermCategory(e.target.value)}
                                        className="w-full p-5 border-b text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    />
                                    {Object.keys(categoryImageMap)
                                        .filter((cat) =>
                                            cat.toLowerCase().includes(searchTermCategory.toLowerCase())
                                        )
                                        .map((category, index) => (
                                            <div
                                                key={index}
                                                className="p-5 hover:bg-blue-100 cursor-pointer text-lg"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* Description (Increased Height) */}
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description (required)"
                            className="w-full border p-5 text-m rounded-lg h-64 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />


                        {/* Hashtags */}
                        <input
                            type="text"
                            name="hashTags"
                            value={formData.hashTags}
                            onChange={handleChange}
                            placeholder="Hashtags"
                            className="w-full border p-5 text-m rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />

                        {/* Book Selection */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Select a book"
                                value={formData.bookName}
                                readOnly
                                onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)}
                                className="w-full border p-5 text-m rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                            {isBookDropdownOpen && (
                                <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTermBook}
                                        onChange={(e) => setSearchTermBook(e.target.value)}
                                        className="w-full p-5 border-b text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    />
                                    {Object.keys(bookImgMap)
                                        .filter((bo) =>
                                            bo.toLowerCase().includes(searchTermBook.toLowerCase())
                                        )
                                        .map((book, index) => (
                                            <div
                                                key={index}
                                                className="p-5 hover:bg-blue-100 cursor-pointer text-lg"
                                                onClick={() => handleBookSelect(book)}
                                            >
                                                {book}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 text-m rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
                        >
                            Create Post
                        </button>
                    </form>
                </div>
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
