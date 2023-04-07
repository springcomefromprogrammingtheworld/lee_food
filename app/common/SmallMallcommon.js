//小程序餐饮公用模块
const Functions = require("../util/Functions");
const sq        = require('../../database/db');

/**
 * 当前用户查询小程序商城购物车是否已添加了该商品
 * @param smallproductid  商品id
 * @param small_openid 小程序微信openid
 * @returns {boolean}
 */
exports.check_small_cart=async function(smallproductid,small_openid) {
    let sql = "select * from lee_small_mall_cart where smallproductid=" + "'" + smallproductid + "'" + " and small_openid=" + "'" + small_openid + "'" + " and status=0" + " limit 1";
    var rs = await sq.query(sql, {type: sq.QueryTypes.SELECT});
    if (rs.length == 0) {
        return false;
    } else {
        return true;
    }
};

/**
 * 查询小程序商城该产品是否存在
 * @param smallproductid
 * @returns {boolean}
 */
exports.is_smallmall_products=async function(smallproductid){
    let sql="select * from lee_small_mall_product where smallproductid="+"'"+smallproductid+"'"+" limit 1";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    if(rs.length==0){
        return false;
    }else{
        return true;
    }
};

/**
 * 查询该商品是否存在产品属性
 * @param smallproductid
 * @returns {boolean}
 */
exports.is_smallmall_products_attr=async function(smallproductid){
    let sql="select * from lee_small_mall_attrobj where smallproductid="+"'"+smallproductid+"'"+" limit 1";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    if(rs.length==0){
        return false;
    }else{
        return true;
    }
};


/**
 * 获取小程序购物车里的商品
 * @param small_openid
 * @returns {*}
 */
exports.get_cart=async function(small_openid){
    let sql="select *,cart.status as cart_status from lee_small_mall_cart AS cart LEFT JOIN lee_small_mall_product AS products"
        +"  ON cart.smallproductid=products.smallproductid where cart.small_openid="+"'"+small_openid+"' AND cart.status=0";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    try{
        return rs;
    }catch (e){
        return null;
    }
};

/**
 * 获取小程序购物车商品总价
 * @param small_openid
 * @returns {*}
 */
exports.get_cart_totalprice=async function(small_openid){
    let sql="select sum(cart.small_count*products.retail_price) as totalprice from lee_small_mall_cart AS cart LEFT JOIN lee_small_mall_product AS products"
        +"  ON cart.smallproductid=products.smallproductid where cart.small_openid="+"'"+small_openid+"' AND cart.status=0";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    try{
        return rs[0]['totalprice'];
    }catch (e){
        return null;
    }
};



/**
 * 获取分页小程序商城产品
 * @param small_ptypeid
 * @param s
 * @param e
 * @returns {*}
 */
exports.get_small_mall_productslist=async function(small_ptypeid,s,e){
     let sql;
    if(small_ptypeid==""){
         sql="select * from lee_small_mall_product AS products "+
            " LEFT JOIN lee_small_mall_ptype AS ptype ON products.small_ptypeid = ptype.small_ptypeid  where  products.status='1'   ORDER BY products.smallproductid  ASC  limit "+s+"," +e;
    }else{
         sql="select * from lee_small_mall_product AS products "+
            " LEFT JOIN lee_small_mall_ptype AS ptype ON products.small_ptypeid = ptype.small_ptypeid  where products.small_ptypeid="+"'"+small_ptypeid+"' AND products.status='1'   ORDER BY products.smallproductid  ASC  limit "+s+"," +e;
    }
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    try{
        return rs;
    }catch (e){
        return null;
    }
};

/**
 * 获取小程序商城产品属性组和值
 * @param smallproductid
 * @returns {*}
 */
exports.get_small_mall_products_attr=async function(smallproductid){
    let sql="SELECT lee_small_mall_attrobj.small_attrname FROM lee_small_mall_product "+
    "LEFT JOIN lee_small_mall_attrobj"+
    " ON lee_small_mall_product.smallproductid=lee_small_mall_attrobj.smallproductid"+
    " WHERE lee_small_mall_product.smallproductid="+smallproductid+" "+
    "GROUP BY lee_small_mall_attrobj.small_attrname";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    var attr_obj={};
    var attr_name_group=[];
    var attr_value_group=[];
    for(let j=0;j<rs.length;j++){
        var small_attrname=rs[j]['small_attrname'];
        attr_obj['small_attrname']=rs[j]['small_attrname'];
        attr_name_group.push(rs[j]['small_attrname']);
        let attr_value_sql="select small_attrvalue,attrid from lee_small_mall_attrobj WHERE small_attrname="+"'"+rs[j]['small_attrname']+"'"+" AND smallproductid="+smallproductid;
        var attr_rs= await sq.query(attr_value_sql, {type : sq.QueryTypes.SELECT});
        attr_value_group.push(attr_rs);
    }
    attr_obj={'small_attrname':attr_name_group,small_attrvalue:attr_value_group};
    try{
        return attr_obj;
    }catch (e){
        return null;
    }
};


/**
 * 获取小程序商城商品库存数量
 * @param smallproductid
 * @returns {*}
 */
exports.get_small_mall_stock=async function(smallproductid){
    let sql="select * from lee_small_mall_product where smallproductid="+"'"+smallproductid+"'"+" limit 1";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    try{
        return rs[0]['count'];
    }catch (e){
        return null;
    }
};


/**
 * 获取小程序商城购物车该商品购买数量
 * @param small_cartid
 * @returns {*}
 */
exports.get_purchase_quantity=async function(small_cartid){
    let sql="select * from lee_small_mall_cart where small_cartid="+"'"+small_cartid+"'"+" limit 1";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    try{
        return rs[0]['small_count'];
    }catch (e){
        return null;
    }
};


/**
 * 生成小程序商城购物支付订单号
 * @returns {string|*}
 */
exports.small_payno=function(){
    return "PAY"+Functions.get_year()+Functions.nowtime()+"SMALL"+Functions.rand(1000,9999)+Functions.rand(1000,9999);
};


/**
 * 生成小程序商城购物订单号
 * @returns {string}
 */
exports.small_orderno=function(){
    return "SMALL"+Functions.get_year()+Functions.rand(1000,9999)+Functions.nowtime()+Functions.rand(1000,9999);
};


/**
 * 返回小程序商城产品
 * @param smallproductid
 * @returns {*}
 */
exports.get_smallmall_products=async function(smallproductid){
    let sql="select * from lee_small_mall_product where smallproductid="+"'"+smallproductid+"'"+" limit 1";
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    return rs[0];
};


/**
 * 返回小程序商城订单组和计数
 * @param s
 * @param e
 * @param status
 * @param stime
 * @param etime
 * @returns {*[]}
 */
exports.get_smallmall_paynogroup=async function(s,e,status,stime,etime){
    let sql;
    let count_sql;
    let time_sql="   And  create_time >='"+stime+"' AND create_time<='"+etime+"' ";
    if(stime!=""&&etime!=""&&status!=""){
        sql="SELECT lee_small_mall_record.pay_orderno,SUM(lee_small_mall_record.total_price) AS total_price FROM lee_small_mall_record "+
            "LEFT JOIN lee_small_mall_product"+
            " ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid"+
            " WHERE lee_small_mall_record.status="+status+" "+time_sql+
            " GROUP BY lee_small_mall_record.pay_orderno  "+"ORDER BY lee_small_mall_record.smallorderid  DESC  limit "+s+"," +e;
        count_sql="SELECT COUNT(DISTINCT lee_small_mall_record.pay_orderno) as count FROM lee_small_mall_record"+  " WHERE lee_small_mall_record.status="+status+time_sql;
    } else if(stime!=""&&etime!=""){
       sql="SELECT lee_small_mall_record.pay_orderno,SUM(lee_small_mall_record.total_price) AS total_price FROM lee_small_mall_record "+
            "LEFT JOIN lee_small_mall_product"+
            " ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid"+
            " WHERE create_time >='"+stime+"' AND create_time<='"+etime+"' "+
            " GROUP BY lee_small_mall_record.pay_orderno  "+"ORDER BY lee_small_mall_record.smallorderid  DESC  limit "+s+"," +e;
        count_sql="SELECT COUNT(DISTINCT lee_small_mall_record.pay_orderno) as count FROM lee_small_mall_record"+  " WHERE create_time >='"+stime+"' AND create_time<='"+etime+"' ";
    }else if(status!=""){
        sql="SELECT lee_small_mall_record.pay_orderno,SUM(lee_small_mall_record.total_price) AS total_price FROM lee_small_mall_record "+
            "LEFT JOIN lee_small_mall_product"+
            " ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid"+
            " WHERE lee_small_mall_record.status="+status+" "+
            " GROUP BY lee_small_mall_record.pay_orderno  "+"ORDER BY lee_small_mall_record.smallorderid  DESC  limit "+s+"," +e;
        count_sql="SELECT COUNT(DISTINCT lee_small_mall_record.pay_orderno) as count FROM lee_small_mall_record"+  " WHERE lee_small_mall_record.status="+status;
    }
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    var count_sql_rs= await sq.query(count_sql, {type : sq.QueryTypes.SELECT});
    return [rs,count_sql_rs];
};


/**
 * 返回当前用户小程序商城订单组和计数
 * @param s
 * @param e
 * @param status
 * @param stime
 * @param etime
 * @param small_openid
 * @returns {*[]}
 */
exports.thisuser_smallmall_paynogroup=async function(s,e,status,stime,etime,small_openid){
    let sql;
    let count_sql;
    let time_sql="   And  create_time >='"+stime+"' AND create_time<='"+etime+"' ";
    let small_openid_sql="  And small_openid='"+small_openid+"' ";
    if(stime!=""&&etime!=""&&status!=""){
        sql="SELECT lee_small_mall_record.pay_orderno,SUM(lee_small_mall_record.total_price) AS total_price FROM lee_small_mall_record "+
            "LEFT JOIN lee_small_mall_product"+
            " ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid"+
            " WHERE lee_small_mall_record.status="+status+" "+time_sql+small_openid_sql+
            " GROUP BY lee_small_mall_record.pay_orderno  "+"ORDER BY lee_small_mall_record.smallorderid  DESC  limit "+s+"," +e;
        count_sql="SELECT COUNT(DISTINCT lee_small_mall_record.pay_orderno) as count FROM lee_small_mall_record"+  " WHERE lee_small_mall_record.status="+status+time_sql+small_openid_sql;
    } else if(stime!=""&&etime!=""){
        sql="SELECT lee_small_mall_record.pay_orderno,SUM(lee_small_mall_record.total_price) AS total_price FROM lee_small_mall_record "+
            "LEFT JOIN lee_small_mall_product"+
            " ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid"+
            " WHERE create_time >='"+stime+"' AND create_time<='"+etime+"' "+small_openid_sql+
            " GROUP BY lee_small_mall_record.pay_orderno  "+"ORDER BY lee_small_mall_record.smallorderid  DESC  limit "+s+"," +e;
        count_sql="SELECT COUNT(DISTINCT lee_small_mall_record.pay_orderno) as count FROM lee_small_mall_record"+  " WHERE create_time >='"+stime+"' AND create_time<='"+etime+"' "+small_openid_sql;
    }else if(status!=""){
        sql="SELECT lee_small_mall_record.pay_orderno,SUM(lee_small_mall_record.total_price) AS total_price FROM lee_small_mall_record "+
            "LEFT JOIN lee_small_mall_product"+
            " ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid"+
            " WHERE lee_small_mall_record.status="+status+" "+small_openid_sql+
            " GROUP BY lee_small_mall_record.pay_orderno  "+"ORDER BY lee_small_mall_record.smallorderid  DESC  limit "+s+"," +e;
        count_sql="SELECT COUNT(DISTINCT lee_small_mall_record.pay_orderno) as count FROM lee_small_mall_record"+  " WHERE lee_small_mall_record.status="+status+small_openid_sql;
    }
    var rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    var count_sql_rs= await sq.query(count_sql, {type : sq.QueryTypes.SELECT});
    return [rs,count_sql_rs];
};


/**
 * 根据支付订单号返回小程序商城订单记录
 * @param payno
 * @param status
 * @returns {*}
 */
exports.get_smallmall_paynogroup_data=async function(payno,status){
    let sql="select *,lee_small_mall_product.status AS product_status,lee_small_mall_record.status AS status from lee_small_mall_record LEFT JOIN lee_small_mall_product ON lee_small_mall_record.smallproductid=lee_small_mall_product.smallproductid  where lee_small_mall_record.pay_orderno="+"'"+payno+"'"+" AND lee_small_mall_record.status="+status+"  ORDER BY lee_small_mall_record.smallorderid  DESC";
      var rs;
     rs= await sq.query(sql, {type : sq.QueryTypes.SELECT});
    return rs;
};

/**
 * 检查收货地址格式是否正确
 * @param address
 * @returns {boolean}
 */
exports.check_address_format=function(address){
    var rs=address.split("-",3);
    if(rs.length<3){
        return true;
    }else {
        for(var i= 0;i<rs.length;i++){
            if(rs[i]==""||parseInt(rs[i].length)<2){
                return true;
            }else{
                return false;//地址格式检验通过
            }
        }
    }
};



