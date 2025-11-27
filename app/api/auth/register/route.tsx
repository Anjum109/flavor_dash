import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, password, role } = await req.json();

        if (!name || !email || !phone || !password || !role) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const newUser = {
            name,
            email,
            phone,
            password: hashedPassword,
            role, // save user/admin role
            createdAt: new Date(),
        };

        await db.collection("users").insertOne(newUser);

        return NextResponse.json({ message: "User registered successfully!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
