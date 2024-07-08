import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./contexts/CartContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GuideProvider } from "./contexts/GuideContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <GuideProvider>
          <PayPalScriptProvider
            options={{
              clientId:
                "Af9Fp38w6PX_u1FcCgHAEc3K1EOoqFg4RQDgY4BEIrsHH4rOYFKvqBcoaQrYea6b4EZh0WD2M-S6dmLy",
            }}
          >
            <App />
          </PayPalScriptProvider>
        </GuideProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
