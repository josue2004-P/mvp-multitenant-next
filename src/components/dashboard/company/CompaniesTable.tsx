import { CompanyRow } from "./CompanyRow";
import { CompaniesTableProps } from "../../../types/company";

export function CompaniesTable({
  companies,
  formatDate,
  onToggleStatus,
}: CompaniesTableProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Ruta</th>
            <th className="px-6 py-3">Base Datos</th>
            <th className="px-6 py-3">Fecha Creación</th>
            <th className="px-6 py-3">Estatus</th>
            <th className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <CompanyRow
              key={c._id}
              company={c}
              formatDate={formatDate}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
