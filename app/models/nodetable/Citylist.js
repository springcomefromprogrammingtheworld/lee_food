//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const Citylist = sequelize.define('lee_citylist',
    {
        cityid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        city: {
            type: Sequelize.STRING(200),
            field: 'city',
            allowNull: true
        }
    },{
        tableName: 'lee_citylist',
        freezeTableName:true,
        timestamps: false
    });

module.exports = Citylist;