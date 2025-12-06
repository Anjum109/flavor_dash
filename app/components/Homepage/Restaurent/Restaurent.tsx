"use client";

import { advent_pro } from "@/font/font";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

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

            // Reverse so latest restaurant comes first
            const sorted = (data.restaurants || []).reverse();

            setRestaurants(sorted);
        } catch (err) {
            console.error("Failed to fetch restaurants:", err);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <p className="p-5">Loading restaurants...</p>;

    return (
        <div className="mt-5">
            <p className="text-center text-4xl py-5 border-t-2 border-amber-300"><span className={advent_pro.className}>All Restaurents</span></p>
            <div className="mx-5 lg:mx-32 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {restaurants.length === 0 ? (
                    <p>No restaurants found.</p>
                ) : (
                    restaurants.map((rest) => (
                        <div
                            key={rest._id}
                            className="
    border-2 border-amber-100 
    rounded-l-4xl rounded-r-4xl pb-5
    shadow-[8px_8px_15px_rgba(0,0,0,0.15)]
  "
                        >

                            <img
                                src={rest.coverImage || "/placeholder.jpg"}
                                alt={rest.name}
                                className="w-full h-40 object-cover rounded-tl-4xl rounded-tr-4xl"
                            />
                            <div className="flex justify-between items-center px-5">
                                <h3 className="mt-2 text-lg font-semibold ">{rest.name}</h3>
                                <div className=" text-amber-800 flex items-center gap-1">
                                    <FaStar />
                                    <p className="text-[13px]">4.3</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
