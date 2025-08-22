import { getCompaniesRequest } from "@/services/companyService";
import { CompanyResponse } from "@/types/company";

export class GetCompaniesUseCase {
  async execute(): Promise<CompanyResponse> {
    return await getCompaniesRequest(); 
  }
}
