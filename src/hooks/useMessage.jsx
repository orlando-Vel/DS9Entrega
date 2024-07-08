// mensaje cuando se añade algo al carrito
import { useState } from "react";

const useMessage = () => {
  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return { message, showMessage };
};

export default useMessage;
