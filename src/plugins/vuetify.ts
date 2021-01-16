import Vue from "vue";
import Vuetify from "vuetify";
import { colors } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },

    themes: {
      light: {
        primary: colors.blueGrey.base,
        secondary: colors.cyan.base,
        accent: "#8c9eff",
        error: "#b71c1c"
      }
    }
  }
});
