"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function AuthCarousel() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="absolute w-full h-[100vh]">
            <Image
              src={"/images/login01.jpg"}
              alt="Authen01"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative top-[60%]">
              <p className="text-3xl leading-normal text-gray-50 text-center font-montserrat_alternates">
                Log in to bring hope to abandoned cats
                <br />
                Help us find them a warm home
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="relative w-full h-[100vh]">
            <Image
              src={"/images/login02.jpg"}
              alt="Authen02"
              layout="fill"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative top-[60%]">
              <p className="text-3xl leading-normal text-gray-50 text-center font-montserrat_alternates">
                Amid life’s stress, a cat brings calm and joy
                <br />
                Adopt one and discover your peace!
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
