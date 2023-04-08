# lee_food
# 简约版版单店铺点餐系统_小程序点餐后端系统基于node+express+mysql+自定义开发微信小程序支付nodesdk开发，node版本>=v10.15.1
# 安装确保node版本>=v10.15.1,进入项目根目录如下:
# npm install

# 包含主要功能应用程序接口如下:
# 1.小程序lee_food用户授权登录接口。
# 2.小程序lee_food产品分类信息接口。
# 3.获取小程序lee_food产品接口。
# 4.小程序lee_food产品放入购物车接口。
# 5.小程序lee_food当前授权用户购物车列表接口。
# 6.小程序lee_food当前授权用户删除购物车中的一件商品或者全部商品接口。
# 7.小程序lee_food具体商品添加或者减少购买数量,并且返回添加或者减少购买数量后的总价格接口。
# 8.小程序lee_food当前授权用户订单确认-购物车批量结算接口。
# 9.小程序lee_food购物微信支付订单结果通知接口。
# 10.小程序lee_food当前授权用户订单记录接口。
# 11.小程序lee_food我的收货地址接口。
# 12.小程序lee_food添加我的收货地址接口。
# 13.小程序lee_food更新我的收货地址接口。
# 14.小程序lee_food删除我的收货地址接口。
# 15.设置默认收货地址接口。

# 自定义微信小程序支付nodesdk说明:
# app/paytools/alipay_wechat_unifiedconfig/config.js 相关支付配置参数已删除,可根据第三方支付接口重写配置config.js参数或者重写支付sdkpaytools
# app/paytools/sign/paysign.js签名算法可根据第三方支付接口重写或者配置。

# 模块说明：
# app目录包含common公共调用模块、controllers接口控制器层、models数据表映射模块、paytools自定义开发node支付sdk、service控制器层调用的下一层。
# app目录包含util函数等工具包。
# bin目录node后端服务运行启动配置文件及程序运行入口。
# database目录数据库配置。
# mysqldata目录数据库。
# routes目录小程序lee_food接口路由配置文件。
# uploads目录文件上传目录，当然也可以另外搭建一个文件服务系统。

# 文件说明:
# env环境变量配置文件。
# package.json依赖项文件配置

