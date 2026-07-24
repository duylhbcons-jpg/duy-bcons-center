"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconPhone, IconUser, IconSend, IconCheck, IconSparkles } from "@tabler/icons-react";
import { submitFormClient } from "../_utils/submitForm";

interface MiniContactFormProps {
    /** Where this form is placed — sent as `source` to the backend */
    source: string;
    /** Headline text */
    title?: string;
    /** Subtitle / description */
    subtitle?: string;
    /** Visual variant */
    variant?: "gradient" | "glass" | "dark" | "accent";
    /** Optional extra className on wrapper */
    className?: string;
}

const MiniContactForm: React.FC<MiniContactFormProps> = ({
    source,
    title = "Nhận Bảng Giá & Ưu Đãi Mới Nhất",
    subtitle = "Để lại thông tin — Chuyên viên sẽ gọi lại trong 5 phút",
    variant = "gradient",
    className = "",
}) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

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
                fullName: name || "Khách hàng",
                phone: phone.replace(/\s/g, ""),
                source,
            });
            setSubmitted(true);
        } catch {
            setError("Có lỗi xảy ra. Vui lòng gọi hotline 0822.6888.82");
        } finally {
            setSubmitting(false);
        }
    };

    /* ---------- variant styles ---------- */
    const variantStyles: Record<string, string> = {
        gradient:
            "bg-zinc-900 border border-amber-500/30 shadow-lg shadow-amber-500/5",
        glass: "bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-lg",
        dark: "bg-zinc-900 border border-zinc-700/40 shadow-lg",
        accent:
            "bg-zinc-900 border border-indigo-500/30 shadow-lg shadow-indigo-500/5",
    };

    const btnStyles: Record<string, string> = {
        gradient: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black",
        glass: "bg-white/15 hover:bg-white/25 text-white border border-white/20",
        dark: "bg-amber-500 hover:bg-amber-600 text-black",
        accent: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white",
    };

    return (
        <div className={`w-full ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${variantStyles[variant]}`}
            >
                {/* decorative sparkle */}
                <div className="absolute top-3 right-4 text-amber-400/30 pointer-events-none">
                    <IconSparkles size={28} />
                </div>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center gap-3 py-4"
                        >
                            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                                <IconCheck size={28} className="text-green-400" />
                            </div>
                            <p className="text-lg font-semibold text-white">
                                Đăng ký thành công!
                            </p>
                            <p className="text-sm text-white/60 text-center">
                                Chuyên viên sẽ liên hệ bạn trong 5 phút
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Heading */}
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                                    {title}
                                </h3>
                                <p className="text-sm text-white/50 mt-1">
                                    {subtitle}
                                </p>
                            </div>

                            {/* Fields row */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Name */}
                                <div className="relative flex-1">
                                    <IconUser
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                                    />
                                </div>
                                {/* Phone */}
                                <div className="relative flex-1">
                                    <IconPhone
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại *"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                            if (error) setError("");
                                        }}
                                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                                        required
                                    />
                                </div>
                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer shrink-0 disabled:opacity-50 ${btnStyles[variant]}`}
                                >
                                    {submitting ? (
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <IconSend size={16} />
                                            <span className="hidden sm:inline">Gửi ngay</span>
                                            <span className="sm:hidden">Gửi</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-xs"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default MiniContactForm;
