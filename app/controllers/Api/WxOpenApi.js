const WxOpenApiService = require("../../service/Api/WxOpenApi");
const Common = require("../../util/Common");

/**
 * 微信公众号用于调用微信JS接口的临时票据api
 * @param req
 * @param res
 * @param next
 */
exports.wx_jssdk_basic = function(req, res, next) {
    WxOpenApiService.wx_jssdk_basic(req,res,next);
};
