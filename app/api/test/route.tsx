
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const result = await db.command({ ping: 1 });

        return NextResponse.json({ status: "connected", result });
    } catch (error) {
        return NextResponse.json({ status: "error", error: String(error) });
    }
}
