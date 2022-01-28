// export * from '~~/.nuxt-storybook/storybook/preview.js'
import Vue from 'vue'

Vue.mixin({
  mounted: function() {
    if (Object.entries(this.$attrs).length > 0) {
      setInterval(() => {
        Object.entries(this.$attrs).forEach(([key, value]) => {
          if (this[key] !== undefined && this[key] !== value) {
            this[key] = Vue.observable(value);
          }
        });
      }, 500);
    }
  },
});

export const decorators = [
  (story) => ({
    components: { story },
    template: '<div style="width: 763px; margin: 0 auto;"><story /></div>',
  }),
];