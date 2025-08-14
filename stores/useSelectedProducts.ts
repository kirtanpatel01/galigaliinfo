// stores/useSelectedProducts.ts
import { create } from "zustand";

export interface SelectedProduct {
  id: string;
  productName: string;
  price: number;
  qty: number;
  unit: string;
}

interface SelectedProductsState {
  products: SelectedProduct[];
  addProduct: (product: SelectedProduct) => void;
  updateProduct: (id: string, changes: Partial<SelectedProduct>) => void;
  removeProduct: (id: string) => void;
  clear: () => void;
}

export const useSelectedProducts = create<SelectedProductsState>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => {
      // avoid duplicates
      if (state.products.some((p) => p.id === product.id)) return state;
      return { products: [...state.products, product] };
    }),
  updateProduct: (id, changes) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...changes } : p
      ),
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  clear: () => set({ products: [] }),
}));
