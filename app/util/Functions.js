const moment      = require("moment");
const ip = require('ip');
const Common = require("../util/Common");
/**
 * 获取当年年份
 * @returns {string}
 */
exports.get_year = function () {
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    return tYear.toString();
};


/**
 * 获取随机数最大范围的随机数
 * @param range
 * @returns {number}
 */
exports.random_number=function(range=9999){
  return  Math.ceil(Math.random()*range);
};

/**
 * 获取n位随机数
 * @param min 例如:1000
 * @param max 例如:9999
 * @returns {*}
 */
exports.rand=function(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
};

/**
 * 返回当前按unix时间戳
 * @returns {number}
 */
exports.nowtime = function(){
    return  Math.round(new Date() / 1000);
};

/**
 * 返回当天按unix时间戳时间 00:00
 * @returns {number|*}
 */
exports.this_day=function(){
	timestamp = new Date(new Date().toLocaleDateString()+" "+"GMT+8").getTime() / 1000;
    return timestamp;
};

/**
 * 日期格式转为换时间戳
 * @param date 例如日期参数2020-02-18 14:15:43转为时间戳1582006543
 * @returns {number}
 */
exports.date_conversion=function(date){
   return new Date(date+" "+"GMT+8")/1000;
};

/**
 * 产生随机字符
 * @param len
 * @returns {string}
 */
exports.random_string=function(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

/**
 * 返回当前按unix时间戳日期格式
 * @returns {*}
 */
exports.now_time_ymd=function(){
    moment.locale("zh-cn");
	moment.tz.setDefault("Asia/Shanghai");
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    return time;
};


/**
 * 转换日期格式为时间戳
 * @param date  传递示例 '2020-02-21 11:09:51';
 * @returns {number}
 */
exports.get_timestamp=function(date){
    var timestamp = new Date(date+" "+"GMT+8").getTime()/1000;
    return timestamp;
};

/**
 * 转换时间戳为日期格式
 * @param timestamp
 * @returns {string}
 */
exports.timestamp_totime=function (timestamp) {
	    moment.locale("zh-cn");
		moment.tz.setDefault("Asia/Shanghai");
	    var time_ymd_hms=moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
       return time_ymd_hms;
};

/**
 * 获取本机ip
 * @returns {*}
 */
exports.ip=function(){
     server_ip = ip.address(); //本机IP（获取客户端ip地址）
    return server_ip;
};

/**
 * 正则验证邮箱正确与否
 * @param email
 * @returns {boolean}
 */
exports.is_email=function(email){
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(reg.test(email)){
          return false;  //邮箱格式正确
    }else{
          return true;//邮箱格式不正确
    }
};

/**
 * 图片上传类型检测及保存，并且返回图片文件命名
 * @param sdir 存储图片路径
 * @param files_path  文件路径
 * @param file_type 文件类型检测
 * @param req
 * @param res
 * @param next
 * @returns {string} 返回图片名称
 */
exports.imgtype_check=function (sdir,files_path,file_type,req,res,next){
    var dir=sdir;
    var extName = '';  //后缀名
    switch (file_type) {
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
        case 'image/webp':
            extName='webp';
            break;
    }
    if (extName.length == 0) {
        this.del_file(files_path,req,res,next);
        return null;
    }else{
        var avatarName = this.random_string(13) + '.' + extName;
        var newPath = dir + avatarName;
        fs.renameSync(files_path, newPath);//重命名
        return avatarName;
    }
};

/**
 * 文件上传类型检测及保存，并且返回文件命名
 * @param sdir 存储文件路径
 * @param files_path  文件路径
 * @param file_type 文件类型检测
 * @param req
 * @param res
 * @param next
 * @returns {string} 返回新文件名称
 */
exports.filetype_check=function(sdir,files_path,file_type,req,res,next){
    var dir=sdir;
    var extName = '';  //后缀名
    switch (file_type) {
        case 'text/plain':
            extName = 'txt';
            break;
        case 'application/pdf':
            extName = 'pdf';
            break;
    }
    if (extName.length == 0) {
        this.del_file(files_path,req,res,next);
        return null;
    }else{
        var avatarName = this.random_string(13) + '.' + extName;
        var newPath = dir + avatarName;
        fs.renameSync(files_path, newPath);//重命名
        return avatarName;
    }
};


/**
 *  删除文件
 * @param path 文件路径例如:"uploads/pic/buyback/upload_14cbe1fad7ec73478bec7de0e5daa3a7.png;
 * @param req
 * @param res
 * @param next
 */
exports.del_file=function (path,req,res,next){
    fs.unlink(path, function (err) {
        if (err) {
            return Common.ErrorMessage(req, res, err);
        }
    });
};

/**
 * 获取某年某月第一天零时零分零秒时间戳
 * @param y 年 传值示例:2020
 * @param m 月  传值示例:1
 */
exports.get_months_firstday=function(y,m){
    return new Date(new Date(y, m - 1, 1)+" "+"GMT+8").getTime()/1000;
};



/**
 * 获取某年某月最后一天23：59：59时间戳
 * @param y 年 传值示例:2020
 * @param m 月 传值示例:1
 * @returns {number}
 */
exports.get_months_lastday=function (y,m){
    return new Date(new Date(y, m, 0)+" "+"GMT+8").getTime()/1000+86399;
};


/**
 * 获取n个月前的日期 最多往前倒推12个月
 * @author spring
 * @email 826671858@qq.com
 * @param date  例如:2020-12-23
 * @param monthNum  例如:1-12之间的范围
 * @returns {string}
 */
exports.get_premonthday=function (date, monthNum) {
    var dateArr = date.split('-');
    var year = dateArr[0]; //获取传入日期的年份
    var month = dateArr[1]; //获取传入日期的月份
    //var day = dateArr[2]; //获取传入日期的日
    //var days = new Date(year, month, 0);
    var premonth;//存储n个月前月数
    if ((parseInt(month) - monthNum) == 0 && parseInt(month) == monthNum) {
        premonth = 12;
        year = parseInt(year) - 1;
    } else if ((parseInt(month) - monthNum) < 0) {
        premonth = 12 + (month - monthNum);
        year = parseInt(year) - 1;
    } else {
        premonth = parseInt(month) - monthNum;
    }
    //days = new Date(year, premonth, 0);
    //days = days.getDate(); //获取当前日期中月的天数
    premonth = parseInt(premonth) < 10 ? "0" + premonth : premonth;
    return year + "-" + premonth + "-" + "01";
};

/**
 *  正则验证手机号码正确与否
 * @param phone
 * @returns {boolean}
 */
exports.checkphone=function(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        return true;//手机号码不正确
    }else{
        return false;//手机号码正确
    }
};

/**
 * 返回加密字符串
 * @param str
 * @returns {*}
 */
exports.crypto_encrypt=function(str){
    // Encrypt
    var CryptoJS = require("crypto-js");
    var ciphertext;
     ciphertext = CryptoJS.AES.encrypt(str, 'U2FsdGVkX18+KNaqRM3yvGZjPhYJIV8N+jSTeYYTd80=').toString();
    return ciphertext;
};

/**
 * 返回解密字符串
 * @param str
 * @returns {*}
 */
exports.crypto_decrypt=function(str){
    // Decrypt
    var CryptoJS = require("crypto-js");
    var originalText;

    try{
        if(str==undefined){
          return null;
        }else{
            var bytes  = CryptoJS.AES.decrypt(str, 'U2FsdGVkX18+KNaqRM3yvGZjPhYJIV8N+jSTeYYTd80=');
            originalText = bytes.toString(CryptoJS.enc.Utf8);
            return originalText;
        }
    }catch (e){
        return null;
    }

};

/**
 * 获取格式化年月日例如: 20210610
 * @returns {*}
 */
exports.get_ymd=function(){
    moment.locale("zh-cn");
    moment.tz.setDefault("Asia/Shanghai");
    return moment().format("YYYYMMDD");
};

/**
 * 获取昨天年月日日期格式
 * @returns {string}
 */
exports.gw_yesterday=function(){
    var  yesterday= new Date();
    yesterday.setTime(yesterday.getTime()-24*60*60*1000);
    return yesterday.getFullYear()+"/" + (yesterday.getMonth()+1) + "/" + yesterday.getDate();
};