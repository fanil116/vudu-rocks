import type { AxiosError } from "axios";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "@/types/User";
import { getBaseUrl } from "@/utils/getApiUrl";
export const useUserStore = defineStore("UserStore", () => {
  const users = ref<User[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get<User[]>(`${getBaseUrl()}/users`);
      users.value = data;
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;
      console.error(axiosErr.response?.data || axiosErr.message);
    }
  };

  return {
    users,
    fetchUsers,
  };
});
