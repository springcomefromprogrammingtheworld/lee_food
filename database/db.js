const Sequelize =  require('sequelize');
// database数据库名称   name 用户  password密码
const sequelize = new Sequelize(process.env.DB_NODEJS||'lee_food', process.env.DB_USER || 'root', process.env.DB_PASS|| 'root', {
    host: process.env.DB_HOST ||'localhost',  //数据库域名
    dialect: 'mysql',
    port: '3306',  //数据库端口
    define: {
        'charset': 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        'freezeTableName': true,
        'timestamps': true, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    },
    logging: false,//默认输出执行sql语句"console.log"或"false"
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
module.exports=sequelize;