"use client";
import ReviewProduct from '@/components/review-product'
import { getAllProductCart } from '@/services/cart/api-services';
import { RootState } from '@/stores/store';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function ShoppingCart() {
    const [cartItems, setCartItems] = useState<API.ProductCart[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter()
    const cartItem = useSelector((state: RootState) => state.cartSlice.items);
    const [selectedItems, setSelectedItems] = useState<API.ProductCart[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProductCart({ pageIndex: 1, pageSize: 10 });
            if (res) {
                setCartItems(res.value.data.items);
            }
        };

        fetchProducts();
    }, []);

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }
        
        localStorage.setItem("selectedProducts", JSON.stringify(selectedItems));
        setTimeout(() => {
            router.push('/checkout');
        }, 100); 
    };
    

    return (
        <div className="font-sans max-w-7xl max-md:max-w-xl mx-auto bg-white py-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Giỏ hàng</h1>

            <div className="grid md:grid-cols-3 gap-8 mt-28">
                <ReviewProduct cartItems={cartItems} setCartItems={setCartItems} setTotalPrice={setTotalPrice} setSelectedItems={setSelectedItems} />

                <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md h-max">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-4">Tóm tắt đơn hàng</h3>

                    <ul className="text-gray-800 mt-6 space-y-3">
                        <li className="flex flex-wrap gap-4 text-base font-semibold">
                            Tổng tiền:
                            <span className="ml-auto text-orange-600">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND"
                                }).format(totalPrice)}
                            </span>
                        </li>
                    </ul>

                    <div className="mt-6 space-y-3">
                        <button
                            type="button"
                            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                            onClick={handleCheckout}
                        >
                            Thanh toán
                        </button>
                        <button
                            type="button"
                            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                            onClick={handleCheckout}
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart