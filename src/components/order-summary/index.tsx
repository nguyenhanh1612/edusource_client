import React from 'react';

const OrderSummary: React.FC = () => {
    const products = [
        {
            imgSrc: 'https://readymadeui.com/images/product10.webp',
            name: 'Naruto: Split Sneakers',
            size: '37',
            quantity: 2,
            price: '$40',
        },
        {
            imgSrc: 'https://readymadeui.com/images/product11.webp',
            name: 'VelvetGlide Boots',
            size: '37',
            quantity: 2,
            price: '$40',
        },
        {
            imgSrc: 'https://readymadeui.com/images/product14.webp',
            name: 'Echo Elegance',
            size: '37',
            quantity: 2,
            price: '$40',
        },
        {
            imgSrc: 'https://readymadeui.com/images/product12.webp',
            name: 'Naruto: Split Sneakers',
            size: '37',
            quantity: 2,
            price: '$40',
        },
        {
            imgSrc: 'https://readymadeui.com/images/product9.webp',
            name: 'VelvetGlide Boots',
            size: '37',
            quantity: 2,
            price: '$40',
        },
    ];

    const totalPrice = products.reduce((total, product) => total + parseFloat(product.price.replace('$', '')), 0);

    return (
        <div className="relative h-full">
            <div className="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

                <div className="space-y-6 mt-8">
                    {products.map((product, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                                <img src={product.imgSrc} className="w-full object-contain" alt={product.name} />
                            </div>

                            <div className="w-full">
                                <h3 className="text-sm text-gray-800 font-bold">{product.name}</h3>
                                <ul className="text-xs text-gray-800 space-y-1 mt-2">
                                    <li className="flex flex-wrap gap-4">
                                        Size <span className="ml-auto">{product.size}</span>
                                    </li>
                                    <li className="flex flex-wrap gap-4">
                                        Quantity <span className="ml-auto">{product.quantity}</span>
                                    </li>
                                    <li className="flex flex-wrap gap-4">
                                        Total Price <span className="ml-auto">{product.price}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">
                    Total <span className="ml-auto">${totalPrice.toFixed(2)}</span>
                </h4>
            </div>
        </div>
    );
};

export default OrderSummary;
