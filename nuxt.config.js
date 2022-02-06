export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'JdGG',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: './assets/css/main.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    './assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  axios: {
    baseURL: 'http://localhost:3000', // Used as fallback if no runtime config is provided
    proxy: true
  },

  proxy: {
    '/api-static/': {
      target: "https://ddragon.leagueoflegends.com/cdn/12.2.1/data/fr_FR/",
      pathRewrite: {"^/api-static/": ""}
    },
    '/api-dynamic/': {
      target: "https://euw1.api.riotgames.com/lol/",
      pathRewrite: {
        "^/api-dynamic/": ""
      }
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
