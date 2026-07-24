import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const headersList = await headers();

        // Extract client IP and Geo data
        const clientIp =
            headersList.get("cf-connecting-ip") ||
            headersList.get("x-real-ip") ||
            headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown";

        const clientCountry = headersList.get("cf-ipcountry") || "VN";

        const {
            fullName,
            name,
            phone,
            apartmentType,
            interest,
            budget,
            note,
            bankSupport,
            visitSchedule,
            source,
        } = body;

        const userName = fullName || name || "Khách hàng mới";

        // Environment variables
        const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";
        const submissions = [];

        // 1. Google Sheets Submission
        if (GOOGLE_SCRIPT_URL) {
            submissions.push(
                fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fullName: String(userName),
                        phone: String(phone || ""),
                        apartmentType: String(apartmentType || interest || ""),
                        budget: String(budget || ""),
                        note: String(note || ""),
                        bankSupport: String(bankSupport || ""),
                        visitSchedule: String(visitSchedule || ""),
                        source: String(source || "Website Contact Form"),
                        _ref: clientIp,
                        _geo: clientCountry,
                        _timestamp: new Date().toISOString(),
                    }),
                }).catch((err) => {
                    console.error("Google Sheets Error:", err);
                    return null;
                })
            );
        }

        if (submissions.length > 0) {
            await Promise.all(submissions);
        }

        return NextResponse.json(
            { success: true, message: "Form submitted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Critical API Error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
