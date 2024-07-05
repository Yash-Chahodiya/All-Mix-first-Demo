import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type ProductItem = {
  id: number;
  name: string;
  age: number;
  colour: string;
};

interface ProductProps {
  formData: ProductItem[];
  editData: ProductItem[] | null;
}

const initialState: ProductProps = {
  formData: [],
  editData: null,
};

export const useProductStore = create<ProductProps>(() => ({
  ...initialState,
}));

// export const useProductStore = create (devtools(
//   persist(

//   )
// ))

export function getFormData() {
  return useProductStore((s) => s?.formData);
}
export function geteditData() {
  return useProductStore((s) => s?.editData);
}
