"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SparklesCore } from "./ui/sparkles";
import { IconX, IconMaximize, IconArrowRight } from "@tabler/icons-react";

const AMENITIES_DATA = [
    {
        id: 1,
        category: "CẢNH QUAN XANH",
        title: "Bãi Cỏ Đa Năng – Vườn Thư Giãn",
        description:
            "Không gian xanh mát, nơi cư dân tận hưởng những phút giây thư giãn và tổ chức các hoạt động dã ngoại gia đình.",
        details:
            "Tận hưởng sự yên bình giữa lòng đô thị sầm uất với thảm cỏ xanh mướt và không khí trong lành.",
        src: "/amenities/bai-co-da-nang-vuon-thu-gian.png",
    },
    {
        id: 2,
        category: "KHÔNG GIAN CỘNG ĐỒNG",
        title: "Công Viên Quảng Trường (8.000 m²)",
        description:
            "Quảng trường rộng lớn tích hợp nhiều khu vực sinh hoạt chung, lễ hội và sự kiện cộng đồng sôi động.",
        details:
            "Nơi kết nối cộng đồng văn minh, tổ chức các hoạt động văn hóa nghệ thuật và vui chơi ngoài trời quy mô lớn.",
        src: "/amenities/cong-vien-quang-truong-8000m2.png",
    },
    {
        id: 3,
        category: "ĐẶC QUYỀN NGHỈ DƯỠNG",
        title: "Hồ Bơi Ốc Đảo (395 m²)",
        description:
            "Hồ bơi thiết kế phong cách ốc đảo nhiệt đới, mang lại cảm giác nghỉ dưỡng sang trọng ngay tại nhà.",
        details:
            "Làn nước trong xanh cùng cảnh quan thiên nhiên bao quanh tạo nên một thiên đường nghỉ dưỡng riêng tư.",
        src: "/amenities/ho-boi-oc-dao-395m2.png",
    },
    {
        id: 4,
        category: "ĐẶC QUYỀN NGHỈ DƯỠNG",
        title: "Hồ Bơi Vô Cực (Tầng 7)",
        description:
            "Tận hưởng tầm nhìn panorama tuyệt đẹp từ hồ bơi vô cực tọa lạc tại tầng 7 của tòa tháp đôi cao cấp.",
        details:
            "Trải nghiệm cảm giác bơi lội giữa không trung và ngắm nhìn toàn cảnh thành phố lung linh từ trên cao.",
        src: "/amenities/ho-boi-vo-cuc-tang-7-thap-doi.png",
    },
    {
        id: 5,
        category: "NGHỆ THUẬT CẢNH QUAN",
        title: "Khu Cảnh Quan Đa Tầng",
        description:
            "Điểm nhấn nghệ thuật với hệ thống nhạc nước hiện đại và cảnh quan đa tầng xanh mướt, lung linh về đêm.",
        details:
            "Sự kết hợp hoàn hảo giữa ánh sáng, âm nhạc và nước mang đến những màn trình diễn mãn nhãn mỗi tối.",
        src: "/amenities/khu-canh-quang-da-tang-nhac-nuoc.png",
    },
    {
        id: 6,
        category: "ƯƠM MẦM TƯƠNG LAI",
        title: "Nhà Trẻ & Hệ Thống B.School",
        description:
            "Môi trường giáo dục chất lượng cao ngay trong nội khu, giúp cha mẹ hoàn toàn yên tâm về sự phát triển của con trẻ.",
        details:
            "Cơ sở vật chất hiện đại cùng đội ngũ giáo viên tâm huyết, chuẩn bị nền tảng vững chắc cho tương lai của bé.",
        src: "/amenities/nha-tre-he-thong-bschool.png",
    },
    {
        id: 7,
        category: "GIẢI TRÍ CAO CẤP",
        title: "Rạp Chiếu Phim Hiện Đại",
        description:
            "Trải nghiệm điện ảnh đỉnh cao với hệ thống rạp chiếu phim hiện đại tọa lạc tại khối đế thương mại.",
        details:
            "Thoải mái tận hưởng những bộ phim bom tấn với âm thanh sống động và màn hình sắc nét ngay tại nơi ở.",
        src: "/amenities/rap-chieu-phim-tang-4-5-thap-doi.png",
    },
    {
        id: 8,
        category: "THỂ THAO & VUI CHƠI",
        title: "Sân Bóng Rổ & Khu Vui Chơi",
        description:
            "Khu vực rèn luyện thể chất và sân chơi trẻ em an toàn, khuyến khích lối sống năng động cho mọi lứa tuổi.",
        details:
            "Không gian vận động ngoài trời lý tưởng để trẻ em vui đùa và cư dân rèn luyện sức khỏe mỗi ngày.",
        src: "/amenities/san-bong-ro-khu-vui-choi-tre-em.png",
    },
    {
        id: 9,
        category: "BIỂU TƯỢNG SỐNG",
        title: "Căn Hộ Cao Cấp (Tầng 8 – 36)",
        description:
            "Không gian sống đẳng cấp với thiết kế hiện đại tại các tầng cao, ôm trọn tầm nhìn về phía trung tâm thành phố.",
        details:
            "Kiến trúc tinh tế kết hợp tối ưu ánh sáng tự nhiên, mang lại phong cách sống thượng lưu và quý phái.",
        src: "/amenities/thap-doi-tang-8-36.png",
    },
    {
        id: 10,
        category: "BIỂU TƯỢNG KIẾN TRÚC",
        title: "Cầu Kính – Điểm Nhấn Kiến Trúc",
        description:
            "Chiếc cầu kính nối liền hai tòa tháp, là biểu tượng kiến trúc độc đáo mang đến trải nghiệm thị giác ấn tượng.",
        details:
            "Một tuyệt tác kiến trúc không chỉ kết nối không gian mà còn là điểm check-in đẳng cấp cho cư dân.",
        src: "/amenities/toa-thap-doi-cau-kinh-an-tuong.png",
    },
];

const AmenitiesItem = ({
    item,
    index,
    onImageClick,
}: {
    item: (typeof AMENITIES_DATA)[0];
    index: number;
    onImageClick: (src: string, title: string) => void;
}) => {
    const isEven = index % 2 === 0;

    return (
        <div
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 mb-16 md:mb-24 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
        >
            {/* Image Side */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 relative group cursor-pointer"
                onClick={() => onImageClick(item.src, item.title)}
            >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                        <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-500 text-white">
                            <IconMaximize className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Floating Category Badge */}
                <div
                    className={`absolute -bottom-4 ${
                        isEven ? "-right-4" : "-left-4"
                    } z-20 hidden md:block`}
                >
                    <div className="bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 px-5 py-2 rounded-full">
                        <span className="text-amber-400 text-xs font-medium uppercase tracking-widest">
                            {item.category}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                className="w-full md:w-1/2 flex flex-col items-start"
            >
                <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                    {item.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight uppercase">
                    {item.title}
                </h3>
                <div className="w-16 h-px bg-amber-500/50 mb-6" />
                <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
                    {item.description}
                </p>

                {item.details && (
                    <div className="mt-6 pt-6 border-t border-white/10 w-full">
                        <p className="text-amber-300/80 italic font-light text-sm md:text-base">
                            "{item.details}"
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const AmenitiesSection: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<{
        src: string;
        title: string;
    } | null>(null);

    // Handle ESC key to close lightbox modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedImage]);

    const scrollToContact = () => {
        const el = document.getElementById("dang-ky");
        if (el) {
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - 80,
                behavior: "smooth",
            });
        }
    };

    return (
        <section
            id="tien-ich"
            className="relative bg-[#0f223d] py-16 md:py-28 overflow-hidden"
        >
            {/* Navigation Anchors */}
            <div id="tien-ich-noi-khu" className="absolute top-0 left-0" />
            <div id="dac-quyen-cu-dan" className="absolute top-0 left-0" />

            {/* Sparkles Ambient */}
            <div
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                }}
            >
                <SparklesCore
                    id="amenities-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.2}
                    particleDensity={40}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                    speed={0.3}
                />
            </div>

            {/* Decorative Background Glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 md:mb-15"
                >
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                        74+ TIỆN ÍCH ĐẲNG CẤP
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight">
                        TRẢI NGHIỆM SỐNG <br />{" "}
                        <span className="text-amber-400">ALL-IN-ONE</span>
                    </h2>
                    <p className="text-white/60 text-sm md:text-base font-light max-w-xl mx-auto mt-4">
                        Hệ sinh thái tiện ích toàn diện từ thể thao, giải trí
                        đến giáo dục — đáp ứng trọn vẹn mọi nhu cầu sống hiện
                        đại.
                    </p>
                    <div className="w-24 h-px bg-amber-500/30 mx-auto mt-8" />
                </motion.div>

                {/* Editorial Alternating Feed */}
                <div>
                    {AMENITIES_DATA.map((item, index) => (
                        <AmenitiesItem
                            key={item.id}
                            item={item}
                            index={index}
                            onImageClick={(src, title) =>
                                setSelectedImage({ src, title })
                            }
                        />
                    ))}
                </div>

                {/* Bottom CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 rounded-3xl p-8 md:p-12 text-center mt-12 backdrop-blur-md flex flex-col items-center gap-6"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase">
                        Trải Nghệ Không Gian Sống{" "}
                        <span className="text-amber-400">Thực Tế</span>
                    </h3>
                    <p className="text-white/70 text-sm md:text-base font-light max-w-xl">
                        Đăng ký ngay hôm nay để nhận thông tin chi tiết và tham
                        quan trực tiếp dự án Bcons Center City!
                    </p>
                    <button
                        onClick={scrollToContact}
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] active:scale-95 flex items-center gap-2"
                    >
                        Đăng Ký Tham Quan Nhà Mẫu
                        <IconArrowRight size={16} />
                    </button>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full h-full max-h-[85vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 p-3 text-white/70 hover:text-white transition-colors z-[210] cursor-pointer"
                            >
                                <IconX size={32} />
                            </button>

                            {/* Image Container */}
                            <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                                />
                            </div>

                            {/* Title */}
                            <div className="mt-4 text-center">
                                <p className="text-amber-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
                                    {selectedImage.title}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AmenitiesSection;
