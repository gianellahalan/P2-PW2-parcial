import { create } from "zustand";

const useSearchStore = create((set) => ({
  termino: "",
  setTermino: (nuevoTermino) => set({ termino: nuevoTermino }),
}));

export default useSearchStore;