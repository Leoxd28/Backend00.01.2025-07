import mongoose from "mongoose";

export const connectDB = async () => {
	try {
        const URL = process.env.MONGODB_URI;
		const conn = await mongoose.connect(URL);
		console.log(`Connected to MongoDB ${conn.connection.host}`);
	} catch (error) {
		console.log("Failed to connect to MongoDB", error);
		process.exit(1);
	}
}   