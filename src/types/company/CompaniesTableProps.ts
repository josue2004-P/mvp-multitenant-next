export type CompaniesTableProps = {
  companies: any[];
  formatDate: (date: string) => string;
  onToggleStatus?: (id: string) => void;
};