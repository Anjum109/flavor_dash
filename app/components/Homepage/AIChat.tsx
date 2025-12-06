"use client";

import { advent_pro } from "@/font/font";
import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

export default function AIChat() {
    const [open, setOpen] = useState(false);
    const [selectedQ, setSelectedQ] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);

    const qaList = [
        {
            q: "How can I order food?",
            a: "Just pick a restaurant, choose your menu items, and proceed to checkout!"
        },
        {
            q: "Do you offer home delivery?",
            a: "Yes! We provide fast home delivery to your location."
        },
        {
            q: "Can I track my order?",
            a: "Absolutely! After placing an order, you can track it in real-time."
        },
        {
            q: "What payment methods are available?",
            a: "You can pay using Cash on Delivery, Credit/Debit cards, or Mobile banking."
        }
    ];

    const handleQuestionClick = (q: string, a: string) => {
        setSelectedQ(q);
        setAnswer(a);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-xl hover:bg-amber-700 transition z-50"
            >
                {open ? <FaTimes size={30} /> : <FaComments size={30} />}
            </button>

            {/* Chat Box */}
            {open && (
                <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl border-red-800 border-2 rounded-xl p-4 z-50">
                    <h3 className="text-3xl text-center font-semibold mb-3 text-amber-700"><span className={advent_pro.className}>Ask Me</span></h3>

                    {/* Questions */}
                    {!answer && (
                        <div className="flex flex-col gap-3">
                            {qaList.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionClick(item.q, item.a)}
                                    className="text-left bg-red-900 text-white p-2 rounded-lg hover:bg-amber-600 duration-1000 border"
                                >
                                    {item.q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Answer Section */}
                    {answer && (
                        <div>
                            {/* <p className="font-semibold bg-red-900 text-white px-4 py-2 rounded-3xl mb-2">{selectedQ}</p> */}
                            <p className="bg-red-900 text-white py-4 px-4 rounded-4xl text-justify  mb-4">{answer}</p>

                            <button
                                onClick={() => {
                                    setSelectedQ(null);
                                    setAnswer(null);
                                }}
                                className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
                            >
                                Back
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
