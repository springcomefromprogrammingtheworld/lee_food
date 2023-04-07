//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const Provlist = sequelize.define('lee_provlist',
    {
        provid: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        prov: {
            type: Sequelize.STRING(200),
            field: 'prov',
            allowNull: true
        }
    },{
        tableName: 'lee_provlist',
        freezeTableName:true,
        timestamps: false
    });

module.exports = Provlist;