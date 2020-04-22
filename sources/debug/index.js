import Vue from 'vue';
import Devtool from "debug/view/Devtool.vue";
import {baseComponentAutoImport} from './baseComponentAutoImport.js';

baseComponentAutoImport();
window.setTimeout(function(){

var app = new Vue({
  el: '.game-devtool',
  template:'<devtool></devtool>',
  components:{
    Devtool
  }
})
},1000);
