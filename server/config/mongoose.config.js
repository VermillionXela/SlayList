import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
    try {
        await connect(MONGODB_URI, {
            dbName: 'slaylist_db',
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log("MongoDB connection error:", error);
        throw error;
    }
}

export default dbConnect;