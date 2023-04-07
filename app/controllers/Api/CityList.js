const CityListService = require("../../service/Api/CityList");
/**
 * 省份列表
 * @param req
 * @param res
 * @param next
 */
exports.city_list=function(req,res,next){
    CityListService.city_list(req,res,next);
};
