"use client";

import dynamic from "next/dynamic";
// import GlobalContent from "@/provider/global-content";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Message from "../components/message/message";

const StoreProvider = dynamic(
    () => import("@/provider/redux-provider").then((mod) => mod.StoreProvider),
    {
        ssr: false,
    }
);

const ReactQueryProvider = dynamic(
    () => import("@/provider/query-provider").then((mod) => mod.default),
    { ssr: false }
);

export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <ReactQueryProvider>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID || ""}>
                    <Message>{children}</Message>
                </GoogleOAuthProvider>
            </ReactQueryProvider>
        </StoreProvider>
    );
}