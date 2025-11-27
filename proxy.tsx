import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    // Protect admin routes
    if (url.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            if (decoded.role !== "admin") {
                return NextResponse.redirect(new URL("/not-authorized", req.url));
            }
        } catch {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // Protect user dashboard
    if (url.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};
