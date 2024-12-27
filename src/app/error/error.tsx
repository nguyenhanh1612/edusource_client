"use client";
import Link from 'next/link';
import React from 'react';

export default function Error() {
    return (
        <div className="bg-gradient-to-r from-teal-400 to-green-200 h-screen w-screen flex items-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl h-3/4 mx-auto flex flex-col md:flex-row items-center justify-center text-gray-700">
                <div className="max-w-md text-center md:text-left">
                    <div className="text-9xl font-bold text-teal-400">404</div>
                    <p className="text-2xl md:text-3xl font-light leading-normal">
                        Sorry, we couldn't find this page.
                    </p>
                    <p className="mb-8">
                        But don't worry, you can find plenty of other things on our homepage.
                    </p>

                    <Link href="/" className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                        Back to homepage
                    </Link>
                </div>
                <div className="max-w-lg mt-8 md:mt-0">
                    <img
                        src="/images/error.png" 
                        alt="404 Illustration"
                        width="400"
                    />
                </div>
            </div>
        </div>
    );
}
