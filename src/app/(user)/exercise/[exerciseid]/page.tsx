import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import DetailExercise from "../components/exercise";


export const metadata: Metadata = {
    title: "Exercise Detail",
    description: "Exercise detail for EduSource",
};

export default function ViewDetailExcerciseProps({ params }: any) {

    return (
        <div className="w-full">
            <DetailExercise exerciseId={params?.exerciseid} />
        </div>
    );
}
