const path = require('path')
const webpack = require('webpack')
const apiConfig = require('./api.config')
const isProdMode = Object.is(process.env.NODE_ENV, 'production')
const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  offline: true,
  loading: {
    color: '#2196f3'
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  build: {
    // analyze: true,
    // 设置 cdn 地址
    publicPath: apiConfig.cdnUrl,
    // 对webpack的扩展
    extend(webpackConfig) {
      if (isProdMode) {
        const vueLoader = webpackConfig.module.rules.find(loader => loader.loader === 'vue-loader')
        if (vueLoader) {
          // 处理 Template 中的 cdn 地址
          vueLoader.options.loaders.html = path.resolve(__dirname, './extend/html-cdn-loader')
          // 处理 CSS 中的 cdn 地址
          const vueLoaders = vueLoader.options.loaders
          for (cssLoader in vueLoaders) {
            if (Array.isArray(vueLoaders[cssLoader])) {
              vueLoaders[cssLoader].forEach(loader => {
                if (loader.loader === 'css-loader') {
                  loader.options.root = apiConfig.cdnUrl
                }
              })
            }
          }
        }
      }
    },
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: [
      'axios'
    ],
    // 为 JS 和 Vue 文件定制 babel 配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: true
    },
    // Run ESLINT on save
    /*
    extend (config, ctx) {
      if (process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
    */
    styleResources: {
      scss: './assets/sass/init.scss',
      options: {}
    }
  },
  dev: isProdMode,
  env: {
    baseUrl: 'apiConfig.baseUrl'
  },
  plugins: [
    { src: '~/plugins/axios.js' },
  ],
  head: {
    title: 'nuxt demo',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { name: 'author', content: 'liweiji@xunlei.com' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'seo content' },
      { hid: 'description', name: 'description', content: 'seo description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    script: [
      { 
        // async: 'async',
        // defer: 'defer',
        // type: 'text/javascript',
        // src: '/scripts/clmtrackr.js'
        // innerHTML: ``
      }
    ],
    // __dangerouslyDisableSanitizers: ['script'],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  router: {
    linkActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes) {}
  },
  css: [
    { src: '~assets/css/reset-min-1.3.css'},
    { src: '~assets/homepage/css/style.css'}
  ],
  // 跨域
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
      [
        '/api', 
        { 
          target: 'http://localhost:8080', // api主机
          pathRewrite: { '^/api' : '/api' }
        }
    ]
  ]
}
