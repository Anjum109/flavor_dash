"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { advent_pro } from "@/font/font";
import UsersList from "@/app/components/Admin/UsersList";
import AddRestaurents from "@/app/components/Admin/AddRestaurents";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("users"); // track which tab is active

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role !== "admin") {
            router.replace("/not-authorized");
        }
    }, [router]);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="h-[1px] bg-gray-100" />
            <h1 className="text-3xl font-bold text-center mt-3">
                <span className={advent_pro.className}>Admin Dashboard</span>
            </h1>
            <p className="text-[10px] text-center">
                <span className={advent_pro.className}>Only accessible by admin users.</span>
            </p>
            <div className="w-full flex mt-5 h-[1000px]">
                {/* Sidebar */}
                <div className="w-[20%] border-r-2 p-5">
                    <ul className={advent_pro.className}>
                        <li
                            className={`w-full mb-1 p-2 font-bold cursor-pointer ${activeTab === "users"
                                ? "bg-amber-200 text-black"
                                : "bg-gray-300 text-black hover:bg-amber-200 duration-1000"
                                }`}
                            onClick={() => setActiveTab("users")}
                        >
                            Users List
                        </li>
                        <li
                            className={`w-full mb-1 p-2 font-bold cursor-pointer ${activeTab === "addRestaurent"
                                ? "bg-amber-200 text-black"
                                : "bg-gray-300 text-black hover:bg-amber-200 duration-1000"
                                }`}
                            onClick={() => setActiveTab("addRestaurent")}
                        >
                            Add Restaurent
                        </li>
                    </ul>
                </div>

                {/* Right Side Content */}
                <div className="w-[80%] p-5">
                    {activeTab === "users" && <UsersList />}
                    {activeTab === "addRestaurent" && <AddRestaurents />}
                </div>
            </div>
        </div>
    );
}
