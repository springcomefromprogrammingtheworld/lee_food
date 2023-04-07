const Functions = require("../util/Functions");
const PcasCode = require("../util/PcasCode");
const ZipCode = require("../util/ZipCode");
const moment      = require("moment");
const GetTableModel = require("./GetTableModel");//获取数据表模型通用工具
/**
 * 存储api日志
 * @param url
 * @param data
 * @param type
 * @param message
 */
exports.insert_api_log = function (url,data,type,message) {
    GetTableModel.get_tablemodel('lee_api_log').create({
        RequestUrl:url,
        Request:data,
        Time:Functions.nowtime(),
        Act:type,
        Remark:message,
        Response:'success'
    }).then(orders => {
    }).catch(error => {
    });
};

/**
 * 添加操作日志
 * @param req
 * @param res
 * @param info
 * @param loginname
 */
exports.add_actionlog=function(req,res,info,loginname){
    moment.locale("zh-cn");
    var time = moment().add(8, "hours").format("YYYY-MM-DD HH:mm:ss");
    GetTableModel.get_tablemodel('lee_log').create({
        LoginName: loginname,
        PageUrl: req.url,
        IP:  Functions.ip(),
        LogContents: info,
        LogTime: time
    });
};

//返回pcassCode
exports.pcasscode=function(){
    return PcasCode.pcassCode;
};


//返回zipcode
exports.zipcode=function(){
    return ZipCode.zipCode;
};


/**
 * 原始sql查询(该方法经测试有对数据库安全隐患)
 * @param sql
 * @returns {*}
 */
exports.select_sql=async function(sql){
    var sq=GetTableModel.get_sequelize_object('rawqueries');
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    return rs;
};


/**
 * 获取省份
 * @returns {*}
 */
exports.get_provlist=async function(){
    let sql="select * from lee_provlist";
    var sq=GetTableModel.get_sequelize_object('rawqueries');
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
   return rs;
};

/**
 * 获取城市
 * @returns {*}
 */
exports.get_citylist=async function(){
    let sql="select * from lee_citylist";
    var sq=GetTableModel.get_sequelize_object('rawqueries');
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    return rs;
};

/**
 * 获取区
 * @returns {*}
 */
exports.get_arealist=async function(){
    let sql="select * from lee_arealist";
    var sq=GetTableModel.get_sequelize_object('rawqueries');
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    return rs;
};
