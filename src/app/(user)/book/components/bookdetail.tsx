'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import useGetAllProductOfBook from '../hooks/useGetAllProductOfBook'
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categoryType } from '@/const/product'

interface BookDetailProps {
    bookId: string;
}

function BookDetail({ bookId }: BookDetailProps) {
    const [products, setProducts] = useState<API.Product[]>([]);
    const [showAllUnits, setShowAllUnits] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
    const [isReviewChecked, setIsReviewChecked] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState("all");
    const { isPending, getAllProductOfBookApi } = useGetAllProductOfBook();
    const hasReviewContent = products.some(product => product.contentType === 1);
    const router = useRouter();

    useEffect(() => {
        if (!bookId) return;

        const fetchProducts = async () => {
            const res = await getAllProductOfBookApi({ BookId: bookId });
            if (res && res.value.data.items) {
                setProducts(res.value.data.items);
            }
        };

        fetchProducts();
    }, [bookId]);

    const handleToggleUnits = () => {
        setShowAllUnits(!showAllUnits);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const displayedUnits = showAllUnits ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4];

    const handleFilterChange = (unit: number) => {
        setSelectedUnits((prevSelectedUnits) =>
            prevSelectedUnits.includes(unit)
                ? prevSelectedUnits.filter((selectedUnit) => selectedUnit !== unit)
                : [...prevSelectedUnits, unit]
        );
    };

    const filteredProducts = products.filter(product =>
        (isReviewChecked ? product.contentType === 1 : true) && // Lọc theo contentType nếu checkbox Review được chọn
        (selectedUnits.length === 0 || selectedUnits.includes(product.unit)) && // Lọc theo unit nếu có unit được chọn
        (selectedCategory === "all" || !selectedCategory || // Nếu không chọn category => hiển thị tất cả
            (selectedCategory === "slide" && product.category === 0) ||
            (selectedCategory === "bài tập" && product.category === 1) ||
            (selectedCategory === "bài kiểm tra" && product.category === 2)) &&
        (selectedPrice === "all" || !selectedPrice || // Nếu chọn "Tất cả" thì không lọc
            (selectedPrice === "under25" && product.price < 25000) ||
            (selectedPrice === "25to50" && product.price >= 25000 && product.price <= 50000) ||
            (selectedPrice === "above50" && product.price > 50000))

    );

    const handleClick = (product: API.Product) => {
        if (product.category === 0) {
            router.push(`/detailslide/${product.id}`);
        } else if (product.category === 1) {
            router.push(`/exercise/${product.id}`);
        } else if (product.category === 2) {
            router.push(`/test/${product.id}`);
        }
    };



    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 bg-[#8ecae6] px-20">
            <div className="flex flex-col space-y-4 bg-[#fdf0d5] p-4 shadow-lg rounded-lg mt-32">
                <div>
                    <h3 className="text-lg font-medium text-[#fb8500]">Unit</h3>
                    <div className="space-y-2 text-[#fb8500]">
                        {displayedUnits.map((unit) => (
                            <div key={unit} className="flex items-center space-x-2 ">
                                <Checkbox
                                    id={`unit${unit}`}
                                    checked={selectedUnits.includes(unit)}
                                    onCheckedChange={() => handleFilterChange(unit)}
                                />
                                <label
                                    htmlFor={`unit${unit}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Unit {unit}
                                </label>

                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleToggleUnits}
                        className="mt-2 text-[#fb8500] hover:underline text-sm flex items-center space-x-1"
                    >
                        {showAllUnits ? (
                            <>
                                <span>Thu gọn</span>
                                <FaChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                <span>Xem thêm</span>
                                <FaChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </button>

                </div>

                {hasReviewContent && (
                    <div>
                        <h3 className="text-lg font-medium text-[#fb8500]">Ôn tập</h3>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={isReviewChecked}
                                onCheckedChange={(checked) => setIsReviewChecked(checked === true)}
                            />

                            <label
                                htmlFor="terms"
                                className="text-[#fb8500] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Tổng hợp ôn tập
                            </label>
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-lg font-medium text-[#fb8500]">Bài học</h3>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-[#fb8500] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Bài 1
                        </label>
                    </div>
                </div>


                <div>
                    <h3 className="text-lg font-medium text-[#fb8500]">Thể loại</h3>
                    <Select onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-[200px] text-[#fb8500]">
                            <SelectValue placeholder="Chọn thể loại phù hợp" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Các dạng</SelectLabel>
                                <SelectItem value="all">Tất cả thể loại</SelectItem>
                                <SelectItem value="slide">Slide</SelectItem>
                                <SelectItem value="bài tập">Bài tập</SelectItem>
                                <SelectItem value="bài kiểm tra">Bài kiểm tra</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>


                <div>
                    <h3 className="text-lg font-medium">Phạm vi giá</h3>
                    <RadioGroup value={selectedPrice} onValueChange={setSelectedPrice}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="r0" />
                            <Label htmlFor="r0">Tất cả giá</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="under25" id="r1" />
                            <Label htmlFor="r1">Dưới 25.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="25to50" id="r2" />
                            <Label htmlFor="r2">25.000 - 50.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="above50" id="r3" />
                            <Label htmlFor="r3">Trên 50.000</Label>
                        </div>
                    </RadioGroup>

                </div>
            </div>


            <div className="col-span-2 md:col-span-2 bg-[#add7f6] p-4 shadow-lg rounded-lg mt-32">
                <h2 className="text-2xl font-semibold mb-4">Content</h2>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isPending ? (
                        <div>Loading products...</div>
                    ) : (
                        filteredProducts.map((product) => {
                            return (
                                <div key={product.id} className="p-4 border rounded-lg shadow-sm bg-white" onClick={() => handleClick(product)}
                                >
                                    {product.imageUrl && (
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover border-2 border-[#8ecae6] rounded-lg" />
                                    )}
                                    <div className='flex flex-col text-center space-y-2 mt-2'>
                                        <h3 className="font-semibold text-2xl">{product.name}</h3>
                                        <p className="text-sm">{product.description}</p>
                                    </div>
                                    <div className="flex items-center justify-center mt-2 space-x-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) =>
                                                star <= product.rating ? (
                                                    <FaStar key={star} className="text-yellow-500" />
                                                ) : (
                                                    <FaRegStar key={star} className="text-gray-300" />
                                                )
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700 mt-1">{product.rating}</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

        </div>
    );
}

export default BookDetail;

{/* <div className="mt-2">
                                        <a
                                            href={product.fileUrl}
                                            className="text-blue-500"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Download PDF
                                        </a>
                                    </div> */}