import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path';

export default defineNuxtConfig({
  devtools: { enabled: false },
  components: ['~/components', '~/components/layouts'],
  css: ['~/stylesheets/main.scss'],
  alias: {
    '@': resolve(__dirname, './'),
    '@components': resolve(__dirname, './components'),
    '@composables': resolve(__dirname, './composables'),
    '@stores': resolve(__dirname, './stores'),
    '@utils': resolve(__dirname, './utils'),
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  i18n: {
    defaultLocale: 'ko',
    locales: [
      {
        code: 'ko',
        iso: 'ko-KR',
        file: 'ko.json',
        name: '한국어',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      },
    ],
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix', // or 'prefix_except_default'
  },
  googleFonts: {
    download: true,
    display: 'swap',
    preconnect: true,
    prefetch: true,
    families: {
      Inter: true,
    },
  },
  devServer: {
    port: 4000,
    host: '0.0.0.0',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:4000/api',
    },
  },
});
