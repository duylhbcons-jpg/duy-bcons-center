"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";

/* ─── Data ──────────────────────────────────────────────── */
const SLIDES = [
    {
        src: "/amenities/tổng thể 1.jpg",
        alt: "Phối cảnh tổng thể Bcons Center City - Dĩ An Bình Dương",
        headline: "BCONS",
        headline2: "CENTER CITY",
        sub: "Biểu tượng kiến trúc mới tại cửa ngõ phía Đông",
    },
    {
        src: "/amenities/TÒA THÁP ĐÔI – CẦU KÍNH ẤN TƯỢNG.png",
        alt: "Tòa tháp đôi Bcons Center City - Sky Bridge cầu kính",
        headline: "SKY",
        headline2: "BRIDGE",
        sub: "Cầu kính kết nối đỉnh tháp — biểu tượng chưa từng có tại Bình Dương",
    },
    {
        src: "/amenities/HỒ BƠI VÔ CỰC (TẦNG 7 THÁP ĐÔI).png",
        alt: "Hồ bơi vô cực tầng 7 Bcons Center City",
        headline: "RESORT",
        headline2: "LIVING",
        sub: "Hồ bơi vô cực tầng 7 — nghỉ dưỡng 5 sao ngay tại nhà",
    },
    {
        src: "/amenities/CÔNG VIÊN QUẢNG TRƯỜNG (8.000 m2).png",
        alt: "Công viên quảng trường 8000m2 Bcons Center City",
        headline: "8.000M²",
        headline2: "QUẢNG TRƯỜNG",
        sub: "Không gian xanh trung tâm — nơi kết nối cộng đồng văn minh",
    },
];

const STAT_CARDS = [
    { value: "1.940", label: "Căn hộ", unit: "+" },
    { value: "74", label: "Tiện ích", unit: "+" },
    { value: "1.6", label: "Tỷ/căn", unit: "" },
    { value: "Q4/27", label: "Bàn giao", unit: "" },
];

const SLIDE_DURATION = 6000; // ms

/* ─── Component ─────────────────────────────────────────── */
const HeroBanner: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    // CSS-driven progress: restart animation by toggling a key on the element
    const [progressKey, setProgressKey] = useState(0);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* Pre-load all images so transitions don't stall on network */
    useEffect(() => {
        SLIDES.forEach((s) => {
            const img = new Image();
            img.src = s.src;
        });
    }, []);

    const goTo = useCallback(
        (index: number) => {
            if (transitioning || index === current) return;
            setTransitioning(true);
            setCurrent(index);
            setProgressKey((k) => k + 1);

            // Reset auto-advance timer whenever user manually navigates
            if (autoRef.current) clearInterval(autoRef.current);
            autoRef.current = setInterval(() => {
                setCurrent((c) => {
                    const next = (c + 1) % SLIDES.length;
                    setProgressKey((k) => k + 1);
                    return next;
                });
            }, SLIDE_DURATION);

            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setTransitioning(false), 800);
        },
        [current, transitioning]
    );

    /* Auto-advance */
    useEffect(() => {
        autoRef.current = setInterval(() => {
            setCurrent((c) => {
                const next = (c + 1) % SLIDES.length;
                setProgressKey((k) => k + 1);
                return next;
            });
        }, SLIDE_DURATION);
        return () => {
            if (autoRef.current) clearInterval(autoRef.current);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const scrollToContact = () => {
        const el = document.getElementById("dang-ky");
        if (el) {
            window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
        }
    };

    const slide = SLIDES[current];
    const prev = (current - 1 + SLIDES.length) % SLIDES.length;
    const next = (current + 1) % SLIDES.length;

    return (
        <section
            id="hero-banner"
            className="relative w-full h-screen overflow-hidden bg-black"
            aria-label="Bcons Center City Hero Banner"
        >
            {/* ── CSS KEYFRAMES ────────────────────────────────────── */}
            <style>{`
                @keyframes kenburns {
                    from { transform: scale(1.08); }
                    to   { transform: scale(1); }
                }
                @keyframes progress-fill {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
                @keyframes fade-slide-up {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes scroll-line {
                    0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
                    50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
                    51%  { transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0.3; }
                }
            `}</style>

            {/* ── SLIDE IMAGES — stacked, CSS crossfade ───────────── */}
            {SLIDES.map((s, i) => (
                <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                        zIndex: i === current ? 10 : 5,
                        opacity: i === current ? 1 : 0,
                        transition: "opacity 0.9s ease-in-out",
                        willChange: "opacity",
                    }}
                    aria-hidden={i !== current}
                >
                    <img
                        src={s.src}
                        alt={s.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                        /* Ken Burns via CSS: only active slide zooms */
                        style={
                            i === current
                                ? {
                                      animation: `kenburns ${SLIDE_DURATION}ms linear forwards`,
                                      willChange: "transform",
                                  }
                                : undefined
                        }
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                    />
                </div>
            ))}

            {/* ── CINEMATIC OVERLAYS ───────────────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" style={{ zIndex: 12 }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/15" style={{ zIndex: 12 }} />

            {/* Amber ambient glow */}
            <div
                className="absolute bottom-0 left-1/4 w-[700px] h-[350px] pointer-events-none"
                style={{
                    zIndex: 13,
                    background: "radial-gradient(ellipse, rgba(245,158,11,0.10) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            {/* ── MAIN CONTENT — animates per slide ───────────────── */}
            <div
                className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 px-6 sm:px-10 md:px-16 lg:px-24"
                style={{ zIndex: 30 }}
            >
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-16 w-full max-w-[1440px] mx-auto">

                    {/* LEFT — Text + CTA */}
                    <div className="flex-1 min-w-0">
                        {/* Eyebrow — CSS animation, no motion */}
                        <div
                            key={`ey-${current}`}
                            className="flex items-center gap-3 mb-4"
                            style={{ animation: "fade-slide-up 0.5s ease-out both", animationDelay: "0.05s" }}
                        >
                            <div className="w-8 h-px bg-amber-400" />
                            <span className="text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em]">
                                Dự án chung cư cao cấp
                            </span>
                        </div>

                        {/* Headline — CSS fade, no per-char spanning */}
                        <div key={`hl-${current}`} className="mb-2">
                            <h1
                                className="font-black leading-none text-white"
                                style={{
                                    fontSize: "clamp(3rem, 10vw, 9rem)",
                                    letterSpacing: "-0.02em",
                                    animation: "fade-slide-up 0.55s ease-out both",
                                    animationDelay: "0.12s",
                                }}
                            >
                                {slide.headline}
                            </h1>
                            <h1
                                className="font-black leading-none"
                                style={{
                                    fontSize: "clamp(3rem, 10vw, 9rem)",
                                    letterSpacing: "-0.02em",
                                    background: "linear-gradient(90deg,#f59e0b 0%,#fbbf24 55%,#fde68a 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    animation: "fade-slide-up 0.55s ease-out both",
                                    animationDelay: "0.22s",
                                }}
                            >
                                {slide.headline2}
                            </h1>
                        </div>

                        {/* Sub-headline */}
                        <p
                            key={`sub-${current}`}
                            className="text-white/50 text-sm sm:text-base md:text-lg font-light max-w-lg mb-8 leading-relaxed"
                            style={{ animation: "fade-slide-up 0.5s ease-out both", animationDelay: "0.35s" }}
                        >
                            {slide.sub}
                        </p>

                        {/* CTAs — only animate once on mount, stay stable */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <button
                                onClick={scrollToContact}
                                className="group relative overflow-hidden inline-flex items-center gap-3 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full transition-colors duration-300 active:scale-95 shadow-[0_0_36px_rgba(245,158,11,0.38)] hover:shadow-[0_0_52px_rgba(245,158,11,0.55)]"
                            >
                                Nhận Báo Giá Ngay
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </button>

                            <a
                                href="tel:0822688882"
                                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                            >
                                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                </span>
                                0822 6888 82
                            </a>
                        </motion.div>

                        {/* Promo pills — static, no animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.5 }}
                            className="flex flex-wrap gap-2 mt-5"
                        >
                            {["🎁 Tặng 2 Chỉ Vàng SJC", "⚡ Lãi suất 0% • Ân hạn 18T", "📋 Thanh toán 15% ký HĐMB"].map((pill, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-white/65 text-[10px] sm:text-xs font-medium"
                                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                                >
                                    {pill}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT — Stat cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-row lg:flex-col gap-2 flex-shrink-0 lg:pb-2"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {STAT_CARDS.map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl px-4 py-3 min-w-[80px] hover:border-amber-500/30 transition-colors duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.10)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                    }}
                                >
                                    <div className="text-xl sm:text-2xl font-black text-white leading-none mb-0.5">
                                        {stat.value}
                                        <span className="text-amber-400 text-base">{stat.unit}</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-light">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-white/55 text-xs mt-1"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.10)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                            }}
                        >
                            <span className="text-amber-400">📍</span>
                            <span>Thống Nhất · Dĩ An · Bình Dương</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── SLIDE DOT CONTROLS ───────────────────────────────── */}
            <div
                className="absolute bottom-6 left-6 sm:left-10 md:left-16 lg:left-24 flex items-center gap-3"
                style={{ zIndex: 40 }}
            >
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Slide ${i + 1}`}
                        className="relative h-[3px] rounded-full overflow-hidden cursor-pointer transition-all duration-300"
                        style={{ width: i === current ? 44 : 18, background: "rgba(255,255,255,0.18)" }}
                    >
                        {/* CSS-driven progress — no setInterval state! */}
                        {i === current && (
                            <span
                                key={progressKey}
                                className="absolute inset-y-0 left-0 bg-amber-400 rounded-full"
                                style={{
                                    animation: `progress-fill ${SLIDE_DURATION}ms linear forwards`,
                                    willChange: "width",
                                }}
                            />
                        )}
                    </button>
                ))}
                <span className="text-white/30 text-[10px] font-light tracking-widest ml-2 tabular-nums">
                    {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                </span>
            </div>

            {/* ── PREV / NEXT BUTTONS ──────────────────────────────── */}
            <div
                className="absolute bottom-4 right-6 sm:right-10 md:right-16 lg:right-24 flex items-center gap-2"
                style={{ zIndex: 40 }}
            >
                <button
                    onClick={() => goTo(prev)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white/55 hover:text-white transition-colors duration-200 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.13)" }}
                    aria-label="Slide trước"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => goTo(next)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-200 cursor-pointer"
                    style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.35)" }}
                    aria-label="Slide tiếp"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* ── SCROLL INDICATOR — pure CSS ──────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                style={{ zIndex: 40 }}
            >
                <div className="w-px h-10 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
                    <span
                        className="block w-full bg-amber-400 rounded-full"
                        style={{ animation: "scroll-line 1.6s ease-in-out infinite" }}
                    />
                </div>
                <span className="text-white/25 text-[9px] uppercase tracking-widest">Scroll</span>
            </motion.div>

            {/* ── CORNER LINES ─────────────────────────────────────── */}
            <div className="absolute top-24 right-8 w-px h-24 bg-gradient-to-b from-transparent via-white/12 to-transparent hidden lg:block" style={{ zIndex: 30 }} />
            <div className="absolute top-24 right-8 w-24 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent hidden lg:block" style={{ zIndex: 30 }} />
        </section>
    );
};

export default HeroBanner;
