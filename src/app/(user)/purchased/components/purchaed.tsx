'use client'
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/stores/store';
import useGetAllProductPurchased from '../../homepage/hooks/useGetAllProductPurchased';
import { useRouter } from 'next/navigation';

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
        <div className="py-10 px-4 mt-28">
            <h2 className="text-2xl font-semibold text-center mb-6">Sản phẩm đã mua</h2>

            {purchasedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
                    {purchasedProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto"
                            onClick={() => handleClick(product)}
                        >
                            
                            <img
                                className="w-full h-64 object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                            />

                            <div className="px-6 py-4">
                                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>

                               
                                {product.description && (
                                    <p className="text-gray-600 mt-2">{product.description}</p>
                                )}

                                
                                <p className={`mt-2 ${product.isPurchased ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.isPurchased ? 'Sản phẩm đã mua' : 'Chưa mua'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Không có sản phẩm đã mua.</p>
            )}

        </div>
    );
}

export default Purchased;
