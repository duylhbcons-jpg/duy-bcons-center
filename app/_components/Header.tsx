"use client";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
    { label: "Tổng quan", href: "/#tong-quan" },
    { label: "Vị trí", href: "/#vi-tri" },
    { label: "Tiện ích", href: "/#tien-ich" },
    { label: "Mặt bằng", href: "/#mat-bang" },
    { label: "Chính sách", href: "/#chinh-sach" },
    { label: "Liên hệ", href: "/#dang-ky" },
];

const Header: React.FC = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = NAV_ITEMS.map((item) => item.href.replace("/#", ""));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${id}`);
                    }
                },
                { threshold: 0.35, rootMargin: "-80px 0px 0px 0px" },
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            const isHomePage = pathname === "/";
            const targetId = href.split("#")[1];

            if (isHomePage && targetId) {
                e.preventDefault();
                const el = document.getElementById(targetId);
                if (el) {
                    const headerOffset = 80;
                    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - headerOffset,
                        behavior: "smooth",
                    });
                }
            }
            setMobileMenuOpen(false);
        },
        [pathname],
    );

    return (
        <>
            <header
                id="main-header"
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
                    scrolled
                        ? "py-2 backdrop-blur-2xl bg-white/80 border-b border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
                        : "py-4 bg-transparent"
                }`}
            >
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="group block" aria-label="Bcons Center City - Trang chủ">
                            <div
                                className={`transition-all duration-500 relative ${
                                    scrolled ? "h-10 sm:h-12 w-32" : "h-14 sm:h-20 w-44"
                                }`}
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, #f59e0b 0%, #f59e0b 22%, #1a1a2e 22%, #1a1a2e 100%)",
                                    WebkitMaskImage: 'url("/logo/logo bcon center.png")',
                                    maskImage: 'url("/logo/logo bcon center.png")',
                                    WebkitMaskSize: "contain",
                                    maskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    maskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                    maskPosition: "center",
                                }}
                                aria-label="Bcons Center City Logo"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-all duration-300 rounded-full ${
                                    activeSection === `#${item.href.split("#")[1]}`
                                        ? "text-gray-900 bg-black/5"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-black/5"
                                }`}
                            >
                                {item.label}
                                {activeSection === `#${item.href.split("#")[1]}` && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Right Section: Hotline + CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Hotline */}
                        <a
                            href="tel:0822688882"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all duration-300 group border border-amber-200/50 shadow-sm"
                            aria-label="Gọi hotline tư vấn"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 text-[10px] items-center justify-center text-white">
                                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </span>
                            </span>
                            <span className="text-sm font-bold tracking-tight">0822.6888.82</span>
                        </a>

                        <span className="w-px h-4 bg-gray-300" />

                        {/* CTA Button */}
                        <a
                            href="#dang-ky"
                            onClick={(e) => handleNavClick(e, "#dang-ky")}
                            className="group relative inline-flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm tracking-wider uppercase rounded-full px-6 py-3 hover:bg-amber-500 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                        >
                            <span className="relative z-10">Nhận Báo Giá</span>
                            <svg
                                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile: CTA + Hamburger */}
                    <div className="flex lg:hidden items-center gap-3">
                        <a
                            href="#dang-ky"
                            onClick={(e) => handleNavClick(e, "#dang-ky")}
                            className="inline-flex items-center gap-1.5 bg-gray-900 text-white font-semibold text-xs tracking-wider uppercase rounded-full px-5 py-2.5 active:scale-95 transition-all duration-300 shadow-lg"
                        >
                            <span>Báo Giá</span>
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-black/5 border border-black/10 backdrop-blur-sm hover:bg-black/10 transition-all duration-300 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <span className={`w-5 h-[1.5px] bg-gray-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[3.75px]" : ""}`} />
                            <span className={`w-5 h-[1.5px] bg-gray-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.75px]" : ""}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[99] lg:hidden transition-all duration-500 ${
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-xl"
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white border-l border-gray-200 shadow-2xl transition-transform duration-500 ease-out ${
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="h-20" />
                    <nav className="flex flex-col px-8 gap-1">
                        {NAV_ITEMS.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="flex items-center justify-between py-4 border-b border-gray-100 text-base font-light tracking-wider uppercase transition-all duration-300 text-gray-400 hover:text-gray-900"
                                style={{
                                    transitionDelay: mobileMenuOpen ? `${index * 60}ms` : "0ms",
                                    opacity: mobileMenuOpen ? 1 : 0,
                                    transform: mobileMenuOpen ? "translateX(0)" : "translateX(30px)",
                                }}
                            >
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Footer Info */}
                    <div className="absolute bottom-0 left-0 w-full px-8 pb-10">
                        <a
                            href="tel:0822688882"
                            aria-label="Gọi điện thoại tư vấn"
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/50 transition-all duration-300 mb-8 active:scale-95 shadow-sm"
                        >
                            <div className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <div className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-white items-center justify-center">
                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-base font-bold tracking-tight">0822.6888.82</span>
                        </a>

                        <a
                            href="#dang-ky"
                            onClick={(e) => handleNavClick(e, "#dang-ky")}
                            className="flex items-center justify-center gap-2.5 w-full bg-gray-900 text-white font-bold text-sm tracking-wider uppercase rounded-full py-4 active:scale-95 transition-all duration-300 shadow-xl"
                        >
                            <span>Nhận Báo Giá</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
