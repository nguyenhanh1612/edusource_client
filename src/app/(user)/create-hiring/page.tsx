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
        status: "pending",
        price: -1,
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
            addToast({ description: "Tạo thành công!", type: "success", duration: 5000 });
            router.push("/personal-hiring-post");
        } catch (error) {
            addToast({ description: "Lỗi khi tạo bài", type: "error", duration: 5000 });
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
                    {
                        id: 1,
                        name: "Global Success 5",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583474/edusource/Global-Success-5.webp"
                    },
                    {
                        id: 2,
                        name: "Global Success 3",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583470/edusource/Global-Success-3.jpg"
                    },
                    {
                        id: 3,
                        name: "Family and Friends 2",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583455/edusource/Family-And-Friends-2.png"
                    },
                    {
                        id: 4,
                        name: "Global Success 1",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736587391/edusource/Global-Success-1.jpg"
                    },
                    {
                        id: 5,
                        name: "I Learn Smart Start 1",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736586096/edusource/I-Learn-Smart-Start-1.jpg"
                    },
                    {
                        id: 6,
                        name: "Global Success 2",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583472/edusource/Global-Success-2.jpg"
                    },
                    {
                        id: 7,
                        name: "Family and Friends 1",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583455/edusource/Family-And-Friends-1.png"
                    },
                    {
                        id: 8,
                        name: "Family and Friends 3",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583455/edusource/Family-And-Friends-3.png"
                    },
                    {
                        id: 9,
                        name: "I Learn Smart Start 5",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583438/edusource/I-Learn-Smart-Start-5.jpg"
                    },
                    {
                        id: 10,
                        name: "Family and Friends 5",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583454/edusource/Family-And-Friends-5.jpg"
                    },
                    {
                        id: 11,
                        name: "Global Success 4",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583471/edusource/Global-Success-4.jpg"
                    },
                    {
                        id: 12,
                        name: "Family and Friends 4",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583456/edusource/Family-And-Friends-4.png"
                    },
                    {
                        id: 13,
                        name: "I Learn Smart Start 3",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583439/edusource/I-Learn-Smart-Start-3.png"
                    },
                    {
                        id: 14,
                        name: "I Learn Smart Start 2",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583438/edusource/I-Learn-Smart-Start-2.jpg"
                    },
                    {
                        id: 15,
                        name: "I Learn Smart Start 4",
                        img: "https://res.cloudinary.com/dc4eascme/image/upload/v1736583438/edusource/I-Learn-Smart-Start-4.jpg"
                    },
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
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Tạo mới yêu cầu</h2>
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
                        placeholder="Tiêu đề (*)"
                        className="w-full border-2 border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        required
                    />


                    <div className="relative" ref={categoryDropdownRef}>
                        <input
                            type="text"
                            placeholder="Chọn chủ đề thiết kế"
                            value={selectedCategoryName}
                            readOnly
                            onClick={() => setIsCateDropdownOpen(!isCateDropdownOpen)}
                            className="w-full border-2 border-gray-300 p-4 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                        {isCateDropdownOpen && (
                            <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                <input
                                    type="text"
                                    placeholder="Tìm..."
                                    value={searchTermCategory}
                                    onChange={(e) => setSearchTermCategory(e.target.value)}
                                    className="w-full p-4 border-b text-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                />
                                <div className="max-h-48 overflow-y-auto">
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
                        placeholder="Mô tả (*)"
                        className="w-full border-2 border-gray-300 p-4 rounded-lg text-lg h-80 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        required
                    ></textarea>
                    {/* Content Type: Unit or Review */}
                    <div className="grid grid-cols-1">
                        <label className="text-gray-600 font-semibold">Unit hoặc Review</label>
                        <select
                            name="contentType"
                            value={formData.contentType}
                            onChange={handleChange}
                            className="py-3 px-4 rounded-lg border-2 border-gray-300 mt-1 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                        >
                            <option value=""></option>
                            <option value="Unit">Unit</option>

                            <option value="Review">Review</option>
                        </select>
                    </div>

                    {/* Source Type */}
                    <div className="grid grid-cols-1">
                        <label className="text-gray-600 font-semibold">Loại nguồn</label>
                        <select
                            name="sourceType"
                            value={formData.sourceType}
                            onChange={handleChange}
                            className="py-3 px-4 rounded-lg border-2 border-gray-300 mt-1 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                        >
                            <option value=""></option>
                            <option value="Slide">Slide</option>
                            <option value="Bài tập">Bài tập</option>
                            <option value="Bài kiểm tra">Bài kiểm tra</option>
                        </select>
                    </div>


                    {/* Book Selection */}

                    <div className="relative" ref={bookDropdownRef}>
                        <input
                            type="text"
                            placeholder="Chọn tựa sách"
                            value={selectedBookName}
                            readOnly
                            onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)}
                            className="w-full border-2 border-gray-300 p-4 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                        {isBookDropdownOpen && (
                            <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-xl max-h-60 overflow-y-auto z-10">
                                <input
                                    type="text"
                                    placeholder="Tìm tựa sách..."
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
                        <label className="text-gray-600 font-semibold">Định dạng thư mục</label>
                        <select
                            name="fileType"
                            value={formData.fileType}
                            onChange={handleChange}
                            className="py-3 px-4 rounded-lg border-2 border-gray-300 mt-1 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition">
                            <option value=""></option>
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
                        Hoàn tất
                    </button>
                </form>
            </div>
        </div>


    );

};

export default CreatePage;

const categoryImageMap: Record<string, string> = {
    "Phiêu lưu": "https://img.freepik.com/free-vector/walking-through-forest-adventure_24877-76269.jpg",
    "Bí ẩn": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/the-mystery-of-ourselves-cameron-gray.jpg",
    "Giả tưởng": "https://www.tallengestore.com/cdn/shop/products/Fantasy_Art_-_Woman_Warrior_With_Tiger_c0829677-def5-4c2e-ab7e-fc9e6345c85d.jpg?v=1568967247",
    "Khoa học viễn tưởng": "https://media.wired.com/photos/5f4ee313bb023d54b55e4e29/master/pass/sci-fi-last-lines.jpg",
    "Kinh dị": "https://render.fineartamerica.com/images/rendered/medium/print/8/5.5/break/images-medium-5/castle-in-the-sky-bob-orsillo.jpg",
    "Giật gân": "https://i1.sndcdn.com/artworks-2EgNieCOutUfspte-YlVksw-t500x500.jpg",
    "Lãng mạn": "https://w0.peakpx.com/wallpaper/598/440/HD-wallpaper-love-is-in-the-air-love-theme.jpg",
    "Tâm lý học": "https://www.simplypsychology.org/wp-content/uploads/psychology.jpeg",
    "Thơ ca": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIm_qLdHkkcal1leonDXqwLAwaeyxu9tC9pA&s",
    "Kinh điển": "https://media.slidesgo.com/storage/33479731/vintage-papyrus-minitheme1680506366.jpg",
    "Chống không tưởng": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbSk_ENtLHN9M3KSqrnAVfpKq0ladNJmxWmw&s",
    "Không tưởng": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxEMEY4AKjOG_Rb48cX_FU1Un2d3fVOvsZJA&s",
    "Truyện cổ tích": "https://m.media-amazon.com/images/S/pv-target-images/82aff91a387ad745a6480e2af852a3f950e86bb9c9663c5858ba57c3397cfe1e.jpg",
    "Giáo dục": "https://vnis.edu.vn/wp-content/uploads/2024/04/edu-trends.png",
    "Du lịch": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVmlM4cOwkqa95XuYml6OFgbn4gYHok96R1Q&s",
    "Kinh doanh": "https://imageio.forbes.com/specials-images/imageserve/5fca87f3ce4ca55e8985a10a/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    "Chính trị": "https://www.voicesofyouth.org/sites/voy/files/images/2019-01/politics3.jpg",
    "Thể thao": "https://assets.goal.com/images/v3/getty-2153876891/crop/MM5DINZYGQ5DENRZGE5G433XMU5DCMZRHI3DINI=/GettyImages-2153876891.jpg?auto=webp&format=pjpg&width=3840&quality=60",
    "Âm nhạc": "https://moises.ai/_next/image/?url=https%3A%2F%2Fstorage.googleapis.com%2Fmoises-cms%2Fhow_to_reading_sheet_music_image_338d99b137%2Fhow_to_reading_sheet_music_image_338d99b137.jpg&w=1920&q=75",
    "Nghệ thuật": "https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2FPop_Art_Compressed_638237807745595223.jpg&w=1920&q=75",
};
