const SmallMallAddressService      = require("../../service/Smallmall/SmallMallAddress");
const Common            = require("../../util/Common");
const LeeSign = require("../../common/LeeSign");


/**
 * 小程序商城-我的收货地址
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.address_list = function (req, res, next, verifySignRs={}) {
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.address_list);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallAddressService.address_list(req, res, next);
        }
    }
};

/**
 * 小程序商城-添加我的收货地址
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.add_address=function(req, res, next, verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.add_address);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallAddressService.add_address(req, res, next);
        }
    }
};

/**
 * 小程序商城-更新我的收货地址
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.update_address=function(req, res, next, verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.update_address);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallAddressService.update_address(req, res, next);
        }
    }
};

/**
 * 小程序商城-删除我的收货地址
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.del_address=function(req, res, next, verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.del_address);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallAddressService.del_address(req, res, next);
        }
    }
};

/**
 * 小程序商城-设置我的默认收货地址
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.set_default_address=function(req, res, next, verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.set_default_address);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallAddressService.set_default_address(req, res, next);
        }
    }
};