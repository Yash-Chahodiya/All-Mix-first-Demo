import { MetaFunction } from "@remix-run/node";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { geteditData, getFormData } from "~/zustand/store";
import { addProduct, editProduct, updateProduct } from "~/zustand/action";
import DataTable from "~/components/dataTable";

export const meta: MetaFunction = () => {
  return [
    { title: "Demo" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const TodoSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  Quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
});

export default function Index() {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const editData = geteditData();
  const formData = getFormData();

  console.log(formData);

  useEffect(() => {
    setData(editData);
    if (editData) {
      setEdit(true);
    }
  }, [editData]);

  const handleSubmit = async (values) => {
    try {
      if (edit) {
        if (data.name === values.name || data.Quantity === values.Quantity) {
          await updateProduct(data?.id, values);
          console.log(data?.id);
          setData(null);
          setEdit(false);
        }
      } else {
        await addProduct(values);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 px-6 py-10">
      <div className="flex justify-center items-center w-full">
        <Formik
          initialValues={{
            name: data?.name || "",
            Quantity: data?.Quantity || "",
          }}
          validationSchema={TodoSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {() => (
            <Form className="bg-sky-950 p-1 shadow-sm shadow-white">
              <h1 className="text-2xl font-bold text-center">Product Data</h1>
              <div className="flex gap-4">
                <label htmlFor="name">Product Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter product name"
                  className="border text-black border-gray-300 rounded-sm p-1 m-2 outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error text-red-600"
                />

                <label htmlFor="Quantity">Quantity</label>
                <Field
                  type="number"
                  name="Quantity"
                  id="Quantity"
                  placeholder="Enter quantity"
                  className="border text-black border-gray-300 rounded-sm p-1 m-2 outline-none"
                />
                <ErrorMessage
                  name="Quantity"
                  component="div"
                  className="error text-red-600"
                />

                <button
                  type="submit"
                  className="border bg-zinc-950 text-white border-gray-700 rounded-md p-2 hover:bg-zinc-700 hover:text-white"
                >
                  {edit ? "Update Product" : "Add Product"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {formData.length > 0 && <DataTable rowData={formData} />}
    </div>
  );
}
