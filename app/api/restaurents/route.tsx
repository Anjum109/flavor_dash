import { NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // For now, simple JSON input

        const { restaurantName, menuItems } = body;
        if (!restaurantName || !menuItems) {
            return new Response(JSON.stringify({ message: "Fields missing" }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("flavorDashweb");
        const collection = db.collection("restaurents");

        const result = await collection.insertOne({
            name: restaurantName,
            menuItems,
            createdAt: new Date(),
        });

        return new Response(
            JSON.stringify({ message: "Restaurant added", id: result.insertedId }),
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Error", error: String(err) }), { status: 500 });
    }
}
