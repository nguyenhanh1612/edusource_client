"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RootState, useAppSelector } from "@/stores/store";
import AvatarMenu from "@/components/avatar-menu";
import TippyHeadless from "@tippyjs/react/headless";
import { IoMdCart } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BookDropdown } from "@/components/book-carousel";
import useGetAllBook from "./useGetAllBook";
import { Roles } from "@/const/authentication";

const Header: React.FC = () => {
  const userState = useAppSelector((state) => state.userSlice);
  const totalItems = useAppSelector((state) => state.cartSlice.totalItems);

  const currentPath = usePathname();

  const { isPending, getAllBookApi } = useGetAllBook();
  const [books, setBooks] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(1);
  const router = useRouter();

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

  console.log("User state:", userState.user);

  const handleNavigateToCart = () => {
    if (!userState.user) {
      router.push("/login");
    } else {
      router.push("/shoppingcart");
    }
  };

  const handleNavigate = () => {
    router.push("/")
  };
  
  return (
    <header className="flex items-center justify-between px-8 bg-white rounded-full fixed top-0 left-0 right-0 z-50 shadow-lg max-w-[1500px] mx-auto mt-6">
      <div className="flex items-center">
        <img src="/images/logo1.png" alt="Logo" className="h-24" onClick={handleNavigate}/>
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
        {!(userState.user?.roleId === Roles[2].id) && (
          <div className="relative">
            <IoMdCart className="text-2xl" onClick={handleNavigateToCart}/>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        )}
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
