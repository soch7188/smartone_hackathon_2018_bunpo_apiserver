
const environments = {
    local: {
        mysql: {
            host: 'smartone-hack-2018-bunpo-mysql.mysql.database.azure.com',
            username: 'ustchangdong@smartone-hack-2018-bunpo-mysql',
            password: 'Ckdehd123!',
            database: 'bunpo',
            logging: console.log
        },
        apikey: '9Y3-7bE-Ud3-7Ja',
        jwt_secret: "9Y3-7bE-Ud3-7Ja"
    },
    production: {
        mysql: {
            host: 'smartone-hack-2018-bunpo-mysql.mysql.database.azure.com',
            username: 'ustchangdong@smartone-hack-2018-bunpo-mysql',
            password: 'Ckdehd123!',
            database: 'bunpo',
            logging: console.log
        },
        apikey: '9Y3-7bE-Ud3-7Ja',
        jwt_secret: "9Y3-7bE-Ud3-7Ja"
    }
};

const nodeEnv = process.env.NODE_ENV || 'local';
module.exports = environments[nodeEnv];
