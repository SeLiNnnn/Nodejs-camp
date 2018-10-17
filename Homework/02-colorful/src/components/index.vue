<template>
  <div class="index">
    <h1>{{ msg }}</h1>
    <hr>
    <button @click="ranClick">点击</button>
    <p :style="'color :' +color">{{ pMsg }}</p>
    <p> 当前颜色 : {{ color }} </p>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg : '点击按钮生成随机色',
      pMsg : '这是一段文字这是一段文字这是一段文字这是一段文字',
      color : ''
      
    };
  },
  methods : {
    
      ranClick(color) {
        var color = '#'
        for (var i = 0, length = 6; i < length; i++) { // 到6位的16进制颜色值字符串
          color += Math.floor(Math.random()*16).toString(16);            
        }
        console.log(color);
        this.color = color;
        return color;    
        
      }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
