const Common = require("../../util/Common");
const GwCommon = require("../../common/Common");

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.pcasscode=function(req,res,next){
    var pcasscode=GwCommon.pcasscode();
    Common.SuccessMessage(req, res, pcasscode, "获取全国地区数据!");
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.zipcode=function(req,res,next){
    var zipcode=GwCommon.zipcode();
    Common.SuccessMessage(req, res, zipcode, "获取全国城市数据!");
};