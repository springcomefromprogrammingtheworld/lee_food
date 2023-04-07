//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallPtype = sequelize.define('lee_small_mall_ptype',
    {
        small_ptypeid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        small_typename: {
            type: Sequelize.STRING(32),
            field: 'small_typename',
            allowNull: true
        },
        small_img: {
            type: Sequelize.STRING(128),
            field: 'small_img',
            allowNull: true
        }
    },{
        tableName: 'lee_small_mall_ptype',
        freezeTableName:true,
        timestamps: false
    });

module.exports = SmallMallPtype;
