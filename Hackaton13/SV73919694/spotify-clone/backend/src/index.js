import 'dotenv/config.js';
import express from 'express';
import router from './router/index.js';
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { connectDB } from './lib/db.js';
import fileUpload from "express-fileupload";
import path from "path";
import cron from "node-cron";
import fs from "fs";

connectDB();

const app = express();
const port = process.env.PORT || 3002;
const __dirname = path.resolve();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.json());
app.use(clerkMiddleware());

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
	})
);

const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

// Ruta raíz
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to the API' });
});

// Autoload routers
app.use('/api', router);

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
