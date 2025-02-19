import React from 'react'
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import ManageUsers from './components/manageusers';

export const metadata: Metadata = {
    title: "Manage users",
    description: "Manage users page for EduSource",
};
export default function ManageUsersPage() {
    return (
        <div>
            <ManageUsers />
        </div>
    )
}
