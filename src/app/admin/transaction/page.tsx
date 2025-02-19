import React from 'react'
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Transaction from './components/transation';


export const metadata: Metadata = {
    title: "Transaction Statistics",
    description: "Transaction statistics page for EduSource",
};
export default function TransactionPage() {
    return (
        <div>
            <Transaction />
        </div>
    )
}
