"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SparklesCore } from "./ui/sparkles";
import BorderGlow from "./ui/BorderGlow";
import {
    IconSchool,
    IconBuildingHospital,
    IconTrain,
    IconBuildingStore,
    IconRoad,
    IconBuildingSkyscraper,
    IconArrowRight,
} from "@tabler/icons-react";

const CONNECTION_POINTS = [
    {
        icon: <IconSchool size={20} />,
        time: "3 phút",
        name: "Làng Đại học Quốc gia TP.HCM",
        description: "Trung tâm giáo dục lớn nhất Việt Nam",
        color: "bg-blue-500",
    },
    {
        icon: <IconTrain size={20} />,
        time: "5 phút",
        name: "Ga Metro Bến xe Suối Tiên",
        description: "Tuyến Metro số 1 Bến Thành - Suối Tiên",
        color: "bg-green-500",
    },
    {
        icon: <IconBuildingStore size={20} />,
        time: "10 phút",
        name: "Bến xe Miền Đông mới",
        description: "Bến xe liên tỉnh hiện đại nhất",
        color: "bg-purple-500",
    },
    {
        icon: <IconRoad size={20} />,
        time: "10 phút",
        name: "Xa lộ Hà Nội & Phạm Văn Đồng",
        description: "Trục giao thông huyết mạch",
        color: "bg-orange-500",
    },
    {
        icon: <IconBuildingHospital size={20} />,
        time: "15 phút",
        name: "Bệnh viện Quân Y 175",
        description: "Bệnh viện đa khoa hàng đầu",
        color: "bg-red-500",
    },
    {
        icon: <IconBuildingSkyscraper size={20} />,
        time: "15 phút",
        name: "Trung tâm TP. Thủ Đức",
        description: "Thành phố Đông sáng tạo",
        color: "bg-cyan-500",
    },
];

const LocationSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scale, setScale] = useState(1);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setScale(1);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setScale(1);
    };

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
    const handleResetZoom = () => setScale(1);

    const scrollToContact = () => {
        const el = document.getElementById("dang-ky");
        if (el) {
            const headerOffset = 80;
            const elementPosition =
                el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: "smooth",
            });
        }
    };

    return (
        <section
            id="vi-tri"
            className="w-full h-auto bg-[#f5f2ed] dark:bg-black relative overflow-hidden mt-10"
        >
            {/* Navigation Anchors */}
            <div id="ban-do" className="absolute top-0 left-0" />
            <div id="ket-noi" className="absolute top-0 left-0" />

            {/* --- Sparkles Background Layer with Fade --- */}
            <div
                className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden dark:block"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            >
                <SparklesCore
                    id="location-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.2}
                    particleDensity={50}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.3}
                />
            </div>

            {/* --- Decorative Background Glows --- */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* ================================= */}
            {/* MAIN CONTENT - Text + Map        */}
            {/* ================================= */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 lg:gap-20 items-stretch">
                    {/* --- Cột Trái: Nội dung chữ phong cách Editorial --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col justify-center z-20 relative py-4"
                    >
                        {/* Subtle background glow */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-8 bg-amber-500/30" />
                            <span className="text-amber-500/80 tracking-[0.3em] text-xs uppercase font-light">
                                VỊ TRÍ ĐỘC TÔN
                            </span>
                        </div>

                        <h2 className="font-be-vietnam font-bold text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-gray-900 dark:text-white leading-[1.1] uppercase mb-8">
                            KẾT NỐI <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 dark:from-amber-200 dark:via-amber-500 dark:to-amber-200">
                                GIAO THƯƠNG
                            </span>{" "}
                            <br />
                            HUYẾT MẠCH
                        </h2>

                        <p className="font-be-vietnam text-gray-500 dark:text-gray-400 leading-relaxed font-light text-base md:text-lg opacity-80 mb-6 md:mb-10 max-w-md">
                            Vị trí dự án{" "}
                            <span className="text-gray-900 dark:text-white font-medium">
                                Bcons Center City
                            </span>
                            {" "}tọa lạc tại mặt tiền đường Thống Nhất rộng 32m, Phường Đông Hòa, TP.HCM
                            — tâm điểm kết nối giữa Làng Đại Học Quốc Gia, trung tâm công
                            nghệ và các trục đường kinh tế trọng điểm.
                        </p>

                        {/* CTA */}
                        <button
                            onClick={scrollToContact}
                            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition-all w-fit mb-6"
                        >
                            Đặt Lịch Tham Quan
                            <IconArrowRight size={16} />
                        </button>
                    </motion.div>

                    {/* --- Cột Phải: Sơ đồ bản đồ với các thẻ nổi --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative flex flex-col justify-center gap-8"
                    >
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="40 80 80"
                            backgroundColor="#060010"
                            borderRadius={28}
                            glowRadius={40}
                            glowIntensity={1}
                            coneSpread={25}
                            animated={false}
                            colors={["#c084fc", "#f472b6", "#38bdf8"]}
                        >
                            <div
                                onClick={handleOpenModal}
                                className="relative aspect-4/3 md:aspect-video rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl group bg-gray-100 dark:bg-[#0a0f1e] cursor-zoom-in"
                            >
                                {/* Bản đồ nền */}
                                <img
                                    src="/location/location.png"
                                    alt="Bản đồ vị trí dự án Bcons Center City Dĩ An Bình Dương"
                                    className="w-full h-full object-cover opacity-100 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />

                                {/* --- Central Project Marker --- */}
                                <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20">
                                    <div className="relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-500/10 rounded-full blur-3xl md:animate-pulse" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500/30 rounded-full md:animate-ping" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-amber-500/30 rounded-full md:animate-pulse blur-[1px]" />

                                        <div className="relative bg-white p-[1.5px] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] border border-amber-500/50 scale-90 md:scale-100 transition-transform duration-500 group-hover:scale-110">
                                            <div className="bg-amber-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-black tracking-tighter shadow-inner">
                                                BCONS
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BorderGlow>

                        {/* Feature List Cards */}
                        <div className="font-be-vietnam grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            {[
                                {
                                    icon: (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    ),
                                    title: "Mặt tiền 32m",
                                    desc: "Đường Thống Nhất rộng thoáng",
                                },
                                {
                                    icon: (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z" />
                                            <path d="M10 12h.01" />
                                            <path d="M16 12h.01" />
                                            <path d="M22 8v8" />
                                        </svg>
                                    ),
                                    title: "Cửa ngõ Thủ Đức",
                                    desc: "Liền kề Làng Đại học Quốc gia",
                                },
                                {
                                    icon: (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    ),
                                    title: "Kết nối liên vùng",
                                    desc: "Bình Dương - TP. Hồ Chí Minh",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex flex-col items-start gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 shadow-sm dark:shadow-lg dark:shadow-black/20"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-inner">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-gray-900 dark:text-white font-semibold text-xs uppercase tracking-wider">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ================================= */}
            {/* CONNECTION POINTS - Full Width    */}
            {/* ================================= */}
            <div className="relative z-10 bg-gradient-to-r from-[#0f223d] to-[#1a3a5c] dark:from-[#0a1628] dark:to-[#0f1f3a] py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className="text-xl md:text-2xl font-be-vietnam font-bold text-white uppercase">
                            Kết Nối <span className="text-amber-400">Tiện Ích Xung Quanh</span>
                        </h3>
                    </div>

                    {/* Connection Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CONNECTION_POINTS.map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group text-center p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 ${point.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                    {point.icon}
                                </div>

                                {/* Time Badge */}
                                <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                                    {point.time}
                                </div>

                                {/* Name */}
                                <h4 className="text-white text-xs font-medium mb-1 leading-tight">
                                    {point.name}
                                </h4>

                                {/* Description - hidden on mobile */}
                                <p className="text-white/40 text-[10px] leading-tight hidden md:block">
                                    {point.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Zoomable Modal --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-[110] w-[95vw] h-[90vh] flex flex-col items-center justify-center p-4 gap-4"
                        >
                            {/* Controls Bar */}
                            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full z-[120] shadow-2xl">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomOut();
                                    }}
                                    disabled={scale <= 1}
                                    className="text-white/70 hover:text-white disabled:opacity-30 transition-all p-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="5"
                                            y1="12"
                                            x2="19"
                                            y2="12"
                                        ></line>
                                    </svg>
                                </button>
                                <span className="text-amber-500 font-mono text-xs w-10 text-center font-bold">
                                    {Math.round(scale * 100)}%
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomIn();
                                    }}
                                    disabled={scale >= 4}
                                    className="text-white/70 hover:text-white disabled:opacity-30 transition-all p-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="12"
                                            y1="5"
                                            x2="12"
                                            y2="19"
                                        ></line>
                                        <line
                                            x1="5"
                                            y1="12"
                                            x2="19"
                                            y2="12"
                                        ></line>
                                    </svg>
                                </button>
                                <div className="w-px h-4 bg-white/10" />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleResetZoom();
                                    }}
                                    className="text-white/50 hover:text-white text-[10px] uppercase tracking-widest font-mono transition-all font-bold"
                                >
                                    Reset
                                </button>
                                <div className="w-px h-4 bg-white/10" />
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white/50 hover:text-red-400 transition-all p-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </button>
                            </div>

                            <div
                                className="relative w-full h-full bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
                                onWheel={(e) => {
                                    if (e.deltaY < 0) handleZoomIn();
                                    else handleZoomOut();
                                }}
                            >
                                <motion.div
                                    drag={scale > 1}
                                    animate={{
                                        scale: scale,
                                        x: scale === 1 ? 0 : undefined,
                                        y: scale === 1 ? 0 : undefined,
                                    }}
                                    className="w-full h-full flex items-center justify-center origin-center"
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 25,
                                    }}
                                >
                                    <div className="relative w-full h-full p-8">
                                        <img
                                            src="/location/location.png"
                                            alt="Sơ đồ vị trí chi tiết dự án Bcons Center City phóng lớn"
                                            className="w-full h-full object-contain select-none pointer-events-none"
                                        />
                                    </div>
                                </motion.div>

                                {/* Info tag in modal */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-xl border border-white/5 rounded-full pointer-events-none">
                                    <p className="text-white/70 text-[10px] uppercase font-mono tracking-[0.3em] text-center whitespace-nowrap">
                                        SƠ ĐỒ VỊ TRÍ CHI TIẾT
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LocationSection;
