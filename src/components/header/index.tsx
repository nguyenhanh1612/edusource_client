"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/stores/store";
import AvatarMenu from "@/components/avatar-menu";
import TippyHeadless from "@tippyjs/react/headless";
import { IoMdCart } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BookDropdown } from "@/components/book-carousel";



const Header: React.FC = () => {
  const userState = useAppSelector((state) => state.userSlice);

  // const userState = {
  //   user: {
  //     cropAvatarLink: "https://randomuser.me/api/portraits/men/85.jpg", // Hình ảnh đại diện giả
  //   },
  // };

  const currentPath = usePathname();

  const [avatarTooltip, setAvatarTooltip] = useState<boolean>(false);
  const [bookDropdown, setBookDropdown] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const toggleDropdown = () => setBookDropdown(!bookDropdown);

  const handleToggleAvatarTooltip = () => {
    setAvatarTooltip((prev) => !prev);
  };

  const handleCloseAvatarTooltip = () => {
    setAvatarTooltip(false);
  };

  const books = {
    1: {
      "Family & Friends": [
        { title: "Family and Friends 1", image: "/images/book1.png" },
        { title: "Family and Friends 2", image: "/images/book2.png" },
        { title: "Family and Friends 3", image: "/images/book3.png" },
        { title: "Family and Friends 4", image: "/images/book4.png" },
      ],
      "Global Success": [
        { title: "Global Success 1", image: "/images/gs1.png" },
        { title: "Global Success 2", image: "/images/gs2.png" },
        { title: "Global Success 3", image: "/images/gs3.png" },
        { title: "Global Success 4", image: "/images/gs4.png" },
      ],
    },
    2: {
      "Global Success": [
        // { title: "Global Success 1", image: "/images/book5.png" },
        // { title: "Global Success 2", image: "/images/book6.png" },
        // { title: "Global Success 3", image: "/images/book7.png" },
        // { title: "Global Success 4", image: "/images/book8.png" },
      ],
    },
    3: {
      "Cambridge English": [
        // { title: "Cambridge 1", image: "/images/book9.png" },
        // { title: "Cambridge 2", image: "/images/book10.png" },
        // { title: "Cambridge 3", image: "/images/book11.png" },
      ],
    },
    4: {
      "Oxford English": [
        // { title: "Oxford 1", image: "/images/book12.png" },
        // { title: "Oxford 2", image: "/images/book13.png" },
        // { title: "Oxford 3", image: "/images/book14.png" },
      ],
    },
    5: {
      "IELTS Preparation": [
        // { title: "IELTS 1", image: "/images/book15.png" },
        // { title: "IELTS 2", image: "/images/book16.png" },
        // { title: "IELTS 3", image: "/images/book17.png" },
      ],
    },
  };
  
  

  return (
    <header className="flex items-center justify-between px-12 py-8 bg-white">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="h-14" />
      </div>
      <nav className="flex items-center space-x-20">
        <Link
          href="/"
          className={`text-gray-600 ${currentPath === "/" ? "text-teal-400" : "hover:text-teal-400"
            }`}
        >
          Trang chủ
        </Link>
        <Link
          href="/aboutus"
          className={`text-gray-600 ${currentPath === "/aboutus" ? "text-teal-400" : "hover:text-teal-400"
            }`}
        >
          Về chúng tôi
        </Link>
        <Link
          href="/contact"
          className={`text-gray-600 ${currentPath === "/adopt" ? "text-teal-400" : "hover:text-teal-400"
            }`}
        >
          Liên hệ
        </Link>
        <div>
          <BookDropdown books={books}/>
        </div>

      </nav>
      <div className="flex items-center space-x-6">
        <IoMdCart className="text-2xl" />
        {userState.user === null ? (
          <Link
            href="/login"
            className={`text-gray-600 ${currentPath === "/login" ? "text-teal-400" : "hover:text-teal-400"
              }`}

          >
            Đăng nhập
          </Link>
        ) : (
          <div className="relative">
            <TippyHeadless
              interactive
              placement="bottom-end"
              offset={[-5, 2]}
              visible={avatarTooltip}
              render={(attrs) => (
                <div
                  {...attrs}
                  className="w-full max-h-[calc(min((100vh-96px)-60px),734px)] min-h-[30px] py-2 rounded-md bg-white z-[999999]"
                >
                  <AvatarMenu onCloseTooltip={handleCloseAvatarTooltip} />
                </div>
              )}
              onClickOutside={handleCloseAvatarTooltip}
            >
              <figure className="rounded-full border border-zinc-300 overflow-hidden w-14 h-14 flex items-center justify-center hover:bg-teal-400">

                {userState?.user?.cropAvatarLink !== "" && (
                  <img
                    id="avatarButton"
                    onClick={handleToggleAvatarTooltip}
                    className="w-12 h-12 rounded-full cursor-pointer"
                    src={
                      userState?.user?.cropAvatarLink ||
                      "images/unknown_avatar.png"
                    }
                    alt="User dropdown"
                  />
                )}
              </figure>
            </TippyHeadless>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
