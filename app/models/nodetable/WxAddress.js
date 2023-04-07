//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const WxAddress = sequelize.define('lee_wx_address',
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
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(255),
            field: 'name',
            allowNull:false,
            defaultValue:''
        },
        tel: {
            type: Sequelize.STRING(255),
            field: 'tel',
            allowNull: true
        },
        address:{
            type: Sequelize.STRING(255),
            field: 'address',
            allowNull: true
        },
        type: {
            type: Sequelize.INTEGER(4),
            field: 'type',
            allowNull: true
        },
        isdefault: {
            type: Sequelize.INTEGER(4),
            field: 'isdefault',
            allowNull: true
        }
    },{
        tableName: 'lee_wx_address',
        freezeTableName:true,
        timestamps: false
    });
module.exports = WxAddress;