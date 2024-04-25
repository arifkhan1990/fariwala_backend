import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectionDb.js";
import cloudinary from "cloudinary";

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
dotenv.config({
  path: "./.env",
});

// connect db
connectDB()
  .then(() => {
    // create server
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `⚙️ Server is running on http://localhost: ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
