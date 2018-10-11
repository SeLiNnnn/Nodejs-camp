<template>
  <div>
    <!-- <h1>Hello vue!!!</h1> -->
    <!-- <h1>{{ message.split('').join('-') }}</h1> -->
    <!-- 除了变量还可以写表达式 但这个表达式一定是要有结果的表达式 或函数要有返回值 -->
    <!-- <h1 v-bind:class="color">{{ add(message) }}</h1> -->
    <!-- 这是一个有返回值的函数 -->

    <!-- 下面这行可以实现 颜色的动态切换 -->
    <!-- <h1 v-bind:class="message">{{ message }}</h1> -->
    <h1 :style="'color:' + color">{{ message }}</h1>
    
    <div>
      <!-- 响应式 变量会一直改变 -->
      <input type="text" v-model="message">
    </div>
    <!-- 不跟着input的改变 改变变量 只响应一次 也就是第一次输出的 此后不再变化 -->
    <!-- <h1 v-once>{{ message }}</h1> -->

    <!-- <button v-on:click="add">add</button> -->
    <!-- v-on可以简写为@ -->
    <!-- <button @click="add()">add</button> -->
    <!-- :是v-bind的简写 -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      //message: 'Hello Vue',// 键值对 使用函数返回的对象 所有的成员都作为变量
      message: '123',
      hello: 'abc',
      color : 'red'
    }
  },
  methods: {//方法
    add(msg) {
      //return msg.split('').join('-');
      //在网页触发某个函数 
    }
    // add() {
    //     this.message += 1;//用this来指向对象本身
    // }
  }
}
</script>

<style>
  .red {
    color: red;
  }
  .blue {
    color: skyblue;
  }
</style>
