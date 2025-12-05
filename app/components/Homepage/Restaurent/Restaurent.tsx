"use client";

import React, { useEffect, useState } from "react";

interface RestaurantType {
    _id: string;
    name: string;
    coverImage?: string; // base64 or URL if uploaded
}

export default function Restaurent() {
    const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
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

    if (loading) return <p className="p-5">Loading restaurants...</p>;

    return (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {restaurants.length === 0 ? (
                <p>No restaurants found.</p>
            ) : (
                restaurants.map((rest) => (
                    <div key={rest._id} className="">
                        <img
                            src={rest.coverImage || "/placeholder.jpg"}
                            alt={rest.name}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="mt-2 text-lg font-semibold">{rest.name}</h3>
                    </div>
                ))
            )}
        </div>
    );
}
