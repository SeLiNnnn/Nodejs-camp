var num=0;
var result=0;
var numshow="0"; 
var operate=0; //判断输入状态的标志 
var calcul=0; //判断计算状态的标志 
var quit=0; //防止重复按键的标志 
// 隐藏提示信息
function info(){
    var info=document.getElementById("info");
    info.style.display="none";
}
//数字按钮
function onbutton_number(num){
    var show=document.getElementById("show");
    var str=String(show.value); //获得当前显示数据 
    str=(str!="0") ? ((operate==0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值; 
     str=str + String(num); //给当前值追加字符 
     show.value=str; //刷新显示 
    operate=0; //重置输入状态 
    quit=0; //重置防止重复按键的标志
}
//小数点按钮
/**
*
**/
function onbutton_point(){ 
    var show=document.getElementById("show");
    var str=String(show.value);
    str=(str!="0") ? ((operate==0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"; 
    for(i=0; i<=str.length;i++){ //判断是否已经有一个点号 
        if(str.substr(i,1)=="."){ 
            return false;       //如果有则不再插入
        }
    }
    str=str + "."; 
    show.value=str; 
    operate=0;
     
}
//退格按钮
function onbutton_back(){               
    var show=document.getElementById("show");
    var str=String(show.value);
    str=(str!="0") ? str : ""; 
    str=str.substr(0,str.length-1); 
    str=(str!="") ? str : "0"; 
    show.value=str; 
}
//清零操作
function onbutton_clear(){     //重置为初始状态
    num=0; 
    result=0;
    numshow="0";                         
    var show=document.getElementById("show");
    show.value="0";
}
//加法运算
function onbutton_plus(){
    calculate(); //调用计算函数 
    operate=1; //更改输入状态 
    calcul=1; //更改计算状态为加 
}
//减法运算
function onbutton_minus(){
    calculate(); 
    operate=1; 
    calcul=2; 
}
//乘法运算
function onbutton_mult(){
    calculate(); 
    operate=1; 
    calcul=3; 
}
//除法运算
function onbutton_div(){
    calculate(); 
    operate=1; 
    calcul=4; 
}
//等于操作
function onbutton_equal(){
    calculate(); //等于 
    operate=1; 
    num=0; 
    result=0; 
    numshow="0"; 
}
function calculate(){
    show=document.getElementById("show");
    numshow=Number(show.value); 
    if(num!=0 && quit!=1){ //判断前一个运算数是否为零以及防重复按键的状态 
        switch(calcul){ //判断要输入状态 
            case 1:result=num+numshow;break; //计算"+" 
            case 2:result=num-numshow;break; //计算"-" 
            case 3:result=num*numshow;break; //计算"×" PS：被除数÷除数=商
            case 4:
                if(numshow!=0){          //计算"÷"
                    result=num/numshow;
                }else{
                    var test=document.getElementById("info");
                    test.style.display="block";
                    test.innerHTML="<img src='image/info.gif'/><b style='color:red; font-size:24px'>除数不可以为&nbsp<big><u>"
                    +"0</u></big>&nbsp;！</b>"
                    setTimeout("info()",3000);
                } 
                break; 
            } 
        quit=1; //避免重复按键 
    }else{ 
        result=numshow; 
    } 
    numshow=String(result); 
    show.value=numshow; 
    num=result; //存储当前值 
} // JavaScript Document
