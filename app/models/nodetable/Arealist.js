//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const Arealist = sequelize.define('lee_arealist',
    {
        areaid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        area: {
            type: Sequelize.STRING(200),
            field: 'area',
            allowNull: true
        }
    },{
        tableName: 'lee_arealist',
        freezeTableName:true,
        timestamps: false
    });

module.exports = Arealist;