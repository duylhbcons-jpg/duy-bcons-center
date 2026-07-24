"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    IconCheck,
    IconCalendarStats,
    IconArrowRight,
    IconGift,
    IconBuildingBank,
    IconStar,
} from "@tabler/icons-react";

const PAYMENT_OPTIONS = [
    {
        id: "standard",
        name: "Thanh Toán Chuẩn",
        usp: "Chiết khấu 5.65%",
        description: "Dành cho khách hàng có sẵn dòng tiền nhàn rỗi, muốn tối ưu giá mua.",
        icon: <IconCalendarStats size={24} />,
        items: [
            "Vốn ban đầu 20% ký HĐMB",
            "Thanh toán mỗi 2 tháng chỉ 5%",
            "Tiến độ thanh toán giãn cực nhẹ",
            "Nhận nhà thanh toán 25%",
        ],
        schedule: [
            { milestone: "Ký HĐMB", percentage: "20%" },
            { milestone: "Đợt 2–15 (mỗi 2 tháng)", percentage: "5%/đợt" },
            { milestone: "Thông báo nhận nhà", percentage: "25%" },
            { milestone: "Sổ hồng", percentage: "5%" },
        ],
        featured: false,
    },
    {
        id: "financial",
        name: "Hỗ Trợ Tài Chính",
        usp: "Lãi suất 0% & Ân hạn gốc 18 tháng",
        description: "Lựa chọn phổ biến nhất, tận dụng đòn bẩy tài chính tối đa.",
        icon: <IconBuildingBank size={24} />,
        items: [
            "Vốn tự có ban đầu 20% ký HĐMB",
            "Ngân hàng giải ngân ngay 50%",
            "Không trả gốc lãi đến khi nhận nhà",
            "Nhận nhà mới phải đóng 25%",
        ],
        schedule: [
            { milestone: "Ký HĐMB (Vốn tự có)", percentage: "20%" },
            { milestone: "Ngân hàng giải ngân", percentage: "50%", note: "Lãi suất 0% & Ân hạn 18T" },
            { milestone: "Thông báo nhận nhà", percentage: "25%" },
            { milestone: "Sổ hồng", percentage: "5%" },
        ],
        featured: true,
        ribbon: "LỰA CHỌN TỐI ƯU",
    },
    {
        id: "ocb",
        name: "Vay Linh Hoạt OCB",
        usp: "Vốn ban đầu chỉ 15%",
        description: "Gói đặc quyền kết hợp ngân hàng OCB, tối ưu vốn ban đầu nhất.",
        icon: <IconStar size={24} />,
        items: [
            "Vốn ban đầu siêu nhẹ chỉ 15% ký HĐMB",
            "OCB giải ngân theo tiến độ xây dựng",
            "Hỗ trợ lãi suất & ân hạn gốc 18 tháng",
            "Ưu tiên xét duyệt hồ sơ nhanh",
        ],
        schedule: [
            { milestone: "Ký HĐMB (Vốn tự có)", percentage: "15%" },
            { milestone: "Đợt 2 (Ngân hàng)", percentage: "20%" },
            { milestone: "Đợt 3 (Ngân hàng)", percentage: "10%" },
            { milestone: "Đợt 4 (Ngân hàng)", percentage: "7%" },
            { milestone: "Nhận nhà", percentage: "43%" },
            { milestone: "Sổ hồng", percentage: "5%" },
        ],
        featured: false,
    },
];

const PROMOTIONS = [
    {
        icon: "🏅",
        title: "Tặng 2 Chỉ Vàng SJC",
        desc: "Cho toàn bộ khách hàng đặt cọc trong tháng 7/2026",
        color: "bg-amber-500",
    },
    {
        icon: "🏦",
        title: "Lãi Suất 0%",
        desc: "Ân hạn nợ gốc 18 tháng, ngân hàng OCB & VPBank hỗ trợ",
        color: "bg-blue-500",
    },
    {
        icon: "💎",
        title: "Chiết Khấu 5.65%",
        desc: "Áp dụng cho gói thanh toán sớm 95% trong 30 ngày",
        color: "bg-purple-500",
    },
    {
        icon: "🎁",
        title: "Suất Nội Bộ Ưu Đãi",
        desc: "Giá ưu tiên cho khách đăng ký qua đại lý chính thức",
        color: "bg-green-500",
    },
];

const PaymentPolicySection: React.FC = () => {
    const [selected, setSelected] = useState("financial");

    const selectedOption = PAYMENT_OPTIONS.find((o) => o.id === selected)!;

    const scrollToContact = () => {
        const section = document.getElementById("dang-ky");
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
        }
    };

    return (
        <section id="chinh-sach" className="relative py-20 md:py-28 bg-[#0f223d] overflow-hidden">
            {/* Background decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Promotions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="text-center mb-10">
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.4em] mb-3 block">
                            Ưu Đãi Đặc Biệt
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Chính Sách & <span className="text-amber-400">Khuyến Mãi</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PROMOTIONS.map((promo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                            >
                                <div className={`w-12 h-12 ${promo.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {promo.icon}
                                </div>
                                <h3 className="text-white font-bold text-base mb-2">{promo.title}</h3>
                                <p className="text-white/50 text-sm font-light leading-relaxed">{promo.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Payment Options */}
                <div className="mb-12">
                    <div className="text-center mb-10">
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.4em] mb-3 block">
                            Phương Thức Thanh Toán
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Chọn Phương Án <span className="text-amber-400">Phù Hợp Bạn</span>
                        </h2>
                    </div>

                    {/* Option Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {PAYMENT_OPTIONS.map((option) => (
                            <motion.div
                                key={option.id}
                                onClick={() => setSelected(option.id)}
                                whileHover={{ y: -4 }}
                                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                                    selected === option.id
                                        ? "border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                                        : "border-white/10 hover:border-white/20"
                                }`}
                            >
                                {option.featured && (
                                    <div className="absolute top-0 left-0 right-0 z-10">
                                        <div className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest text-center py-2">
                                            ⭐ {option.ribbon}
                                        </div>
                                    </div>
                                )}

                                <div className={`p-6 md:p-7 bg-white/5 ${option.featured ? "pt-10" : ""}`}>
                                    <div className="text-amber-400 mb-3">{option.icon}</div>
                                    <h3 className="text-white font-bold text-lg mb-1">{option.name}</h3>
                                    <p className="text-amber-400 text-sm font-bold mb-3">{option.usp}</p>
                                    <p className="text-white/50 text-sm font-light mb-5">{option.description}</p>

                                    <ul className="space-y-2">
                                        {option.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                                <IconCheck size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className={`mt-5 w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center transition-all ${
                                        selected === option.id
                                            ? "bg-amber-500 text-black"
                                            : "bg-white/10 text-white"
                                    }`}>
                                        {selected === option.id ? "✓ Đang xem" : "Xem chi tiết"}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detailed Schedule */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                        >
                            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <IconCalendarStats size={20} className="text-amber-400" />
                                Tiến Độ Thanh Toán: {selectedOption.name}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {selectedOption.schedule.map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="text-amber-400 text-xl font-bold mb-1">{item.percentage}</div>
                                        <div className="text-white text-sm font-medium">{item.milestone}</div>
                                        {item.note && (
                                            <div className="text-white/40 text-xs mt-1 font-light">{item.note}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 2 Chi vang image + CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl group"
                    >
                        <img
                            src="/chinh-sach/2-chi-vang.jpg"
                            alt="Ưu đãi tặng 2 chỉ vàng SJC khi mua căn hộ Bcons Center City"
                            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="bg-amber-500 text-black text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                                🎁 Tặng 2 Chỉ Vàng SJC
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Cơ Hội Vàng<br />
                            <span className="text-amber-400">Không Thể Bỏ Lỡ</span>
                        </h3>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                            Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt tháng 7/2026: Tặng{" "}
                            <strong className="text-amber-400">2 chỉ vàng SJC</strong>, lãi suất 0% và ân hạn gốc 18 tháng.
                            Số lượng suất ưu đãi có hạn.
                        </p>

                        <div className="space-y-3">
                            {[
                                "Pháp lý đầy đủ, sổ hồng riêng từng căn",
                                "Chủ đầu tư Bcons Group uy tín 12+ năm",
                                "Bàn giao Quý IV/2027",
                                "Vị trí mặt tiền Thống Nhất, Dĩ An",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <IconCheck size={12} className="text-amber-400" />
                                    </div>
                                    <p className="text-white/70 text-sm font-light">{item}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                onClick={scrollToContact}
                                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <IconGift size={16} />
                                Nhận Ưu Đãi Ngay
                                <IconArrowRight size={16} />
                            </button>
                            <a
                                href="tel:0822688882"
                                className="px-8 py-4 bg-white/10 text-white border border-white/20 hover:bg-white/20 font-bold text-xs uppercase tracking-widest rounded-full transition-all text-center active:scale-95"
                            >
                                📞 Gọi Tư Vấn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PaymentPolicySection;
