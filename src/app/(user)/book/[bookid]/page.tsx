import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import BookDetail from "../components/bookdetail";

export const metadata: Metadata = {
    title: "Detail Book",
    description: "Detail book for EduSource",
};

export default function Book({ params }: any) {
    return (
        <div>
            <BookDetail bookId={params?.bookid}/>
        </div>
    )
}