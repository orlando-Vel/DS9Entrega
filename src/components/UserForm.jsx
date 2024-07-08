import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, initialFormData, isEditing, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);

  // Utilizamos useEffect para actualizar formData cuando initialFormData cambia
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData); // Limpiar el formulario después de enviar
  };

  const handleCancel = () => {
    onCancel(); // Llama a la función onCancel pasada por props
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Formulario para agregar/editar */}
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700">
            País
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="identification" className="block text-gray-700">
            Documento de identidad
          </label>
          <input
            type="text"
            id="identification"
            name="identification"
            value={formData.identification}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700">
            Edad
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Número de Teléfono
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <button
          type="submit"
          className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          {isEditing ? "Actualizar" : "Agregar"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
