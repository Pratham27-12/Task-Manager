import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): { userName: string | null } => ({
    userName: null,
  }),

  actions: {
    setUserName(name: string) {
      this.userName = name;
      localStorage.setItem("userName", name);
    },

    fetchUserName() {
      this.userName = localStorage.getItem("userName");
    },
  },
});
