//加载express模块
const express = require('express');
const router = express.Router();
const SmallMallLoginControllers = require('../app/controllers/Smallmall/SmallMallLogin');
const SmallMallControllers = require('../app/controllers/Smallmall/SmallMall');
const SmallMallAddressControllers = require('../app/controllers/Smallmall/SmallMallAddress');

//小程序商城用户授权登录接口
router.post('/small_mall_login', SmallMallLoginControllers.small_mall_login);
//小程序商城产品分类信息接口
router.post('/all_ptype_info', SmallMallControllers.all_ptype_info);
//获取小程序商城产品接口
router.post('/get_small_mall_products', SmallMallControllers.get_small_mall_products);
//小程序商城产品放入购物车
router.post('/small_mall_addcart', SmallMallControllers.small_mall_addcart);
//小程序商城购物车接口
router.post('/small_mall_cartlist', SmallMallControllers.small_mall_cartlist);
//小程序商城删除购物车中的一件商品或者全部商品
router.post('/small_mall_delcart', SmallMallControllers.small_mall_delcart);
//具体商品添加或者减少购买数量,并且返回添加或者减少购买数量后的总价格
router.post('/cart_buy_number', SmallMallControllers.cart_buy_number);
//订单确认-购物车批量结算
router.post('/cart_checkout', SmallMallControllers.cart_checkout);
//小程序支付回调通知
router.all('/smallmall_pay_callback',SmallMallControllers.smallmall_pay_callback);
//获取小程序商城购物微信支付订单结果
router.post('/get_smallpay_result', SmallMallControllers.get_smallpay_result);
//小程序商城订单记录
router.post('/small_mall_order_record', SmallMallControllers.small_mall_order_record);
router.post('/test', SmallMallControllers.test);

//小程序商城我的收货地址
router.post('/address_list', SmallMallAddressControllers.address_list);
//小程序商城添加我的收货地址
router.post('/add_address', SmallMallAddressControllers.add_address);
//小程序商城更新我的收货地址
router.post('/update_address', SmallMallAddressControllers.update_address);
//小程序商城删除我的收货地址
router.post('/del_address', SmallMallAddressControllers.del_address);
//小程序商城设置默认收货地址
router.post('/set_default_address', SmallMallAddressControllers.set_default_address);
module.exports = router;
