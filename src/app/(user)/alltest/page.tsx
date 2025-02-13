import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import AllTest from "./components/alltest";


export const metadata: Metadata = {
    title: "All Test",
    description: "All test for EduSource",
};

export default function Home() {
    return (
        <div>
            <AllTest />
        </div>
    )
}