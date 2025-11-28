import { NextRequest } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const { id } = params;

        console.log("Deleting user with id:", id);

        if (!id || !ObjectId.isValid(id)) {
            return Response.json({ message: "Invalid user ID" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("flavorDashweb"); // <-- Replace with your DB name
        const collection = db.collection("users"); // <-- Your collection name

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return Response.json({ message: "User not found" }, { status: 404 });
        }

        return Response.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("DELETE error:", err);
        return Response.json({ message: "Failed to delete user", error: String(err) }, { status: 500 });
    }
}
