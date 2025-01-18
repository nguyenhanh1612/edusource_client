"use client";

import { Backdrop } from "@/components/backdrop";
import { useEffect } from "react";
import useVerifyChangeEmail from "../hooks/useVerifyChangeEmail";

export default function ActiveVerifyChangeEmail({
    children,
    userId,
}: Readonly<{
    children: React.ReactNode;
    userId: string;
}>) {
    const { isPending, verifyChangeEmail } = useVerifyChangeEmail();

    useEffect(() => {
        verifyChangeEmail({ userId: userId });
    }, []);

    return (
        <div>
            <main>{children}</main>
            <Backdrop open={isPending} />
        </div>
    );
}
