"use client";
import React, { useState, useEffect, useRef } from "react";
import { VscBellDot } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";
import Link from "next/link";
import useLogout from "@/hooks/use-logout";
import { closeSidebar, openSidebar } from "@/stores/difference-slice";
import { AlignJustify } from "lucide-react";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import NotificationDropdown from "../right-header-admin/NotificationDropdown";
import UserDropdown from "../right-header-admin/UserDropdown";
import { CiAlignLeft } from "react-icons/ci";

export default function AdminHeader() {
    const userState = useAppSelector((state) => state.userSlice);
    const staffState = useAppSelector((state) => state.differenceSlice.staff);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { addToast } = useToast();
    const { handleLogout } = useLogout();
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleToggleSidebar = () => {
        return staffState.openSidebar
            ? dispatch(closeSidebar())
            : dispatch(openSidebar());
    };

    useEffect(() => {
        if (isLoggingOut) return;
    
        if (!userState?.user) {
            router.replace("/login");
        } else if (userState?.user?.roleId !== 1) {
            router.replace("/");
            addToast({
                type: "error",
                description: "Sorry, you do not have permission to access this page.",
                duration: 5000,
            });
        }
    }, [userState, router, addToast, isLoggingOut]);
    


    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <header className="bg-white py-4 px-6 border-gray-200 lg:border-b flex items-center justify-between ">
            <div className="flex items-center gap-4 ">
                <button onClick={handleToggleSidebar} className="border border-gray-200 rounded-md p-2">
                    <CiAlignLeft className="text-2xl" />
                </button>
                <div className="relative w-80">
                    <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                        <svg
                            className="fill-gray-500 dark:fill-gray-400"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                fill=""
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search or type command..."
                        className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10"
                    />
                    <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                        <span> ⌘ </span>
                        <span> K </span>
                    </button>
                </div>
            </div>

            <div
                className={`${isApplicationMenuOpen ? "flex" : "hidden"
                    } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
            >
                <div className="flex items-center gap-2 2xsm:gap-3">
                    <NotificationDropdown />
                </div>
                <UserDropdown setIsLoggingOut={setIsLoggingOut} />

            </div>
        </header>
    );
}
