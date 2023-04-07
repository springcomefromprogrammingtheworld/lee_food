const Arealist  = require("../../models/nodetable/Arealist");
const GetTableModel = require("../../common/GetTableModel");//获取数据表模型通用工具
const Common    = require('../../util/Common');
const Op =  GetTableModel.get_sequelize_object('sequelize').Op;
/**
 * 省份列表
 * @param req
 * @param res
 * @param next
 */
exports.area_list = function(req, res, next) {
    if (req.query.cityid== undefined) {
        Common.ErrorMessage(req, res, "没有指定cityid!");
    }else{
        var cityid=Number(req.query.cityid);
        GetTableModel.get_tablemodel('lee_arealist').findAll({
            where: {
                areaid: {
                    [Op.and]: [
                        { [Op.gt]: cityid },
                        { [Op.lt]: cityid+100 }
                    ]
                }
            }
        }).then(function(area){
            Common.SuccessMessage(req, res, area, '获得区列表');
        }).catch(error=>{
            Common.ErrorMessage(req, res, '获得区列表失败!'+error);
        })
    }
};