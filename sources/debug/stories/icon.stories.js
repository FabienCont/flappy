import Vue from 'vue';
import DevIcon from 'debug/components/DevIcon.vue';
import { text, number  } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default { title: 'Icon' };

const actionsData = {
  onClick: action('click'),
};

export const basicIcon = () => ({
  components: { DevIcon },
  props :{
    iconName: { type: String, default: text('iconName', "close")},
    svgSize: { type: Number, default: number('svgSize', 17)},
  },
  template: '<dev-icon iconName="close" :width="svgSize" :height="svgSize" ></dev-icon>'
});
export const allIcons = () => ({
  components: { DevIcon },
  props : {
    iconName:"add",
    svgSize: { type: Number, default: number('svgSize', 25)},
  },
  data(){
    return{
      keysIconList:require.context('debug/assets/svg', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'sync').keys().map(key=>{return key.match(new RegExp("(?:\.\/)(.*)(?=\.svg$)"))[1]}),
      styleCenteredDiv:"display:flex;align-items:center;"
    }
  },
  template: '<div><div :style="styleCenteredDiv" v-for="key in keysIconList"><dev-icon :iconName="key" :width="svgSize" :height="svgSize" ></dev-icon>{{key}}</div></div>',
});
