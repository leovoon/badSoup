export default defineNuxtConfig({
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "soup",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@morev/vue-transitions/nuxt"],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {
    fallback: true,
  },
  runtimeConfig: {
    corshApi: process.env.NUXT_CORSHAPI,
    soupApi: process.env.NUXT_SOUPAPI,
  },
});
