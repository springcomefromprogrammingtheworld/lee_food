//引入sequelize模块
const Sequelize = require('sequelize');
//引入数据库
const sequelize = require('../../../database/db');
/*
 * 定义表的映射模型
 * https://sequelize.readthedocs.io/en/v3/docs/models-definition/
 * */
const SmallMallPicmaterial = sequelize.define('lee_small_mall_picmaterial',
    {
        picmaterialid: {
            type: Sequelize.INTEGER(11),
            field: 'picmaterialid',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        pic_material_desc: {
            type: Sequelize.STRING(255),
            field: 'pic_material_desc',
            allowNull: false
        },
        pic_material: {
            type: Sequelize.STRING(255),
            field: 'pic_material',
            allowNull:false
        }
    },{
        tableName: 'lee_small_mall_picmaterial',
        freezeTableName:true,
        timestamps: false
    });
module.exports = SmallMallPicmaterial;

