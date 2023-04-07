//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
const SmallMallProduct= require('./SmallMallProduct');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallRecord = sequelize.define('lee_small_mall_record',
    {
        smallorderid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        smallproductid: {
            type: Sequelize.INTEGER(11),
            field: 'smallproductid',
            allowNull: false
        },
        small_product_name: {
            type: Sequelize.STRING(32),
            field: 'small_product_name',
            allowNull: false
        },
        small_orderno: {
            type: Sequelize.STRING(64),
            field: 'small_orderno',
            allowNull: false
        },
        pay_orderno: {
            type: Sequelize.STRING(64),
            field: 'pay_orderno',
            allowNull: false
        },
        status: {
            type: Sequelize.TINYINT(4),
            field: 'status',
            allowNull: false
        },
        pay_time: {
            type: Sequelize.INTEGER(11),
            field: 'pay_time',
            allowNull: false,
            defaultValue:0
        },
        create_time: {
            type: Sequelize.INTEGER(11),
            field: 'create_time',
            allowNull: false,
            defaultValue:0
        },
        update_time: {
            type: Sequelize.INTEGER(11),
            field: 'update_time',
            allowNull: false,
            defaultValue:0
        },
        order_pay_type: {
            type: Sequelize.STRING(20),
            field: 'order_pay_type',
            allowNull: false
        },
        small_count: {
            type: Sequelize.INTEGER(11),
            field: 'small_count',
            allowNull: false
        },
        retail_price:{
            type:Sequelize.DECIMAL(10, 2),
            field: 'retail_price',
            allowNull: false,
        },
        total_price:{
            type:Sequelize.DECIMAL(10, 2),
            field: 'total_price',
            allowNull: false,
        },
        small_openid: {
            type: Sequelize.STRING(64),
            field: 'small_openid',
            allowNull: false
        },
        attr_object:{
            type: Sequelize.TEXT,
            field: 'attr_object',
            allowNull: true,
            defaultValue:''
        },
        attrid:{
            type: Sequelize.TEXT,
            field: 'attrid',
            allowNull: true,
            defaultValue:''
        },
        remarks: {
            type: Sequelize.STRING(64),
            field: 'remarks',
            allowNull: false,
            defaultValue:''
        },
        small_address: {
            type: Sequelize.STRING(255),
            field: 'small_address',
            allowNull: false,
            defaultValue:''
        },
        small_contract: {
            type: Sequelize.STRING(255),
            field: 'small_contract',
            allowNull: false,
            defaultValue:''
        },
        small_tel: {
            type: Sequelize.STRING(16),
            field: 'small_tel',
            allowNull: false,
            defaultValue:''
        },
        nickname: {
            type: Sequelize.STRING(64),
            field: 'nickname',
            allowNull: false,
            defaultValue:''
        },
        avatar_url:{
            type: Sequelize.TEXT,
            field: 'avatar_url',
            allowNull: true,
            defaultValue:''
        },
    },{
        tableName: 'lee_small_mall_record',
        freezeTableName:true,
        timestamps: false
    });
SmallMallRecord.belongsTo(SmallMallProduct, { foreignKey: 'smallproductid' });
module.exports = SmallMallRecord;
