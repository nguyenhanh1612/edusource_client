"use client";
import ReviewProduct from '@/components/review-product'
import { useRouter } from 'next/navigation';

import React from 'react'

function ShoppingCart() {

    const router = useRouter()
    
    return (
        <div className="font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Shopping Cart</h1>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
                <ReviewProduct />
                <div className="bg-gray-100 rounded-md p-4 h-max">
                    <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>
                    <ul className="text-gray-800 mt-6 space-y-3">
                        <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">$200.00</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-bold">$2.00</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">$4.00</span></li>
                        <hr className="border-gray-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">$206.00</span></li>
                    </ul>

                    <div className="mt-6 space-y-3">
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md" onClick={() => router.push('/checkout')}>Checkout</button>
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
