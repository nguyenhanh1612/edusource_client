import React from "react"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TableUsers from "@/components/tables/TableUsers";
export default function ManageUsers() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Quản lí người dùng" />
            <div className="space-y-6">
                <ComponentCard title="Thông tin người dùng">
                    <TableUsers />
                </ComponentCard>
            </div>
        </div>
    )
}