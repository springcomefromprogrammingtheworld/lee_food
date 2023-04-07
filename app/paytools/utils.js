var xml2js = require('xml2js');
/**
 * 将数据转为XML
 * @param obj
 * @returns {*}
 */
exports.to_xml=function(obj){
    $xml = '<xml>';
    Object.keys(obj).forEach(function(key){
        $xml+='<'+key+'><![CDATA['+obj[key]+']]></'+key+'>';
    });
    $xml+='</xml>';
    return $xml;
};


/**
 * 将XML转为obj
 * @param xml_string
 * @param callback
 */
exports.xml_to_obj=function(xml_string,callback){
        if(xml_string==''||xml_string==null){
            callback({error:'源xml数据为空'});
        }else{
            xml2js.parseStringPromise(xml_string,{explicitArray : false,async:true}).then(function (result) {
                callback(result);
            }).catch(function (err) {
                callback({error:'xml数据转对象异常'+err.toString()});
            });
        }
};



