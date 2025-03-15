"use client";

import ListAllCustomerRequestPage from "./components/ListAllCustomerRequest";

export default function CustomerRequestPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Customer Requests</h2>
            <ListAllCustomerRequestPage />
        </div>
    );
}
