import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Purchased from "./components/purchaed";

export const metadata: Metadata = {
    title: "Product Purchased",
    description: "Product purchased for EduSource",
};

export default function Home() {
    return (
        <div>
            <Purchased />
        </div>
    )
}