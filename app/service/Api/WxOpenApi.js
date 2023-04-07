const Common = require('../../util/Common');
const LeeCurl = require("../../common/Curl");
const Functions = require("../../util/Functions");
const {createHash}= require('crypto');
const cache = require('memory-cache');
/**
 * 微信公众号用于调用微信JS接口的临时票据api
 * @param req
 * @param res
 * @param next
 */
exports.wx_jssdk_basic = function(req, res, next) {
    if(req.body.title==undefined||req.body.url==undefined){
        Common.ErrorMessage(req, res, "缺失请求参数:title、url其中之一或全部!");
    }else{
         if(cache.get('jsapi_ticket')!=null){
             let time=Functions.nowtime();
             var signature_str ='jsapi_ticket='+cache.get('jsapi_ticket')+'&noncestr='+req.body.title+'&timestamp='+time+'&url='+req.body.url;
             let hash = createHash('sha1');
             hash.update(signature_str);
             var sha1_res=hash.digest('hex');
             Common.SuccessMessage(req, res, {time:time,nstr:req.body.title,wxsha1:sha1_res}, "全局缓存jsapi_ticket-微信js-sdk基本接口!");
         }else{
             var get_access_token_url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1a39505213859b7e&secret=2503d285b1192dbc2e3f88b2855a209d';
             LeeCurl.lee_get_curl(get_access_token_url,function(data){
                 try{
                     var access_token=JSON.parse(data);//access_token数据
                     var jsapi_ticket_url='https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access_token['access_token']+'&type=jsapi';
                     GwCurl.gw_get_curl(jsapi_ticket_url,function(data){
                         try{
                             var jsapi_ticket=JSON.parse(data);//access_token数据

                             //设置缓存全局缓存jsapi_ticket s
                             cache.put('jsapi_ticket', jsapi_ticket['ticket'], 1000*60*120);// Time in ms 设置缓存两个小时
                             console.log('jsapi_ticket will now ' + cache.get('jsapi_ticket'));
                             //设置缓存全局缓存jsapi_ticket e

                             let time=Functions.nowtime();
                             var signature_str ='jsapi_ticket='+jsapi_ticket['ticket']+'&noncestr='+req.body.title+'&timestamp='+time+'&url='+req.body.url;
                             let hash = createHash('sha1');
                             hash.update(signature_str);
                             var sha1_res=hash.digest('hex');
                             Common.SuccessMessage(req, res, {time:time,nstr:req.body.title,wxsha1:sha1_res}, "即时生成-微信js-sdk基本接口!");
                         }catch (e){
                             Common.ErrorMessage(req,res, e.toString());
                         }
                     });

                 }catch (e){
                     Common.ErrorMessage(req,res, e.toString());
                 }
             });
         }


    }
};