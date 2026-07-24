export async function submitFormClient(data: {
    fullName?: string;
    phone: string;
    apartmentType?: string;
    bankSupport?: string;
    visitSchedule?: string;
    source?: string;
    interest?: string;
    budget?: string;
    note?: string;
}) {
    const WEB3FORMS_KEY = "feea6998-721f-402d-8f1b-b3c9e02391f8";

    // 1. Submit to Web3Forms directly from client
    const web3Promise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: data.fullName || "Khách hàng mới",
            email: "no-reply@bconscenter.com",
            phone: data.phone || "",
            subject: `[Đăng ký mới] Bcons Center City - ${data.source || "Website"}`,
            from_name: "Bcons Center City Landing Page",
            message: `Có khách hàng mới đăng ký qua ${data.source || "Website"}.\n\nHọ tên: ${data.fullName || "N/A"}\nSố điện thoại: ${data.phone}\nLoại căn quan tâm: ${data.apartmentType || data.interest || "N/A"}\nNgân sách: ${data.budget || "N/A"}\nGhi chú: ${data.note || "N/A"}\nHỗ trợ ngân hàng: ${data.bankSupport || "N/A"}\nLịch thăm nhà mẫu: ${data.visitSchedule || "N/A"}`,
        }),
    }).catch((err) => console.error("Web3Forms Error:", err));

    // 2. Submit to our API route for Google Sheets / Server logging
    const apiPromise = fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).catch((err) => console.error("API Error:", err));

    // Wait for both requests to complete
    const [web3Res, apiRes] = await Promise.all([web3Promise, apiPromise]);

    if (web3Res && !web3Res.ok) {
        console.error("Web3Forms failed with status:", web3Res.status);
    }

    if ((!web3Res || !web3Res.ok) && (!apiRes || !apiRes.ok)) {
        throw new Error("Tất cả kết nối đều thất bại");
    }

    return true;
}
