"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role"); // store role after login
        if (!token || role !== "admin") {
            router.replace("/not-authorized");
        }
    }, [router]);

    return (
        <div className="p-10 bg-gray-900 text-white">
            <Navbar />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p>Only accessible by admin users.</p>
        </div>
    );
}
