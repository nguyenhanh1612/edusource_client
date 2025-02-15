import React, { useEffect } from 'react'
import useDeleteCart from '../order-summary/useRemoveCart';
import { categoryType } from '@/const/product';

interface ReviewProductProps {
    cartItems: API.ProductCart[];
    setCartItems: React.Dispatch<React.SetStateAction<API.ProductCart[]>>;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}
const ReviewProduct: React.FC<ReviewProductProps> = ({ cartItems, setCartItems, setTotalPrice }) => {
    const { isPending, deleteCartApi } = useDeleteCart();

    const getCategoryName = (categoryId: number) => {
        const category = categoryType.find((cat) => cat.id === categoryId);
        return category ? category.type : "Không xác định";
    };

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    }, [cartItems]);


    const handleRemoveItem = async (productId: string) => {
        try {
            await deleteCartApi({ productId });
            setCartItems((prevCartItems) => {
                const updatedCart = prevCartItems.filter((item) => item.id !== productId);
                const newTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);
                setTotalPrice(newTotal);

                return updatedCart;
            });

        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };


    return (
        <div className="md:col-span-2 space-y-4">

            <div className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-md w-full max-w-4xl">
                <h2 className="text-xl font-bold text-gray-800 mb-2 flex justify-center">Tổng sản phẩm</h2>
<hr className='border-b-1'/>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((product) => (
                            <div key={product.id} className="relative flex items-center gap-4 py-3 border-b mb-4 mt-4">
                                <button
                                    onClick={() => handleRemoveItem(product.id)}
                                    className="absolute top-0 right-0 bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-lg w-7 h-7 flex items-center justify-center rounded-full shadow-md transition"
                                    disabled={isPending}
                                >
                                    ❌
                                </button>

                                <div className="w-[200px] h-[120px] rounded-md border bg-gray-100 flex items-center justify-center">
                                    <img
                                        src={product.imageUrl}
                                        className="w-full h-full object-cover rounded-md"
                                        alt={product.name}
                                    />
                                </div>

                                <div className="flex-1 pr-10">
                                    <h3 className="text-base font-semibold text-orange-600">{product.name}</h3>
                                    <p className="text-xs text-gray-500">{product.description}</p>

                                    <span className="text-xs text-white bg-orange-500 px-2 py-1 rounded-md inline-block mt-1">
                                        {getCategoryName(product.category)}
                                    </span>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Created by <span className="font-semibold text-orange-500">EduSource</span>
                                    </p>

                                    <div className="text-xl font-bold text-orange-600 whitespace-nowrap space-x-2">
                                        <span>Giá:</span>
                                        <span>
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND"
                                            }).format(product.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </>
                ) : (
                    <p className="text-gray-500 text-center mt-4">Giỏ hàng của bạn trống.</p>
                )}
            </div>
        </div>

    )
}

export default ReviewProduct
