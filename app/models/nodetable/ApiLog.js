//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const ApiLog = sequelize.define('lee_api_log',
    {
        Id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        RequestUrl:{
            type: Sequelize.STRING(255),
            field: 'RequestUrl',
            allowNull: true
        },
        Request:{
            type:Sequelize.TEXT,
            field: 'Request',
            allowNull: false
        },
        Time:{
            type: Sequelize.STRING(20),
            field: 'Time',
            allowNull: true
        },
        Act:{
            type: Sequelize.STRING(10),
            field: 'Act',
            allowNull: true
        },
        Remark:{
            type: Sequelize.STRING(40),
            field: 'Remark',
            allowNull: true
        },
        Response:{
            type:Sequelize.TEXT,
            field: 'Response',
            allowNull: false
        }
    },{
        tableName: 'lee_api_log',
        freezeTableName:true,
        timestamps: false
    });
module.exports = ApiLog;