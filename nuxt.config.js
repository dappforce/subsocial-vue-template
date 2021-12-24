import colors from 'vuetify/es5/util/colors'

export default {
  target: 'server',
  ssr: true,

  head: {
    titleTemplate: '%s - subsocial',
    title: 'subsocial',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/main.scss',
    '~/assets/github-markdown.css',
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/src/components/VGrid/VGrid.sass',
    'easymde/dist/easymde.min.css'
  ],

  plugins: [
    '@/plugin/pluralize.ts',
    '~/plugin/linkService.ts',
    '@/plugin/day.js',
    '@/plugin/numeral.ts',
    '@/plugin/linkFilters.ts',
    '@/plugin/addressShortness.ts',
    { src: '@/plugin/easymde.ts', ssr: false },
    { src: '~/plugin/numeral.ts', ssr: false },
    { src: '~/plugin/infiniteloading.ts', ssr: false }
  ],

  components: [
    '~/components',
    { path: '~/components/shared', extensions: ['vue'] },
    { path: '~/components/shared/buttons', extensions: ['vue'] }
  ],

  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { iconfont: 'mdi' }],
    ['@nuxtclub/slugify']
  ],

  modules: [
    '@nuxt/http',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/markdownit',
    '@nuxtjs/dayjs',
    '@nuxtjs/axios'
  ],

  i18n: {
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [{ code: 'en', file: 'en.js' }]
  },

  markdownit: {
    runtime: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    ltr: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  },

  dayjs: {
    defaultLocale: 'en',
    plugins: ['relativeTime', 'advancedFormat', 'updateLocale']

  },

  storybook: {
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    },
    transpile: [
      'quasar',
      'vue-numeral-filter',
      'vee-validate/dist/rules'
    ]

  }
}
