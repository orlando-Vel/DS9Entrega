import React from "react";

const WelcomeImage = () => {
  return (
    <section
      className="bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: "url('naturaleza4.jpg')" }}
    >
      <div className="h-full flex items-center justify-center text-center">
        <div className="bg-black bg-opacity-50 p-4 sm:p-10 rounded">
          <h1 className="text-white text-2xl sm:text-4xl font-bold">
            Descubre tu Próxima Aventura
          </h1>
          <p className="text-white text-sm sm:text-lg mt-4">
            Explora el país de una manera diferente, conecta con la naturaleza,
            visita bosques, senderos y montañas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeImage;
