"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/stores/store";
import AvatarMenu from "@/components/avatar-menu";
import TippyHeadless from "@tippyjs/react/headless";
import { IoMdCart } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BookDropdown } from "@/components/book-carousel";
import useGetAllBook from "./useGetAllBook";

const Header: React.FC = () => {
  const userState = useAppSelector((state) => state.userSlice);

  // const userState = {
  //   user: {
  //     cropAvatarLink: "https://randomuser.me/api/portraits/men/85.jpg", // Hình ảnh đại diện giả
  //   },
  // };

  const currentPath = usePathname();

  const { isPending, getAllBookApi } = useGetAllBook();
  const [books, setBooks] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBookApi({ pageIndex: activeTab, pageSize: 10 });
      if (data) {
        setBooks(data.value.data.items);
        setTotalPages(data.value.data.totalPages);
      }
    };
  
    if (activeTab) {
      fetchBooks();
    }
  }, [activeTab]); 
  

  const [avatarTooltip, setAvatarTooltip] = useState<boolean>(false);
  const [bookDropdown, setBookDropdown] = useState<boolean>(false);

  const toggleDropdown = () => setBookDropdown(!bookDropdown);


  const handleToggleAvatarTooltip = () => {
    setAvatarTooltip((prev) => !prev);
  };

  const handleCloseAvatarTooltip = () => {
    setAvatarTooltip(false);
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
          <BookDropdown books={books} activeTab={activeTab} setActiveTab={setActiveTab} totalPages={totalPages} />
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
