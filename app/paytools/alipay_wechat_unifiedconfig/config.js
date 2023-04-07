const config={
    url:'',/*支付接口请求地址，请联系技术支持确认 */
    mchId:'',/* 商户号，建议用正式的，于申请成功后的开户邮件中获取，若未开户需用测试的请联系技术支持 */
    version:'',
    sign_type:'',
    key:'',
    public_rsa_key:'',
};

/**
 * 读取支付配置参数
 * @param config_name
 * @returns {*}
 */
exports.get_pay_config=function(config_name){
     return config[config_name];
};

/**
 * 返回全部支付配置参数
 * @returns {{url: string, mchId: string, version: string, sign_type: string, key: string, public_rsa_key: string, private_rsa_key: string}}
 */
exports.get_pay_allconfig=function(){
   return config;
};
