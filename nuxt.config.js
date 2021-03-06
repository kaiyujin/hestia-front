module.exports = {
  mode: 'spa',
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics',
    //'@nuxtjs/pwa'
  ],
  'google-analytics': {
    id: 'UA-TEST-2'
  },
  axios: {
    credentials: true,
    requestInterceptor: (config, { store }) => {
      if (store.state.token) {
        config.headers.common['Authorization'] = `${store.state.token}`
      }

      return config
    }
  },
  proxy: {
    '/api': 'http://localhost:8080'
  },
  vuetify: {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'hestia-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/css/main.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/i18n.js',
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vee-validate', 'vue-i18n'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
