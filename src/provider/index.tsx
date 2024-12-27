"use client";

import dynamic from "next/dynamic";
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
                <GoogleOAuthProvider clientId="993818907153-7sre2c2eu9psctd7h253phjlif4ssokk.apps.googleusercontent.com">
                    <Message>{children}</Message>
                </GoogleOAuthProvider>
            </ReactQueryProvider>
        </StoreProvider>
    );
}
