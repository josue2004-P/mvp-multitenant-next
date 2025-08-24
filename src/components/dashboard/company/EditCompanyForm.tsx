"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { CompanyCreateUpdate } from "@/types/company";
import * as Yup from "yup";
import { useCompany } from "@/hooks/useCompany";
import { useEffect } from "react";
type Props = { companyId: string };

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  legalName: Yup.string().required("La razón social es obligatoria"),
  databaseName: Yup.string().required("La base de datos es obligatoria"),
  status: Yup.mixed<"active" | "inactive">()
    .oneOf(["active", "inactive"])
    .required("El estatus es obligatorio"),
});

export function EditCompanyForm({ companyId }: Props) {
  const { company, isLoadingCompanies, startLoadCompany, startUpdateCompany } =
    useCompany();

  useEffect(() => {
    startLoadCompany(companyId);
  }, [companyId]);

  const initialValues: CompanyCreateUpdate = company
    ? {
        name: company.name,
        legalName: company.legalName,
        databaseName: company.databaseName,
        status: company.status as "active" | "inactive", // 👈 casteo
      }
    : {
        name: "",
        legalName: "",
        databaseName: "",
        status: "active", // valor por defecto
      };

  const handleSubmit = async (
    values: CompanyCreateUpdate,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await startUpdateCompany(companyId, {
        legalName: values.legalName,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingCompanies) {
    return <p className="text-center">Cargando empresa...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Empresa</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Razón Social
              </label>
              <Field
                type="text"
                name="legalName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="legalName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base de Datos
              </label>
              <Field
                type="text"
                name="databaseName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="databaseName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estatus
              </label>
              <Field
                as="select"
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Field>
              <ErrorMessage
                name="status"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
