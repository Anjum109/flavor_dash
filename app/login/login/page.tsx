"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                // Save JWT to localStorage
                localStorage.setItem("token", data.token);

                // Redirect to home page
                window.location.href = "/";
            }
        } catch (err) {
            setError("Server error");
        }
    };


    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full  p-2 rounded outline-none" required />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full  p-2 rounded outline-none" required />
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
                    </form>
                    <p className="mt-2">Don't have an account? <Link href='/login/register'><span className="text-blue-700">Register here</span></Link></p>
                </div>
            </div>
        </div>
    );
}
