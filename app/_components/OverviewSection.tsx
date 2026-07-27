"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
    IconBuilding,
    IconMapPin,
    IconCertificate,
    IconCalendarCheck,
    IconHome,
    IconBuildingSkyscraper,
    IconKey,
    IconDoor,
    IconArrowRight,
    IconFileText,
} from "@tabler/icons-react";

const FACT_SHEET = [
    {
        icon: <IconBuildingSkyscraper size={20} />,
        label: "Chủ đầu tư",
        value: "Công ty Cổ phần Địa ốc Bcons",
    },
    {
        icon: <IconCertificate size={20} />,
        label: "Tên pháp lý",
        value: "Khu dân cư Bình An Đông Tây",
    },
    {
        icon: <IconBuilding size={20} />,
        label: "Quy mô",
        value: "2 Tháp thương mại (36 tầng) & 3 Tháp chung cư (29 tầng)",
    },
    {
        icon: <IconHome size={20} />,
        label: "Số lượng",
        value: "1.940 căn hộ (1PN · 2PN · 3PN)",
    },
    {
        icon: <IconCalendarCheck size={20} />,
        label: "Bàn giao",
        value: "Quý IV/2027",
    },
    {
        icon: <IconMapPin size={20} />,
        label: "Vị trí",
        value: "Đường Thống Nhất, P. Đông Hòa, TP.HCM",
    },
    {
        icon: <IconKey size={20} />,
        label: "Pháp lý",
        value: "Đã cấp phép xây dựng & bán hàng",
    },
    {
        icon: <IconDoor size={20} />,
        label: "Nhà mẫu",
        value: "57 Đường Thống Nhất, P. Đông Hòa, TP.HCM · Mở cửa T2–CN",
    },
];

const APARTMENT_TYPES = [
    {
        type: "1 Phòng Ngủ",
        shortType: "1PN",
        area: "37 – 46 m²",
        price: "Từ 1.6 tỷ",
        highlight: "Phù hợp đầu tư",
        color: "from-blue-500 to-cyan-400",
        bgColor: "bg-blue-500",
        featured: false,
    },
    {
        type: "2 Phòng Ngủ",
        shortType: "2PN",
        area: "52 – 58 m²",
        price: "Từ 2.6 tỷ",
        highlight: "Phổ biến nhất",
        featured: true,
        color: "from-amber-500 to-orange-400",
        bgColor: "bg-amber-500",
    },
    {
        type: "3 Phòng Ngủ",
        shortType: "3PN",
        area: "86 m²",
        price: "Từ 3.5 tỷ",
        highlight: "Gia đình lớn",
        color: "from-emerald-500 to-teal-400",
        bgColor: "bg-emerald-500",
        featured: false,
    },
];

const PROJECT_STATS = [
    { value: "1.940", label: "Căn hộ", suffix: "+" },
    { value: "5", label: "Tòa tháp", suffix: "" },
    { value: "74", label: "Tiện ích", suffix: "+" },
    { value: "8.000", label: "m² Quảng trường", suffix: "" },
];

const OverviewSection: React.FC = () => {
    const [formOpen, setFormOpen] = useState(false);

    const scrollToContact = () => {
        const section = document.getElementById("dang-ky");
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
        }
    };

    return (
        <section id="tong-quan" className="relative overflow-hidden bg-[#faf8f5]">
            {/* Decorative glow blobs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Stats Bar */}
            <div className="relative z-10 bg-gradient-to-r from-[#0f223d] to-[#1a3a5c]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                        {PROJECT_STATS.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="py-6 md:py-8 px-4 md:px-8 text-center"
                            >
                                <div className="text-2xl md:text-4xl font-bold text-white mb-1">
                                    {stat.value}
                                    <span className="text-amber-400">{stat.suffix}</span>
                                </div>
                                <div className="text-xs md:text-sm text-white/60 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative pt-12 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    {/* LEFT: Editorial */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:col-span-5 flex flex-col justify-start"
                    >
                        <p className="text-[10px] sm:text-xs text-amber-500/80 uppercase tracking-[0.4em] font-medium">
                            Biểu tượng mới 2027
                        </p>

                        <h2
                            className="font-bold text-gray-900 leading-tight mb-8 mt-3"
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                                fontWeight: 300,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Dự Án Bcons
                            <br />
                            Center City
                            <br />
                            <span className="text-amber-600">Phường Đông Hòa · TP.HCM</span>
                        </h2>

                        <div className="w-12 h-px bg-gradient-to-r from-amber-500/60 to-transparent mb-8" />

                        <div className="space-y-6">
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                                <strong className="text-gray-900 font-medium">Dự án Bcons Center City</strong>{" "}
                                là dự án chung cư tọa lạc tại giao lộ chiến lược Thống Nhất kết nối giữa QL1K – Xa lộ Hà Nội, P. Đông Hòa, TP.HCM. Đây là điểm kết nối vàng giữa các trung tâm kinh tế trọng điểm (TP.HCM - Bình Dương - Đồng Nai), khẳng định vị thế chiến lược tại cửa ngõ phía Đông thành phố.
                            </p>
                            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
                                Với quy mô 1.940 căn hộ hiện đại, Bcons Center City được kiến tạo với tầm nhìn trở
                                thành một khu đô thị tích hợp công nghệ cao và không gian sáng tạo — lựa chọn hàng
                                đầu cho ai tìm kiếm chung cư Khu Đông - TP.HCM.
                            </p>
                        </div>

                        <motion.button
                            onClick={scrollToContact}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-8 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition-all w-fit"
                        >
                            <IconFileText size={16} />
                            Nhận Bảng Giá Chi Tiết
                            <IconArrowRight size={16} />
                        </motion.button>
                    </motion.div>

                    {/* RIGHT: Fact Sheet */}
                    <div className="md:col-span-7 flex flex-col gap-10">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0"
                        >
                            {FACT_SHEET.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    className="border-t border-gray-200 pt-4 pb-6 group flex items-start gap-3"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-[0.15em] font-medium mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-900 font-medium leading-snug group-hover:text-amber-600 transition-colors duration-500">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Feature Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-2xl group"
                        >
                            <div className="aspect-[16/9] relative">
                                <img
                                    src="/over/extend.jpg"
                                    alt="Bcons Center City — Không gian thương mại sầm uất"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full px-5 pb-4 pointer-events-none">
                                <p className="text-[11px] text-white/50 tracking-wider uppercase font-light">
                                    Phối cảnh Trung tâm Thương mại & Quảng trường nội khu
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Apartment Type Cards */}
            <div className="relative z-10 bg-gradient-to-b from-[#0f223d] to-[#162d4a] py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.4em] mb-3 block">
                            Loại Căn Hộ & Bảng Giá Tham Khảo
                        </span>
                        <h3 className="text-2xl md:text-4xl font-bold text-white uppercase">
                            Chọn Căn Hộ <span className="text-amber-400">Phù Hợp</span>
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {APARTMENT_TYPES.map((apt, index) => (
                            <motion.div
                                key={apt.shortType}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={`relative group rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                                    apt.featured
                                        ? "border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.15)] md:scale-105 z-10"
                                        : "border-white/10 hover:border-white/20"
                                }`}
                                onClick={scrollToContact}
                            >
                                {apt.featured && (
                                    <div className="absolute top-0 left-0 right-0 z-20">
                                        <div className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest text-center py-2">
                                            ⭐ {apt.highlight}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8">
                                    {!apt.featured && (
                                        <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${apt.bgColor} mb-4`}>
                                            {apt.highlight}
                                        </div>
                                    )}
                                    {apt.featured && <div className="h-4" />}

                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{apt.shortType}</div>
                                    <div className="text-sm text-white/60 mb-6 font-light">{apt.type}</div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center py-3 border-t border-white/10">
                                            <span className="text-xs text-white/50 uppercase tracking-widest">Diện tích</span>
                                            <span className="text-sm text-white font-medium">{apt.area}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-t border-white/10">
                                            <span className="text-xs text-white/50 uppercase tracking-widest">Giá bán</span>
                                            <span className={`text-lg font-bold bg-gradient-to-r ${apt.color} bg-clip-text text-transparent`}>
                                                {apt.price}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                            apt.featured
                                                ? "bg-amber-500 text-black hover:bg-amber-400"
                                                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                                        }`}
                                    >
                                        Nhận bảng giá
                                        <IconArrowRight size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center text-xs text-white/40 mt-6 italic">
                        * Giá tham khảo, có thể thay đổi theo chính sách CĐT. Liên hệ để nhận bảng giá chính thức.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OverviewSection;
