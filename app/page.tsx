import HeroBanner from "./_components/HeroBanner";
import OverviewSection from "./_components/OverviewSection";
import LocationSection from "./_components/LocationSection";
import AmenitiesSection from "./_components/AmenitiesSection";
import FloorPlansSection from "./_components/FloorPlansSection";
import PaymentPolicySection from "./_components/PaymentPolicySection";
import ContactSection from "./_components/ContactSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Banner - Parallax + Animated */}
            <HeroBanner />

            {/* Section 1: Tổng quan dự án */}
            <OverviewSection />

            {/* Section 2: Vị trí chiến lược */}
            <LocationSection />

            {/* Section 3: Tiện ích 74+ */}
            <AmenitiesSection />

            {/* Section 4: Mặt bằng căn hộ */}
            <FloorPlansSection />

            {/* Section 5: Chính sách & Khuyến mãi */}
            <PaymentPolicySection />

            {/* Section 6: Đăng ký tư vấn */}
            <ContactSection />
        </main>
    );
}
