import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#c62c43", // #c62c43
        secondary: colors.red.darken2, // #FFCDD2
        accent: colors.red.lighten1, // #3F51B5
      },
      dark:{
        primary: "#c62c43", // #c62c43
      }
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
