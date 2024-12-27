import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import DetailSlide from "@/app/(user)/detailslide/components/slide";


export const metadata: Metadata = {
    title: "Slide Detail",
    description: "Slide detail for EduSource",
};

export default function ViewProfileCatPage({ params }: any) {
    return (
        <div className="w-full">
            <DetailSlide slideId={params?.slideid}/>
        </div>
    );
}
