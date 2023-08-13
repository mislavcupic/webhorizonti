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

// const getPrijavljeniPsiholozi = async() => {
//     try{
//         let pool = await sql.connect(config);
//         let prijavljeni = pool.request().query('SELECT * FROM Predbiljezbe,EventRegistration2,Predavanja ');
//         console.log(prijavljeni);
//         return prijavljeni;
//     }
// catch(error){
//     console.log(error);
// }
// }
// Create Psiholog operation
const createPsiholog = async (Psiholog) => {
    try {
      let pool = await sql.connect(config);
      await pool.request().query(`
        INSERT INTO EventRegistration2
        VALUES ('${Psiholog.Psiholog_ID}', 
                '${Psiholog.ime}',
                '${Psiholog.prezime}',
                '${Psiholog.email}',
                '${Psiholog.date}')
      `);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Create Psiholog operation
const createPredavanje = async (Predavanje) => {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`
      INSERT INTO Predavanja
      VALUES ('${Predavanje.Predavanje_ID}', 
              '${Predavanje.naziv}',
              '${Predavanje.tip}',
              '${Predavanje.opis}',
              ${Predavanje.brojPolaznika},
              ${Predavanje.slobodnaMjesta},
              ${Predavanje.ukupnoMjesta})
    `);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
  
  // Get Predavanja operation
  const getPredavanja = async () => {
    try {
      let pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Predavanja');
      return result.recordset;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Delete Predavanja operation
  const deletePredavanje = async (Predavanje_ID) => {
    try {
      let pool = await sql.connect(config);
      const result = await pool.request().query(`DELETE FROM Predavanja WHERE Predavanje_ID = '${Predavanje_ID}'`);
      console.log(result);
      return result.recordset;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
//create psiholog operacija
// const createPsiholog = async(Psiholog) => {
//     try{
//         let pool = await sql.connect(config);
//         let psiholozi = pool.request().query(`INSERT INTO EventRegistration2 VALUES 
//          ('${Psiholog.Psiholog_ID}', 
//             '${Psiholog.ime}',
//             '${Psiholog.prezime}',
//             '${Psiholog.email}',
//             '${Psiholog.date}'
//             )`);
//         console.log(psiholozi);
//         return psiholozi;
//     }
// catch(error){
//     console.log(error);
// }
// }

// //getPredavanja operacija
// const getPredavanja = async() => {
//     try{
//         let pool = await sql.connect(config);
//         let predavanja = pool.request().query('SELECT * FROM Predavanja');
//         console.log(predavanja);
//         return predavanja;
//     }
// catch(error){
//     console.log(error);
// }
// }
//ovo je za sve predbiljezbe
const getPredbiljezbe = async() => {
    try{
        let pool = await sql.connect(config);
        let predbiljezbe = pool.request().query('SELECT EventRegistration2.ime, EventRegistration2.prezime, EventRegistration2.email, EventRegistration2.datetime, Predavanja.naziv, Predavanja.tip, Predavanja.opis FROM EventRegistration2, Predavanja, Predbiljezbe WHERE Predbiljezbe.Psiholog_ID = EventRegistration2.Psiholog_ID AND Predbiljezbe.Predavanje_ID = Predavanja.Predavanje_ID');  //tu treba osmisliti pravi upit
        console.log(predbiljezbe);
        return predbiljezbe;
    }
catch(error){
    console.log(error);
}
}
// Create Predbiljezba operation
const createPredbiljezba = async (predbiljezbaData) => {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`
      INSERT INTO Predbiljezbe (Psiholog_ID, Predavanje_ID)
      VALUES ('${predbiljezbaData.Psiholog_ID}', '${predbiljezbaData.Predavanje_ID}')
    `);
    return true; // Return success status
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//create post predavanje operacija
// const postPredavanja = async(Predavanje) => {
//     try{
//         let pool = await sql.connect(config);
//         let predavanje = pool.request().query(`SELECT * FROM Predavanja
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
    getPredbiljezbe,
    createPredbiljezba,
    createPredavanje,
    deletePredavanje
}