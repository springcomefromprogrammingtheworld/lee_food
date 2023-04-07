//微信扫码支付配置参数类
class Wechatparams {

    constructor() {
        this.wechatpayparams = {};//微信扫码支付参数
    }
    /**
     * 设置微信扫码支付配置参数
     * @param params_name
     * @param value
     */
    set_wechat_params(params_name, value) {
        this.wechatpayparams[params_name] = value;
    }

    /**
     * 获取单个微信扫码支付配置参数
     * @param params_name
     * @returns {*}
     */
    get_wechat_params(params_name) {
        return this.wechatpayparams[params_name];
    }

    /**
     * 获取所有参数（包括请求的参数和响应的参数）
     * @returns {{}}
     */
    get_all_wechatparams() {
        return this.wechatpayparams;
    };
};
module.exports = Wechatparams;