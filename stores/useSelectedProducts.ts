// stores/useSelectedProducts.ts
import { create } from "zustand";

export interface SelectedProduct {
  id: number;
  qty: number;
  lineTotal: number;
}

interface SelectedProductsState {
  products: SelectedProduct[];
  addProduct: (product: SelectedProduct) => void;
  updateProduct: (id: number, changes: Partial<SelectedProduct>) => void;
  removeProduct: (id: number) => void;
  clear: () => void;
}

export const useSelectedProducts = create<SelectedProductsState>((set, get) => ({
  products: [],
  addProduct: (product) => {
    const state = get();
    if (state.products.some((p) => p.id === product.id)) return;
    set({ products: [...state.products, product] });
  },
  updateProduct: (id, changes) => {
    const state = get();
    let didChange = false;
    const next = state.products.map((p) => {
      if (p.id !== id) return p;
      const merged = { ...p, ...changes };
      // shallow compare
      if (merged.qty !== p.qty || merged.lineTotal !== p.lineTotal) {
        didChange = true;
        return merged;
      }
      return p;
    });
    if (didChange) {
      set({ products: next });
    }
  },
  removeProduct: (id) => {
    const state = get();
    const next = state.products.filter((p) => p.id !== id);
    if (next.length === state.products.length) return;
    set({ products: next });
  },
  clear: () => set({ products: [] }),
}));
