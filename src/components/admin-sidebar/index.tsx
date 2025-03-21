"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Building, Users, Coins, ChevronDown, Menu } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/stores/store";
import { closeSidebar, openSidebar } from "@/stores/difference-slice";
import { CiAlignLeft } from "react-icons/ci";
export default function AdminSidebar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const staffState = useAppSelector((state) => state.differenceSlice.staff);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                dispatch(closeSidebar());
            } else {
                dispatch(openSidebar());
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    const toggleDropdown = (dropdown: string) =>
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);

    return (
        <>

            {isMobile && (
                <button
                    onClick={() => dispatch(staffState.openSidebar ? closeSidebar() : openSidebar())}
                    className="fixed top-4 left-6 z-50 p-2 bg-gray-800 text-white rounded-md"
                >
                    <CiAlignLeft size={26} />
                </button>
            )}


            {staffState.openSidebar && isMobile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => dispatch(closeSidebar())}></div>
            )}


            <aside
                className={`fixed lg:static z-50 h-screen bg-gray-900 text-white transition-all duration-300 
          ${isMobile ? (staffState.openSidebar ? "w-72" : "w-0 overflow-hidden") : staffState.openSidebar ? "w-72" : "w-20"}`
                }
            >
                <div className="p-4 w-full">
                    <ul className="space-y-1">
                        {staffState.openSidebar && (
                            <li className="pt-4 text-sm font-semibold text-gray-400">ADMIN</li>
                        )}

                        <li>
                            <button
                                onClick={() => toggleDropdown("dashboard")}
                                className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded-md"
                            >
                                <Link href="/admin/dashboard" className="flex items-center space-x-2">
                                    <LayoutDashboard className="size-5" />

                                    <span className={`${staffState.openSidebar || isMobile ? "block" : "hidden"}`}>Dashboard</span>
                                </Link>
                                {staffState.openSidebar && !isMobile && (
                                    <ChevronDown
                                        className={`size-4 transition-transform ${openDropdown === "dashboard" ? "rotate-180" : ""} text-gray-400`}
                                    />
                                )}
                            </button>

                            {openDropdown === "dashboard" && staffState.openSidebar && !isMobile && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    <li>
                                        <Link href="/admin/user-donate" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md">
                                            <Coins className="size-5" />
                                            <span>All users donation</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <Link href="/admin/transaction" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
                                <Building className="size-5" />

                                <span className={`${staffState.openSidebar || isMobile ? "block" : "hidden"}`}>Thống kê giao dịch</span>
                            </Link>
                        </li>

                        {/* <li>
                            <Link href="/admin/manage-users" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md">
                                <Users className="size-5" />

                                <span className={`${staffState.openSidebar || isMobile ? "block" : "hidden"}`}>Quản lí người dùng</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </>
    );
}
