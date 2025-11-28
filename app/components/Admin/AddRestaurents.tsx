"use client";

import React, { useState } from "react";

interface MenuItem {
    name: string;
    price: number;
}

export default function AddRestaurants() {
    const [restaurantName, setRestaurantName] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([{ name: "", price: 0 }]);

    // Handle gallery images (max 8)
    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        if (filesArray.length + galleryImages.length > 8) {
            alert("You can upload max 8 images.");
            return;
        }
        setGalleryImages((prev) => [...prev, ...filesArray]);
    };

    // Add new menu item
    const addMenuItem = () => {
        setMenuItems((prev) => [...prev, { name: "", price: 0 }]);
    };

    // Remove menu item
    const removeMenuItem = (index: number) => {
        setMenuItems((prev) => prev.filter((_, i) => i !== index));
    };

    // Update menu item
    const handleMenuChange = (index: number, field: "name" | "price", value: string | number) => {
        setMenuItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        );
    };

    // Submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            restaurantName,
            menuItems,
        };

        const res = await fetch("/api/restaurents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data);
    };


    return (
        <div className="p-5 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Restaurant</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Restaurant Name */}
                <div>
                    <label className="block font-medium mb-1">Restaurant Name</label>
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block font-medium mb-1">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
                        required
                    />
                    {coverImage && <p className="mt-1 text-sm">{coverImage.name}</p>}
                </div>

                {/* Gallery Images */}
                <div>
                    <label className="block font-medium mb-1">Gallery Images (max 8)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                    />
                    {galleryImages.length > 0 && (
                        <ul className="mt-2 text-sm">
                            {galleryImages.map((img, idx) => (
                                <li key={idx}>{img.name}</li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Menu Items */}
                <div>
                    <label className="block font-medium mb-1">Menu Items</label>
                    {menuItems.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2 items-center">
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => handleMenuChange(index, "name", e.target.value)}
                                className="border px-2 py-1 rounded flex-1"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleMenuChange(index, "price", parseFloat(e.target.value))}
                                className="border px-2 py-1 rounded w-24"
                                required
                            />
                            {menuItems.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeMenuItem(index)}
                                    className="text-red-500 font-bold"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMenuItem}
                        className="text-blue-600 font-medium mt-1"
                    >
                        + Add Item
                    </button>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Add Database
                </button>
            </form>
        </div>
    );
}
