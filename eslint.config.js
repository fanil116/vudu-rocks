import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginSimpleSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },

  // Настройка глобальных переменных (например, window, document)
  { files: ["**/*.{js,mjs,cjs,ts,vue}"], languageOptions: { globals: globals.browser } },

  // Подключение базовых правил JS
  { files: ["**/*.{js,mjs,cjs,ts,vue}"], plugins: { js }, extends: ["js/recommended"] },

  // Подключение TypeScript
  tseslint.configs.recommended,

  // Подключение Vue 3 (Essential rules)
  pluginVue.configs["flat/essential"],

  // Настройка TypeScript парсера для Vue файлов
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },

  // Добавляем Prettier и автоформатирование
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: { prettier: pluginPrettier },
    extends: [prettier],
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Улучшенные правила для импортов
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: {
      import: pluginImport,
      "unused-imports": pluginUnusedImports,
      "simple-import-sort": pluginSimpleSort,
    },
    rules: {
      "import/order": "off", // Отключаем стандартное правило, заменим его на simple-import-sort
      "simple-import-sort/imports": "error", // Сортировка импортов
      "simple-import-sort/exports": "error", // Сортировка экспортов
      "unused-imports/no-unused-imports": "warn", // Предупреждение о неиспользуемых импортах
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // console.log запрещен в проде
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },

  // Расширенные правила Vue
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off", // Отключаем правило наименования компонентов (по необходимости)
      "vue/html-indent": ["error", 2], // Отступ в шаблонах Vue (2 пробела)
      "vue/attributes-order": "error", // Упорядочивание атрибутов в компонентах
      "vue/require-default-prop": "off", // Разрешаем необязательные пропсы
      "vue/require-explicit-emits": "error", // Запрещаем использовать `this.$emit` без явного объявления
      "vue/no-unused-components": "warn", // Предупреждение о неиспользуемых компонентах
      "vue/no-multiple-template-root": "off", // Разрешаем несколько корневых элементов в `<template>`
    },
  },
]);
