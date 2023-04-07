const Common = require('../../util/Common');
const GetTableModel = require("../../common/GetTableModel");//获取数据表模型通用工具
const Functions = require("../../util/Functions");
/**
 * 省份列表
 * @param req
 * @param res
 * @param next
 */
exports.prov_list = function (req, res, next) {
    //查询省份
    GetTableModel.get_tablemodel('lee_provlist').findAndCountAll({}).then(result=> {
        Common.SuccessMessage(req, res, result.rows, "获得省份列表!");
    }).catch(error=> {
        Common.ErrorMessage(req, res, "获得省份列表失败");
    });
};
