//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallAddress = sequelize.define('lee_small_mall_address',
    {
        small_addressid: {
            type: Sequelize.INTEGER(11),
            field: 'small_addressid',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        small_openid: {
            type: Sequelize.STRING(64),
            field: 'small_openid',
            allowNull: false
        },
        small_contract: {
            type: Sequelize.STRING(32),
            field: 'small_contract',
            allowNull:false,
            defaultValue:''
        },
        small_tel: {
            type: Sequelize.STRING(16),
            field: 'small_tel',
            allowNull: false
        },
        small_address:{
            type: Sequelize.STRING(255),
            field: 'small_address',
            allowNull: false
        },
        default: {
            type: Sequelize.TINYINT(2),
            field: 'default',
            allowNull: false,
            defaultValue:0
        },
        create_time: {
            type: Sequelize.INTEGER(11),
            field: 'create_time',
            allowNull: false
        }
    },{
        tableName: 'lee_small_mall_address',
        freezeTableName:true,
        timestamps: false
    });
module.exports = SmallMallAddress;
