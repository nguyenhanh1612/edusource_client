import * as React from "react";
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Book {
    id: string;
    name: string;
    imageUrl: string;
    gradeLevel: number;
    category: number;
}

interface BooksCategory {
    [category: number]: Book[];
}

interface BookDropdownProps {
    books: Book[];
    activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

export function BookDropdown({ books, activeTab, setActiveTab, totalPages }: BookDropdownProps) {
    const [bookDropdown, setBookDropdown] = React.useState(false);
    const [activeCategoryIndices, setActiveCategoryIndices] = React.useState<{ [category: number]: number }>({});
    const router = useRouter();
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setBookDropdown(!bookDropdown);
    };

    const groupedBooks = Array.isArray(books) ? books.reduce((acc, book: Book) => {
        if (!acc[book.category]) {
            acc[book.category] = [];
        }
        acc[book.category].push(book);
        return acc;
    }, {} as BooksCategory) : {};

    const getCategoryIndex = (category: number) => activeCategoryIndices[category] || 0;

    const handlePrev = (category: number) => {
        const booksArray = groupedBooks[category] || [];
        const currentIndex = getCategoryIndex(category);
        if (currentIndex > 0) {
            setActiveCategoryIndices((prevIndices) => ({
                ...prevIndices,
                [category]: currentIndex - 1,
            }));
        }
    };

    const handleNext = (category: number) => {
        const booksArray = groupedBooks[category] || [];
        const currentIndex = getCategoryIndex(category);
        if (currentIndex + 3 < booksArray.length) {
            setActiveCategoryIndices((prevIndices) => ({
                ...prevIndices,
                [category]: currentIndex + 1,
            }));
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setBookDropdown(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleBookClick = (bookId: string) => {
        router.push(`/book/${bookId}`);
        setBookDropdown(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="text-gray-600 bg-teal-400 hover:bg-teal-500 hover:text-white px-4 py-2 rounded-md flex items-center"
            >
                Sách
                {bookDropdown ? (
                    <FaChevronUp className="ml-2" />
                ) : (
                    <FaChevronDown className="ml-2" />
                )}
            </button>
            {/* bg-[#add7f6] */}
            {bookDropdown && (
                <div ref={dropdownRef} className="absolute bg-white shadow-lg rounded-r-lg p-4 w-[600px] z-[9999] flex">
                    <div className="absolute -left-10 top-0 flex flex-col items-center space-y-4">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveTab(index + 1)}
                                className={`w-10 h-10 flex items-center justify-center rounded-l-md text-lg font-bold cursor-pointer ${activeTab === index + 1
                                    ? "bg-orange-500 text-white"
                                    : "bg-orange-300 text-gray-700"
                                    }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1">
                        {Object.entries(groupedBooks).map(([category, books]) => {
                            const currentIndex = getCategoryIndex(Number(category));
                            const booksToDisplay = books.slice(currentIndex, currentIndex + 3);
                            // bg-[#8ecae6] 
                            return (
                                <div key={category} className="mb-4">
                                    <h3 className="text-lg px-6 font-semibold text-[#219ebc] mb-2 rounded-full">
                                        Sách phổ biến
                                    </h3>
                                    {/* bg-[#add7f6]  */}
                                    <div className="relative min-h-[200px] flex items-center justify-center">
                                        {booksToDisplay.map((book: Book) => (
                                            <div key={book.id} onClick={() => handleBookClick(book.id)} className="rounded-lg p-4 w-40 text-center">
                                                <img
                                                    src={book.imageUrl}
                                                    alt={book.name}
                                                    className="w-20 h-28 object-cover rounded-md mx-auto"
                                                />
                                                <p className="text-sm text-gray-600 mt-2">{book.name}</p>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => handlePrev(Number(category))}
                                            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            style={{ display: currentIndex > 0 ? 'block' : 'none' }}
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <button
                                            onClick={() => handleNext(Number(category))}
                                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full ${currentIndex + 3 >= books.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            style={{ display: currentIndex + 3 < books.length ? 'block' : 'none' }}
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
