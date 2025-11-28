import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    console.log("Token in proxy:", token); // <-- check token

    const url = req.nextUrl.pathname;

    if (url.startsWith("/admin")) {
        if (!token) {
            console.log("No token, redirecting to login");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            console.log("Decoded token:", decoded); // <-- check role
            if (decoded.role !== "admin") {
                console.log("Role not admin, redirecting to not-authorized");
                return NextResponse.redirect(new URL("/not-authorized", req.url));
            }
        } catch (err) {
            console.log("JWT verify error:", err);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
