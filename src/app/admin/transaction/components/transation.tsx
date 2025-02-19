import React from "react"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
export default function Transaction() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Thống kê giao dịch" />
            <div className="space-y-6">
                <ComponentCard title="Thông tin chuyển khoản">
                    <BasicTableOne />
                </ComponentCard>
            </div>
        </div>
    )
} 