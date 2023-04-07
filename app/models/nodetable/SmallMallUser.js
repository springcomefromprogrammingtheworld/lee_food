//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallUser = sequelize.define('lee_small_mall_user',
    {
        small_mallid: {
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
        time: {
            type: Sequelize.INTEGER(11),
            field: 'time',
            allowNull: false
        },
        nickname: {
            type: Sequelize.STRING(64),
            field: 'nickname',
            allowNull: false,
            defaultValue:''
        },
        avatar_url: {
            type: Sequelize.TEXT,
            field: 'avatar_url',
            allowNull: false
        },
        language: {
            type: Sequelize.STRING(16),
            field: 'language',
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(16),
            field: 'phone',
            allowNull: false,
            defaultValue:''
        }
    },{
        tableName: 'lee_small_mall_user',
        freezeTableName:true,
        timestamps: false
    });

module.exports = SmallMallUser;