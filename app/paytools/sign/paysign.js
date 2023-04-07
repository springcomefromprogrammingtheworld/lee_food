const payconfig = require("../alipay_wechat_unifiedconfig/config");
/**
 *  生成扫码签名算法所依赖函数
 * @param paramsStr
 */
function paramsStrSort(paramsStr) {
    var url = paramsStr;
    var urlStr = url.split("&").sort().join("&");
    const NodeRSA = require('node-rsa');
    pkcsType = 'pkcs1';
    const pkcsSize = 512;
    const BASE64 = 'base64';
    var privateKey = new NodeRSA({ b: pkcsSize });
    privateKey.setOptions({ encryptionScheme: 'pkcs1' });//指定加密格式
    privateKey.importKey(payconfig.get_pay_config('private_rsa_key'), pkcsType+'-private-pem');
    var signedData = privateKey.sign(Buffer.from(urlStr), BASE64).toString(BASE64);
    return signedData;
};

/**
 * 验证签名算法所依赖函数
 * @param paramsStr 签名参数
 * @param sign 签名参数生成的签名后要对比的签名相等则为true false为签名验证失败
 * @returns {*}
 */
function verify_paramsStrSort(paramsStr,sign) {
    var url = paramsStr;
    var urlStr = url.split("&").sort().join("&");
    const NodeRSA = require('node-rsa');
    pkcsType = 'pkcs8';
    const pkcsSize = 512;
    const BASE64 = 'base64';
    var publicKey = new NodeRSA({ b: pkcsSize });
    publicKey.importKey(payconfig.get_pay_config('public_rsa_key'), pkcsType+'-public-pem');
    var signedData = publicKey.verify(Buffer.from(urlStr), sign, 'Buffer', BASE64);
    return signedData;
};

/**
 * 生成统一支付下单签名函数
 * @param params
 */
exports.create_rsa_sign=function (params){
    if (typeof params == "string") {
        return paramsStrSort(params);
    } else if (typeof params == "object") {
        var arr = [];
        for (var i in params) {
            if(typeof params[i]== "object"){
                var temp_param=JSON.stringify(params[i]);
                arr.push((i + "=" + temp_param));
            }else{
                arr.push((i + "=" + params[i]));
            }
        }
        return paramsStrSort(arr.join(("&")));
    }
};

/**
 * 验证签名函数
 * @param params
 */
exports.verify_rsa_sign=function (params){
    if (typeof params == "string") {
        return verify_paramsStrSort(params);
    } else if (typeof params == "object") {
        var arr = [];
        for (var i in params) {
            if(typeof params[i]== "object"){
                var temp_param=JSON.stringify(params[i]);
                arr.push((i + "=" + temp_param));
            }else{
                if(i!='sign'){
                    arr.push((i + "=" + params[i]));
                }
            }
        }
        return verify_paramsStrSort(arr.join(("&")),params['sign']);
    }
};

