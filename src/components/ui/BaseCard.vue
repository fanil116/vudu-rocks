<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  variant: {
    type: String as () =>
      | "text"
      | "tonal"
      | "flat"
      | "elevated"
      | "outlined"
      | "plain"
      | undefined,
    default: "tonal",
  },
});
</script>
<!-- Добавлены классы base-card для показа стиля написания, можно обойтись стилям vuetify -->
<template>
  <v-card :variant="props.variant" flat class="base-card">
    <template v-slot:title>
      <p class="base-card__title text-primary text-wrap">{{ props.title }}</p>
    </template>
    <template v-slot:text>
      <p class="text-black">{{ props.text }}</p>
    </template>
    <v-card-text class="text-disabled base-card__footer">{{
      props.author
    }}</v-card-text>
  </v-card>
</template>
