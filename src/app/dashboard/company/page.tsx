"use client";

import { useEffect } from "react";
import { useCompany } from "@/hooks/useCompany";
import { formatDate } from "@/utils/formatetDate";
import { CompaniesTable,CompaniesTableSkeleton } from "@/components/dashboard/company";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function CompaniesListPage() {
  const router = useRouter();
  const {
    companies,
    isLoadingCompanies,
    startLoadCompanies,
    startChangeStatus,
  } = useCompany();

  useEffect(() => {
    startLoadCompanies();
  }, []);

  const handleToggleStatus = (id: string) => {
    const company = companies.find((c) => c._id === id);
    if (!company?.status) return;
    startChangeStatus(id, company.status);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lista de empresas</h1>

        <button
          onClick={() => router.push("/dashboard/company/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Crear Empresa
        </button>
      </div>

      {isLoadingCompanies ? (
        <CompaniesTableSkeleton />
      ) : (
        <CompaniesTable
          companies={companies}
          formatDate={formatDate}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}
