import { Router } from "express";
import { enviarCorreo } from "../mailer";
const router = Router();

// Maneja la aprobación de la orden de PayPal
const handleOrderApproval = async (req, res) => {
  try {
    const { destinatario, asunto, cuerpo, aprobado } = req.body;

    // Verificar si el pago está aprobado
    if (!aprobado) {
      return res.status(400).json({ error: "Pago no aprobado" });
    }

    // Llama a la función para enviar el correo electrónico
    await enviarCorreo(destinatario, asunto, cuerpo);

    // Envía una respuesta al cliente
    res.status(200).json({ message: "Compra realizada con éxito" });
  } catch (error) {
    console.error("Error al procesar la orden:", error);
    res.status(500).json({ error: "Error al procesar la orden" });
  }
};

export default {
  handleOrderApproval,
};
