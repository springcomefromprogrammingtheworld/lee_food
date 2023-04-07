//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const WxContract = sequelize.define('lee_wx_contract',
    {
        id: {
            type: Sequelize.INTEGER(11),
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        openid: {
            type: Sequelize.STRING(255),
            field: 'openid',
            allowNull: false,
            defaultValue:''
        },
        oprator: {
            type: Sequelize.STRING(255),
            field: 'oprator',
            allowNull:false,
            defaultValue:''
        },
        brandid: {
            type: Sequelize.INTEGER(11),
            field: 'brandid',
            allowNull: false,
            defaultValue:'0'
        },
        uptime: {
            type: Sequelize.INTEGER(11),
            field: 'uptime',
            allowNull: false,
            defaultValue:''
        },
        nickname:{
            type: Sequelize.STRING(32),
            field: 'nickname',
            allowNull: true
        },
        sex: {
            type: Sequelize.INTEGER(11),
            field: 'sex',
            allowNull: true
        },
        city: {
            type: Sequelize.STRING(32),
            field: 'city',
            allowNull: true
        },
        province: {
            type: Sequelize.STRING(32),
            field: 'province',
            allowNull: true
        },
        country: {
            type: Sequelize.STRING(32),
            field: 'country',
            allowNull: true
        },
        headimgurl: {
            type: Sequelize.TEXT ,
            field: 'headimgurl',
            allowNull: true
        }
    },{
        tableName: 'lee_wx_contract',
        freezeTableName:true,
        timestamps: false
    });
module.exports = WxContract;
