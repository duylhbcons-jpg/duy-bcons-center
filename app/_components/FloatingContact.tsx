"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const FloatingContact: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-4 sm:right-6 z-[150] flex flex-col items-end gap-3"
                >
                    {/* Expandable contacts */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col gap-2"
                            >
                                {/* Zalo */}
                                <a
                                    href="https://zalo.me/0822688882"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Nhắn tin Zalo tư vấn Bcons Center City"
                                    className="group flex items-center gap-3 bg-white rounded-full pl-4 pr-5 py-2.5 shadow-lg border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 active:scale-95"
                                >
                                    <div className="w-9 h-9 rounded-full bg-[#0068FF] flex items-center justify-center flex-shrink-0">
                                        <img
                                            src="/logo/icon zalo.png"
                                            alt="Zalo"
                                            className="w-5 h-5 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                        <span className="text-white text-xs font-black">Z</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">Nhắn Zalo</span>
                                </a>

                                {/* Phone */}
                                <a
                                    href="tel:0822688882"
                                    aria-label="Gọi điện tư vấn Bcons Center City"
                                    className="group flex items-center gap-3 bg-white rounded-full pl-4 pr-5 py-2.5 shadow-lg border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 active:scale-95"
                                >
                                    <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Gọi Ngay</span>
                                        <span className="text-[10px] text-gray-400 block">0822.6888.82</span>
                                    </div>
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main toggle button */}
                    <motion.button
                        onClick={() => setExpanded(!expanded)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(245,158,11,0.35)] transition-all duration-300 ${
                            expanded
                                ? "bg-gray-800 rotate-45"
                                : "bg-amber-500 hover:bg-amber-400 animate-pulse-glow"
                        }`}
                        aria-label={expanded ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
                    >
                        {expanded ? (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        )}

                        {/* Pulse ring */}
                        {!expanded && (
                            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingContact;
