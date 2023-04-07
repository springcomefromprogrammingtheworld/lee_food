const { Curl } = require('node-libcurl');
/**
 * curl
 * @param url
 * @param json_data
 * @param callback
 */
exports.lee_curl=function(url,json_data,callback){
    try{
        var curl = new Curl();
        curl.setOpt(Curl.option.URL, url);
        curl.setOpt(Curl.option.FOLLOWLOCATION, true);
        curl.setOpt(Curl.option.CUSTOMREQUEST, 'POST');
        curl.setOpt(Curl.option.HTTP_VERSION, 1);
        curl.setOpt(Curl.option.IPRESOLVE, 1);
        curl.setOpt(Curl.option.USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1');
        curl.setOpt(Curl.option.CONNECTTIMEOUT_MS, 20000);
        curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
        curl.setOpt(Curl.option.HTTPHEADER,
            ['Content-Type: application/json;charset=utf-8']);
        curl.setOpt(Curl.option.POSTFIELDS, json_data);
        curl.setOpt(Curl.option.VERBOSE, true);
        curl.on('end', function (statusCode, data, headers) {
            callback(data);
            this.close();
        });
        curl.on('error', curl.close.bind(curl));
        curl.perform();
    }catch (e){
        callback(JSON.stringify({error: 'curl系统请求异常！'+e}))
    }

};


/**
 * curl
 * @param url
 * @param callback
 */
exports.lee_get_curl=function(url,callback){
    try{
        var curl = new Curl();
        curl.setOpt(Curl.option.URL, url);
        curl.setOpt(Curl.option.FOLLOWLOCATION, true);
        curl.setOpt(Curl.option.HTTP_VERSION, 1);
        curl.setOpt(Curl.option.IPRESOLVE, 1);
        curl.setOpt(Curl.option.USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1');
        curl.setOpt(Curl.option.CONNECTTIMEOUT_MS, 20000);
        curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
        curl.setOpt(Curl.option.HTTPHEADER,
            ['Content-Type: application/json;charset=utf-8']);
        curl.setOpt(Curl.option.VERBOSE, true);
        curl.on('end', function (statusCode, data, headers) {
            callback(data);
            this.close();
        });
        curl.on('error', curl.close.bind(curl));
        curl.perform();
    }catch (e){
        callback(JSON.stringify({error: 'curl系统请求异常！'}))
    }
};