<template>
  <div class="hello">
      <canvas width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  computed: {
    oC() {
      return document.querySelector("canvas");
    },
    ctx() {
      return this.oC.getContext("2d");
    }
  },
  data() {
    return {
      snake_color: "rgb(187, 216, 233)", // 蛇身颜色
      snake_border_color: "#666", // 边框
      snake_eye_color: "#000", // 眼睛
      food_color: "rgb(255, 145, 0)", // 食物
      // 蛇的初始位置
      snake_locat: [{ x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 }], // 默认刚开始蛇身占据三个格子
      // 蛇头的位置
      snake_head: { x: 20, y: 20 },
      // 蛇的长度
      snake_body_len: 20,
      // 食物的位置
      food: { x: 200, y: 200 },
      // 得分
      score: 0,
      // 方向
      snake_direction: "b", // 默认初始的时候向下走
      // 限制频率
      index: 0,
      // 蛇身的最后一格
      snake_last: Object,
      // 游戏是否结束
      isOver: false,
      // 设置动画控制
      timer: Object,
      // 键盘锁
      flag: true,
      // 设置游戏速度级别
      speed : ["手残", "入门", "一般般", "城会玩儿", "骚操作", "大佬大佬", "牛逼牛逼牛逼"],
      // 当前游戏级别
      level: Object
    };
  },
  //methods
  methods: {
    // 9-清除画布
    erase() {
      this.ctx.clearRect(0, 0, this.oC.width, this.oC.height); // 清除上一次的画布 从0，0开始 一直到整个画布
    },

    // 1-画蛇
    drawSnake() {
      this.ctx.save();
      // 填充颜色
      this.ctx.strokeStyle = this.snake_border_color;
      this.ctx.fillStyle = this.snake_color;
      // 绘制三个格子的颜色
      for (var i = 0; i < this.snake_locat.length; i++) {
        this.ctx.fillRect(
          this.snake_locat[i].x,
          this.snake_locat[i].y,
          this.snake_body_len,
          this.snake_body_len
        ); // 填充每一个的宽度和高度
        this.ctx.strokeRect(
          this.snake_locat[i].x,
          this.snake_locat[i].y,
          this.snake_body_len,
          this.snake_body_len
        ); // 边框
      }
      this.ctx.restore();
      this.ctx.save();
      this.ctx.fillStyle = this.snake_eye_color; // 眼睛：一个圆
      this.ctx.beginPath(); // 绘制路径
      this.ctx.arc(
        this.snake_head.x + 10,
        this.snake_head.y + 10,
        5,
        0,
        2 * Math.PI,
        false
      ); // 眼睛横纵坐标都加10 半径为5 圆从0度到360度定义的弧度 false顺时针
      this.ctx.fill(); // 填充
      this.ctx.closePath();
      this.ctx.restore();
    },
    // 3-随机生成食物
    createFood() {
      var x = Math.floor(Math.random() * 20);
      var y = Math.floor(Math.random() * 20);

      //食物的位置不能和蛇重合
      for (var i = 0; i < this.snake_locat.length; i++) {
        if (x != this.snake_locat[i].x && y != this.snake_locat[i].y) {
          // 头的位置和身体每一个格子都比较
          this.food = { x: x * 20, y: y * 20 }; // 得出食物坐标 *20像素
        } else {
          this.createFood();
        }
      }
    },

    // 2-画食物
    drawFood() {
      this.ctx.save();
      this.ctx.fillStyle = this.food_color; // 填充颜色
      this.ctx.fillRect(
        this.food.x,
        this.food.y,
        this.snake_body_len,
        this.snake_body_len
      ); // 宽高和蛇的身体是一样的
      this.ctx.restore();
    },

    // 4-得分
    drawScore() {
      this.ctx.save();
      this.ctx.font = "20px Verdana"; // 文字大小和类型
      this.ctx.fillStyle = "skyblue"; // 文字颜色
      this.ctx.fillText("得分:" + this.score, 300, 50); // 绘制文本
      this.ctx.restore();
    },

    // 9-当前速度级别（游戏难度）
    drawSpeed() {
      this.ctx.save();
      this.ctx.font = '20px Verdana';
      this.ctx.fillStyle = '#9b90c2';
      this.ctx.fillText('速度级别:' + this.level, 20, 50)
    },

    // 5-游戏结束提示
    drawOver() {
      this.ctx.save();
      this.ctx.font = "36px Verdana";
      this.ctx.fillStyle = "red";
      this.ctx.fillText("游戏结束", 130, 200); // 尽量在中间位置
      this.ctx.restore();
    },
    // 7-移动
    step() {
      switch (this.snake_direction) {
        case "l":
          this.snake_head = {
            x: this.snake_head.x - this.snake_body_len,
            y: this.snake_head.y
          };
          break;
        case "t":
          this.snake_head = {
            x: this.snake_head.x,
            y: this.snake_head.y - this.snake_body_len
          };
          break;
        case "r":
          this.snake_head = {
            x: this.snake_head.x + this.snake_body_len,
            y: this.snake_head.y
          };
          break;
        case "b": // 向下：x不变 y不断增加
          this.snake_head = {
            x: this.snake_head.x,
            y: this.snake_head.y + this.snake_body_len
          };
          break;
      }
      // 碰撞检测-是否吃到食物
      if (
        this.snake_head.x == this.food.x &&
        this.snake_head.y == this.food.y
      ) {
        this.createFood(); // 产生新食物
        this.snake_locat.push(this.snake_last); // 吃到了就在最后增加一格
        this.score++;
      }
      this.snake_last = this.snake_locat.pop(); // 删除最后一格
      this.snake_locat.unshift(this.snake_head); // 在前面进行添加

      // 蛇碰到自身 结束
      for (var i = 1; i < this.snake_locat.length; i++) {
        // i=0的时候就是初始位置 会直接结束游戏 所以要从1开始
        if (
          this.snake_head.x == this.snake_locat[i].x &&
          this.snake_head.y == this.snake_locat[i].y
        ) {
          // 头的位置和身体每一个格子都比较
          this.isOver = true;
          break; // 碰到就跳出！！！
        }
      }

      // 蛇碰到边界 游戏结束 -- 超出画布的宽高范围
      if (
        this.snake_head.x >= 400 ||
        this.snake_head.x < 0 ||
        this.snake_head.y >= 400 ||
        this.snake_head.y < 0
      ) {
        this.isOver = true;
      }
      this.flag = true;
    },

    // 8-动画 不停调用绘制等各种方法
    animate() {
      this.index++; //每调用一次自身就++

      //根据分数进行速度控制
      if (this.score < 5 && this.index % 10 == 0) {
        this.level = this.speed[0];
        this.step();
      } else if (this.score < 10 && this.score >= 5 && this.index % 8 == 0) {
        this.level = this.speed[1];
        this.step();
      } else if (this.score < 20 && this.score >= 10 && this.index % 6 == 0) {
        this.level = this.speed[2];
        this.step();
      } else if (this.score < 30 && this.score >= 20 && this.index % 5 == 0) {
        this.level = this.speed[3];
        this.step();
      } else if (this.score < 40 && this.score >= 30 && this.index % 4 == 0) {
        this.level = this.speed[4];
        this.step();
      } else if (this.score < 50 && this.score >= 40 && this.index % 3 == 0) {
        this.level = this.speed[5];
        this.step();
      } else if (this.score >= 50 && this.index % 2 == 0) {
        this.level = this.speed[6];
        this.step();
      }

      this.erase();
      this.drawSnake(); // 1-画蛇
      // createFood();//3- 先执行随机生成食物
      this.drawFood(); // 2-画食物
      this.drawScore(); // 4-得分
      this.drawSpeed();// 9-游戏级别
      // drawOver();// 5-游戏结束
      if (this.isOver) {
        // 为真 超出边界
        cancelAnimationFrame(this.timer); //清除动画
        this.drawOver(); // 5-游戏结束
      } else {
        this.timer = requestAnimationFrame(this.animate); // 调用自己
      }
    }
  },
  mounted() {
    window.onkeydown = ev => {
      if (this.flag) {
        switch (ev.keyCode) {
          //检测：不能朝相反的方向移动
          case 37: //左
            if (this.snake_direction != "r") this.snake_direction = "l";
            // 已经在向左移动的时候不能向右
            this.flag = false;
            break;
          case 38: //上
            if (this.snake_direction != "b") this.snake_direction = "t";
            // 向上
            this.flag = false;
            break;
          case 39: //右
            if (this.snake_direction != "l") this.snake_direction = "r";

            this.flag = false;
            break;
          case 40: //下
            if (this.snake_direction != "t") this.snake_direction = "b";

            this.flag = false;
            break;
        }
      }
    };
    this.animate();
  }
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
canvas {
  border: 10px solid skyblue;
}
</style>
