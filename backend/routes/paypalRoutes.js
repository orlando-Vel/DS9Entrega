import express from "express";
import mailer from "../mailer.js";

const router = express.Router();

// Ruta para enviar correo electrónico
router.post("/send-mail", async (req, res) => {
  const { destinatario, asunto, cuerpo, amount } = req.body;

  try {
    await mailer.enviarCorreo(destinatario, asunto, cuerpo, amount);
    res
      .status(200)
      .json({ message: "Correo electrónico enviado correctamente." });
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    res.status(500).json({ error: "Error al enviar el correo electrónico." });
  }
});

export default router;
