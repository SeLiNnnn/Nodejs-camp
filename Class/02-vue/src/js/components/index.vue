<template>
  <div>
    <!-- <h1>Hello vue!!!</h1> -->
    <!-- <h1>{{ message.split('').join('-') }}</h1> -->
    <!-- 除了变量还可以写表达式 但这个表达式一定是要有结果的表达式 或函数要有返回值 -->
    <!-- <h1 v-bind:class="color">{{ add(message) }}</h1> -->
    <!-- 这是一个有返回值的函数 -->

    <!-- 下面这行可以实现 颜色的动态切换 -->
    <!-- <h1 v-bind:class="message">{{ message }}</h1> -->


    <!-- <h1 v-if="color != 'blue'" :style="'color:' + color">{{ color }}</h1>
    <h2 v-else>{{ color }}</h2> -->

    <div>
      <!-- 响应式 变量会一直改变 -->
      <!-- 上节课的问题：这里的v-model是绑定color而不是massage -->
      <!-- <h1 v-if="color != 'blue'" :style="'color:' + color">{{ message }}</h1> -->
      <!-- <input type="text" v-model="color"> -->
    </div>
    <!-- 不跟着input的改变 改变变量 只响应一次 也就是第一次输出的 此后不再变化 -->
    <!-- <h1 v-once>{{ message }}</h1> -->

    <!-- <button v-on:click="add">add</button> -->
    <!-- v-on可以简写为@ -->
    <!-- <button @click="add()">add</button> -->
    <!-- :是v-bind的简写 -->

    <!-- <div>
      <h1>请输入成绩</h1>
      <input type="text" v-model.number="num">
      <hr>
      <h2 v-if="num<70 && num >= 60">绩点为1</h2>
      <h2 v-else-if="num<80 && num >=70">绩点为2</h2>
      <h2 v-else-if="num<90 && num >=80">绩点为3</h2>
      <h2 v-else-if="num<=100 && num >= 90 ">绩点为4</h2>
      <h2 v-else-if="num<60 && num >= 0 ">绩点为0</h2>
      <h2 v-else>error</h2>
    </div> -->

    <div>
      <!-- 继续颜色模块 -->
      <!-- <h1 v-show="color != 'blue'" style="'color:'+color;display:none">{{ color }}</h1>
      <h2>{{ color }}</h2> -->
    </div>

    <template v-if="type">
      <!-- 切换输入框 -->
      <button @click="change">点击</button>
      <span>user name </span>
      <input key="username">
    </template>
    <template v-else>
      <button @click="change">点击</button>
      <span>e-mail</span>
      <input key="email">
    </template>
    <hr>
    <div>
      <ul>
        <!-- 分别输出12345 -->
        <!-- 单独使用一个template包裹起来 在template上写v-for v-if等等 是为了避免标签属性被污染 template不会被渲染 -->
        <!-- v-show不能被用在template标签里 -->
        <!-- <template v-for="item in 5">
          <li>{{ item }}</li>
        </template> -->
        <!-- <template v-for="(item, key) in nums">
          <li>{{ key }}:{{item }}</li>
        </template> 2^n -->
        <!-- <template v-for="(item, key) in info">
          <li>item:{{item}}  key:{{key}}</li>
        </template>
        <template v-for="(value, key, index) in info">
          <li>key: {{ key }} value: {{ value }} index: {{ index }}</li>
        </template> -->

        <template>
          <table border="0" style="border:1px solid #ccc" >
            <template v-for="r in row">
            <tr>
              <template v-for="c in col">
                <td>
                {{ calc(r -1, c -1 ) }}
              </td>
              </template>
              
            </tr>
            </template>
            
            <!-- <tr style="width:200px;height100px;">
              <td style="width:100px;height:100px;" bgcolor="pink"></td>
              <td style="width:100px;height:100px;" bgcolor="pink"></td>
            </tr>
            <tr style="width:200px;height100px;">
              <td style="width:100px;height:100px;" bgcolor="pink"></td>
              <td style="width:100px;height:100px;" bgcolor="pink"></td>
            </tr> -->
          </table>
        </template>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //message: 'Hello Vue',// 键值对 使用函数返回的对象 所有的成员都作为变量
      message: '12345',
      hello: 'abc',
      color : 'red',
      num : '',
      type : true,
      nums: [1, 2, 3, 4, 5],
      info : {
        name : 'a',
        score : 90
      },
      num : {
        col : 2,
        row : 2
      }
    }
  },
  methods: {//方法
    add(msg) {
      //return msg.split('').join('-');
      //在网页触发某个函数 
    },
    // add() {
    //     this.message += 1;//用this来指向对象本身
    // }
    change() {
      this.type = !this.type;
    },
    calc() {
      
    }

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
