"use client";

import useToast from "@/hooks/use-toast";
import { createHiringPostAPI, fetchBookSelectBoxAPI } from "@/services/customer_request/api-service";
import { BookSelectBoxResponse, CreateHiringPostRequest } from "@/services/customer_request/definition";
import { useAppSelector } from "@/stores/store";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const CreatePage = () => {
    const customerLogin = useAppSelector((state) => state.userSlice.user);

 


    const { addToast } = useToast();
    const router = useRouter();
    const [isCateDropdownOpen, setIsCateDropdownOpen] = useState(false);
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
    const [selectedBookName, setSelectedBookName] = useState("");
    const [searchTermCategory, setSearchTermCategory] = useState("");
    const [searchTermBook, setSearchTermBook] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [bookList, setBookList] = useState<BookSelectBoxResponse[]>([]);
    const [formData, setFormData] = useState<CreateHiringPostRequest>({
        id: 0, // Added default ID
        file: "",
        title: "",
        description: "",
        createdAt: new Date().toISOString(), // Ensure valid timestamp
        deletedAt: "", // Empty string or valid timestamp
        customerId: "",
        customerName: "",
        staffId: "",
        staffName: "",
        requirementCate: "",
        bookImg: "",
        requirementCateImg: "",
        customerAvt: "",
        bookName: "",
        demoFile: "",
        fileType: "",
        contentType: "",
        sourceType: "",
        status: "pending"
    });


    //#region HANDLING BETTER UX FOR DROPDOWN
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const bookDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                categoryDropdownRef.current &&
                !categoryDropdownRef.current.contains(event.target as Node)
            ) {
                setIsCateDropdownOpen(false);
            }
            if (
                bookDropdownRef.current &&
                !bookDropdownRef.current.contains(event.target as Node)
            ) {
                setIsBookDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //#endregion
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

 


    const handleCategorySelect = (category: string) => {
        setSelectedCategoryName(category);
        setFormData((prev) => ({
            ...prev,
            requirementCate: category,
            requirementCateImg: categoryImageMap[category]
        }));
        setIsCateDropdownOpen(false);
        setSearchTermCategory(""); // Reset search after selection
    };

    const handleBookSelect = (book: BookSelectBoxResponse) => {
        setFormData((prev) => ({
            ...prev,
            bookId: book.id,
            bookImg: book.img,
            bookName: book.name
        }));
        setSelectedBookName(book.name);
        setIsBookDropdownOpen(false);
        setSearchTermBook(""); // Reset search after selection
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createHiringPostAPI(formData);
            addToast({ description: "Hiring Post created successfully!", type: "success", duration: 5000 });
            router.push("/personal-hiring-post");
        } catch (error) {
            addToast({ description: "Failed to create Hiring Post. Please try again.", type: "error", duration: 5000 });
        }
    };
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await fetchBookSelectBoxAPI();
                setBookList(books);
            } catch (error) {
                console.error(error);
                const bookListFailCase = [
                    { id: 1, name: "English 1", img: "https://www.womenlivingwellafter50.com.au/wp-content/uploads/2023/08/Looking-for-Jane-1.jpg" },
                    { id: 2, name: "Creative Design", img: "https://skyryedesign.com/wp-content/uploads/2016/04/56c6f9b7efad5-cover-books-design-illustrations.jpg" },
                    { id: 3, name: "Fantasy Woods", img: "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg" },
                    { id: 4, name: "Summer Sunset", img: "https://thumbs.dreamstime.com/b/l-summer-sunset-portrait-landscape-nature-illustration-river-mountain-jungle-sunrise-birds-flying-water-book-cover-vector-333100990.jpg" },
                    { id: 5, name: "Fatal Exchange", img: "https://smallbluedog.com/wp-content/uploads/2014/10/FatalExchange_Cover-small.jpg" },
                    { id: 6, name: "Purple Sky", img: "https://marketplace.canva.com/EAGKkPbakT4/1/0/1003w/canva-purple-sky-book-cover-UOKyRwxSEZQ.jpg" },
                    { id: 7, name: "Graphic Wonders", img: "https://skyryedesign.com/wp-content/uploads/2016/04/56c6f9b7efad5-cover-books-design-illustrations.jpg" },
                    { id: 8, name: "Mystic Night", img: "https://marketplace.canva.com/EAGKkPbakT4/1/0/1003w/canva-purple-sky-book-cover-UOKyRwxSEZQ.jpg" },
                    { id: 9, name: "Jungle Secrets", img: "https://thumbs.dreamstime.com/b/l-summer-sunset-portrait-landscape-nature-illustration-river-mountain-jungle-sunrise-birds-flying-water-book-cover-vector-333100990.jpg" },
                    { id: 10, name: "Lost in Time", img: "https://smallbluedog.com/wp-content/uploads/2014/10/FatalExchange_Cover-small.jpg" },
                    { id: 11, name: "Design Patterns", img: "https://skyryedesign.com/wp-content/uploads/2016/04/56c6f9b7efad5-cover-books-design-illustrations.jpg" },
                    { id: 12, name: "Dark Realms", img: "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg" },
                    { id: 13, name: "Eternal Forest", img: "https://thumbs.dreamstime.com/b/l-summer-sunset-portrait-landscape-nature-illustration-river-mountain-jungle-sunrise-birds-flying-water-book-cover-vector-333100990.jpg" },
                    { id: 14, name: "Echoes of War", img: "https://smallbluedog.com/wp-content/uploads/2014/10/FatalExchange_Cover-small.jpg" },
                    { id: 15, name: "Sky fall Chronicles", img: "https://marketplace.canva.com/EAGKkPbakT4/1/0/1003w/canva-purple-sky-book-cover-UOKyRwxSEZQ.jpg" },
                    { id: 16, name: "Urban Legends", img: "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg" },
                    { id: 17, name: "Whispers in the Wind", img: "https://skyryedesign.com/wp-content/uploads/2016/04/56c6f9b7efad5-cover-books-design-illustrations.jpg" },
                    { id: 18, name: "The Forgotten Path", img: "https://smallbluedog.com/wp-content/uploads/2014/10/FatalExchange_Cover-small.jpg" },
                    { id: 19, name: "Shadows and Light", img: "https://marketplace.canva.com/EAGKkPbakT4/1/0/1003w/canva-purple-sky-book-cover-UOKyRwxSEZQ.jpg" },
                    { id: 20, name: "The Last Voyage", img: "https://thumbs.dreamstime.com/b/l-summer-sunset-portrait-landscape-nature-illustration-river-mountain-jungle-sunrise-birds-flying-water-book-cover-vector-333100990.jpg" }
                ];

                setBookList(bookListFailCase);
            }
        };
        const initFormData = async () => {
            try {
                if (!customerLogin) return;
                setFormData((prev) => ({
                    ...prev,
                    customerId: customerLogin?.userId,
                    customerName: customerLogin?.firstName + " " + customerLogin?.lastName,
                    customerAvt: customerLogin?.fullAvatarLink
                }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchBooks();
        initFormData();
    }, []);

    return (
        <div className="relative w-full max-w-6xl mx-auto p-8 shadow-xl rounded-xl mt-20 mb-16 min-h-[900px] bg-white/90 backdrop-blur-lg">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('https://media.istockphoto.com/id/1218737747/vector/learning-online-e-learning-video-call-chat-with-class-distance-education.jpg?s=612x612&w=0&k=20&c=fFFwc3CTP4XtvmruZLiK8EzAbzvAxJL_kw5BsA7z7w8=')] bg-cover bg-center bg-no-repeat opacity-20 rounded-xl"></div>

            {/* Form Content */}
            <div className="relative z-10 p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Post</h2>
                <button
                    onClick={() => router.push("/personal-hiring-post")}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 w-10 h-10 hover:bg-red-600 transition flex items-center justify-center"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

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

             
                    <div className="relative" ref={categoryDropdownRef}>
                        <input
                            type="text"
                            placeholder="Select category"
                            value={selectedCategoryName}
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
                                <div className="max-h-48 overflow-y-auto"> {/* Ensures only 3 items max are visible */}
                                    {Object.keys(categoryImageMap)
                                        .filter((cat) =>
                                            cat.toLowerCase().includes(searchTermCategory.toLowerCase())
                                        )
                                        .map((category) => (
                                            <div
                                                key={category}
                                                className="flex items-center p-4 hover:bg-blue-100 cursor-pointer text-lg transition"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                <img
                                                    src={categoryImageMap[category]}
                                                    alt={category}
                                                    className="w-10 h-10 object-cover rounded-md mr-4"
                                                />
                                                <span>{category}</span>
                                            </div>
                                        ))}
                                </div>
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
                            <option value="Unit">Unit</option>

                            <option value="Review">Review</option>
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
                            <option value="Slide">Slide</option>
                            <option value="Bài tập">Bài tập</option>
                            <option value="Bài kiểm tra">Bài kiểm tra</option>
                        </select>
                    </div>


                    {/* Book Selection */}
                  
                    <div className="relative" ref={bookDropdownRef}>
                        <input
                            type="text"
                            placeholder="Select a book"
                            value={selectedBookName}
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
                                <div className="max-h-48 overflow-y-auto">
                                    {bookList
                                        .filter((book) =>
                                            book.name.toLowerCase().includes(searchTermBook.toLowerCase())
                                        )
                                        .map((book) => (
                                            <div
                                                key={book.id}
                                                className="flex items-center p-4 hover:bg-blue-100 cursor-pointer text-lg transition"
                                                onClick={() => handleBookSelect(book)}
                                            >
                                                <img
                                                    src={book.img}
                                                    alt={book.name}
                                                    className="w-10 h-10 object-cover rounded-md mr-4"
                                                />
                                                <span>{book.name}</span>
                                            </div>
                                        ))}
                                </div>
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
                            <option value="">Select file type</option>
                            <option value="PowerPoint">PowerPoint</option>
                            <option value="PDF">PDF</option>
                            <option value="ZIP">ZIP</option>
                            <option value="RAR">RAR</option>
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
    "Adventure": "https://img.freepik.com/free-vector/walking-through-forest-adventure_24877-76269.jpg",
    "Mystery": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/the-mystery-of-ourselves-cameron-gray.jpg",
    "Fantasy": "https://www.tallengestore.com/cdn/shop/products/Fantasy_Art_-_Woman_Warrior_With_Tiger_c0829677-def5-4c2e-ab7e-fc9e6345c85d.jpg?v=1568967247",
};

const bookImgMap: Record<string, string> = {
    "English 1": "https://source.unsplash.com/150x150/?abc,alphabet",
    "Math 1": "https://source.unsplash.com/150x150/?math,numbers",
    "Science 1": "https://source.unsplash.com/150x150/?science,laboratory",
};
