import { create } from "zustand";

const useSearchStore = create((set) => ({
  termino: "",
  setTermino: (nuevoTermino) => set({ termino: nuevoTermino }),
}));

<<<<<<< HEAD
export default useSearchStore;
=======
export default useSearchStore;
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55
