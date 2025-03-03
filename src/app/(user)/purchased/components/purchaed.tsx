'use client'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/stores/store';
import useGetAllProductPurchased from '../../homepage/hooks/useGetAllProductPurchased';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Purchased() {
    const { getAllProductPurchasedApi } = useGetAllProductPurchased();
    const [purchasedProducts, setPurchasedProducts] = useState<API.Product[]>([]);
    const [isApiCalled, setIsApiCalled] = useState<boolean>(false);
    const userState = useAppSelector((state) => state.userSlice);
    const router = useRouter();

    useEffect(() => {
        if (userState.user && !isApiCalled) {
            const fetchPurchasedProducts = async () => {
                try {
                    const response = await getAllProductPurchasedApi({});
                    if (response && response.value?.data) {
                        setPurchasedProducts(response.value.data.items);
                    }
                    setIsApiCalled(true);
                } catch (error) {
                    console.error('Error fetching purchased products:', error);
                }
            };

            fetchPurchasedProducts();
        }
    }, [userState.user, getAllProductPurchasedApi, isApiCalled]);

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
        <div className="py-10 px-4 mt-28 bg-[url('/images/BG_1.png')] bg-cover bg-center">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                Sản phẩm đã mua
            </h2>

            {purchasedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {purchasedProducts.map((product, index) => (
                        <Card
                            key={`${product.id}-${index}`}
                            className="shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                            onClick={() => handleClick(product)}
                        >
                            <div className="relative w-full h-56">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-t-lg"
                                />
                                {product.isPurchased && (
                                    <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-md">
                                        Đã mua
                                    </span>
                                )}
                            </div>

                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-900">
                                    {product.name}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                {product.description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                                )}
                                <Button variant="outline" className="mt-4 w-full">
                                    Xem chi tiết
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Không có sản phẩm đã mua.</p>
            )}
        </div>
    );
}

export default Purchased;
