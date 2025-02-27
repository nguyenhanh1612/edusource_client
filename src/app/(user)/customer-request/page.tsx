"use client";

import ListAllCustomerRequestPage from "./components/ListAllCustomerRequest";

export default function CustomerRequestPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Requests</h2>
            <ListAllCustomerRequestPage />
        </div>
    );
}
