"use client";
import OrderSummary from '@/components/order-summary';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useGetAllProductCart from '../hooks/useGetProductFromCart';
import { getAllProductCart } from '@/services/cart/api-services';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { OrderService } from '@/services/order/services';

function CheckOut() {
    const { isPending, getAllProductCartApi } = useGetAllProductCart();
    const [cartItems, setCartItems] = useState<API.ProductCart[]>([]);

    const cartItem = useSelector((state: RootState) => state.cartSlice.items);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProductCart({ pageIndex: 1, pageSize: 10 });
            if (res) {
                setCartItems(res.value.data.items);
            }
            console.log("Hello", res.value.data.items)
        };

        fetchProducts();
    }, []);

    const router = useRouter()

    const handleCheckout = async () => {
        try {
            const paymentUrl = await OrderService.createOrder();
            window.location.href = paymentUrl;
        } catch (error) {
            alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
        }
    };

    return (
        <div className="font-[sans-serif] bg-white p-8">
            <div className="max-lg:max-w-xl mx-auto w-full">
                <div className="grid lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
                        <div className="text-center max-lg:hidden">
                            <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-orange-500 pb-2">Thanh toán</h2>
                        </div>

                        <div className="mt-16">
                            <h2 className="text-xl font-bold text-gray-800">Thông tin thanh toán</h2>
                            <p className="text-sm text-gray-500 mt-2">
                                Bạn sẽ được chuyển hướng đến trang thanh toán. Vui lòng không tắt trình duyệt cho đến khi quá trình thanh toán hoàn tất.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                type="button"
                                className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                onClick={() => router.push('/shoppingcart')}
                            >
                                Quay lại
                            </button>
                            <button
                                type="button"
                                className="min-w-[150px] px-6 py-3.5 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                onClick={handleCheckout}
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>

                    <div className="lg:h-screen lg:sticky lg:top-0 w-full lg:ml-auto lg:col-span-2">
                        {isPending ? <p>Loading...</p> : <OrderSummary cartItems={cartItems} setCartItems={setCartItems} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
