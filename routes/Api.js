//加载express模块
const express = require('express');
const router = express.Router();
const ProvListControllers = require('../app/controllers/Api/ProvList');
const CityListControllers = require('../app/controllers/Api/CityList');
const AreaListControllers = require('../app/controllers/Api/AreaList');
const RegionalControllers = require('../app/controllers/Api/Regional');
const WxOpenApiControllers = require('../app/controllers/Api/WxOpenApi');
//省
router.get('/provlist', ProvListControllers.prov_list);
//市
router.get('/citylist', CityListControllers.city_list);
//区
router.get('/arealist', AreaListControllers.area_list);
//获取全国地区数据
router.get('/pcasscode',RegionalControllers.pcasscode);
//获取全国城市数据
router.get('/ipcode',RegionalControllers.zipcode);
//信公众号用于调用微信JS接口的临时票据api
router.post('/wechat/wx_jssdk_basic',WxOpenApiControllers.wx_jssdk_basic);
module.exports = router;