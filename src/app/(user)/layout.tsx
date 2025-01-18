'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import { usePathname, useRouter } from "next/navigation";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname === "/thankyou" || pathname === "/change-password-success";

    return (
        <div>
            {!hideHeaderFooter && <Header />}
            <main>
                {children}
            </main>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
}
