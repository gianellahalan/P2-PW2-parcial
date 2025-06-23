import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUserAndToken: (token) => {
    try {
      const decodedUser = jwtDecode(token);
      set({ user: decodedUser, token });
    } catch (error) {
      console.error("Token inválido:", error);
      set({ user: null, token: null });
    }
  },

  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;
