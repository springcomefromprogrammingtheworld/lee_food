const Common = require("../../util/Common");
const Functions = require("../../util/Functions");
const LeeCurl = require("../../common/Curl");
const AppID="";
const AppSecret="";
const {createHash}= require('crypto');
const WXBizDataCrypt = require('../../small_program_tool/WXBizDataCrypt');
const SmallMallUser = require("../../models/nodetable/SmallMallUser");

/**
 * 小程序商城用户授权登录接口(业务层)
 * @param req
 * @param res
 * @param next
 * @param verifySignRs
 */
exports.small_mall_login=function(req,res,next,verifySignRs={}){

    var login_url="https://api.weixin.qq.com/sns/jscode2session?appid="+AppID+"&"+"secret="+AppSecret+"&"+"js_code="+req.body.code+"&grant_type=authorization_code";
    //https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html 登录文档链接
    if(req.body.code==undefined){
        Common.ErrorMessage(req,res,"缺乏登录凭证参数:code!");
    }else{
        LeeCurl.lee_get_curl(login_url,function(data){
            try{
                var login_result=JSON.parse(data);
                if(login_result['openid']!=undefined&&login_result['session_key']!=undefined){
                    var create_signature=signature_verification(req.body.rawData+login_result['session_key']);//校验签名

                    //解密用户开放数据 s
                    var pc = new WXBizDataCrypt(AppID, login_result['session_key']);
                    var decrypt_data = pc.decryptData(req.body.encryptedData , req.body.iv);
                    //解密用户开放数据 e


                    if(create_signature!=req.body.signature){
                        Common.ErrorMessage(req,res,"服务端获取开放数据签名错误!");
                    }else if(login_result['openid']!=decrypt_data['openId']){
                        Common.ErrorMessage(req,res,"用户openid错误!");
                    } else{
                        SmallMallUser.findOne({
                            where:{
                                small_openid:login_result['openid'],
                            },
                            raw:true
                        }).then(srs=>{
                            if(srs==null){
                                //存储用户信息 s
                                SmallMallUser.create({
                                    small_openid:decrypt_data['openId'],
                                    time:Functions.nowtime(),
                                    nickname:decrypt_data['nickName'],
                                    language:decrypt_data['language'],
                                    avatar_url:decrypt_data['avatarUrl']
                                }).then(samllrs=> {
                                    Common.SuccessMessage(req, res, samllrs, "微信小程序商城授权登录成功!");
                                }).catch(error => {
                                    Common.ErrorMessage(req,res,error.toString());
                                });
                                //存储用户信息 e
                            }else{
                                SmallMallUser.update({
                                    nickname:decrypt_data['nickName'],
                                    language:decrypt_data['language'],
                                    avatar_url:decrypt_data['avatarUrl']
                                },{
                                    where:{
                                        small_openid:login_result['openid'],
                                    }
                                }).then(uprs=>{
                                    Common.SuccessMessage(req, res, srs, "微信小程序商城授权登录成功!");
                                });
                            }
                        });
                    }
                    //校验签名 e
                }else{
                    Common.ErrorMessage(req,res,login_result)
                }
            }catch (e){
                Common.ErrorMessage(req,res, e.toString());
            }
        });
    }

};

/**
 * 验证开放数据签名
 * @param signstr
 */
function signature_verification(signstr){
    let hash = createHash('sha1');
    hash.update(signstr);
    var create_signature =hash.digest('hex');
    return create_signature;
}