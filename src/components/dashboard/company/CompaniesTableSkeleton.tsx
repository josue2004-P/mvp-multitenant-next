"use client";

export  function CompaniesTableSkeleton() {
  // 🔹 Creamos un arreglo de 5 elementos para simular 5 filas cargando
  const fakeRows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Razón Social
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estatus
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {fakeRows.map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
