// app/dashboard/company/edit/[id]/page.tsx
import { EditCompanyForm } from "@/components/dashboard/company";

type PageProps = {
  params: { id: string }; 
};

export default async function EditCompanyPage({ params }: PageProps) {
  const { id: companyId } = await params;
  return <EditCompanyForm companyId={companyId} />;
}
