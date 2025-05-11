
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import towing_serviceRoutes from "./routes/towing_service.route.js";
import user_detRoutes from "./routes/userDetail.route.js"
import mapRoutes from "./routes/maps.router.js"
import checkoutRoutes from "./routes/checkout.routes.js"


dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());//allows to accept JSON data in the req.body

app.use("/api/towing_services",towing_serviceRoutes);
app.use("/api/user_det",user_detRoutes);
app.use("/api/maps", mapRoutes);
app.use("/api", checkoutRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log("Server started at http://localhost:" + PORT );
});

