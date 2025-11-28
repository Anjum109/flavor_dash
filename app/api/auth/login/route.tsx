import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // JWT
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1d" });

        // Server-side cookie
        const res = NextResponse.json({ message: "Login successful", role: user.role });
        res.cookies.set("token", token, {
            httpOnly: true, // server-only
            secure: false,
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return res;

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
