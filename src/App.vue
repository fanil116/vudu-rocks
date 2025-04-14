<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

import { usePostStore } from "@/stores/PostStore";
import { useUserStore } from "@/stores/UsersStore";
import type { PostCard } from "@/types/Post";
import { mapPostsWithAuthors } from "@/utils/postExpansion";

import BaseCard from "./components/ui/BaseCard.vue";
import BasePagination from "./components/ui/BasePagination.vue";
const userStore = useUserStore();
const postStore = usePostStore();

userStore.fetchUsers();
postStore.fetchPosts();

const { posts } = storeToRefs(postStore);
const { users } = storeToRefs(userStore);

const search = ref("");
const itemsPerPage = 8;
const currentPage = ref<number>(1);

// список постов с авторами
const postsWithAuthors = computed((): PostCard[] => {
  if (!posts.value?.length || !users.value?.length) return [];
  return mapPostsWithAuthors(posts.value, users.value);
});

// Фильтрация по имени автора
const filteredPosts = computed((): PostCard[] => {
  if (!search.value) return postsWithAuthors.value;

  return postsWithAuthors.value.filter((post) => {
    const authorParts = post.author.toLowerCase().split(" ");
    return authorParts.some((part) =>
      part.includes(search.value.toLowerCase()),
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / itemsPerPage),
);

// Посты на текущей странице
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPosts.value.slice(start, end);
});

const updatePage = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <v-container>
    <v-text-field
      v-model="search"
      density="compact"
      label="Filter by author..."
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
      class="mb-5"
    ></v-text-field>
    <v-row>
      <v-col
        v-for="(item, index) in paginatedItems"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <BaseCard
          class="fill-height d-flex flex-column bg_white"
          :title="item.title"
          :text="item.body"
          :author="item.author"
        />
      </v-col>
    </v-row>
    <BasePagination
      class="mt-5"
      :length="totalPages"
      @update:modelValue="updatePage"
    />
  </v-container>
</template>
