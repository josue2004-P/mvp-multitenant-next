import { Company } from "./Company";

export interface CompaniesState {
  isLoadingCompanies: boolean;
  companies: Company[];
  company: Company | null;
  filtros: any[];
  error: string | null;
}
