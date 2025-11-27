import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const user = await db.collection("users").findOne({ email });
        if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        const response = NextResponse.json({ message: "Login successful", role: user.role });
        response.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 });

        return response;
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
