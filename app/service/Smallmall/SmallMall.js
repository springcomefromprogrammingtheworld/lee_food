const Common = require("../../util/Common");
const Functions = require("../../util/Functions");
const GetTableModel = require("../../common/GetTableModel");//获取数据表模型通用工具
const Op =  GetTableModel.get_sequelize_object('sequelize').Op;
const md5        = require("md5");
const LeeCurl = require("../../common/Curl");
const SmallMallcommon= require("../../common/SmallMallcommon");//小程序商城公用模块
const LeeCommon = require("../../common/Common");
const paytools= require("../../paytools/paytools");//导入支付工具类集合
/**
 * 小程序商城全部产品分类信息接口(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.all_ptype_info = function(req , res , next){
    var where;
    GetTableModel.get_tablemodel('lee_small_mall_ptype').findAndCountAll({
        where:where,
        raw:true,
        order: [
            ['small_ptypeid', 'ASC']
        ]
    }).then(result=> {
        Common.SuccessMessage(req, res,result, "返回小程序商城产品分类!");
    }).catch(error=>{
        Common.ErrorMessage(req, res, error);
    });
};

/**
 * 获取小程序商城产品接口(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.get_small_mall_products=async function(req,res,next){
    if (req.body.page == undefined || req.body.rows == undefined||req.body.small_ptypeid== undefined) {
        Common.ErrorMessage(req, res, "缺失请求参数!");
    }else{
        let s = (Number(req.body.page) > 1) ? (Number(req.body.page - 1) * Number(req.body.rows)) :
        Number(req.body.page) - 1;
        let e = Number(req.body.rows);
        var products = await SmallMallcommon.get_small_mall_productslist(req.body.small_ptypeid,s,e);
        for(let i=0;i<products.length;i++){
            var attr_group=await SmallMallcommon.get_small_mall_products_attr(products[i]['smallproductid']);
            products[i]['attr_group']=attr_group;
        }
        Common.SuccessMessage(req, res,{products:products}, "返回小程序商城产品!");
    }
};


/**
 * 小程序商城添加产品进购物车接口(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.small_mall_addcart=async function(req,res,next){
    if (req.body.small_openid == undefined || req.body.smallproductid == undefined||req.body.small_product_name== undefined||
        req.body.small_count == undefined||req.body.attr_object==undefined||req.body.attrid==undefined) {
        Common.ErrorMessage(req, res, "缺失请求参数!");
    }else{
        var products=await SmallMallcommon.is_smallmall_products(req.body.smallproductid);//查询是否存在该商品;
        var attr=await SmallMallcommon.is_smallmall_products_attr(req.body.smallproductid);//查询该商品是否存在产品属性
    if(attr&&(req.body.attr_object==""||req.body.attrid=="")){
            Common.ErrorMessage(req, res, "请选择"+req.body.small_product_name+"属性规格!");
        }else if(products){
            GetTableModel.get_tablemodel('lee_small_mall_cart').create({
                small_openid:req.body.small_openid,
                smallproductid:req.body.smallproductid,
                small_product_name:req.body.small_product_name,
                small_count:req.body.small_count,
                create_time:Functions.nowtime(),
                attr_object: Common.isArray(req.body.attr_object)?JSON.stringify(req.body.attr_object):'',
                attrid:Common.isArray(req.body.attrid)?req.body.attrid.toString():'',
                status:0
            }).then(carts => {
                Common.SuccessMessage(req, res,carts,req.body.small_product_name+'放入购物车!');
            }).catch(error=>{
                Common.ErrorMessage(req, res, req.body.small_product_name+"放入购物车失败!"+error);
            });
        }else{
            Common.ErrorMessage(req, res, "放入购物车失败,不存在该商品!");
        }
    }
};


/**
 * 小程序商城购物车接口(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.small_mall_cartlist = async function (req, res, next) {
    if(req.body.small_openid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数!");
    }else{
        var carts = await SmallMallcommon.get_cart(req.body.small_openid);//获取购物车数据
        var total_price = await SmallMallcommon.get_cart_totalprice(req.body.small_openid);//统计购物车商品总价
        var tempobj={};
        if(carts.length==0){
            Common.SuccessMessage(req, res, {iscarts:{},carts: [], total_price: 0}, '获取小程序购物车商品成功！');
        }else{
            for(let c=0;c<carts.length;c++){
                if(tempobj[carts[c]['small_product_name']]!=undefined){
                    tempobj[carts[c]['small_product_name']]['same_spn_count']=tempobj[carts[c]['small_product_name']]['same_spn_count']+1;//相同产品计数
                }else{
                    carts[c]['same_spn_count']=1;
                    tempobj[carts[c]['small_product_name']]=carts[c];
                }
            }
            //重新封装购物车carts为iscarts对象数据，供产品列表获取购物车商品状态
            //从iscarts获取数据更新产品列表购买数量以及点击逻辑，在购物车里时+为增加购买数量
            //不在购物车里时加号点击逻辑为添加进购物车
            Common.SuccessMessage(req, res, {iscarts:tempobj,carts: carts, total_price: Common.sround(total_price, 2)}, '获取小程序购物车商品成功！');
        }
    }
};


/**
 * 小程序商城删除购物车中的一件商品或者全部商品(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.small_mall_delcart=function(req, res, next){
    if(req.body.small_cartid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数!");
    }else{
        var where = {};
        if (Common.isArray(req.body.small_cartid)) {
            where = {
                small_cartid: {
                    [Op.in]: req.body.small_cartid
                }
            }
        } else {
            where = {
                small_cartid: req.body.small_cartid
            }
        }
                GetTableModel.get_tablemodel('lee_small_mall_cart').destroy({
                    where:where
                }).then(rs => {
                    Common.SuccessMessage(req , res , rs , '删除购物车商品成功!');
                }).catch( error => {
                    Common.ErrorMessage(req , res , '删除购物车商品失败!');
                });
    }
};




/**
 * 具体商品添加或者减少购买数量,并且返回添加或者减少购买数量后的总价格
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.cart_buy_number=async function(req, res, next, verifySignRs={}){
    var stock;
    var purchase_quantity;
    if(req.body.smallproductid==undefined||req.body.type==undefined||req.body.small_cartid==undefined||req.body.small_openid==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:smallproductid、type、small_cartid其中之一或全部!");
    }else{
        if(req.body.type==1){
            //增加
            stock=await SmallMallcommon.get_small_mall_stock(req.body.smallproductid);
            purchase_quantity=await SmallMallcommon.get_purchase_quantity(req.body.small_cartid);
            if(stock==null){
                Common.ErrorMessage(req , res , '发送商品参数smallproductid错误!');
            }else if(purchase_quantity==null){
                Common.ErrorMessage(req , res , '发送购物车参数small_cartid错误!');
            }else if(purchase_quantity+1>stock){
                Common.ErrorMessage(req , res , '+1失败!超过库存量!');
            }else{
                GetTableModel.get_tablemodel('lee_small_mall_cart').findByPk(req.body.small_cartid).then(carts => {
                    carts.increment({
                        'small_count':1,
                    }).then(rs=>{
                        cart_buy_number_sub(req,res,'购物车商品+1成功!');
                    })
                });
            }
        }else if(req.body.type==2){
            //减少
            purchase_quantity=await SmallMallcommon.get_purchase_quantity(req.body.small_cartid);
            if(purchase_quantity==null){
                Common.ErrorMessage(req , res , '发送购物车参数small_cartid错误!');
            }else if(purchase_quantity-1<1){
                Common.ErrorMessage(req , res , '-1失败!商品购买数量最低为1!');
            }else{
                GetTableModel.get_tablemodel('lee_small_mall_cart').findByPk(req.body.small_cartid).then(carts => {
                    carts.decrement({
                        'small_count': 1,
                    }).then(rs=>{
                        cart_buy_number_sub(req,res,'购物车商品-1成功!');
                    });
                });
            }
        }
    }
};

/**
 * 执行完购物车某种商品购买数量加减后重新统计购物车商品总价
 * @param req
 * @param res
 * @param msg
 */
async function cart_buy_number_sub(req,res,msg){
    var total_price=await SmallMallcommon.get_cart_totalprice(req.body.small_openid);//统计购物车商品总价
    var carts = await SmallMallcommon.get_cart(req.body.small_openid);//获取购物车数据
    var tempobj={};
    if(carts.length==0){
        Common.SuccessMessage(req, res, {iscarts:{},carts: [], total_price: 0},msg);
    }else{
        for(let c=0;c<carts.length;c++){
            tempobj[carts[c]['small_product_name']]=carts[c];//重新封装一组购物车对象数据供产品列表获取购物车商品状态
        }
        Common.SuccessMessage(req , res ,{iscarts:tempobj,carts: carts, total_price: Common.sround(total_price, 2)} , msg);
    }

}


/**
 * 订单确认-购物车批量结算(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.cart_checkout = async function (req, res, next) {
    var payno=SmallMallcommon.small_payno();//支付订单号
    var sequelize = GetTableModel.get_sequelize_object('rawqueries');
    var total_fee=0;//购物车结算支付价格

    //开启mysql事务
    if(req.body.pros.length>30){
        Common.ErrorMessage(req, res, "结算订单超过限制数量！");
    }else{
        await sequelize.transaction().then(async function (t) {
            for(var i=0;i<req.body.pros.length;i++){
                var products=await SmallMallcommon.is_smallmall_products(req.body.pros[i]['smallproductid']);//查询商品是否存在
                var attr=await SmallMallcommon.is_smallmall_products_attr(req.body.pros[i]['smallproductid']);//查询该商品是否存在产品属性
                if(!products){
                    t.rollback();//回滚购物车订单结算事务
                    Common.ErrorMessage(req, res, '不存在该商品下单失败!');
                }else if(attr&&(req.body.pros[i]['attr_object']==""||req.body.pros[i]['attr_object']=="")){
                    t.rollback();//回滚购物车订单结算事务
                    Common.ErrorMessage(req, res, "请选择"+req.body.pros[i]['small_product_name']+"属性规格!");
                }else{
                    var count=await SmallMallcommon.get_small_mall_stock(req.body.pros[i]['smallproductid']);//获取商品实时库存
                    var small_products=await SmallMallcommon.get_smallmall_products(req.body.pros[i]['smallproductid']);//获取商品
                    var total_price=parseFloat(small_products['retail_price'])*parseFloat(req.body.pros[i]['small_count']);//当前商品总价

                    total_fee+=total_price;//累计购物车各项商品结算价格
                    if(count-req.body.pros[i]['small_count']<0){
                        t.rollback();//回滚购物车订单结算事务
                        Common.ErrorMessage(req, res, '购买商品数量超出库存，下单失败!');
                    }else{
                        //4.保存订单s
                        GetTableModel.get_tablemodel('lee_small_mall_record').create({
                            smallproductid:req.body.pros[i]['smallproductid'],
                            small_product_name:req.body.pros[i]['small_product_name'],
                            small_orderno:SmallMallcommon.small_orderno(),
                            pay_orderno: payno,
                            status:0,
                            create_time:Functions.nowtime(),
                            order_pay_type:req.body.pros[i]['order_pay_type'],
                            small_count:req.body.pros[i]['small_count'],
                            retail_price:small_products['retail_price'],
                            total_price:total_price,
                            small_openid:req.body.small_openid,
                            attr_object: Common.isArray(req.body.pros[i]['attr_object'])?JSON.stringify(req.body.pros[i]['attr_object']):'',
                            attrid:Common.isArray(req.body.pros[i]['attrid'])?req.body.pros[i]['attrid'].toString():'',
                            remarks:req.body.remarks,
                            small_address:req.body.small_address,
                            small_contract:req.body.small_contract,
                            small_tel:req.body.small_tel,
                            nickname:req.body.nickname,
                            avatar_url:req.body.avatar_url
                        }, {transaction: t}).then(orders => {
                            if(i==req.body.pros.length){
                                t.commit();//提交购物车订单结算事务
                                if(req.body.pros[i-1]['order_pay_type']=="微信支付"){
                                    cart_wechat(req,res,next,payno,total_fee);
                                }else{
                                    t.rollback();//回滚购物车订单结算事务
                                    Common.ErrorMessage(req, res, '支付类型错误下单失败!');
                                }
                            }
                        }).catch(error=>{
                            t.rollback();//回滚购物车订单结算事务;
                            Common.ErrorMessage(req, res, error.toString());
                        });
                        //4.保存订单e
                    }
                }
            }
        });
    }
};


/**
 * 小程序商城购物车结算商品微信支付处理逻辑
 * @param req
 * @param res
 * @param next
 * @param payno        支付订单号
 * @param total_price 商品总价
 */
function cart_wechat(req,res,next,payno,total_price){
    var pay=new paytools.Wechatparams();//实例化微信支付参数
    var payclient=new paytools.Payclient();//实例化请求支付客户端

    //设置微信支付参数 s
    pay.set_wechat_params('out_trade_no',payno);//商品订单ID
    pay.set_wechat_params('body','小程序商城购物商品');//商品描述
    pay.set_wechat_params('total_fee',parseInt(Common.sround(parseFloat(total_price)*100,2)));//支付总额 parseInt(Common.sround(parseFloat(req.body.policyfee)*100,2));
    pay.set_wechat_params('mch_create_ip',Functions.ip());//订单生成的机器 IP
    pay.set_wechat_params('service','pay.weixin.jspay');//接口类型
    pay.set_wechat_params('mch_id',paytools.payconfig.get_pay_config('mchId'));//必填项，商户号，由平台分配
    pay.set_wechat_params('is_raw','1');//原生JS
    pay.set_wechat_params('is_minipg','1');//是否小程序支付  值为1，表示小程序支付；不传或值不为1，表示公众账号内支付
    pay.set_wechat_params('sub_openid',req.body.small_openid);
    pay.set_wechat_params('sub_appid','');//当发起公众号支付时，值是微信公众平台基本配置中的AppID(应用ID)；当发起小程序支付时，值是对应小程序的AppID
    pay.set_wechat_params('attach',payno);
    pay.set_wechat_params('notify_url','http://192.168.1.3:8000/smallmall/smallmall_pay_callback');//后台通知地址
    pay.set_wechat_params('version',paytools.payconfig.get_pay_config('version'));//版本号
    pay.set_wechat_params('sign_type',paytools.payconfig.get_pay_config('sign_type'));//签名方式
    pay.set_wechat_params('nonce_str',Functions.random_string(32));//随机字符串
    var sign=paytools.paysigntools.create_rsa_sign(pay.get_all_wechatparams());//生成支付签名
    pay.set_wechat_params('sign',sign);
    //设置微信扫码参数 e

    //获取支付下单请求参数 s
    var pay_req_data=paytools.payutils.to_xml(pay.get_all_wechatparams());
    //获取支付下单请求参数 e

    //记录支付下单请求报文 s
    LeeCommon.insert_api_log(
        'http://192.168.1.3:8000/smallmall/cart_checkout',
        pay_req_data,
        'senddata',
        '小程序商城购买商品支付:微信支付下单请求报文!'
    );
    //记录支付下单请求报文 e


    payclient.set_http_params('url',paytools.payconfig.get_pay_config('url'));
    payclient.set_http_params('req_data',pay_req_data);
    payclient.set_http_params('time_out',120);
    payclient.call(function(){
        var response_rs=payclient.get_http_params('res_content_json');
        //记录支付下单响应报文 s
        LeeCommon.insert_api_log(
            'http://192.168.1.3:8000//smallmall/cart_checkout',
            JSON.stringify(response_rs['res_content_json']),
            'getdata',
            '小程序商城购买商品支付:微信支付下单响应报文!'
        );
        //记录支付下单响应请求报文 e
        try{
            if(response_rs['xml']==undefined){
                Common.ErrorMessage(req, res, JSON.stringify(response_rs));
            }else if(paytools.paysigntools.verify_rsa_sign(response_rs['xml'])){ //验证返回数据签名
                if(response_rs['xml']['status']=='0'&&response_rs['xml']['result_code']=='0'){
                    var pay_info=JSON.parse(response_rs['xml']['pay_info']);
                    Common.SuccessMessage(req, res,{pay_info:pay_info,payno:payno},'微信小程序微信支付下单接口响应参数!');
                }else{
                    Common.ErrorMessage(req, res, response_rs['xml']['err_msg']);
                }
            }else{
                Common.ErrorMessage(req, res, '微信小程序微信支付下单参数签名验证错误!'+req.body);
            }
        }catch (e){
            Common.ErrorMessage(req, res, e.toString());
        }
    },payclient);
}


/**
 * 微信小程序微信支付回调结果
 * @param req
 * @param res
 * @param next
 */
exports.smallmall_pay_callback=async function(req , res , next){
    req.rawBody = '';//添加接收变量
    var json={};
    req.setEncoding('UTF-8');
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });

    req.on('end',function() {
        paytools.payutils.xml_to_obj(req.rawBody, async function(rs){
            //判断是否有数据
            if(rs['xml']==undefined){
                res.send("fail");
            }else{
                json=rs['xml'];

                //记录小程序微信支付回调通知报文 s
                LeeCommon.insert_api_log(
                    'http://192.168.1.3:8000/smallmall/smallmall_pay_callback',
                    JSON.stringify(json),
                    'getdata',
                    '微信小程序商城购物商品微信支付成功响应报文!'
                );
                //记录小程序微信支付回调通知报文 e


                //签名验证逻辑
                if(paytools.paysigntools.verify_rsa_sign(json)){
                    //json['out_trade_no']
                    if(json['status']=='0'&&json['result_code']=='0'&&(json['pay_result']==0||json['pay_result']=='0')){
                        //业务逻辑处理 s
                        GetTableModel.get_tablemodel('lee_small_mall_record').findAll({
                            where:{
                                pay_orderno:json['out_trade_no']
                            },
                            raw:true
                        }).then(result=>{
                            //购物车订单业务处理逻辑 s
                            for(var i=0;i<result.length;i++){
                                var small_count=result[i]['small_count'];
                                var pay_orderno=result[i]['pay_orderno'];

                                //删除购物车商品 s
                                GetTableModel.get_tablemodel('lee_small_mall_cart').destroy({
                                    where: {
                                        smallproductid: result[i]['smallproductid'],
                                        small_openid:result[i]['small_openid'],
                                    }
                                }).then(rs => {

                                }).catch( error => {

                                });
                                //删除购物车商品 e

                                GetTableModel.get_tablemodel('lee_small_mall_product').findByPk(result[i]['smallproductid']).then(products => {
                                    products.decrement({
                                        'count': small_count
                                    }).then(rs=>{
                                        //修改订单状态 s
                                        GetTableModel.get_tablemodel('lee_small_mall_record').update({
                                            status:1,
                                            pay_time:Functions.nowtime(),
                                            update_time:Functions.nowtime()
                                        },{
                                            where:{
                                                pay_orderno:pay_orderno
                                            }
                                        }).then(uprs=>{
                                            if(i==result.length){
                                                res.send("success");
                                            }
                                        }).catch(error=>{
                                            res.send("fail");
                                        });
                                        //修改订单状态 e
                                    });
                                });
                            }
                            //购物车订单业务处理逻辑 e
                        }).catch(error=>{
                            res.send("fail");
                        });
                        //业务逻辑处理 e
                    }else{
                        res.send("fail");
                    }
                }else{
                    res.send("fail");
                }
            }
        });
    });
};


/**
 * 获取小程序商城购物微信支付订单结果(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.get_smallpay_result=function(req,res,next){
    if(req.body.payno==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:payno!");
    }else{
        GetTableModel.get_tablemodel('lee_small_mall_record').findOne({
            where:{
                pay_orderno:req.body.payno
            }
        }).then(orders=>{
            if(orders==null){
                Common.ErrorMessage(req, res,'该支付订单不存在!');
            }else if(orders['status']==1){
                Common.SuccessMessage(req, res,{payno:orders['pay_orderno']},'小程序商城微信支付成功!');
            }else{
                Common.ErrorMessage(req, res,'小程序商城购物支付暂未到账!');
            }
        }).catch(error=>{
            Common.ErrorMessage(req, res, error.toString());
        });
    }
};



/**
 * 小程序商城小程序客户端订单记录(业务层)
 * @param req
 * @param res
 * @param next
 */
exports.small_mall_order_record=async function(req,res,next){
    if (req.body.page == undefined || req.body.rows == undefined||req.body.small_openid==undefined) {
        Common.ErrorMessage(req, res, "缺失请求参数:page、rows、small_openid其中之一或全部!");
    }else{
        let s = (Number(req.body.page) > 1) ? (Number(req.body.page - 1) * Number(req.body.rows)) :
        Number(req.body.page) - 1;
        let e = Number(req.body.rows);
        let stime=req.body.stime!=""?new Date(req.body.stime+" 00:00:00").getTime()/1000:'';
        let etime=req.body.etime!=""?new Date(req.body.etime+" 00:00:00").getTime()/1000+86399:'';
        var temporderdata = await SmallMallcommon.thisuser_smallmall_paynogroup(s,e,req.body.status,stime,etime,req.body.small_openid);//小程序商城订单分组记录
        var orderdata=temporderdata[0];
        var count=temporderdata[1];
        if(orderdata.length!=0){
            for (let i = 0; i < orderdata.length; i++) {
                var data = await SmallMallcommon.get_smallmall_paynogroup_data(orderdata[i]['pay_orderno'],req.body.status);//小程序商城订单分组记录数据
                orderdata[i]['suborderdata']=data;
            }
            Common.SuccessMessage(req, res,{record:orderdata,length:orderdata.length,count:count[0]['count']},'返回订单记录数据!');
        }else{
            Common.SuccessMessage(req, res,{record:orderdata,length:orderdata.length,count:count[0]['count']},'返回订单记录数据!');
        }
    }
};




//属性组渲染demo
exports.test=function(req,res,next){
    var attrobj = {
        "attr_group": {
            "small_attrname": [
                "度数",
                "果味"
            ],
            "small_attrvalue": [
                [
                    {
                        "small_attrvalue": "12"
                    },
                    {
                        "small_attrvalue": "5"
                    }
                ],
                [
                    {
                        "small_attrvalue": "荔枝"
                    },
                    {
                        "small_attrvalue": "葡萄"
                    },
                    {
                        "small_attrvalue": "百香果"
                    }
                ]
            ]
        }
    };
    for(let i=0;i<attrobj['attr_group']['small_attrname'].length;i++){
        console.log("-----");
        console.log(attrobj['attr_group']['small_attrname'][i]);//属性组名称
        console.log("-----");
        for(let j=i;j<attrobj['attr_group']['small_attrvalue'].length;j++){
            //console.log(attrobj['attr_group']['small_attrvalue'][j]);

            for(let k=0;k<attrobj['attr_group']['small_attrvalue'][j].length;k++){
                console.log(attrobj['attr_group']['small_attrvalue'][j][k]['small_attrvalue']);//属性值
            }
            break;
        }
    }
    //var attrgroup=[{"small_attrname":"包装","small_attrvalue":"简单"},{"small_attrname":"糖分","small_attrvalue":"适中"}];

    //var ccc="[{\"small_attrname\":\"包装\",\"small_attrvalue\":\"简单\"},{\"small_attrname\":\"糖分\",\"small_attrvalue\":\"适中\"}]";
    //var aaa=JSON.parse(ccc);
    //for(var l=0;l<aaa.length;l++){
    //    console.log(aaa[l]['small_attrname']+":"+aaa[l]['small_attrvalue']);
    //}
    Common.SuccessMessage(req , res , attrobj , '渲染产品属性对象!');
};
