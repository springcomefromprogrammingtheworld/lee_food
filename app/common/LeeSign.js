const formidable  = require('formidable');
const Common      = require("../util/Common");
const signkey     = '';

/**
 * 判断客户端请求的方法类型和签名判断
 * @param req
 * @param res
 * @param next
 * @param callback 控制器通信回调函数(通知控制器层签名验证结果)
 */
exports.verifySign = function(req,res,next,callback){
    var signmsg={};
    if(JSON.stringify(req.body) == "{}"&&JSON.stringify(req.query)=="{}"&&JSON.stringify(req.params)=="{}"){
        if(req.method.toLowerCase()=="post"){
            //表单提交过来数据时 s
            var dir="uploads/temp/";//上传文件临时文件夹
            var form = new formidable.IncomingForm();   //创建上传表单
            form.encoding = 'utf-8';        //设置编辑
            form.uploadDir =dir;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小.
            form.parse(req, function (err, fields, files) {
                if (err) {
                    res.locals.error = err;
                    res.send(err);
                    return;
                }else if(fields.timestamp==undefined||fields.gewangkey==undefined||JSON.stringify(fields)=="{}"){
                    signmsg.status = 100;
                    signmsg.msg ='缺乏签名参数';
                }else{
                    if(fields['leekey'] == signkey){
                        var ksort = Common.sort_ascii(fields);
                        var sign  = Common.getSign(ksort);
                        if(ksort['sign'] == sign){
                            signmsg.status = 1;
                            signmsg.msg = '签名成功';
                        }else{
                            signmsg.status = 104;
                            signmsg.msg ='签名错误';
                        }
                    }else{
                        signmsg.status = 104;
                        signmsg.msg ='签名参数错误';
                    }
                }
                callback(req,res,next,signmsg,fields, files);//通知控制器层验证结果
            });
        }else{
            var ksort = Common.sort_ascii(Common.get_req_parms([req.body,req.query,req.params]));//其他各种方式提交过来的数据
            if(ksort['timestamp']==undefined||ksort['leekey']==undefined){
                signmsg.status = 100;
                signmsg.msg ='缺乏签名参数';
            }else{
                if(ksort['leekey'] == signkey){
                    var sign  = Common.getSign(ksort);
                    if(ksort['sign'] == sign){
                        signmsg.status = 1;
                        signmsg.msg = '签名成功';
                    }else{
                        signmsg.status = 104;
                        signmsg.msg = '签名错误';
                    }
                }else{
                    signmsg.status = 104;
                    signmsg.msg ='签名参数错误';
                }
            }
            callback(req,res,next,signmsg);//通知控制器验证结果
        }
    }else {
        ksort = Common.sort_ascii(Common.get_req_parms([req.body,req.query,req.params]));//其他各种方式提交过来的数据
        if(ksort['leekey'] == signkey){
            if(ksort['timestamp']==undefined||ksort['leekey']==undefined){
                signmsg.status = 100;
                signmsg.msg ='缺乏签名参数';
            }else{
                sign  = Common.getSign(ksort);
                if(ksort['sign'] == sign){
                    signmsg.status = 1;
                    signmsg.msg = '签名成功';
                }else{
                    signmsg.status = 104;
                    signmsg.msg = '签名错误';
                }
            }
        }else{
            signmsg.status = 104;
            signmsg.msg ='签名参数错误';
        }
        callback(req,res,next,signmsg);//通知控制器验证结果
    }
};

