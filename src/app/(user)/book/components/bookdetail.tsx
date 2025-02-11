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

interface BookDetailProps {
    bookId: string;
}

function BookDetail({ bookId }: BookDetailProps) {
    const [products, setProducts] = useState<API.Product[]>([]);
    const [showAllUnits, setShowAllUnits] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
    const { isPending, getAllProductOfBookApi } = useGetAllProductOfBook();
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

    const displayedUnits = showAllUnits ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4];

    const handleFilterChange = (unit: number) => {
        setSelectedUnits((prevSelectedUnits) =>
            prevSelectedUnits.includes(unit)
                ? prevSelectedUnits.filter((selectedUnit) => selectedUnit !== unit)
                : [...prevSelectedUnits, unit]
        );
    };

    const filteredProducts = selectedUnits.length > 0
        ? products.filter(product => selectedUnits.includes(product.unit))
        : products;

    const handleClick = (product: API.Product) => {
        if (product.category === 0) {
            router.push(`/detailslide/${product.id}`);
        } else if (product.category === 1) {
            router.push(`/exercise/${product.id}`);
        } else if (product.category === 2) {
            router.push(`/detailtest/${product.id}`);
        }
    };



    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 bg-[#8ecae6] px-20">
            <div className="flex flex-col space-y-4 bg-[#fdf0d5] p-4 shadow-lg rounded-lg">
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

                <div>
                    <h3 className="text-lg font-medium text-[#fb8500]">Ôn tập</h3>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-[#fb8500] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Tổng hợp ôn tập
                        </label>
                    </div>
                </div>


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
                    <Select>
                        <SelectTrigger className="w-[200px] text-[#fb8500]">
                            <SelectValue placeholder="Chọn thể loại phù hợp" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                                <SelectLabel>Các dạng</SelectLabel>
                                <SelectItem value="slide">Slide</SelectItem>
                                <SelectItem value="bài tập">Bài tập</SelectItem>
                                <SelectItem value="bài kiểm tra">Bài kiểm tra</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <h3 className="text-lg font-medium">Phạm vi giá</h3>
                    <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="default" id="r1" />
                            <Label htmlFor="r1">Dưới 25.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="comfortable" id="r2" />
                            <Label htmlFor="r2">25.000 - 50.000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="compact" id="r3" />
                            <Label htmlFor="r3">Trên 50.000</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>


            <div className="col-span-2 md:col-span-2 bg-[#add7f6] p-4 shadow-lg rounded-lg">
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