const LeeCurl = require("./Curl");
const fs = require("fs");
const Functions = require("../util/Functions");
/**
 * 获取微信接口access_token
 * @param callback
 */
exports.access_token=function(callback){
    var dir = "uploads/";
    var APPID='';
    var APPSECRET='';
    var url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET;
    fs.stat(dir+'access_token', function(err, stats){
        if(stats==undefined){
            LeeCurl.lee_get_curl(url,function(data){
                var access_token_res=JSON.parse(data);
                //console.log("准备写入文件");
                var file_content=access_token_res.access_token;
                fs.writeFile(dir+'access_token', file_content,  function(err) {
                    if (err) {
                        return console.error(err);
                    }else{
                        callback(file_content)
                    }
                });
            });
        }else if(stats!=undefined){
            var now_time=Functions.nowtime();
            var mtime=parseInt(parseFloat(stats.mtimeMs)/1000);//文件最后修改时间
            //console.log("现在时间:"+now_time);
            //console.log("文件最后修改时间:"+mtime);
            //console.log(now_time-mtime);
            if(now_time-mtime>7200){
                GwCurl.lee_get_curl(url,function(data){
                    var access_token_res=JSON.parse(data);
                    //console.log("准备写入文件");
                    var file_content=access_token_res.access_token;
                    fs.writeFile(dir+'access_token', file_content,  function(err) {
                        if (err) {
                            return console.error(err);
                        }else{
                            callback(file_content)
                        }
                    });
                });
            }else{
                //console.log("没过期直接读取文件获取access_token!");
                fs.readFile(dir+'access_token', function (err, data) {
                    if (err) {
                        return console.error(err);
                    }else{
                        callback(data.toString())
                    }
                });
            }
        }
    });
};

