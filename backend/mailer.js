import { createTransport } from "nodemailer";
import dov from "dotenv";
dov.config();

// Configura el transportador SMTP
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL, // Correo electrónico del remitente
    pass: process.env.PASS, // Contraseña del remitente
  },
});

// Función para enviar correo electrónico
const enviarCorreo = async (destinatario, asunto, cuerpo) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: destinatario,
      subject: asunto,
      html: cuerpo,
    });

    console.log("Correo electrónico enviado correctamente.");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
};

export default {
  enviarCorreo,
};
