/*
*   已解决：括号嵌套括号的问题
*   未解决：浮点数
*   重写：不再使用正则，改为字符串的分割
*
*   判断负号：第一个符号就是-说明是负号 还有+-连在一起判断后面是不是-不是就报错是就说明是-
*   小数点？
*   递归？非波拉契数列？阶乘？
*   shift数组第0位 pop数组最后一位
*
*
*   新思路：split shift
*   1    1*tmp==tmp || tem = . 说明是数字的一部分 判断是数字还是运算符
*       if(this.jud){
*           += ""
*           += jud拼接小数点前后
*       }
*   2    判断临时数组是否为空
*
*
* */

//计算器开始
let inpStr = "1+2.1",//模拟输入
    finalStack = [],//最终生成逆波兰式的栈
    tempStack = [];//临时数组栈
input = inpStr.split("");//切割字符串并转为数组

console.log(input);//匹配后输入的表达式

//定义运算符优先级
let operator = {
    "+" : 0,
    "-" : 0,
    "*" : 1,
    "/" : 1,
    "(" : 2,
    ")" : 3
};

//生成逆波兰式
function toReversePolish(finalPolish) {
    for (let i = 0,length = input.length; i < length; i++) {
        if (!isNaN(input[i])) { //判断是否是数字
            finalStack.push(parseFloat(input[i]));//强制转换
        } else {
            if (tempStack.length !== 0) {//判断临时栈是否为空
                if (operator[input[i]] === 2 ) {//判断该运算符是否为左括号
                    //是左括号 直接入栈
                    tempStack.push(input[i]);
                    } else if (operator[input[i]] === 3) {//不是左括号 判断是不是右括号 是有括号则依次出栈
                        let index = tempStack.lastIndexOf("(");//返回数组中最后一个被找到的左括号
                        if ( index !== -1 ) {//不存在时indexOf返回-1
                            //左括号后面的运算符依次出栈并入finalStack
                            tempStack.push(input[i]);//当前右括号入栈，然后再删除
                            tempStack.pop();//删除栈顶右括号
                            for (let x = tempStack.length - 1; x >= index; x --) {
                                if (x === index) {
                                    tempStack.pop();//遍历到括号时 直接删除
                                } else {
                                    finalStack.push(tempStack.pop());//括号之前所有字符都入栈到finalStack
                                }
                            }
                    }
                } else {//当前也不是右括号，遍历并判断运算符优先级

                    //当前项优先级低
                    if ( operator[input[i]] <= operator[tempStack[tempStack.length - 1]] ) {

                        let index = tempStack.lastIndexOf("(");//返回数组中最后一个被找到的左括号
                        //console.log(index);
                        if ( index !== -1 ) {
                            //存在括号 依次和括号之前的运算符比较优先级 优先级大于等于该运算符的都出栈到最终栈
                            for (let x = tempStack.length - 1; x > index; x--) {//x>index不会遍历到括号 括号之前的都按优先级排列
                                finalStack.push(tempStack.pop());
                            }
                            tempStack.push(input[i]);//循环判断结束 该项入栈
                            //tempStack.push(input[i]);
                        } else {
                            for (let j = tempStack.length - 1; j >= 0; j--) {
                                //不存在括号 比该项优先级大的全部依次出栈
                                finalStack.push(tempStack.pop());
                                if (tempStack.length === 0) {//直到数组为空 该项入栈
                                    tempStack.push(input[i]);
                                    //console.log(tempStack.push(input[i]));
                                }
                            }
                        }
                    } else {
                        //当前运算符优先级大于前一个优先级，直接入栈tempStack
                        tempStack.push(input[i]);
                    }
                }

            } else {//如果临时栈为空，直接进栈
                tempStack.push(input[i]);
            }
        }
        // console.log(finalStack);
        // console.log(tempStack);
    }
    //临时栈中剩余的字符全部入栈到finalStack
    if (tempStack.length) {
        //注意 临时栈不一定只剩1个数字了 要全部出栈
        for (let k = tempStack.length - 1; k >= 0; k--) {
            finalStack.push(tempStack.pop());
        }
    }
    //console.log(finalStack);
    return finalStack;//得到逆波兰式
}


//计算逆波兰式
(function calcPolish() {
    var finalPolish = toReversePolish(finalPolish);//得到逆波兰式
    console.log(finalPolish);//输出逆波兰表达式
    let finalRstStack = [];//最终结果栈

    for (let i = 0, length = finalPolish.length; i < length; i++) {
        if (isNaN(finalPolish[i])) {//判断是否是数字
            //不是数字 结果栈倒数两位出栈并计算
            let x = finalRstStack.pop(),//栈顶数字
                y = finalRstStack.pop(),//倒数第二位数字
                tempRst;//存储临时计算结果

            // console.log(x + '这是x');
            // console.log(y + '这是y');

            //判断运算符类型
            switch (finalPolish[i]) {
                case '+' :
                    tempRst = y + x;//注意加数和被加数的顺序
                    break;
                case '-' :
                    tempRst = y - x;
                    break;
                case '*' :
                    tempRst = y * x;
                    break;
                case '/' :
                    tempRst = y / x;
                    break;
                case '%' :
                    tempRst = y % x;
                    break;
            }
            finalRstStack.push(tempRst);//每一次运算结果入栈
        } else {
            //是数字 直接进栈
            finalRstStack.push(finalPolish[i]);
        }
        //console.log(finalRstStack);每一步的结果
    }
    console.log(finalRstStack);//输出最终结果
})();


