import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import CheckOut from "./components/checkout";


export const metadata: Metadata = {
    title: "Checkout",
    description: "Checkout for EduSource",
};

export default function Home() {
    return (
        <div>
            <CheckOut />
        </div>
    )
}