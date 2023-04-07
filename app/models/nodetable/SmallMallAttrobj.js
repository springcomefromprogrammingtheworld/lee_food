//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallAttrobj = sequelize.define('lee_small_mall_attrobj',
    {
        attrid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        small_attrname: {
            type: Sequelize.STRING(50),
            field: 'small_attrname',
            allowNull: false
        },
        small_attrvalue: {
            type: Sequelize.STRING(50),
            field: 'small_attrvalue',
            allowNull: false
        },
        smallproductid: {
            type: Sequelize.INTEGER(11),
            field: 'smallproductid',
            allowNull: false
        }
    },{
        tableName: 'lee_small_mall_attrobj',
        freezeTableName:true,
        timestamps: false
    });
module.exports = SmallMallAttrobj;

