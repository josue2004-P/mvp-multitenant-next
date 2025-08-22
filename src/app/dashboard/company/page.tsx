"use client";

import { useEffect } from "react";
import { useCompany } from "@/hooks/useCompany";
export default function CompaniesListPage() {
  const { companies, startLoadCompanies } = useCompany();

  useEffect(() => {
    (async () => {
      await startLoadCompanies();
    })();
  }, []);

  return (
    <div>
      <h1>Lista de empresas</h1>
      {companies.length > 0 ? (
        <ul>
          {companies.map((c) => (
            <li key={c._id}>
              {c.name} - {c.legalName} ({c.status})
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay empresas</p>
      )}
    </div>
  );
}
