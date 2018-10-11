// var exp = '1+(3-2)/2*4-2.8';
var calcArr = [];
var jud = true;
var sArr = [];



function trans(arr) {
    if (arr.length > 0) {
        var tmp = arr.shift();
    }
    else {
        return 0;
    }
    if (tmp*1 == tmp || tmp == '.') {
        if (calcArr.length > 0) {
            if (jud) {
                calcArr[calcArr.length - 1] += '';
                calcArr[calcArr.length - 1] += tmp;
            }
            else {
                calcArr.push(tmp);
            }
        }
        else {
            calcArr.push(tmp);
        }
        jud = true;
        trans(arr);
    }
    else {
        jud = false;
        var arrTmp = push_sArr(tmp);
        if (arrTmp) {
            calcArr = calcArr.concat(arrTmp);
            trans(arr);
        }
        else {
            return 0;
        }
    }
}
function push_sArr(n, tmpArr) {
    if (tmpArr == undefined) {
        tmpArr = [];
    }
    if (sArr.length == 0) {
        sArr.push(n);
        return tmpArr;
    }
    else {
        var end = transSymbol(sArr[sArr.length-1]);
        var now = transSymbol(n);
        if (end == 3 && now != 4){
            sArr.push(n);
            return tmpArr;
        }
        if (now > end) {
            if (now == 4) {
                if (end != 3) {
                    tmpArr.push(sArr.pop());
                    return push_sArr(n, tmpArr);
                }
                else if (end == 3){
                    sArr.pop();
                    return tmpArr;
                }
                else
                    return false;
            }
            else if (now){
                sArr.push(n);
                return tmpArr;
            }
            else
                return false;
        }
        else if (now) {
            tmpArr.push(sArr.pop());
            return push_sArr(n, tmpArr);
        }
        else
            return false;
    }
}
function transSymbol(x) {
    switch (x)
    {
        case '+':
        case '-':
            return 1;
            break;
        case '*':
        case '/':
            return 2;
            break;
        case '(':
            return 3;
            break;
        case ')':
            return 4;
            break;
        default:
            return false;
    }
}

function calc(arr) {
    var tmp = arr.shift();
    var r = '';
    var l = '';
    if (arr.length == 0) {
        return tmp;
    }
    else {
        switch (tmp)
        {
            case '+':
                r = arr.pop();
                l = arr.pop();
                arr.push((l*1.0)+(r*1.0));
                break;
            case '-':
                r = arr.pop();
                l = arr.pop();
                arr.push((l*1.0)-(r*1.0));
                break;
            case '*':
                r = arr.pop();
                l = arr.pop();
                arr.push((l*1.0)*(r*1.0));
                break;
            case '/':
                r = arr.pop();
                l = arr.pop();
                arr.push((l*1.0)/(r*1.0));
                break;
            default:
                arr.push(tmp);
        }
        return calc(arr);
    }
}
function equal(expression) {
    expression = '('+expression+')';
    trans(expression.split(''));
    calcStr = calcArr.join();
    return {res: calc(calcArr), exp: calcStr};
}


console.log(equal(exp));
