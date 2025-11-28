"use client";

import { useState, useEffect } from "react";
import { advent_pro, monoton } from "@/font/font";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/logo/favicon.png";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null); // Add this
    // Check login status only on the client
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role"); // Get role from localStorage
        if (token) {
            setIsLoggedIn(true);
            setUserRole(role); // set role
        } else {
            setIsLoggedIn(false);
            setUserRole(null); // works now
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login/login");
    };

    return (
        <div className="py-5 px-5 md:px-20 text-white relative">
            <div className="flex justify-between items-center w-full">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <Image src={logo} alt="logo" className="z-10 w-[40px]" />
                    <h1 className="text-2xl md:text-3xl">
                        <span className={monoton.className}>Flavor Dash</span>
                    </h1>
                </div>

                {/* DESKTOP MENU */}
                <div className={`hidden md:block ${advent_pro.className}`}>
                    <ul className="flex gap-6 items-center text-[20px] underline">
                        <li className="cursor-pointer hover:text-amber-300 duration-700">Home</li>
                        <li className="cursor-pointer hover:text-amber-300 duration-700">Pages</li>
                        <li className="cursor-pointer hover:text-amber-300 duration-700">Restaurant List</li>
                        <li className="cursor-pointer hover:text-amber-300 duration-700">Shop</li>
                        <li className="cursor-pointer hover:text-amber-300 duration-700">Contact Us</li>
                    </ul>
                </div>

                {/* DESKTOP ICONS */}
                <div className="hidden md:flex items-center gap-4 text-[25px]">
                    <button><CgProfile /></button>
                    <button><FaShoppingCart /></button>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="text-[20px] border-2 px-3 py-1 rounded-full border-amber-600 bg-amber-800">
                            <span className={advent_pro.className}>Logout</span>
                        </button>
                    ) : (
                        <Link href="/login/login" className="text-[20px] border-2 px-3 py-1 rounded-full border-amber-600 bg-amber-800">
                            <span className={advent_pro.className}>Login</span>
                        </Link>
                    )}
                </div>

                {/* MOBILE MENU BUTTON */}
                <button className="md:hidden text-3xl" onClick={() => setOpen(true)}>
                    <HiMenu />
                </button>
            </div>

            {/* MOBILE SLIDE MENU */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-red-950 bg-opacity-80 backdrop-blur-md transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-500 ease-out z-50`}
            >
                {/* CLOSE BUTTON */}
                <div className="p-5 flex justify-end">
                    <button onClick={() => setOpen(false)} className="text-3xl">
                        <HiX />
                    </button>
                </div>

                {/* MENU ITEMS */}
                <ul className={`${advent_pro.className} flex flex-col gap-6 p-6 text-lg`}>
                    <li className="cursor-pointer hover:text-amber-300 duration-700">Home</li>
                    <li className="cursor-pointer hover:text-amber-300 duration-700">Pages</li>
                    <li className="cursor-pointer hover:text-amber-300 duration-700">Restaurant List</li>
                    <li className="cursor-pointer hover:text-amber-300 duration-700">Shop</li>
                    <li className="cursor-pointer hover:text-amber-300 duration-700">Contact Us</li>

                    <div className="flex items-center gap-4 text-[25px] pt-4 border-t border-white/30">
                        <button><CgProfile /></button>
                        <button><FaShoppingCart /></button>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="text-lg border-2 px-2 py-1 rounded">
                                Logout
                            </button>
                        ) : (
                            <Link href="/login/login" className="text-lg border-2 px-2 py-1 rounded">
                                Login
                            </Link>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
}
