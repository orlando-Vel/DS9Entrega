import React from "react";

const Contact = () => {
  return (
    <section className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Contactenos</h2>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Mensaje
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            id="message"
            name="message"
            required
          ></textarea>
        </div>
        <button className="transition transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none bg-black hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Contact;
