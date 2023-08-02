require('dotenv').config()
const config = {
user: process.env.REACT_APP_SQL_USER,
server:process.env.REACT_APP_SQL_SERVER_NAME,
database:process.env.REACT_APP_SQL_DB,
password: process.env.REACT_APP_SQL_PASS,
options:{
    trustServerCertificate:true,
    trustedConnection:false,
    enableArithAbort:true,
    instancename:'SQLEXPRESS'
}
,
 port: 49676
}
module.exports = config;