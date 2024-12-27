import HomePage from "@/app/(user)/homepage/home-page";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
    title: "Home Page",
    description: "Home page for EduSource",
};

export default function Home() {
    return (
        <div>
            <HomePage />
        </div>
    )
}