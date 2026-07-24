"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    IconX,
    IconPhone,
    IconUser,
    IconGift,
    IconCheck,
    IconFlame,
} from "@tabler/icons-react";
import { submitFormClient } from "../_utils/submitForm";

const POPUP_DELAY_MS = 45_000; // 45 seconds — between 30s and 1 min
const POPUP_STORAGE_KEY = "bcons_popup_dismissed";
const POPUP_SUBMIT_KEY = "bcons_popup_submitted";

const PopupForm: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    /* --- Timer to show popup --- */
    useEffect(() => {
        // Don't show if user already dismissed or submitted
        if (typeof window === "undefined") return;
        const wasDismissed = sessionStorage.getItem(POPUP_STORAGE_KEY);
        const wasSubmitted = localStorage.getItem(POPUP_SUBMIT_KEY);
        if (wasDismissed || wasSubmitted) return;

        const timer = setTimeout(() => {
            setVisible(true);
        }, POPUP_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    /* --- Close handler --- */
    const handleClose = useCallback(() => {
        setClosing(true);
        sessionStorage.setItem(POPUP_STORAGE_KEY, "1");
        setTimeout(() => {
            setVisible(false);
            setClosing(false);
        }, 350);
    }, []);

    /* --- Escape key --- */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && visible) handleClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [visible, handleClose]);

    /* --- Body scroll lock --- */
    useEffect(() => {
        if (visible && !closing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible, closing]);

    /* --- Submit --- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!phone.trim()) {
            setError("Vui lòng nhập số điện thoại");
            return;
        }
        if (!/^(0[3-9]\d{8})$/.test(phone.replace(/\s/g, ""))) {
            setError("Số điện thoại không hợp lệ");
            return;
        }

        setSubmitting(true);
        try {
            await submitFormClient({
                fullName: name || "Khách hàng (Popup)",
                phone: phone.replace(/\s/g, ""),
                source: "Popup Form 45s",
            });
            setSubmitted(true);
            localStorage.setItem(POPUP_SUBMIT_KEY, "1");
            // auto-close after 3 seconds
            setTimeout(handleClose, 3000);
        } catch {
            setError("Lỗi kết nối. Gọi ngay 0822.6888.82 để được tư vấn!");
        } finally {
            setSubmitting(false);
        }
    };

    if (!visible) return null;

    return (
        <AnimatePresence>
            {visible && !closing && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="popup-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="popup-modal"
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 40 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10">
                            {/* Top accent band */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />

                            {/* Content */}
                            <div className="bg-zinc-900 p-6 sm:p-8">
                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer z-10"
                                    aria-label="Đóng"
                                >
                                    <IconX size={16} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        /* ---- Success state ---- */
                                        <motion.div
                                            key="popup-success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center gap-4 py-6"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    delay: 0.1,
                                                }}
                                                className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
                                            >
                                                <IconCheck
                                                    size={32}
                                                    className="text-green-400"
                                                />
                                            </motion.div>
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-white">
                                                    Đăng ký thành công!
                                                </h3>
                                                <p className="text-sm text-white/50 mt-2">
                                                    Chuyên viên Lê Hữu Duy sẽ
                                                    gọi lại cho bạn trong 5
                                                    phút.
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* ---- Form state ---- */
                                        <motion.div
                                            key="popup-form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {/* Badge */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-semibold">
                                                    <IconFlame size={14} />
                                                    ƯU ĐÃI CÓ HẠN
                                                </span>
                                            </div>

                                            {/* Heading */}
                                            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
                                                Tặng ngay{" "}
                                                <span className="text-amber-400">
                                                    3 Chỉ Vàng SJC
                                                </span>{" "}
                                                khi đăng ký hôm nay!
                                            </h2>
                                            <p className="text-sm text-white/50 mb-6">
                                                Nhận bảng giá mới nhất & lịch
                                                tham quan nhà mẫu Bcons Center
                                                City — Hoàn toàn miễn phí.
                                            </p>

                                            {/* Perks */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {[
                                                    "Bảng giá chi tiết",
                                                    "Lịch xem nhà mẫu",
                                                    "Tư vấn tài chính",
                                                ].map((perk) => (
                                                    <span
                                                        key={perk}
                                                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20"
                                                    >
                                                        <IconGift size={12} />
                                                        {perk}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Form */}
                                            <form
                                                onSubmit={handleSubmit}
                                                className="space-y-3"
                                            >
                                                {/* Name */}
                                                <div className="relative">
                                                    <IconUser
                                                        size={16}
                                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Họ và tên"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                                                    />
                                                </div>

                                                {/* Phone */}
                                                <div className="relative">
                                                    <IconPhone
                                                        size={16}
                                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                                                    />
                                                    <input
                                                        type="tel"
                                                        placeholder="Số điện thoại *"
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(
                                                                e.target.value,
                                                            );
                                                            if (error)
                                                                setError("");
                                                        }}
                                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                                                        required
                                                    />
                                                </div>

                                                {/* Error */}
                                                {error && (
                                                    <motion.p
                                                        initial={{
                                                            opacity: 0,
                                                            y: -5,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        className="text-red-400 text-xs"
                                                    >
                                                        {error}
                                                    </motion.p>
                                                )}

                                                {/* CTA */}
                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                                >
                                                    {submitting ? (
                                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <IconGift
                                                                size={18}
                                                            />
                                                            NHẬN ƯU ĐÃI NGAY
                                                        </>
                                                    )}
                                                </button>
                                            </form>

                                            {/* Footer note */}
                                            <p className="text-[11px] text-white/30 text-center mt-4">
                                                Thông tin được bảo mật. Chỉ
                                                Chuyên viên Bcons liên hệ bạn.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PopupForm;
