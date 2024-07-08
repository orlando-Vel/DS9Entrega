import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axiosInstance from "../axiosInstance";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";

const PaypalButton = () => {
  const { cartItems, calculateTotal, clearCart } = useCart();
  const totalValue = calculateTotal();
  const { userEmail, userId } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    console.log("Email del usuario en PaypalButton:", userEmail);
  }, [userEmail]);

  const handleOrderApproval = async (data, actions) => {
    try {
      const order = await actions.order.capture();

      if (!userEmail) {
        throw new Error(
          "No se pudo obtener el correo electrónico del usuario."
        );
      }

      // Generar el cuerpo del correo electrónico como factura
      const emailBody = generateEmailBody(order);

      // Enviar el correo electrónico al backend utilizando el email del usuario
      const responseEmail = await axiosInstance.post("/paypal/send-mail", {
        destinatario: userEmail,
        asunto: "Recibo de tu compra",
        cuerpo: emailBody,
        amount: order.purchase_units[0].amount.value,
      });

      // Almacenar los detalles de la compra en el backend
      const responseOrder = await axiosInstance.post("/orders", {
        userId,
        createTime: order.create_time,
        orderId: order.id,
        intent: order.intent,
        payerEmail: order.payer.email_address,
        payerId: order.payer.payer_id,
        country: order.payer.address.country_code,
        status: order.status,
        updateTime: order.update_time,
      });

      console.log("Correo enviado:", responseEmail.data);
      console.log("Orden guardada:", responseOrder.data);

      setShowConfirmation(true);

      setTimeout(() => {
        clearCart();
      }, 3000);
    } catch (error) {
      console.error("Error al procesar la orden:", error);
      alert(
        "Hubo un error al procesar tu orden. Por favor, intenta nuevamente más tarde."
      );
    }
  };

  // Función para generar el cuerpo del correo electrónico como factura
  const generateEmailBody = (order) => {
    let cuerpo = `
      <h2>¡Gracias por tu compra!</h2>
      <h3>Detalles de la compra:</h3>
      <p><strong>ID de Transacción:</strong> ${order.id}</p>
      <p><strong>Fecha de la transacción:</strong> ${new Date(
        order.create_time
      ).toLocaleString()}</p>
      <p><strong>Estado de la transacción:</strong> ${order.status}</p>
      <h3>Detalles del pagador:</h3>
      <p><strong>Email:</strong> ${order.payer.email_address}</p>
      <p><strong>ID del pagador:</strong> ${order.payer.payer_id}</p>
      <p><strong>País:</strong> ${order.payer.address.country_code}</p>
      <h3>Detalles de la compra:</h3>
    `;

    order.purchase_units.forEach((unit) => {
      cuerpo += `
        <p><strong>Descripción:</strong> ${unit.description}</p>
        <p><strong>Precio:</strong> ${unit.amount.value} ${unit.amount.currency_code}</p>
      `;
    });

    cuerpo += `
      <h3>Total:</h3>
      <p><strong>Total de la compra:</strong> ${order.purchase_units[0].amount.value} ${order.purchase_units[0].amount.currency_code}</p>
      <p>Gracias por tu compra.</p>
    `;

    return cuerpo;
  };

  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalValue.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={handleOrderApproval}
      />
      {showConfirmation && (
        <div
          id="confirmation-message"
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">¡Compra realizada con éxito!</strong>
          <span className="block sm:inline">
            {" "}
            Se ha enviado un recibo a su correo electrónico.
          </span>
        </div>
      )}
    </div>
  );
};

export default PaypalButton;
