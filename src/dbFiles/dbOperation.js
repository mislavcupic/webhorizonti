// const config = require('./dbConfig');

//ovo je zapravo uključivanje koda iz ./dbConfig
// const config = {
//     user: 'HorizontiSnage',
//     server:'DESKTOP-KHJLLQS',
//     database:'HorizontiSnage',
//     password:'Bioskop7',
//     options:{
//         trustServerCertificate:true,
//         trustedConnection:false,
//         enableArithAbort:true,
//         instancename:'SQLEXPRESS'
//     }
//     ,
//      port: 49676
//     }
//     module.exports = config;


//i am requiring mssql dependency
sql = require('mssql'); 
//get
const getPsiholozi = async() => {
    try{
        let pool = await sql.connect(config);
        let psiholozi = pool.request().query('SELECT * FROM EventRegistration2');
        console.log(psiholozi);
        return psiholozi;
    }
catch(error){
    console.log(error);
}
}

//create
const createPsiholog = async(Psiholog) => {
    try{
        let pool = await sql.connect(config);
        let psiholozi = pool.request().query(`INSERT INTO EventRegistration2 VALUES 
         (${Psiholog.Psiholog_ID}, 
            '${Psiholog.ime}',
            '${Psiholog.prezime}',
            '${Psiholog.email}')`);
        console.log(psiholozi);
        return psiholozi;
    }
catch(error){
    console.log(error);
}
}

module.exports = {
    getPsiholozi,
    createPsiholog
}