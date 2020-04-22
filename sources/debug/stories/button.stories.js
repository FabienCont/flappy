import Vue from 'vue';
import DevButton from 'debug/components/DevButton.vue';

export default { title: 'Button' };

export const basicButton = () => ({
  components: { DevButton },
  props : {

  },
  template: '<dev-button>button text</dev-button>'
});
