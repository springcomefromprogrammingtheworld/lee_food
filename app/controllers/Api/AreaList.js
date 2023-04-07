const AreaListService = require("../../service/Api/AreaList");
/**
 * 区
 * @param req
 * @param res
 * @param next
 */
exports.area_list = function(req, res, next) {
    AreaListService.area_list(req,res,next);
};