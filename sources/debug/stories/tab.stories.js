import Vue from 'vue';
import DevTab from 'debug/components/DevTab.vue';
import { text,boolean  } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default { title: 'Tab' };

const actionsData = {
  onClick: action('click'),
};

export const unactiveTab = () => ({
  components: { DevTab },
  props :{
    textTab: { type: String, default: text('textTab', "aTab")}
  },
  template: '<dev-tab :isActive="false">{{textTab}}</dev-tab>'
});

export const activeTab = () => ({
  components: { DevTab },
  props :{
    textTab: { type: String, default: text('textTab', "aTab")}
  },
  template: '<dev-tab :isActive="true">{{textTab}}</dev-tab>'
});

export const multipleTab = () => ({
  components: { DevTab },
  props :{
    textTab: { type: String, default: text('textTab', "aTab")}
  },
  template: '<div style="display:flex;"><dev-tab :isActive="false">{{textTab}}</dev-tab><dev-tab :isActive="true">{{textTab}}</dev-tab><dev-tab :isActive="false">{{textTab}}</dev-tab></div>'
});
