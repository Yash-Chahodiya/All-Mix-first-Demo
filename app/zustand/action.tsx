import { getFormData, useProductStore } from "./store";

import uuid from "react-uuid";
const { setState } = useProductStore;

export const addProduct = async (values: any) => {
  const id = uuid();
  const value = {
    ...values,
    id: id,
  };

  setState((prev) => ({
    ...prev,
    formData: [...prev.formData, value],
  }));
};

export const deleteProduct = (id: any) => {
  // const product = getFormData();
  const product = useProductStore.getState().formData;
  console.log(product);
  const filter = product.filter((item) => item.id !== id);

  setState((prev) => ({
    ...prev,
    formData: [...prev.formData.filter((item) => item.id !== id)],
  }));
  return filter;
};

export const updateProduct = async (id: any, editData: any) => {
  setState((prev) => ({
    ...prev,
    formData: prev.formData.map((item) => (item.id === id ? editData : item)),
  }));
};

export const editProduct = (editData: any) => {
  setState((prev) => ({
    ...prev,
    editData: editData,
  }));
  return editData;
};
