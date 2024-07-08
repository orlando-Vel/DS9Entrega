import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Nombre
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Apellido
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              País
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {user.lastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {user.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
