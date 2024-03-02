import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

//database connection
mongoose.set("strictQuery", false);
// const connect = () => {
//   try {
//      mongoose.connect('mongodb+srv://Bala:Vi1L8aYC35XC9IWa@cluster0.emmlb6n.mongodb.net/cluster0?retryWrites=true&w=majority', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("MongoDB database connected");
//   } catch (err) {
//     console.log("MongoDB database connection failed");
//   }
// };
const url = process.env.MONGO_URI;
mongoose.connect(url, () => {
  console.log("Database connected");
});

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(5000, () => {
  // connect();
  console.log("server listening on port", 5000);
});