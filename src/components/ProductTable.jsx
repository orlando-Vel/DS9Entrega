import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Titulo
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Precio
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Duracion
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Provincia
          </th>
          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {product.id}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {product.title}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {product.price}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {product.duration}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {product.province}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
              <button
                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => onEdit(product.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
