const moment      = require("moment");
const fs          = require('fs');
const path        = require('path');
const signkey     = 'CE0A93003F444DC4704581DF9AF4E0B2';
const SHA256      = require('sha256');
const Functions = require("./Functions");
const restfulData = {
    "status": 0,
    "data": "",
    "msg": ""
};

/**
 * 正确提示
 * @param req
 * @param res
 * @param info
 * @constructor
 */
exports.SuccessMessage = function(req, res, data, info , code = 0) {
    restfulData.status = code;
    restfulData.data = data;
    restfulData.msg = info;
    res.send(JSON.stringify(restfulData));
};

/**
 * 错误提示
 * @param req
 * @param res
 * @param info
 * @constructor
 */
exports.ErrorMessage = function(req, res, info , code = -1) {
    restfulData.status = code;
    restfulData.data = '';
    restfulData.msg = info;
    res.send(JSON.stringify(restfulData));
};

/**
 * 错误提示
 * @param req
 * @param res
 * @param info
 * @constructor
 */
exports.error_message_v10 = function(req, res, data, info , code = -1) {
    restfulData.status = code;
    restfulData.data = data;
    restfulData.msg = info;
    res.send(JSON.stringify(restfulData));
};




/**
 * 保留n位小数逢五进一
 * @param Decimal 浮点数
 * @param number  四舍五入保留的小数位
 * @return rs 返回处理后的浮点数
 */
exports.sround = function (Decimal, number) {
    var rs;
    var numstr;
    if (isNaN(Decimal)) {
        rs = "非数字";
        return rs;
    }

    if (Decimal == parseInt(Decimal)) { //如果是整数
        rs = Decimal;
    } else {
        numstr = Decimal.toString();
        var lNumStr = "";
        var rNumStr = "";
        var pointstr = "";
        for (i = 0; i < numstr.length; i++) {
            if (numstr[i] != '.' && pointstr != '.') {
                lNumStr += numstr[i];
            } else if (numstr[i] == '.') {
                pointstr = numstr[i];
            } else {
                rNumStr += numstr[i];
            }
        }
        var rnumres = Cdecimal(rNumStr, number);
        if (rnumres == "1") {
            rs = parseInt(lNumStr) + 1;
        } else {
            rs = lNumStr + pointstr + rnumres;
            rs = parseFloat(rs);
        }
    }
    return rs;
}

/**
 * @param rNumStr 浮点数右边小数
 * @param number  保留的小数位
 * @returns {string} 以字符串的形式返回小数
 * 修改于2018/11/01
 */
function Cdecimal(rNumStr, number) {
    var tmprNumStr = "";
    var tmpnum = "";
    if (rNumStr.length == 1 && number == 1) { //小数长度等于1，并且要保留的小数长度也等于1（不进行四舍五入）
        tmprNumStr = rNumStr;
    } else if (rNumStr.length == number) {//小数长度等于要保留的小数长度（不进行四舍五入）
        tmprNumStr = rNumStr;
    } else if (rNumStr.length > number) { //小数长度大于要保留的小数长度，保留number长度的小数并进行四舍五入
        for (var j = 0; j < rNumStr.length; j++) {
            if (j == number) {
                tmpnum = parseInt(rNumStr[j]);
                break;
            } else {
                tmprNumStr += rNumStr[j];
            }
        }
        if (tmpnum >= 5) { //进行四舍五入
            var and_one;
            if (tmprNumStr[number - 1] == 9 && tmprNumStr[number - 2] == 9) {
                tmprNumStr = replacePos(tmprNumStr, number, 0);
                tmprNumStr = replacePos(tmprNumStr, number - 1, 0);
                if (tmprNumStr.length >= 3) {
                    var count = number - 2;//初始替换位置
                    var forcount = count;//循环计数器
                    var count2 = number - 3;//对比小数初始位置
                    for (var i = 0; i < forcount; i++) {
                        if (tmprNumStr[count2] == 9) {    //检查小数点是9处理逻辑
                            tmprNumStr = replacePos(tmprNumStr, count, 0);
                            count -= 1;
                            count2 -= 1;
                        } else {     //小数点不是9处理完后中断处理逻辑
                            and_one = (parseInt(tmprNumStr[count - 1]) + 1).toString();
                            tmprNumStr = replacePos(tmprNumStr, count, and_one);
                            break;
                        }
                    }
                }
                if (tmprNumStr == 0) { //如果小数点都是9那么四舍五入后小数点全是0，这时直接返回1
                    tmprNumStr = 1;
                }

            } else {
                var res = parseInt(tmprNumStr[number - 1]) + 1;
                if (res == 10) {
                    and_one = "0";
                    tmprNumStr = replacePos(tmprNumStr, number, and_one);
                    tmprNumStr = replacePos(tmprNumStr, number - 1, (parseInt(tmprNumStr[number - 2]) + 1).toString());
                } else {
                    and_one = (parseInt(tmprNumStr[number - 1]) + 1).toString();
                    tmprNumStr = replacePos(tmprNumStr, number, and_one);
                }

            }
        }
    } else if (rNumStr.length < number) { //小数长度小于要保留的小数长度，循环补0
        tmprNumStr = rNumStr;
        for (k = 0; k < number - rNumStr.length; k++) {
            tmprNumStr += "0";
        }
    }
    return tmprNumStr;
}

/**
 * 来源第三方
 * @param strObj 字符串源目标
 * @param pos    替换的位置从1开始算起
 * @param replacetext 目标字符串
 * @returns {string|*}
 */
function replacePos(strObj, pos, replacetext) {
    var str = strObj.substr(0, pos - 1);  // 取左边到指定位置的字符串
    str += replacetext;   // 与目标字符串相连
    str += strObj.substring(pos, strObj.length);   // 取指定位置到右边的字符串
    // 现在可以知道这三行的意思为: 在指定位置添加目标字符串
    return str;    // 返回新的字符串
}

/**
 * 判断是否数组
 * @param value
 * @returns {*}
 */
exports.isArray = function(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    }else{
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

/**
 * 获取当前时间
 */
exports.getmoment = function(){
    moment.locale("zh-cn");
    var time = moment().add(8, "hours").format("YYYY-MM-DD HH:mm:ss");
    return time;
}

/**
 * 实现二维数组转置
 * @param arrs array
 * @param arrays array
 * @constructor
 */
exports.ArraryTranspose = function (arrs,arrays){
    var arr = [];
    arr.push(arrs);
    arr.push(arrays);
    var newarr=[];
    for(var i=0;i<arr[0].length;i++){
        newarr[i]=[];
    }
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].length;j++){
            newarr[j][i]=arr[i][j];
        }
    }

    return newarr;
}

/**
 * 删除数组中的空值
 * @param array
 * @returns {*}
 */
exports.trimSpace = function (array){
    for(var i = 0 ;i<array.length;i++)
    {
        if(array[i] == " " || array[i] == null || typeof(array[i]) == "undefined")
        {
            array.splice(i,1);
            i= i-1;

        }
    }
    return array;
}


/**
 * 调用示例 img.trim('[', 'left');
 * @param char
 * @param type
 * @returns {string}
 */
String.prototype.trim = function (char, type) {
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};

/**
 * 返回当前按unix时间戳
 * @returns {number}
 */
exports.nowtime = function(){
   return  Math.round(new Date() / 1000);
};

/**
 * 对象转数组
 * @param obj
 * @returns {null} [{aa:bb}, {cc:dd}, {ee:ff}, {gg:hh}] or 0
 */
exports.objectToarray = function(obj){
    let array=[];
     if(typeof obj=="object"){
         let arr = Object.values(obj);
         let arr1= Object.keys(obj);
         for(var i=0;i<arr1.length;i++){
             var tem={};
             tem[arr1[i]]=arr[i];
             array.push(tem);
         }
         if(array.length>=1){
             return array;
         }else{
             return 0;
         }
     }else{
         return 0;
     }
};

/**
 * 对象进行ascii排序
 * @param obj
 */
exports.sort_ascii = function(obj){
    var arr = new Array();
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++;
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;
};

/**
 * 获取所有请求参数
 * @param array 传入参数格式规定[req.body,req.query,req.params]
 */
exports.get_req_parms = function(array){
    for(var i=0;i<array.length;i++){
        if(JSON.stringify(array[i])!="{}"){
            return array[i];
        }
    }
};

/**
* 生成签名
*/	
exports.getSign = function (arr) {
    var signPars = "";
    for(var key in arr) {
        if("sign" != key && "" != arr[key] && null!=arr[key]&&typeof arr[key]!="object"&&"menu" != key) {
            signPars += key + "=" + arr[key] + "&";
        }
    }
    signPars += signkey;
    var sign = SHA256(new Buffer.from(signPars).toString('base64'));
    return sign;	
};

/**
 * 删除文件和文件夹
 */
exports.deleteFolder = function (path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            // if(fs.statSync(curPath).isDirectory()) { // recurse
            //     deleteFolder(curPath);
            // } else { // delete file
                fs.unlinkSync(curPath);
            // }
        });
        //fs.rmdirSync(path);
    }
};