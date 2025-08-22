import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "@/types/company";

interface CompaniesState {
  isLoadingCompanies: boolean;
  companies: Company[];
  company: Company | null;
  filtros: any[];
  error: string | null;
}

const initialState: CompaniesState = {
  isLoadingCompanies: true,
  companies: [],
  company: null,
  filtros: [],
  error: null,
};

export const companiesSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    onLoadCompanies: (state, { payload }: PayloadAction<Company[]>) => {
      state.isLoadingCompanies = false;
      state.companies = payload;
    },
    onLoadCompany: (state, { payload }: PayloadAction<Company | null>) => {
      state.isLoadingCompanies = false;
      state.company = payload;
    },
    onLogoutCompanies: (state) => {
      state.isLoadingCompanies = false;
      state.companies = [];
      state.company = null;
    },
    onSetCompanyFilters: (state, { payload }: PayloadAction<any[]>) => {
      state.filtros = payload;
      state.isLoadingCompanies = false;
    },
    onSetError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoadingCompanies = false;
    },
    onClearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  onLoadCompanies, 
  onLoadCompany, 
  onLogoutCompanies, 
  onSetCompanyFilters, 
  onSetError, 
  onClearError 
} = companiesSlice.actions;

export default companiesSlice.reducer;
