export default {
  target: 'server',
  ssr: true,

  head: {
    titleTemplate: '%s - vSocial',
    title: 'vSocial',
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
    '~/styles/main.scss',
    '~/styles/github-markdown.css',
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/src/components/VGrid/VGrid.sass',
    'easymde/dist/easymde.min.css'
  ],

  plugins: [
    '~/plugin/linkService.ts',
    '~/plugin/updateLocale.ts',
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
    { path: '~/components/shared/buttons', extensions: ['vue'] },
    { path: '~/components/shared/form-inputs', extensions: ['vue'] }
  ],

  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
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
    langDir: 'i18n/',
    differentDomains: false,
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'ru', file: 'ru.json', name: 'Russian' }
    ]
  },

  markdownit: {
    runtime: true,
    html: true,
    linkify: true,
    typographer: true
  },

  vuetify: {
    customVariables: ['~/styles/variables.scss'],
    ltr: true,
    icons: {
      iconfont: 'mdi'
    }
  },

  dayjs: {
    defaultLocale: 'en',
    plugins: ['relativeTime', 'advancedFormat', 'updateLocale']

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
