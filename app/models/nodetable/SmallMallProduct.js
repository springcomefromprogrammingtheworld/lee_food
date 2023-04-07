//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
const SmallMallPtype= require('./SmallMallPtype');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallProduct = sequelize.define('lee_small_mall_product',
    {
        smallproductid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        small_ptypeid: {
            type: Sequelize.INTEGER(11),
            field: 'small_ptypeid',
            allowNull: false
        },
        small_product_name: {
            type: Sequelize.STRING(32),
            field: 'small_product_name',
            allowNull: false
        },
        retail_price:{
            type:Sequelize.DECIMAL(10, 2),
            field: 'retail_price',
            allowNull: false,
        },
        small_product_img: {
            type: Sequelize.STRING(128),
            field: 'small_product_img',
            allowNull: false
        },
        status: {
            type: Sequelize.TINYINT(4),
            field: 'status',
            allowNull: false
        },
        count: {
            type: Sequelize.INTEGER(11),
            field: 'count',
            allowNull: false
        },
        unit: {
            type: Sequelize.STRING(20),
            field: 'unit',
            allowNull: false
        },
        product_details:{
            type: Sequelize.TEXT,
            field: 'product_details',
            allowNull: true,
            defaultValue:''
        },
    },{
        tableName: 'lee_small_mall_product',
        freezeTableName:true,
        timestamps: false
    });
SmallMallProduct.belongsTo(SmallMallPtype, { foreignKey: 'small_ptypeid' });
module.exports = SmallMallProduct;

