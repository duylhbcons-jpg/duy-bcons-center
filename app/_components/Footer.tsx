"use client";
import React from "react";
import { motion } from "motion/react";
import {
    IconPhone,
    IconMail,
    IconMapPin,
    IconBrandFacebook,
    IconBrandYoutube,
    IconBrandTiktok,
    IconBuildingSkyscraper,
} from "@tabler/icons-react";

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#f5f2ed] pt-24 pb-12 overflow-hidden">
            {/* Ambient decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-500/3 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/3 blur-[100px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-12 mb-20">
                    {/* Brand column */}
                    <div className="md:col-span-12 lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                                BCONS{" "}
                                <span className="text-amber-500 font-light italic">CENTER CITY</span>
                            </h2>
                            <div className="w-12 h-px bg-amber-500/40 mt-3" />
                        </motion.div>

                        <div className="space-y-4 max-w-md">
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                Trang web được quản lý bởi{" "}
                                <span className="text-gray-900 font-medium">Lê Hữu Duy</span> — Trưởng phòng kinh
                                doanh, đại lý phân phối chính thức các dự án của Tập đoàn Bcons.
                            </p>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                Với hệ sinh thái căn hộ hiện đại tại TP. Dĩ An và khu Đông Sài Gòn, Bcons Center
                                City không chỉ cung cấp một nơi ở, mà còn kiến tạo một cộng đồng văn minh, tiện
                                nghi trọn vẹn.
                            </p>
                        </div>

                        {/* Social */}
                        <div className="flex gap-4">
                            {[
                                { href: "https://www.facebook.com/thebconscenter/", icon: <IconBrandFacebook size={20} /> },
                                { href: "#", icon: <IconBrandYoutube size={20} /> },
                                { href: "#", icon: <IconBrandTiktok size={20} /> },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact column */}
                    <div className="md:col-span-6 lg:col-span-4 space-y-8">
                        <h3 className="text-gray-900 font-semibold uppercase tracking-[0.2em] text-[10px]">
                            Liên Hệ Tư Vấn
                        </h3>
                        <div className="space-y-6">
                            {[
                                {
                                    icon: <IconBuildingSkyscraper size={18} className="text-amber-500/80" />,
                                    title: "Sàn Giao Dịch Bhome - CĐT Bcons",
                                    desc: "Số 57 Đường Thống Nhất, P. Đông Hòa, Dĩ An, Bình Dương",
                                },
                                {
                                    icon: <IconPhone size={18} className="text-amber-500/80" />,
                                    title: "Hotline Tư Vấn",
                                    desc: "0822.6888.82",
                                    href: "tel:0822688882",
                                },
                                {
                                    icon: <IconMail size={18} className="text-amber-500/80" />,
                                    title: "Email Hỗ Trợ",
                                    desc: "duylh.bcons@gmail.com",
                                    href: "mailto:duylh.bcons@gmail.com",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1 p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 group-hover:text-amber-500 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{item.title}</p>
                                        {item.href ? (
                                            <a href={item.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors block leading-snug font-light">
                                                {item.desc}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-gray-600 leading-snug font-light">{item.desc}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation column */}
                    <div className="md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <h3 className="text-gray-900 font-semibold uppercase tracking-[0.2em] text-[10px]">Khám Phá</h3>
                            <ul className="space-y-4">
                                {[
                                    { href: "/#tong-quan", label: "Tổng quan" },
                                    { href: "/#vi-tri", label: "Vị trí" },
                                    { href: "/#tien-ich", label: "Tiện ích" },
                                    { href: "/#mat-bang", label: "Mặt bằng" },
                                    { href: "/#chinh-sach", label: "Chính sách" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-amber-500 hover:translate-x-1 transition-all duration-300 inline-block font-light"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-gray-900 font-semibold uppercase tracking-[0.2em] text-[10px]">Dự Án Bcons</h3>
                            <ul className="space-y-4">
                                {[
                                    { href: "https://bcons.com.vn/bcons-binh-an-dong-tay/", label: "Bình An Đông Tây" },
                                    { href: "https://bconscenter.com.vn/", label: "Bcons Center" },
                                    { href: "https://bcons.com.vn/", label: "Bcons Group" },
                                    { href: "/#dang-ky", label: "Liên hệ đặt cọc" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="text-gray-400 text-sm hover:text-amber-500 hover:translate-x-1 transition-all duration-300 inline-block font-light"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-1">
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest">
                            © {new Date().getFullYear()} Bcons Center City
                        </p>
                        <div className="space-y-1.5 mt-2 border-l-2 border-amber-500/20 pl-3">
                            <p className="text-gray-500 text-[10px] leading-relaxed font-medium">
                                Trang web này được thiết kế và quản lý bởi Lê Hữu Duy – Trưởng phòng kinh doanh
                                Công ty Cổ phần Bất động sản Bcons Homes (Đại lý phân phối các dự án của Tập đoàn Bcons).
                            </p>
                            <p className="text-gray-400 text-[9px] leading-relaxed font-light italic opacity-80">
                                Đây là trang thông tin của đại lý phân phối, không phải trang web chính thức của Chủ đầu tư.
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-[10px] leading-relaxed max-w-2xl text-right font-light italic">
                        *Thông tin, hình ảnh và tiện ích trên website chỉ mang tính chất tham khảo và có thể được
                        điều chỉnh theo quyết định của Chủ đầu tư tại từng thời điểm.
                    </p>
                </div>
            </div>
        </footer>
    );
}
