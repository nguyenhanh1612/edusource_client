"use client";

import { useEffect, useState } from "react";
import { notification, Table } from "antd";
import { HiringPost } from "@/services/customer_request/definition";
import { ColumnsType } from "antd/es/table";
import { fetchHiringPostsAPI } from "@/services/customer_request/api-service";

const Page = () => {
    const [data, setData] = useState<HiringPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadHiringPost = async () => {
            try {
                const res = await fetchHiringPostsAPI();
                setData(res);
            } catch (e) {
                notification.error({
                    message: "Cannot load hiring posts"
                })
            }
            loadHiringPost();
        }
    }, []);

    const columns: ColumnsType<HiringPost> = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
        { title: "Staff Name", dataIndex: "staffName", key: "staffName" },
        { title: "Requirement Category", dataIndex: "requirementCate", key: "requirementCate" },
    ];

    return (<><div>
        <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
    </div></>);
};

export default Page;
