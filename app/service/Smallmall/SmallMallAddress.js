const Common = require("../../util/Common");
const Functions = require("../../util/Functions");
const GetTableModel = require("../../common/GetTableModel");//获取数据表模型通用工具
const SmallMallcommon= require("../../common/SmallMallcommon");//小程序商城公用模块


/**
 * 小程序商城-我的收货地址
 * @param req
 * @param res
 * @param next
 */
exports.address_list = function (req, res, next) {
    if (req.body.page == undefined || req.body.rows == undefined) {
        Common.ErrorMessage(req, res, "缺失请求参数:page、rows其中之一或全部!");
    }else{
        let s = (Number(req.body.page) > 1) ? (Number(req.body.page - 1) * Number(req.body.rows)) :
        Number(req.body.page) - 1;
        let e = Number(req.body.rows);
        var where = {
            small_openid:req.body.small_openid
        };
        GetTableModel.get_tablemodel('lee_small_mall_address').findAndCountAll({
            where:where,
            raw:true,
            offset: s,
            limit: e,
            order: [
                ['create_time', 'Desc']
            ],
        }).then(result=> {
            if(result.rows.length==0){
                Common.SuccessMessage(req, res,result,"没有更多记录了!");
            }else{
                Common.SuccessMessage(req , res , result , '获取小程序商城我的收货地址成功！');
            }
        }).catch(error=>{
            Common.ErrorMessage(req, res, error.toString());
        });
    }
};

/**
 * 小程序商城-添加我的收货地址
 * @param req
 * @param res
 * @param next
 */
exports.add_address=function(req, res, next){
    if(req.body.small_address==undefined||req.body.small_contract==undefined||req.body.small_tel==undefined||req.body.small_openid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:small_address、small_contract、small_tel、small_openid其中之一或全部!");
    }else{
        var address_format=SmallMallcommon.check_address_format(req.body.small_address);
        var checkphone=Functions.checkphone(req.body.small_tel);
        if(address_format){
            Common.ErrorMessage(req, res, "收货地址格式错误添加失败!");
        }else if(checkphone){
            Common.ErrorMessage(req, res, "手机号码格式不正确添加失败!");
        }else if(req.body.small_contract.length<2){
            Common.ErrorMessage(req, res, "联系人名称错误，字符最少2个字!");
        }else{
            GetTableModel.get_tablemodel('lee_small_mall_address').findOne({
                where:{
                    small_openid: req.body.small_openid
                }
            }).then(address=>{
                if(address==null){
                    GetTableModel.get_tablemodel('lee_small_mall_address').create({
                        small_openid: req.body.small_openid,
                        small_contract:req.body.small_contract,
                        small_tel:req.body.small_tel,
                        small_address:req.body.small_address,
                        create_time:Functions.nowtime(),
                        default:1
                    }).then(rs => {
                        Common.SuccessMessage(req, res,rs,'添加收货地址成功!');
                    }).catch(error=>{
                        Common.ErrorMessage(req, res, "添加收货地址失败!");
                    });
                }else{
                    GetTableModel.get_tablemodel('lee_small_mall_address').create({
                        small_openid: req.body.small_openid,
                        small_contract:req.body.small_contract,
                        small_tel:req.body.small_tel,
                        small_address:req.body.small_address,
                        create_time:Functions.nowtime()
                    }).then(rs => {
                        Common.SuccessMessage(req, res,rs,'添加收货地址成功!');
                    }).catch(error=>{
                        Common.ErrorMessage(req, res, "添加收货地址失败!");
                    });
                }
            }).catch(error=>{
                Common.ErrorMessage(req, res, error.toString());
            });
        }
    }
};

/**
 * 小程序商城-更新我的收货地址
 * @param req
 * @param res
 * @param next
 */
exports.update_address=function(req, res, next){
    if(req.body.small_address==undefined||req.body.small_contract==undefined||req.body.small_tel==undefined||req.body.small_addressid==undefined||req.body.small_openid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:small_openid、small_address、small_contract、small_tel、small_addressid其中之一或全部!");
    }else{
        var address_format=SmallMallcommon.check_address_format(req.body.small_address);
        var checkphone=Functions.checkphone(req.body.small_tel);
        if(address_format){
            Common.ErrorMessage(req, res, "收货地址格式错误更新失败!");
        }else if(checkphone){
            Common.ErrorMessage(req, res, "手机号码格式不正确更新失败!");
        }else if(req.body.small_contract.length<2){
            Common.ErrorMessage(req, res, "联系人名称错误，字符最少2个字!");
        }else{
            GetTableModel.get_tablemodel('lee_small_mall_address').update({
                small_contract:req.body.small_contract,
                small_tel:req.body.small_tel,
                small_address:req.body.small_address
            },{
                where:{
                    small_openid:req.body.small_openid,
                    small_addressid:req.body.small_addressid
                }
            }).then(rs => {
                Common.SuccessMessage(req , res , [] , '更新收货地址成功！');
            }).catch(error=>{
                Common.SuccessMessage(req , res , [] , '更新收货地址失败！');
            });
        }
    }
};


/**
 * 小程序商城-删除我的收货地址
 * @param req
 * @param res
 * @param next
 */
exports.del_address=function(req, res, next){
    if(req.body.small_addressid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:small_addressid!");
    }else{
        var where = {
            small_addressid: req.body.small_addressid
        };
        GetTableModel.get_tablemodel('lee_small_mall_address').destroy({
            where:where
        }).then(rs => {
            Common.SuccessMessage(req , res , rs , '删除我的收货地址成功!');
        }).catch( error => {
            Common.ErrorMessage(req , res , '删除我的收货地址失败!');
        });
    }
};

/**
 * 小程序商城-设置我的默认收货地址
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.set_default_address=function(req, res, next, verifySignRs={}){
    if(req.body.small_addressid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:small_addressid!");
    }else{
        GetTableModel.get_tablemodel('lee_small_mall_address').update({
            default:0
        },{
            where:{
                small_openid:req.body.small_openid
            }
        }).then(rs => {
            GetTableModel.get_tablemodel('lee_small_mall_address').update({
                default:1
            },{
                where:{
                    small_addressid:req.body.small_addressid
                }
            }).then(rs => {
                Common.SuccessMessage(req , res , [] , '设置默认收货地址成功！');
            }).catch(error=>{
                Common.SuccessMessage(req , res , [] , '设置默认收货地址失败！');
            });
        });
    }
};
