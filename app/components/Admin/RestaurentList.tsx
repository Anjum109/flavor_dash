"use client";

import React, { useEffect, useState } from "react";

interface Restaurant {
    _id: string;
    name: string;
    coverImage?: string;
}

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const res = await fetch("/api/restaurents");
            const data = await res.json();
            setRestaurants(data.restaurants || []);
        } catch (err) {
            console.error("Failed to fetch restaurants:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: string) => {
        // Navigate to edit page or open modal
        console.log("Edit restaurant with ID:", id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this restaurant?")) return;
        try {
            const res = await fetch(`/api/restaurents/${id}`, { method: "DELETE" });
            if (res.ok) {
                setRestaurants(restaurants.filter((r) => r._id !== id));
                alert("Restaurant deleted successfully");
            } else {
                alert("Failed to delete restaurant");
            }
        } catch (err) {
            console.error("Error deleting restaurant:", err);
            alert("Error deleting restaurant");
        }
    };

    if (loading) return <p>Loading restaurants...</p>;
    if (restaurants.length === 0) return <p>No restaurants found.</p>;

    return (<div className="p-5"> <h2 className="text-2xl font-bold mb-4">Restaurant List</h2> <table className="min-w-full border border-gray-300"> <thead>
        <tr className="">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Cover Image</th>
            <th className="border px-4 py-2">Actions</th> </tr> </thead> <tbody>
            {restaurants.map((r, index) => (<tr key={r._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{r.name}</td>
                <td className="border px-4 py-2 flex justify-center">
                    {r.coverImage ? (<img
                        src={r.coverImage}
                        alt={r.name}
                        className="w-20 h-20 object-cover"
                    />
                    ) : (
                        "No Image"
                    )} </td>
                <td className="border px-4 py-2">
                    <button
                        onClick={() => handleEdit(r._id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded h-full w-full"
                    >
                        Edit </button>
                    <button
                        onClick={() => handleDelete(r._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded h-full w-full"
                    >
                        Delete </button> </td>
            </tr>
            ))} </tbody> </table> </div>
    );
}
