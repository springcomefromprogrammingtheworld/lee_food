const { Curl } = require('node-libcurl');
const payutils = require("./utils");
//支付客户端类
class Payhttpclient {


    constructor() {

        this.http_params={
            url: "",//请求url
            req_data: "",//请求内容XML 字符串
            res_content: "",//响应内容XML
            res_content_json: "",//响应内容json
            err_info: "",//错误信息
            time_out: 120,//超时时间(秒) 默认120秒
            response_code: 0,//http响应状态码 默认0
            response_headers: "",//http响应头
            status: 0//1请求call成功
        };
    }

    /**
     * 读取http请求配置参数
     * @param params_name
     * @returns {*}
     */
    get_http_params(params_name) {
        return this.http_params[params_name];
    };


    /**
     * 设置http请求配置参数
     * @param params_name
     * @param value
     */
    set_http_params(params_name, value) {
        this.http_params[params_name] = value;
    };

    /**
     * 获取所有参数（包括请求的参数和响应的参数）
     * @returns {{url: string, req_data: string, res_content: string, err_info: string, time_out: number, response_code: number, response_headers: string, status: number}}
     */
    get_all_http_params() {
        return this.http_params;
    };


    /**
     * 执行http调用
     * @param callback 回调函数用于后续业务逻辑处理
     * @param payobj 当前请求curl实例(必传)
     */
    call(callback, payobj) {
        if (this.http_params['url'] == "" || this.http_params['req_data'] == "") {
            this.set_http_params('err_info', '未设置请求url或者未设置req_data请求数据!');
        } else {
            var curl = new Curl();
            curl.setOpt(Curl.option.CONNECTTIMEOUT, this.http_params['time_out']);
            curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
            curl.setOpt(Curl.option.SSL_VERIFYHOST, false);
            curl.setOpt(Curl.option.POST, 1);
            curl.setOpt(Curl.option.URL, this.http_params['url']);
            curl.setOpt(Curl.option.POSTFIELDS, this.http_params['req_data']);
            curl.setOpt(Curl.option.VERBOSE, true);
            curl.setOpt(Curl.option.HTTPHEADER,
                ['Content-Type: text/xml']);
            curl.on('end', function (statusCode, data, headers) {
                payobj.set_http_params('response_code', statusCode);
                payobj.set_http_params('res_content', data);
                payobj.set_http_params('response_headers', headers);
                payobj.set_http_params('status', 1);
                payutils.xml_to_obj(data, function (rs) {
                    payobj.set_http_params('res_content_json', rs);
                    callback();
                });
                this.close();
            });
            curl.on('error', curl.close.bind(curl));
            curl.perform();
        }
    };
}
module.exports = Payhttpclient;//导出支付客户端类