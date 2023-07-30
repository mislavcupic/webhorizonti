const config = require('./dbConfig');
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
         ('${Psiholog.Psiholog_ID}', 
            '${Psiholog.ime}',
            '${Psiholog.prezime}',
            '${Psiholog.email}',
            '${Psiholog.date}'
            )`);
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