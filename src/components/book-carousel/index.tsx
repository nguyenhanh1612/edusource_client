import * as React from "react";
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Book {
    title: string;
    image: string;
}

interface BooksCategory {
    [category: string]: Book[];
}

interface BookDropdownProps {
    books: { [key: number]: BooksCategory };
}

export function BookDropdown({ books }: BookDropdownProps) {
    const [bookDropdown, setBookDropdown] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<number>(1); 
    const [activeCategoryIndices, setActiveCategoryIndices] = React.useState<{ [category: string]: number }>({}); 

    
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setBookDropdown(!bookDropdown);
    };

    const activeBooks = books[activeTab] || {}; 

    
    const getCategoryIndex = (category: string) => activeCategoryIndices[category] || 0;

    const handlePrev = (category: string) => {
        const booksArray = activeBooks[category] || [];
        const currentIndex = getCategoryIndex(category);
        if (currentIndex > 0) {
            setActiveCategoryIndices((prevIndices) => ({
                ...prevIndices,
                [category]: currentIndex - 1,
            }));
        }
    };

    const handleNext = (category: string) => {
        const booksArray = activeBooks[category] || [];
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

            {bookDropdown && (
                <div ref={dropdownRef} className="absolute bg-[#add7f6] shadow-lg rounded-r-lg p-4 w-[600px] z-[9999] flex">
                    <div className="absolute -left-10 top-0 flex flex-col items-center space-y-4">
                        {Object.keys(books).map((tabNumber) => (
                            <div
                                key={tabNumber}
                                onClick={() => setActiveTab(Number(tabNumber))} 
                                className={`w-10 h-10 flex items-center justify-center rounded-l-md text-lg font-bold cursor-pointer ${activeTab === Number(tabNumber)
                                    ? "bg-orange-500 text-white"
                                    : "bg-orange-300 text-gray-700"
                                    }`}
                            >
                                {tabNumber} 
                            </div>
                        ))}
                    </div>

                    <div className="flex-1">
                        {Object.entries(activeBooks).map(([category, books]) => {
                            const currentIndex = getCategoryIndex(category);
                            const booksToDisplay = books.slice(currentIndex, currentIndex + 3);

                            return (
                                <div key={category} className="mb-4">
                                    <h3 className="text-lg px-6 font-semibold text-[#219ebc] mb-2 bg-[#8ecae6] rounded-full">
                                        {category}
                                    </h3>
                                    <div className="relative min-h-[200px] flex items-center justify-center"> 
                                        {booksToDisplay.length === 0 ? (
                                            <p className="text-center text-gray-600">Không có sách trong danh mục này.</p>
                                        ) : (
                                            <div className="flex justify-center items-center space-x-4">
                                                {booksToDisplay.map((book, index) => (
                                                    <div key={index} className="bg-[#add7f6] rounded-lg p-4 w-40 text-center">
                                                        <img
                                                            src={book.image}
                                                            alt={book.title}
                                                            className="w-20 h-28 object-cover rounded-md mx-auto"
                                                        />
                                                        <p className="text-sm text-gray-600 mt-2">{book.title}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <button
                                            onClick={() => handlePrev(category)}
                                            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white p-2 rounded-full ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            style={{ display: currentIndex > 0 ? 'block' : 'none' }}
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <button
                                            onClick={() => handleNext(category)}
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
