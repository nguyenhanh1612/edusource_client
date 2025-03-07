"use client";
import useToast from "@/hooks/use-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removePaidItems } from "@/stores/cart-slice";
import { useRouter } from "next/navigation";

export default function OrderSuccessComponent({ children }: { children: React.ReactNode }) {
    const { addToast } = useToast();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        addToast({
            type: "success",
            description: "Giao dịch thành công! Đơn hàng của bạn sẽ sớm được xử lý.",
            duration: 3500,
        });

        const query = new URLSearchParams(window.location.search);
        const paidProductIds = query.get("productIds")?.split(",") || [];

        if (paidProductIds.length > 0) {
            dispatch(removePaidItems({ productIds: paidProductIds }));
        }

        setTimeout(() => {
            router.push("/");
        }, 4000);
    }, []);

    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
