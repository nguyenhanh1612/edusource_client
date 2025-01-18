import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import ChangePasswordSuccess from "./components/changepasswordsuccess";


export const metadata: Metadata = {
    title: "Change Password",
    description: "Change Password for EduSource",
};

export default function Home() {
    return (
        <div>
            <ChangePasswordSuccess />
        </div>
    )
}