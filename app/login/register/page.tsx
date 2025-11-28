"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user", // default role
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password !== form.confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                setSuccess("User registered successfully!");
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    role: "user",
                });

                router.push("/login/login"); // redirect to home
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center  p-4">

                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {success && <p className="text-green-500 mb-2">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full outline-none p-2 rounded" required />
                        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full outline-none p-2 rounded" required />
                        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full outline-none p-2 rounded" required />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full outline-none p-2 rounded" required />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full outline-none p-2 rounded" required />
                        <select name="role" value={form.role} onChange={handleChange} className="w-full outline-none p-2 rounded">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register</button>
                    </form>
                    <p className="mt-2">Already have an account? <Link href='/login/login'><span className="text-blue-700">Login here</span></Link></p>
                </div>
            </div>
        </div>
    );
}
