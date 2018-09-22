// var tempStack = [0,1];//temp
// var finalStack = [];
// //现在得到的是- 优先级=0
//
// //希望得到的是 tempStack=[-]也就是[0],finalStack = [* +]也就是[1,0]
//
// //栈顶元素 length-1
// for (var j = tempStack.length-1; j >=0; j--) {
//     if (0 < tempStack[j]) {
//         finalStack.push(tempStack.pop());
//     } else if ( 0 === tempStack[j]) {
//         finalStack.push(tempStack.pop());
//         tempStack.push(0);
//     } else {
//         tempStack.push(0);
//     }
//
//
//     console.log(tempStack);
//     console.log(finalStack);
// }

// var arr = [1];
// var test = [];
// test = test.push(arr.pop());
// console.log(test);


//判断tempStack里是否已经存在优先级为2的左括号
// (function isBracket() {
//     for (let k = tempStack.length - 1; k >= 0; k--) {
//         //存在优先级为2的 栈顶到优先级为2之间的数 全部出栈加入finalStack
//         if (operator[tempStack[k]]===2) {
//             //优先级为的2的舍弃
//             let index = 0;
//             tempStack[k].index = k;//自定义属性存储优先级为2的序号
//             for (let x = tempStack.length - 1; x >= index; x --) {
//                 if ( x = index ) {
//                     tempStack.pop();
//                 } else {
//                     finalStack.push(tempStack.pop());//取出栈顶元素放入最终栈
//                 }
//             }
//         } else {
//             //不存在优先级为2的 直接入栈
//             tempStack.push(input[i]);
//         }
//     }
// })();

//尝试匹配负数
//var reg = /-[0-9]?.?[0-9]?[0-9]/g;//匹配负整数或负浮点数
//var str = "-8-9+3";

// var reg = /-(?=\d)/g;//匹配后面是数字的-
//var reg = /(?<=\d)-/g;//匹配前面有数字的-，这个才是减号，否则是负号

//var input = str.match(reg);
//console.log(input);

//匹配减号：匹配前面是数字的才是-


//尝试区分
//let reg = /(?<=\d)-/g;//这是减号

//let reg = /\d+|\+|(?<=\d)-|\*|\/|\(|\)/g;

//可用
// let reg = /(?<=\d)-|-?\d+/g;//先区分减号和负号，再匹配整数
//let reg = /(?<=\d)-|-?\d+|\+|\(|\)/g;

//let reg2 = /-?\d+|(?<=\d)-/g;



let reg = /(?<=\d)-|\*|\+|\\|\(|\)|-?[0-9]?.?[0-9]?[0-9]/g;//这种写法，.? 当出现3+2时 会把+2当做一个数 且认为不是.也可以在后面跟上数字

let str = '-2.11*3+2+9';

//let str = '-1+2-9';
let input = str.match(reg);
console.log(input);









