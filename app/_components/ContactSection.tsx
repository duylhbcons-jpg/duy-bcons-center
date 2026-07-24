"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    IconPhone,
    IconMail,
    IconMapPin,
    IconSend,
    IconLoader2,
    IconCheck,
    IconUser,
    IconDeviceMobile,
    IconFileText,
} from "@tabler/icons-react";

interface FormData {
    name: string;
    phone: string;
    interest: string;
    budget: string;
    note: string;
}

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        interest: "",
        budget: "",
        note: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = () => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
        if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
        else if (!/^(0[3-9]\d{8})$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setSubmitting(true);

        // Simulate API call / Google Sheets submission
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitted(true);
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section
            id="dang-ky"
            className="relative py-20 md:py-28 bg-[#faf8f5] overflow-hidden font-sans"
        >
            {/* Navigation anchors */}
            <div id="nhan-bao-gia" className="absolute top-0 left-0" />
            <div id="lien-he" className="absolute top-0 left-0" />

            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Editorial + Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-full">
                                <IconFileText size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Bảng giá & Nhà mẫu
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase leading-tight">
                                Tải Bảng Giá <br />
                                <span className="text-amber-500">Chính Thức Ngay</span>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl font-light">
                                Để lại thông tin để nhận bảng giá Bcons Center City cập nhật mới nhất, đặt lịch
                                tham quan nhà mẫu và tư vấn chính sách ưu đãi. Chuyên viên sẽ gửi tài liệu qua
                                Zalo trong 15 phút.
                            </p>

                            {/* Benefits */}
                            <div className="space-y-3">
                                {[
                                    "📋 Bảng giá chi tiết & cập nhật mới nhất",
                                    "🏠 Đặt lịch tham quan nhà mẫu ưu tiên",
                                    "💰 Tư vấn chính sách ưu đãi & thanh toán",
                                    "📊 Phân tích tiềm năng đầu tư chi tiết",
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                            <IconCheck size={11} className="text-amber-500" />
                                        </div>
                                        <p className="text-gray-600 text-sm font-light">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                Liên Hệ Trực Tiếp
                            </h3>
                            {[
                                {
                                    icon: <IconPhone size={18} className="text-amber-500/80" />,
                                    title: "Hotline Tư Vấn",
                                    value: "0822.6888.82",
                                    href: "tel:0822688882",
                                },
                                {
                                    icon: <IconMail size={18} className="text-amber-500/80" />,
                                    title: "Email Hỗ Trợ",
                                    value: "duylh.bcons@gmail.com",
                                    href: "mailto:duylh.bcons@gmail.com",
                                },
                                {
                                    icon: <IconMapPin size={18} className="text-amber-500/80" />,
                                    title: "Nhà Mẫu & Văn Phòng",
                                    value: "57 Thống Nhất, Đông Hòa, Dĩ An, Bình Dương",
                                    href: "https://maps.google.com/?q=Bcons+Center+City",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1 p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 group-hover:text-amber-500 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{item.title}</p>
                                        <a
                                            href={item.href}
                                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors block leading-snug font-light"
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-xl"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6">
                                        <IconCheck size={36} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Đăng Ký Thành Công!</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
                                        Cảm ơn bạn đã quan tâm đến Bcons Center City! Chuyên viên sẽ liên hệ trong{" "}
                                        <strong className="text-amber-500">15 phút</strong> để gửi bảng giá và tư vấn
                                        trực tiếp.
                                    </p>
                                    <a
                                        href="tel:0822688882"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-full transition-all shadow-lg"
                                    >
                                        <IconPhone size={16} />
                                        Gọi Ngay: 0822.6888.82
                                    </a>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        Nhận Tư Vấn Miễn Phí
                                    </h3>

                                    <div className="space-y-5">
                                        {/* Name */}
                                        <div>
                                            <label className="text-[11px] text-gray-400 uppercase tracking-wider font-bold block mb-2">
                                                Họ và Tên *
                                            </label>
                                            <div className="relative">
                                                <IconUser size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Nguyễn Văn A"
                                                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-gray-50 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all ${
                                                        errors.name ? "border-red-400" : "border-gray-200"
                                                    }`}
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="text-[11px] text-gray-400 uppercase tracking-wider font-bold block mb-2">
                                                Số Điện Thoại *
                                            </label>
                                            <div className="relative">
                                                <IconDeviceMobile size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="0822 688 882"
                                                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-gray-50 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all ${
                                                        errors.phone ? "border-red-400" : "border-gray-200"
                                                    }`}
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* Interest */}
                                        <div>
                                            <label className="text-[11px] text-gray-400 uppercase tracking-wider font-bold block mb-2">
                                                Loại Căn Quan Tâm
                                            </label>
                                            <select
                                                name="interest"
                                                value={formData.interest}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                                            >
                                                <option value="">-- Chọn loại căn --</option>
                                                <option value="1pn">1 Phòng Ngủ (1PN)</option>
                                                <option value="2pn">2 Phòng Ngủ (2PN)</option>
                                                <option value="3pn">3 Phòng Ngủ (3PN)</option>
                                                <option value="all">Tất cả các loại</option>
                                            </select>
                                        </div>

                                        {/* Budget */}
                                        <div>
                                            <label className="text-[11px] text-gray-400 uppercase tracking-wider font-bold block mb-2">
                                                Ngân Sách Dự Kiến
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                                            >
                                                <option value="">-- Chọn ngân sách --</option>
                                                <option value="1.6-2">1.6 – 2 tỷ</option>
                                                <option value="2-3">2 – 3 tỷ</option>
                                                <option value="3-4">3 – 4 tỷ</option>
                                                <option value="4+">Trên 4 tỷ</option>
                                            </select>
                                        </div>

                                        {/* Note */}
                                        <div>
                                            <label className="text-[11px] text-gray-400 uppercase tracking-wider font-bold block mb-2">
                                                Ghi Chú
                                            </label>
                                            <textarea
                                                name="note"
                                                value={formData.note}
                                                onChange={handleChange}
                                                placeholder="Yêu cầu tầng cao, view đẹp, hỗ trợ vay vốn..."
                                                rows={3}
                                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-black font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-[0_10px_30px_rgba(245,158,11,0.25)] active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            {submitting ? (
                                                <>
                                                    <IconLoader2 size={16} className="animate-spin" />
                                                    Đang Gửi...
                                                </>
                                            ) : (
                                                <>
                                                    <IconSend size={16} />
                                                    Nhận Tư Vấn Ngay
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-xs text-gray-400 font-light">
                                            🔒 Thông tin của bạn được bảo mật tuyệt đối. Chuyên viên sẽ liên hệ trong 15 phút.
                                        </p>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
