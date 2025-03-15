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
            description: "Giao dịch thành công!",
            duration: 3500,
        });
        
        const storedProductIds = localStorage.getItem("pendingCheckoutItems");
        if (storedProductIds) {
            const paidProductIds = JSON.parse(storedProductIds);
            dispatch(removePaidItems({ productIds: paidProductIds }));
            localStorage.removeItem("pendingCheckoutItems");
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
