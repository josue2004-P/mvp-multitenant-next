import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { onLoadCompanies, onSetError } from "@/store/slices/companySlice";
import { GetCompaniesUseCase } from "@/application/company/GetCompaniesUseCase";

export const useCompany = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state: RootState) => state.company);

  const startLoadCompanies = async () => {
    try {
      const useCase = new GetCompaniesUseCase();
      const response = await useCase.execute(); // CompanyResponse
      dispatch(onLoadCompanies(response.data)); // response.data es Company[]
      return response.data;
    } catch (err: any) {
      dispatch(onSetError(err.message || "Error cargando empresas"));
    }
  };

  return { companies, startLoadCompanies };
};
