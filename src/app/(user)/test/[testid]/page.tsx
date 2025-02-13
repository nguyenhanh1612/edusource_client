import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Test from "../components/test";

export const metadata: Metadata = {
    title: "Exercise Detail",
    description: "Exercise detail for EduSource",
};

export default function ViewDetailTestProps({ params }: any) {

    return (
        <div className="w-full">
            <Test testId={params?.testid} />
        </div>
    );
}
