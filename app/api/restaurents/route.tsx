// app/api/restaurents/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import clientPromise from "@/app/lib/mongodb";

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        const restaurantName = formData.get("restaurantName")?.toString();
        const menuItemsString = formData.get("menuItems")?.toString();

        if (!restaurantName || !menuItemsString) {
            return NextResponse.json({ message: "Fields missing" }, { status: 400 });
        }

        let menuItems;
        try {
            menuItems = JSON.parse(menuItemsString);
        } catch {
            return NextResponse.json({ message: "Invalid menuItems JSON" }, { status: 400 });
        }

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        // Cover image
        const coverFile = formData.get("coverImage") as File | null;
        let coverImagePath = "";
        if (coverFile) {
            const buffer = Buffer.from(await coverFile.arrayBuffer());
            const filePath = path.join(uploadDir, coverFile.name);
            fs.writeFileSync(filePath, buffer);
            coverImagePath = `/uploads/${coverFile.name}`;
        }

        // Gallery images
        const galleryFiles = formData.getAll("galleryImages") as File[];
        const galleryPaths: string[] = [];
        for (const file of galleryFiles) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(uploadDir, file.name);
            fs.writeFileSync(filePath, buffer);
            galleryPaths.push(`/uploads/${file.name}`);
        }

        // Insert into MongoDB
        const client = await clientPromise;
        const db = client.db("flavorDashweb");
        const result = await db.collection("restaurents").insertOne({
            name: restaurantName,
            coverImage: coverImagePath,
            galleryImages: galleryPaths,
            menuItems,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: "Restaurant added", restaurantId: result.insertedId }, { status: 201 });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ message: "Server error", error: String(err) }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        const client = await clientPromise;
        const db = client.db("flavorDashweb");
        const collection = db.collection("restaurents");

        const restaurants = await collection
            .find({}, { projection: { name: 1, coverImage: 1, _id: 1 } }) // fetch name + coverImage + id
            .toArray();

        return NextResponse.json({ restaurants }, { status: 200 });
    } catch (err) {
        console.error("GET restaurants error:", err);
        return NextResponse.json({ message: "Failed to fetch restaurants", error: String(err) }, { status: 500 });
    }
};
