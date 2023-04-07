const SmallMallLoginService      = require("../../service/Smallmall/SmallMallLogin");
const Common            = require("../../util/Common");
const LeeSign = require("../../common/LeeSign");


/**
 * 小程序商城用户授权登录接口(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.small_mall_login=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.small_mall_login);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallLoginService.small_mall_login(req , res , next);
        }
    }
};
