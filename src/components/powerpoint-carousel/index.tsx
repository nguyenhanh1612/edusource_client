// import * as React from "react"

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// export function PowerPoint() {
//   return (
//     <Carousel className="w-full max-w-xl">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
//                   <img src="/images/home11.png" alt="" />
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

export default function PowerPoint() {
  return (
    <div className="flex justify-center items-center h-fit bg-white w-fit">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-96 h-96"
      >
        {[...Array(5)].map((_, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center rounded-lg bg-gray-800 text-white text-xl font-bold">
            <img src={`/images/home11.png`} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


