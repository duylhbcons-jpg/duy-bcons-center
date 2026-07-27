"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SparklesCore } from "./ui/sparkles";

type FloorDetails = {
    label: string;
    value: string;
};

type FloorPlan = {
    image: string;
    title: string;
    details: FloorDetails[];
    description: string;
};

type BlockData = {
    [floorName: string]: FloorPlan;
};

type FloorPlanData = {
    [blockName: string]: BlockData;
};

const floorPlanData: FloorPlanData = {
    "Block A": {
        "Tầng Điển Hình (2-29)": {
            image: "/floorPlan/mb-tang-02-29-block-a.jpg",
            title: "Mặt Bằng Tầng Điển Hình Block A",
            details: [
                { label: "Mật độ", value: "15 Căn/Tầng" },
                { label: "Thang máy", value: "6 Thang/Tầng" },
                { label: "Loại căn", value: "1PN, 2PN, 3PN" },
            ],
            description:
                "Thiết kế tối ưu hóa luồng gió tự nhiên, 100% căn hộ đều có ban công và logia phơi đồ riêng biệt.",
        },
        "Tầng Trệt": {
            image: "/floorPlan/mb-tang-01-block-a.jpg",
            title: "Mặt Bằng Tầng Trệt Block A",
            details: [
                { label: "Loại hình", value: "Shophouse Thương Mại" },
                { label: "Tiện ích", value: "Sảnh đón, Sinh hoạt cộng đồng" },
            ],
            description:
                "Khối đế thương mại sầm uất, kết nối trực tiếp với các tiện ích nội khu đẳng cấp.",
        },
    },
    "Block B": {
        "Tầng Điển Hình (2-29)": {
            image: "/floorPlan/mb-tang-02-29-block-b.jpg",
            title: "Mặt Bằng Tầng Điển Hình Block B",
            details: [
                { label: "Mật độ", value: "16 Căn/Tầng" },
                { label: "Thang máy", value: "6 Thang/Tầng" },
                { label: "Loại căn", value: "2PN, 3PN" },
            ],
            description:
                "Không gian sống rộng rãi với tầm nhìn thoáng đãng về hướng nội khu và công viên.",
        },
        "Tầng Trệt": {
            image: "/floorPlan/mb-tang-01-block-b.png",
            title: "Mặt Bằng Tầng Trệt Block B",
            details: [
                { label: "Loại hình", value: "Shophouse & Sảnh Cư Dân" },
                { label: "Tiện ích", value: "Khu vui chơi trẻ em, Gym" },
            ],
            description:
                "Sảnh đón sang trọng cùng hệ thống Shophouse đa dạng dịch vụ.",
        },
    },
    "Block C": {
        "Tầng Điển Hình (3-29)": {
            image: "/floorPlan/mb-tang-03-29-block-c.jpg",
            title: "Mặt Bằng Tầng Điển Hình Block C",
            details: [
                { label: "Mật độ", value: "18 Căn/Tầng" },
                { label: "Thang máy", value: "6 Thang/Tầng" },
                { label: "Loại căn", value: "1PN, 2PN" },
            ],
            description:
                "Tầm nhìn ôm trọn hồ bơi vô cực và khuôn viên cảnh quan trung tâm.",
        },
        "Tầng 02": {
            image: "/floorPlan/mb-tang-02-block-c.jpg",
            title: "Mặt Bằng Tầng 02 Block C",
            details: [
                { label: "Mật độ", value: "12 Căn/Tầng" },
                { label: "Tiện ích", value: "Hồ bơi, Spa, Vườn treo" },
            ],
            description:
                "Tầng tiện ích đặc quyền với không gian thư giãn ngay cửa nhà.",
        },
        "Tầng Trệt": {
            image: "/floorPlan/mb-tang-01-block-c.jpg",
            title: "Mặt Bằng Tầng Trệt Block C",
            details: [
                { label: "Loại hình", value: "Shophouse Thương Mại" },
                { label: "Kết nối", value: "Trục đường chính" },
            ],
            description:
                "Vị trí giao thương thuận lợi, sầm uất bậc nhất dự án.",
        },
    },
};

export default function FloorPlansSection() {
    const blocks = Object.keys(floorPlanData);
    const [activeBlock, setActiveBlock] = useState(blocks[0]);
    const floors = Object.keys(floorPlanData[activeBlock]);
    const [activeFloor, setActiveFloor] = useState(floors[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scale, setScale] = useState(1);

    const currentData =
        floorPlanData[activeBlock]?.[activeFloor] ||
        floorPlanData[blocks[0]][floors[0]];

    // Reset floor when block changes
    const handleBlockChange = (block: string) => {
        setActiveBlock(block);
        const newFloors = Object.keys(floorPlanData[block]);
        if (!newFloors.includes(activeFloor)) {
            setActiveFloor(newFloors[0]);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setScale(1);
    };

    const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
    const handleZoomOut = () => setScale((s) => Math.max(s - 0.5, 1));
    const handleResetZoom = () => {
        setScale(1);
    };

    // Close modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleCloseModal();
        };
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    // Reset zoom when floor or block changes
    useEffect(() => {
        setScale(1);
    }, [activeFloor, activeBlock]);

    return (
        <section
            id="mat-bang"
            className="bg-[#faf8f5] dark:bg-black relative overflow-hidden py-10 md:py-15 font-sans"
        >
            {/* Navigation Anchors */}
            <div id="mat-bang-chi-tiet" className="absolute top-0 left-0" />
            <div id="mat-bang-tang" className="absolute top-0 left-0" />

            {/* Sparkles Background */}
            <div
                className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            >
                <SparklesCore
                    id="floorplans-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.2}
                    particleDensity={40}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.3}
                />
            </div>

            {/* Decorative Ambient Glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-3 block"
                    >
                        THIẾT KẾ THÔNG MINH
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase leading-tight"
                    >
                        Chi Tiết Mặt Bằng{" "}
                        <span className="text-amber-500">Tổng Thể</span>
                    </motion.h2>
                    <div className="w-24 h-1 bg-amber-500/30 mx-auto mt-6" />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left: Info Panel */}
                    <motion.div
                        key={activeBlock + activeFloor + "info"}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="backdrop-blur-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl">
                            {/* Block Selectors */}
                            <div>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold block mb-3">
                                    Chọn Tòa Tháp
                                </span>
                                <div className="flex bg-gray-100 dark:bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-gray-200 dark:border-white/10 w-fit">
                                    {blocks.map((block) => (
                                        <button
                                            key={block}
                                            onClick={() =>
                                                handleBlockChange(block)
                                            }
                                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 relative cursor-pointer ${
                                                activeBlock === block
                                                    ? "text-black bg-amber-500 shadow-md"
                                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                        >
                                            {block}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Floor Selectors */}
                            <div>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold block mb-3">
                                    Chọn Tầng
                                </span>
                                <div className="flex flex-wrap justify-start gap-2">
                                    {floors.map((floor) => (
                                        <button
                                            key={floor}
                                            onClick={() =>
                                                setActiveFloor(floor)
                                            }
                                            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 border cursor-pointer ${
                                                activeFloor === floor
                                                    ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm"
                                                    : "bg-transparent border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-amber-300"
                                            }`}
                                        >
                                            {floor}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-3">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                    {currentData.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">
                                    {currentData.description}
                                </p>
                            </div>

                            {/* Key Details List */}
                            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/10">
                                {currentData.details.map((detail, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center py-1"
                                    >
                                        <span className="text-gray-400 dark:text-gray-500 text-xs uppercase font-mono tracking-tight">
                                            {detail.label}
                                        </span>
                                        <span className="text-gray-900 dark:text-white font-semibold text-sm">
                                            {detail.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Blueprint Display */}
                    <div className="lg:col-span-8 relative aspect-[4/3] w-full flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setIsModalOpen(true)}
                            className="relative inset-0 w-full h-full bg-white dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden cursor-zoom-in group shadow-xl flex items-center justify-center p-4"
                        >
                            {/* Blueprint grid effect */}
                            <div
                                className="absolute inset-0 opacity-5 pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(#f59e0b 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            />

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentData.image}
                                    src={currentData.image}
                                    alt={currentData.title}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.04 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className="max-w-full max-h-full object-contain p-2"
                                />
                            </AnimatePresence>

                            {/* Zoom hint overlay */}
                            <div className="absolute bottom-4 right-4 pointer-events-none">
                                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white/80 font-mono border border-white/10 flex items-center gap-2">
                                    <span>🔍 Nhấp để phóng to</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Modal Zoom Viewer */}
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
                            className="relative z-[110] w-[92vw] h-[90vh] flex flex-col items-center justify-center p-4 gap-4"
                        >
                            {/* Controls Bar */}
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full z-[120] shadow-2xl">
                                <button
                                    onClick={handleZoomOut}
                                    disabled={scale <= 1}
                                    className="text-white/70 hover:text-white disabled:opacity-30 transition-all p-1 cursor-pointer"
                                    title="Thu nhỏ"
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
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <span className="text-amber-400 font-mono text-xs w-12 text-center font-bold">
                                    {Math.round(scale * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    disabled={scale >= 4}
                                    className="text-white/70 hover:text-white disabled:opacity-30 transition-all p-1 cursor-pointer"
                                    title="Phóng to"
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
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <div className="w-px h-4 bg-white/20" />
                                <button
                                    onClick={handleResetZoom}
                                    className="text-white/60 hover:text-white text-xs uppercase tracking-widest font-mono transition-all font-bold cursor-pointer"
                                >
                                    Reset
                                </button>
                                <div className="w-px h-4 bg-white/20" />
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white/60 hover:text-red-400 transition-all p-1 cursor-pointer"
                                    title="Đóng"
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
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                className="relative w-full h-full bg-black/80 rounded-3xl border border-white/10 overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing flex items-center justify-center"
                                onWheel={(e) => {
                                    if (e.deltaY < 0) {
                                        handleZoomIn();
                                    } else {
                                        handleZoomOut();
                                    }
                                }}
                            >
                                {/* Scaling & Dragging Container */}
                                <motion.div
                                    drag={scale > 1}
                                    dragConstraints={{
                                        left: -800 * (scale - 1),
                                        right: 800 * (scale - 1),
                                        top: -800 * (scale - 1),
                                        bottom: 800 * (scale - 1),
                                    }}
                                    dragElastic={0.1}
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
                                    <div className="relative w-[90%] h-[90%] flex items-center justify-center">
                                        <img
                                            src={currentData.image}
                                            alt={currentData.title}
                                            className="max-w-full max-h-full object-contain pointer-events-none select-none"
                                        />
                                    </div>
                                </motion.div>

                                {/* Info tag in modal */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full pointer-events-none">
                                    <p className="text-white/80 text-xs uppercase font-mono tracking-widest text-center whitespace-nowrap">
                                        {activeBlock} — {activeFloor}:{" "}
                                        {currentData.title}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
