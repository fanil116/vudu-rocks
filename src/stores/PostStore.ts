import type { AxiosError } from "axios";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

import { getBaseUrl } from "@/utils/getApiUrl";

import type { Post } from "../types/Post";
export const usePostStore = defineStore("PostStore", () => {
  const posts = ref<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get<Post[]>(`${getBaseUrl()}/posts`);
      posts.value = data;
    } catch (err: unknown) {
      const axiosErr = err as AxiosError;
      console.error(axiosErr.response?.data || axiosErr.message);
    }
  };

  return {
    posts,
    fetchPosts,
  };
});
