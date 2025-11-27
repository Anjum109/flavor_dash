import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// For development: avoid creating multiple connections
if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        console.log("🔄 Running MongoDB connection (development)...");
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect().then(() => {
            console.log("✅ MongoDB Connected Successfully (Development)");
            return client;
        });
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // For production: simple connection
    console.log("🔄 Running MongoDB connection (production)...");
    client = new MongoClient(uri, options);
    clientPromise = client.connect().then(() => {
        console.log("✅ MongoDB Connected Successfully (Production)");
        return client;
    });
}

export default clientPromise;
