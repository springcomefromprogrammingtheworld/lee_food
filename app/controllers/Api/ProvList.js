const ProvListService = require("../../service/Api/ProvList");
const Common = require("../../util/Common");
/**
 * 省份列表
 * @param req
 * @param res
 * @param next
 */
exports.prov_list = function(req, res, next) {
    ProvListService.prov_list(req,res,next);
};


exports.cryptojs=function(req,res,next){
    var CryptoJS = require("crypto-js");
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(null, 'U2FsdGVkX18+KNaqRM3yvGZjPhYJIV8N+jSTeYYTd80=').toString();
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'U2FsdGVkX18+KNaqRM3yvGZjPhYJIV8N+jSTeYYTd80=');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    Common.SuccessMessage(req, res, {"cryptojs":originalText}, "cryptojs");
};