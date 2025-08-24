"use client";

import { StatusBadge } from "./StatusBadge";
import { ActionButton } from "./ActionButton";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { getRootDomain } from "@/utils/getSubdomain";
import { CompanyRowProps } from "@/types/company";

export function CompanyRow({
  company,
  formatDate,
  onToggleStatus,
}: CompanyRowProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/dashboard/company/edit/${company._id}`);
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900">{company.name}</td>
      <td className="px-6 py-4">
        {company.name}{"."}
        {typeof window !== "undefined"
          ? getRootDomain(window.location.hostname)
          : ""}{".com"}
      </td>

      <td className="px-6 py-4">{company.databaseName}</td>
      <td className="px-6 py-4">{formatDate(company.registrationDate)}</td>
      <td className="px-6 py-4">
        <StatusBadge status={company.status} />
      </td>
      <td className="px-6 py-4 flex gap-2 justify-end">
        {/* Botón Editar */}
        <button
          onClick={handleEdit}
          className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition flex items-center gap-1"
        >
          <PencilIcon className="w-4 h-4" />
          Editar
        </button>

        {/* Botón Activar/Inactivar */}
        <ActionButton
          status={company.status}
          onClick={() => onToggleStatus && onToggleStatus(company._id)}
        />
      </td>
    </tr>
  );
}
