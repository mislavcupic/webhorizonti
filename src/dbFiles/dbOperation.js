const config = require('./dbConfig');
//i am requiring mssql dependency
sql = require('mssql'); 
//get psiholozi operacija
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

//create psiholog operacija
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

//getPredavanja operacija
const getPredavanja = async() => {
    try{
        let pool = await sql.connect(config);
        let predavanja = pool.request().query('SELECT * FROM Predavanja');
        console.log(predavanja);
        return predavanja;
    }
catch(error){
    console.log(error);
}
}

//create predavanje operacija
// const createPredavanje = async(Predavanje) => {
//     try{
//         let pool = await sql.connect(config);
//         let predavanje = pool.request().query(`INSERT INTO Predavanja VALUES 
//          ('${Predavanje.Predavanje_ID}', 
//             '${Predavanje.naziv}',
//             '${Predavanje.tip}',
//             '${Predavanje.opis}',
//              ${Predavanje.slobodnaMjesta},
//              ${Predavanje.ukupnoMjesta},
//              '${Predavanje.Psiholog_ID}'
//             )`);
//         console.log(predavanje);
//         return predavanje;
//     }
// catch(error){
//     console.log(error);
// }
// }

module.exports = {
    getPsiholozi,
    createPsiholog,
    getPredavanja,
    //createPredavanje
}