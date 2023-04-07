//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
const SmallMallProduct= require('./SmallMallProduct');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallCart = sequelize.define('lee_small_mall_cart',
    {
        small_cartid: {
            type: Sequelize.INTEGER(11),
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
        smallproductid: {
            type: Sequelize.INTEGER(11),
            field: 'smallproductid',
            allowNull: false
        },
        small_product_name:{
            type:Sequelize.STRING(32),
            field: 'small_product_name',
            allowNull: false,
        },
        small_count: {
            type: Sequelize.INTEGER(11),
            field: 'small_count',
            allowNull: false
        },
        create_time: {
            type: Sequelize.INTEGER(11),
            field: 'create_time',
            allowNull: false
        },
        status: {
            type: Sequelize.TINYINT(1),
            field: 'status',
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
        }
    },{
        tableName: 'lee_small_mall_cart',
        freezeTableName:true,
        timestamps: false
    });
SmallMallCart.belongsTo(SmallMallProduct, { foreignKey: 'smallproductid' });
module.exports = SmallMallCart;