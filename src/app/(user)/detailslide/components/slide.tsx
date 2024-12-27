"use client";
import { Backdrop } from "@/components/backdrop";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SlideData {
  slideId: string;
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  features: string[];
}

interface ViewDetailSlideProps {
  slideId: string;
}

const mockData: SlideData[] = [
  {
    slideId: "1",
    title: "Bài giảng Family and Friends 2",
    subtitle: "(phiên bản 15 bài)",
    image: "https://example.com/image1.jpg",
    rating: 5.0,
    features: ["15 đơn vị", "Bảng câu hỏi kỹ năng"],
  },
  {
    slideId: "2",
    title: "Bài giảng Tiếng Anh 4",
    subtitle: "(phiên bản 20 bài)",
    image: "https://example.com/image2.jpg",
    rating: 4.8,
    features: ["20 đơn vị", "Bảng kiểm tra kiến thức"],
  },
  {
    slideId: "3",
    title: "Bài giảng Tiếng Anh 5",
    subtitle: "(phiên bản 25 bài)",
    image: "https://example.com/image3.jpg",
    rating: 4.7,
    features: ["25 đơn vị", "Bảng bài tập nâng cao"],
  },
];

export default function DetailSlide({ slideId }: ViewDetailSlideProps) {
  const [slideData, setSlideData] = useState<SlideData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSlideDetails = async () => {
      const selectedSlide = mockData.find((slide) => slide.slideId === slideId);

      if (selectedSlide) {
        setSlideData(selectedSlide);
      } else {
        router.push("/error");
      }

      setLoading(false);
    };

    fetchSlideDetails();
  }, [slideId, router]);

  if (loading) {
    return <Backdrop open={loading} />;
  }

  if (!slideData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Slide not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative flex flex-col rounded-xl bg-white shadow-lg">
        <img
          src={slideData.image}
          alt={slideData.title}
          className="rounded-t-xl w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{slideData.title}</h1>
          <h2 className="text-lg text-gray-700">{slideData.subtitle}</h2>
          <p className="flex items-center gap-2 text-yellow-600 font-medium mt-4">
            <span>Rating:</span> {slideData.rating} / 5
          </p>
          <ul className="mt-4 space-y-2">
            {slideData.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                - {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
