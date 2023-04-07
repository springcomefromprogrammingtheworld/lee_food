const SmallMallService      = require("../../service/Smallmall/SmallMall");
const Common            = require("../../util/Common");
const LeeSign = require("../../common/LeeSign");


/**
 * 小程序商城全部产品分类信息接口(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs 签名结果
 */
exports.all_ptype_info = function(req , res , next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.all_ptype_info);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.all_ptype_info(req, res, next);
        }
    }
};

/**
 * 获取小程序商城产品接口(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.get_small_mall_products=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.get_small_mall_products);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.get_small_mall_products(req, res, next);
        }
    }
};


/**
 * 小程序商城添加产品进购物车接口(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.small_mall_addcart=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.small_mall_addcart);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.small_mall_addcart(req, res, next);
        }
    }
};


/**
 * 小程序商城购物车接口(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.small_mall_cartlist=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.small_mall_cartlist);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.small_mall_cartlist(req, res, next);
        }
    }
};


/**
 * 小程序商城删除购物车中的一件商品或者全部商品(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.small_mall_delcart=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.small_mall_delcart);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.small_mall_delcart(req, res, next);
        }
    }
};


/**
 * 具体商品添加或者减少购买数量,并且返回添加或者减少购买数量后的总价格(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.cart_buy_number=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.cart_buy_number);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.cart_buy_number(req, res, next);
        }
    }
};



/**
 * 订单确认-购物车批量结算(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.cart_checkout=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.cart_checkout);//签名机制
    }else{
        if(verifySignRs.status!=1){
            Common.ErrorMessage(req, res,verifySignRs.msg,verifySignRs.status);
        }else {
            SmallMallService.cart_checkout(req, res, next);
        }
    }
};

/**
 * 小程序支付回调通知(控制器层)
 * @param req
 * @param res
 * @param next
 */
exports.smallmall_pay_callback=function(req,res,next){
    SmallMallService.smallmall_pay_callback(req, res, next);
};


/**
 *  获取小程序商城购物微信支付订单结果(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.get_smallpay_result=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.get_smallpay_result);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallService.get_smallpay_result(req, res, next);
        }
    }
};


/**
 * 小程序商城小程序客户端订单记录(控制器层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.small_mall_order_record=function(req,res,next,verifySignRs={}){
    if(JSON.stringify(verifySignRs)=='{}'){
        LeeSign.verifySign(req , res , next,exports.small_mall_order_record);
    }else{
        if(verifySignRs.status != 1){
            Common.ErrorMessage(req , res , verifySignRs.msg , verifySignRs.status);
        }else{
            SmallMallService.small_mall_order_record(req, res, next);
        }
    }
};



exports.test=function(req,res,next){
    SmallMallService.test(req, res, next);
};