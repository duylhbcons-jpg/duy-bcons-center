import HeroBanner from "./_components/HeroBanner";
import OverviewSection from "./_components/OverviewSection";
import LocationSection from "./_components/LocationSection";
import AmenitiesSection from "./_components/AmenitiesSection";
import FloorPlansSection from "./_components/FloorPlansSection";
import PaymentPolicySection from "./_components/PaymentPolicySection";
import ContactSection from "./_components/ContactSection";
import MiniContactForm from "./_components/MiniContactForm";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Banner - Parallax + Animated */}
            <HeroBanner />

            {/* Section 1: Tổng quan dự án */}
            <OverviewSection />

            {/* Mini form: sau Overview — người dùng vừa xem tổng quan, CTA nhận bảng giá */}
            <div className="max-w-5xl mx-auto px-4">
                <MiniContactForm
                    source="Mini Form — Sau Tổng Quan"
                    title="Nhận Bảng Giá Chi Tiết Từng Căn"
                    subtitle="Bảng giá cập nhật T7/2026 — Gửi qua Zalo trong 5 phút"
                    variant="gradient"
                />
            </div>

            {/* Section 2: Vị trí chiến lược */}
            <LocationSection />

            {/* Section 3: Tiện ích 74+ */}
            <AmenitiesSection />

            {/* Mini form: sau Tiện ích — người dùng đã bị cuốn hút bởi tiện ích */}
            <div className="max-w-5xl mx-auto px-4 pb-8">
                <MiniContactForm
                    source="Mini Form — Sau Tiện Ích"
                    title="Đặt Lịch Tham Quan Nhà Mẫu Miễn Phí"
                    subtitle="Nhà mẫu mở cửa T2–CN (8h–20h) — Xe đưa đón tận nơi"
                    variant="accent"
                />
            </div>

            {/* Section 4: Mặt bằng căn hộ */}
            <FloorPlansSection />

            {/* Mini form: sau Mặt bằng — người dùng quan tâm căn cụ thể */}
            <div className="max-w-5xl mx-auto px-4 pb-8">
                <MiniContactForm
                    source="Mini Form — Sau Mặt Bằng"
                    title="Giữ Chỗ Căn Đẹp — Chỉ 50 Triệu"
                    subtitle="Chọn căn & tầng yêu thích trước khi hết hàng"
                    variant="dark"
                />
            </div>

            {/* Section 5: Chính sách & Khuyến mãi */}
            <PaymentPolicySection />

            {/* Section 6: Đăng ký tư vấn */}
            <ContactSection />
        </main>
    );
}
