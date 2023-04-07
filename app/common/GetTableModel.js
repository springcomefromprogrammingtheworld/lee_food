const Sequelize = require('sequelize');
const RawQueries = require('../../database/db');//原始查询对象
const ApiLog = require("../models/nodetable/ApiLog");
const Arealist = require("../models/nodetable/Arealist");
const Citylist = require("../models/nodetable/Citylist");
const Provlist =require("../models/nodetable/Provlist");
const SmallUser =require("../models/nodetable/SmallUser");
const SmallwxAddress =require("../models/nodetable/SmallwxAddress");
const WxAddress = require("../models/nodetable/WxAddress");
const WxContract = require("../models/nodetable/WxContract");
const SmallMallPtype =require("../models/nodetable/SmallMallPtype");
const SmallMallProduct =require("../models/nodetable/SmallMallProduct");
const SmallMallAttrobj =require("../models/nodetable/SmallMallAttrobj");
const SmallMallUser =require("../models/nodetable/SmallMallUser");
const SmallMallCart=require("../models/nodetable/SmallMallCart");
const SmallMallRecord=require("../models/nodetable/SmallMallRecord");
const SmallMallAddress =require("../models/nodetable/SmallMallAddress");
const SmallMallPicmaterial =require("../models/nodetable/SmallMallPicmaterial");

/**
 * 统一封装获取数据表模型
 * @param modelname 传入数据表名例如:cms_ins  cms_food_type
 * @returns {*}
 */
exports.get_tablemodel=function(modelname){
    var model={
        'lee_api_log':ApiLog,
        'lee_arealist':Arealist,
        'lee_citylist':Citylist,
        'lee_provlist':Provlist,
        'lee_small_user':SmallUser,
        'lee_smallwx_address':SmallwxAddress,
        'lee_wx_address':WxAddress,
        'lee_wx_contract':WxContract,
        'lee_small_mall_ptype':SmallMallPtype,
        'lee_small_mall_product':SmallMallProduct,
        'lee_small_mall_attrobj':SmallMallAttrobj,
        'lee_small_mall_user':SmallMallUser,
        'lee_small_mall_cart':SmallMallCart,
        'lee_small_mall_record':SmallMallRecord,
        'lee_small_mall_address':SmallMallAddress,
        'lee_small_mall_picmaterial':SmallMallPicmaterial,

    };
    return model[modelname];
};

/**
 * 获取Sequelize对象
 * @param objectname
 */
exports.get_sequelize_object=function(objectname){
    var sequelize={
        'sequelize':Sequelize,
        'rawqueries':RawQueries
    };
    return sequelize[objectname];
};
