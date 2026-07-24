import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import FloatingContact from "./_components/FloatingContact";

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ["latin", "vietnamese"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
    title: "Căn Hộ Bcons Center City Dĩ An Bình Dương - Bảng Giá & Xem Nhà Mẫu 2026",
    description:
        "Căn hộ chung cư Bcons Center City tại Dĩ An Bình Dương - Giá chỉ từ 1.6 tỷ/căn. Tham quan nhà mẫu, nhận bảng giá chi tiết, pháp lý rõ ràng. Ưu đãi tặng 2 chỉ vàng, thanh toán chỉ 15% ký HĐMB. Hotline tư vấn trực tiếp!",
    keywords: [
        // Google Ads Keywords - Exact Match
        "bcons center city",
        "bcons city",
        "bcons city bình dương",
        "dự án bcons center city",
        "dự án bcons city",
        "vị trí bcons center city",
        "giá căn hộ bcons center city",
        "bảng giá bcons center city",
        "mua căn hộ bcons center city",
        "căn hộ bcons city",
        "nhà mẫu bcons center city",
        "pháp lý bcons center city",
        "suất nội bộ bcons center city",
        // Broad Match
        "chung cư bình dương",
        "căn hộ bình dương",
        "chung cư dĩ an",
        "căn hộ dĩ an",
        // Primary keywords
        "Bcons Center City Dĩ An",
        "Dự án Bcons Dĩ An",
        "Căn hộ Bcons Bình Dương",
        // Location-based
        "Chung cư Dĩ An Bình Dương",
        "Căn hộ mặt tiền Thống Nhất",
        "Bcons Thống Nhất Dĩ An",
        "Căn hộ gần Thủ Đức",
        "Căn hộ Đông Hòa Dĩ An",
        // Price & type
        "Bcons Center City giá bao nhiêu",
        "Căn hộ giá rẻ Dĩ An",
        "Căn hộ 1 phòng ngủ Dĩ An",
        "Căn hộ 2 phòng ngủ Bình Dương",
        "Căn hộ cao cấp Bình Dương",
        "Mua căn hộ Dĩ An",
        // Developer
        "Bcons Group",
        "Chủ đầu tư Bcons",
        "Dự án Bcons Bình Dương 2026",
        // Long-tail
        "Căn hộ gần metro Bình Dương",
        "Chính sách bán hàng Bcons Center City",
        "Căn hộ liền kề TP Thủ Đức",
        "Dự án căn hộ Thống Nhất Dĩ An Bình Dương",
    ],
    authors: [{ name: "Lê Hữu Duy - Trưởng phòng kinh doanh Bcons" }],
    creator: "Lê Hữu Duy",
    publisher: "Lê Hữu Duy - Đại lý phân phối Bcons",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://www.bconscityduan.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Căn Hộ Bcons Center City Dĩ An Bình Dương - Giá Tốt Trực Tiếp CĐT 2026",
        description:
            "Căn hộ Bcons Center City Dĩ An, Bình Dương. Tham quan nhà mẫu, bảng giá chỉ từ 1.6 tỷ, pháp lý rõ ràng. Ưu đãi tặng 2 chỉ vàng, thanh toán 15% ký HĐMB. Tư vấn ngay!",
        url: "https://www.bconscityduan.com",
        siteName: "Bcons Center City - Căn Hộ Chung Cư Dĩ An Bình Dương",
        locale: "vi_VN",
        type: "website",
        images: [
            {
                url: "/amenities/tổng thể 1.jpg",
                width: 1200,
                height: 630,
                alt: "Phối cảnh tổng thể dự án Bcons Center City Dĩ An Bình Dương",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Căn Hộ Bcons Center City Dĩ An Bình Dương - Giá Tốt Trực Tiếp CĐT 2026",
        description: "Căn hộ chung cư Bcons Center City Dĩ An Bình Dương. Giá chỉ từ 1.6 tỷ/căn. Tặng 2 chỉ vàng. Tư vấn ngay!",
        images: ["/amenities/tổng thể 1.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/logo/logo bcon center.png",
        apple: "/logo/logo bcon center.png",
    },
};

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "ApartmentComplex",
        name: "Bcons Center City",
        alternateName: [
            "Bcons Center City Dĩ An",
            "Chung cư Bcons Center City",
            "Căn hộ Bcons Dĩ An",
            "Bcons City",
            "Bcons City Bình Dương",
        ],
        description:
            "Dự án căn hộ chung cư cao cấp Bcons Center City tại mặt tiền đường Thống Nhất, TP Dĩ An, Bình Dương. Quy mô 1,940 căn hộ với Sky Bridge, TTTM 7 tầng, 74+ tiện ích cao cấp.",
        url: "https://www.bconscityduan.com",
        numberOfAvailableAccommodationUnits: 1940,
        petsAllowed: false,
        address: {
            "@type": "PostalAddress",
            streetAddress: "Đường Thống Nhất, Phường Đông Hòa",
            addressLocality: "Thành phố Dĩ An",
            addressRegion: "Bình Dương",
            addressCountry: "VN",
            postalCode: "820000",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 10.8967,
            longitude: 106.7475,
        },
        amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Sky Bridge", value: true },
            { "@type": "LocationFeatureSpecification", name: "Trung tâm thương mại 7 tầng", value: true },
            { "@type": "LocationFeatureSpecification", name: "Hồ bơi tràn bờ", value: true },
            { "@type": "LocationFeatureSpecification", name: "Phòng gym", value: true },
            { "@type": "LocationFeatureSpecification", name: "Công viên nội khu", value: true },
        ],
        brand: {
            "@type": "Organization",
            name: "Bcons Group",
            url: "https://www.bcons.com.vn",
        },
        provider: {
            "@type": "Person",
            name: "Lê Hữu Duy",
            jobTitle: "Trưởng phòng kinh doanh Bcons",
            telephone: "+84822688882",
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Vị trí Bcons Center City ở đâu?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Dự án Bcons Center City tọa lạc tại mặt tiền đường Thống Nhất, Phường Đông Hòa, TP Dĩ An, Tỉnh Bình Dương - liền kề TP Thủ Đức, TP.HCM.",
                },
            },
            {
                "@type": "Question",
                name: "Giá căn hộ Bcons Center City bao nhiêu?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Giá bán căn hộ Bcons Center City dao động từ 1.6 tỷ đến 3.5 tỷ tùy loại căn 1PN, 2PN, 3PN. Liên hệ 0822688882 để nhận bảng giá chi tiết.",
                },
            },
            {
                "@type": "Question",
                name: "Pháp lý Bcons Center City như thế nào?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Pháp lý Bcons Center City hoàn toàn minh bạch: Dự án có đầy đủ giấy phép xây dựng, quyết định giao đất, phê duyệt 1/500 và đã được cấp phép bán hàng. CĐT cam kết sổ hồng riêng từng căn.",
                },
            },
            {
                "@type": "Question",
                name: "Nhà mẫu Bcons Center City ở đâu?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nhà mẫu Bcons Center City nằm tại số 57 Đường Thống Nhất, P. Đông Hòa, TP. Dĩ An, Bình Dương. Mở cửa Thứ 2 đến Chủ Nhật (8h-20h).",
                },
            },
            {
                "@type": "Question",
                name: "Mua căn hộ Bcons Center City cần thanh toán bao nhiêu?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Mua căn hộ Bcons Center City chỉ cần thanh toán 15% khi ký HĐMB. Ngân hàng hỗ trợ lãi suất 0% và ân hạn gốc 18 tháng.",
                },
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Trang chủ",
                item: "https://www.bconscityduan.com",
            },
        ],
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" className={`scroll-smooth ${beVietnamPro.variable}`} suppressHydrationWarning>
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <noscript>
                    <meta name="description" content="Căn hộ chung cư Bcons Center City Dĩ An Bình Dương - Giá chỉ từ 1.6 tỷ/căn. Hotline: 0822688882" />
                </noscript>
            </head>
            <body className="antialiased bg-background text-foreground overflow-x-hidden">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <Header />
                {children}
                <Footer />
                <FloatingContact />
            </body>
        </html>
    );
}
