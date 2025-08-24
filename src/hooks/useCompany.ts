import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  onLoadCompanies,
  onLoadCompany,
  onSetError,
} from "@/store/slices/companySlice";
import {
  GetCompaniesUseCase,
  ChangeStatusCompanyUseCase,
  CreateNewCompanyUseCase,
  GetCompanyUseCase,
  UpdateCompanyUseCase
} from "@/application/company";
import { CompanyCreateUpdate } from "@/types/company";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

export const useCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { companies, company, isLoadingCompanies, filtros, error } =
    useSelector((state: RootState) => state.company);

  const startCreateNewCompany = async (datos: CompanyCreateUpdate) => {
    try {
      const useCase = new CreateNewCompanyUseCase();
      const response = await useCase.execute(datos);
      Swal.fire({
        icon: "success",
        title: "¡Hecho!",
        text: response.message,
      }).then(() => {
        router.push("/dashboard/company");
      });
    } catch (err: any) {
      const errorMsg =
        err.response.data.error.message || "Error actualizando el status";
      // Dispatch para tu store
      dispatch(onSetError(errorMsg));
      // Mostrar alerta
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  };

  const startLoadCompanies = async () => {
    try {
      const useCase = new GetCompaniesUseCase();
      const response = await useCase.execute(); // CompaniesResponse
      dispatch(onLoadCompanies(response.data)); // response.data es Company[]
      return response.data;
    } catch (err: any) {
      console.log(err);
      dispatch(onSetError(err.message || "Error cargando empresas"));
    }
  };

  const startLoadCompany = async (id: string) => {
    try {
      const useCase = new GetCompanyUseCase();
      const response = await useCase.execute(id); // CompaniesResponse
      dispatch(onLoadCompany(response.data));
    } catch (err: any) {
      const errorMsg = err.message || "Error actualizando el status";
      dispatch(onSetError(errorMsg));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  };

  const startChangeStatus = async (id: string, status: string) => {
    try {
      const useCase = new ChangeStatusCompanyUseCase();
      const response = await useCase.execute(id, status);
      Swal.fire({
        icon: "success",
        title: "¡Hecho!",
        text: response.message,
      }).then(() => {
        window.location.reload();
      });
    } catch (err: any) {
      const errorMsg = err.message || "Error actualizando el status";
      // Dispatch para tu store
      dispatch(onSetError(errorMsg));
      // Mostrar alerta
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  };

  async function startUpdateCompany(
    companyId: string,
    data: Partial<CompanyCreateUpdate>
  ) {
    try {
      const useCase = new UpdateCompanyUseCase();
      const response = await useCase.execute(companyId, data);
      Swal.fire({
        icon: "success",
        title: "¡Hecho!",
        text: response.message,
      }).then(() => {
        window.location.reload();
      });
    } catch (err: any) {
      const errorMsg = err.message || "Error actualizando el status";
      dispatch(onSetError(errorMsg));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  }

  return {
    companies,
    company,
    isLoadingCompanies,
    filtros,
    error,
    startLoadCompanies,
    startLoadCompany,
    startChangeStatus,
    startCreateNewCompany,
    startUpdateCompany,
  };
};
