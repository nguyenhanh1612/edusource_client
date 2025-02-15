import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import AllPowerpoint from "./components/allpowerpoint";


export const metadata: Metadata = {
    title: "All PowerPoint",
    description: "All powerpoint for EduSource",
};

export default function Home() {
    return (
        <div>
            <AllPowerpoint />
        </div>
    )
}