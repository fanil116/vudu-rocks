<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  length: {
    type: Number,
    required: true,
  },
});

const currentPage = ref<number>(1);

const emit = defineEmits(["update:modelValue"]);
watch(currentPage, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <v-pagination v-model="currentPage" :length="props.length" color="white" />
</template>
