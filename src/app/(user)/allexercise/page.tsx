import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

import AllExercise from "./components/allexercise";


export const metadata: Metadata = {
    title: "All Exercise",
    description: "All exercise for EduSource",
};

export default function Home() {
    return (
        <div>
            <AllExercise />
        </div>
    )
}