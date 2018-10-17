import Vue from 'vue';//引入 相当于const Vue = require('vue')
import index from './components/index.vue';
// const app = new Vue({
  //el: '#app',//挂载节点 #id选择器
  // render: function(createElement) {
  //   return createElement('h1', 'Hello World');
  // }//渲染器
// });//js是面向对象的语言 实例化对象 并传参

const app = new Vue({
  el: '#app',
  render: h => h(index)
});