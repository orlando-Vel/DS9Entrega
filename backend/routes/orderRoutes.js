import { Router } from "express";
import Order from "../models/Orders.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      createTime,
      orderId,
      intent,
      payerEmail,
      payerId,
      country,
      status,
      updateTime,
    } = req.body;

    const newOrder = new Order({
      userId,
      createTime,
      orderId,
      intent,
      payerEmail,
      payerId,
      country,
      status,
      updateTime,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: "Error al procesar la orden" });
  }
});

export default router;
