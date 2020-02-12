import colors from "vuetify/es5/util/colors";

require("dotenv").config();
const google_map_api = process.env.google_map_api;
const one_signal_api = process.env.one_signal_api;
export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src:
          "https://maps.google.com/maps/api/js?key=" +
          google_map_api +
          "&libraries=places,geometry&language=ja"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/google_map_api.js" }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/onesignal", "@nuxtjs/pwa"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
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
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!ctx.isClient) {
        // This instructs Webpack to include `vue2-google-maps`'s Vue files
        // for server-side rendering
        config.externals.splice(0, 0, function(context, request, callback) {
          if (/^vue2-google-maps($|\/)/.test(request)) {
            callback(null, false);
          } else {
            callback();
          }
        });
      }
    }
  },
  vendor: ["vue2-google-maps"],
  oneSignal: {
    init: {
      appId: one_signal_api,
      allowLocalhostAsSecureOrigin: true, // localhostで動作確認する場合true
      welcomeNotification: {
        disable: true
      }
    },
    importScripts: ["sw.js"] // 後述、必須
  },
  pwa: {
    manifest: {
      name: "test",
      short_name: "test",
      title: "test",
      "og:title": "test",
      description: "test",
      "og:description": "test",
      lang: "ja",
      theme_color: "#ffffff",
      background_color: "#ffffff"
    }
  },
  env: {
    google_map_api,
    one_signal_api
  }
};
