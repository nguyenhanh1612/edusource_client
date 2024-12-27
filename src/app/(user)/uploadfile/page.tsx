import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import UploadFile from "./components/uploadfile";

export const metadata: Metadata = {
    title: "Upload File",
    description: "Upload file for EduSource",
};

export default function Home() {
    return (
        <div>
            <UploadFile />
        </div>
    )
}