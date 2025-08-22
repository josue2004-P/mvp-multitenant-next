// src/services/companyService.ts
import { axiosClient } from "@/infrastructure/api/AxiosClient";
import { CompanyResponse } from "@/types/company";

export const getCompanyRequest = async (id: string): Promise<CompanyResponse> => {
  const { data } = await axiosClient.get(`/companies/${id}`);
  return data;
};

export const getCompaniesRequest = async (): Promise<CompanyResponse> => {
  const { data } = await axiosClient.get("/companies");
  return data;
};
