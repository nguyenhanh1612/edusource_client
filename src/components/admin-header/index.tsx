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

export default function AdminHeader() {
    const userState = useAppSelector((state) => state.userSlice);
    const staffState = useAppSelector((state) => state.differenceSlice.staff);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { addToast } = useToast();
    const { handleLogout } = useLogout();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleToggleSidebar = () => {
        return staffState.openSidebar
            ? dispatch(closeSidebar())
            : dispatch(openSidebar());
    };

    useEffect(() => {
        if (userState?.user?.roleId !== 1) {
            router.push("/");
            addToast({
                type: "error",
                description: "Sorry, you do not have permission to access this page.",
                duration: 5000,
            });
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [userState, router, addToast]);

    return (
        <header className="bg-white py-4 px-6 border-gray-200 lg:border-b flex items-center justify-between">
            <button onClick={handleToggleSidebar}>
                <AlignJustify />
            </button>

            <div className="relative" ref={dropdownRef}>
                <img
                    id="avatarButton"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full cursor-pointer select-none"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User dropdown"
                />
                {dropdownOpen && (
                    <div
                        id="userDropdown"
                        className="z-30 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>Admin</div>
                            <div className="font-medium truncate">admin@pawfund.com</div>
                        </div>
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="avatarButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Earnings
                                </a>
                            </li>
                        </ul>
                        <div className="py-1" onClick={handleLogout}>
                            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Sign out
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
