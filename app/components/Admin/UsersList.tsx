"use client";

import React, { useEffect, useState } from "react";

interface UserType {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: "user" | "admin";
}

export default function UsersList() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data.users || []); // Ensure we always get an array
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    // Make user admin
    const handleMakeAdmin = async (id: string) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: "admin" }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error(data.message);
                return;
            }

            // Update frontend state
            setUsers((prev) =>
                prev.map((user) =>
                    user._id === id ? { ...user, role: "admin" } : user
                )
            );
        } catch (err) {
            console.error("Error making admin:", err);
        }
    };

    // Delete user
    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (!res.ok) {
                console.error(data.message);
                return;
            }

            // Remove user from frontend state
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (loading) return <p className="p-5">Loading users...</p>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Users List</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td className="p-2 border">{index + 1}</td>
                                <td className="p-2 border">{user.name}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.phone || "-"}</td>
                                <td className="p-2 border">{user.role}</td>
                                <td className="p-2 border flex gap-2">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => handleMakeAdmin(user._id)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded"
                                        disabled={user.role === "admin"}
                                    >
                                        {user.role === "admin" ? "Admin" : "Make Admin"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
