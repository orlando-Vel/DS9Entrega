import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productsRoutes from "./routes/productRoutes.js";
import guidesRoutes from "./routes/guideRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paypalRoutes from "./routes/paypalRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,PATCH,POST, DELETE",
    allowedHeaders:
      "Authorization, Origin, X-Requested-With, Content-Type, Accept",
    credentials: true, // Permite el envío de cookies y encabezados de autorización
  })
);

// Conectar a la base de datos MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("No se pudo conectar a MongoDB", err));

// Ruta principal
app.get("/", (req, res) => {
  res.send("API de Nature in Actions, Proyecto Final de DS9");
});
app.use("/api/products", productsRoutes);
app.use("/api/guides", guidesRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/paypal", paypalRoutes);
app.use("/api/orders", orderRoutes);

// Rutas de autenticación (generación de token JWT)
app.use("/api/auth", authRoutes);

//Rutas para obtener usuarios
app.use("/api/users", userRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
