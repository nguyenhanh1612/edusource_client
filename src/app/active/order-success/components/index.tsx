"use client";

import useToast from "@/hooks/use-toast";
import { resetCart } from "@/stores/cart-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function OrderSuccessComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { addToast } = useToast();
    const dispatch = useDispatch();
    useEffect(() => {
        addToast({
            type: "success",
            description:
                "The transaction is successful, the lessor will contact you soon, please wait",
            duration: 3500,
        });
        dispatch(resetCart());
    }, []);

    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
