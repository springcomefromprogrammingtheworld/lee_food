const CityList  = require("../../models/nodetable/Citylist");
const Common    = require('../../util/Common');
const GetTableModel = require("../../common/GetTableModel");//获取数据表模型通用工具
const Op =  GetTableModel.get_sequelize_object('sequelize').Op;
/**
 * 省份列表
 * @param req
 * @param res
 * @param next
 */
exports.city_list = function(req, res, next) {
    if (req.query.provid == undefined) {
        Common.ErrorMessage(req, res, "没有指定provid!");
    }else{
        var provid=Number(req.query.provid);
        GetTableModel.get_tablemodel('lee_citylist').findAll({
            where: {
                cityid: {
                    [Op.and]: [
                        { [Op.gt]: provid },
                        { [Op.lt]: provid+10000 }
                    ]
                }
            }
        }).then(function(city){
            Common.SuccessMessage(req, res, city, '获得城市列表');
        }).catch(error=>{
            Common.ErrorMessage(req, res, '获得城市列表失败!'+error);
        })
    }
};
