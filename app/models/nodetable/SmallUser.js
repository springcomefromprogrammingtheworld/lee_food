//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallUser = sequelize.define('lee_small_user',
    {
        small_id: {
            type: Sequelize.INTEGER(11),
            field: 'small_id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        samll_openid: {
            type: Sequelize.STRING(64),
            field: 'samll_openid',
            allowNull: false
        },
        userid: {
            type: Sequelize.INTEGER(11),
            field: 'userid',
            allowNull:false,
            defaultValue:''
        },
        time: {
            type: Sequelize.INTEGER(11),
            field: 'time',
            allowNull: false
        },
        nick_name:{
            type: Sequelize.STRING(32),
            field: 'nick_name',
            allowNull: true
        },
        gender: {
            type: Sequelize.INTEGER(11),
            field: 'gender',
            allowNull: true
        },
        language: {
            type: Sequelize.STRING(16),
            field: 'language',
            allowNull: true
        },
        city: {
            type: Sequelize.STRING(32),
            field: 'city',
            allowNull: true
        },
        province: {
            type: Sequelize.STRING(32),
            field: 'province',
            allowNull: true
        },
        country: {
            type: Sequelize.STRING(32),
            field: 'country',
            allowNull: true
        },
        avatar_url: {
            type: Sequelize.TEXT ,
            field: 'avatar_url',
            allowNull: true
        },
    },{
        tableName: 'lee_small_user',
        freezeTableName:true,
        timestamps: false
    });
module.exports = SmallUser;
