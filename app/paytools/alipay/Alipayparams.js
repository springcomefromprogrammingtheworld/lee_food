//支付宝扫码支付配置参数类
class Alipayparams {


    constructor() {
        this.alipayparams = {};//支付包扫码支付参数
    }

    /**
     * 设置支付宝扫码支付配置参数
     * @param params_name
     * @param value
     */
    set_alipay_params(params_name, value) {
        this.alipayparams[params_name] = value;
    }

    /**
     * 获取单个支付宝扫码支付配置参数
     * @param params_name
     * @returns {*}
     */
    get_alipay_params(params_name) {
        return this.alipayparams[params_name];
    }

    /**
     * 获取所有参数（包括请求的参数和响应的参数）
     * @returns {{}}
     */
    get_all_alipayparams() {
        return this.alipayparams;
    };
};
module.exports = Alipayparams;



