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
//suggestion 16.8.2023. 15:27
// const createPredbiljezba = async (predbiljezbaID, psihologID, predavanjeIDs) => {
//   try {
//     let pool = await sql.connect(config);
//     console.log(psihologID);

//     // Check if the provided Psiholog_ID exists in the referenced table
//     const psihologExists = await pool.request().query(`
//       SELECT * FROM EventRegistration2 WHERE Psiholog_ID = '${psihologID}'
//     `);

//     if (!psihologExists.recordset.length) {
//       throw new Error('Invalid Psiholog_ID');
//     }

//     // Begin a transaction
//     const transaction = new sql.Transaction(pool);
//     await transaction.begin();

//     try {
//       // Perform the insert operation for each predavanjeID
//       for (const predavanjeID of predavanjeIDs) {
//         await transaction.request().query(`
//           INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Predavanje_ID)
//           VALUES ('${predbiljezbaID}', '${psihologID}', '${predavanjeID}')
//         `);
//       }

//       // Commit the transaction
//       await transaction.commit();

//       return true; // Return success status
//     } catch (error) {
//       // Rollback the transaction if an error occurs
//       await transaction.rollback();
//       throw new Error('Error while creating predbiljezba');
//     }
//   } catch (error) {
//     console.log(error);

//     // Handle different types of errors
//     if (error.message === 'Invalid Psiholog_ID') {
//       throw new Error('Invalid Psiholog_ID');
//     } else {
//       throw new Error('Error while creating predbiljezba');
//     }
//   }
// };

// // Create Predbiljezba operation gpt sugg
const createPredbiljezba = async (predbiljezbaID, psihologID, predavanjeIDs) => {
  console.log(predavanjeIDs);
  const myArray = predavanjeIDs.split(",");
  console.log(myArray);
  try {
    let pool = await sql.connect(config);
    
    // Check if the provided Psiholog_ID exists in the referenced table
    const psihologExists = await pool.request().query(`
      SELECT * FROM EventRegistration2 WHERE Psiholog_ID = '${psihologID}'
    `);

    if (!psihologExists.recordset.length) {
      throw new Error('Invalid Psiholog_ID');
    }

    // Perform the insert operation for each predavanjeID
    for (const predavanjeID of myArray) {
      console.log('Ovo je predavanjeID iz dbOper: ' + predavanjeID);
      await pool.request().query(`
        INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Predavanje_ID)
        VALUES ('${predbiljezbaID}', '${psihologID}', '${predavanjeID}')
      `);
    }

    return true; // Return success status
  } catch (error) {
    console.log(error);

    // Handle different types of errors
    if (error.message === 'Invalid Psiholog_ID') {
      throw new Error('Invalid Psiholog_ID');
    } else {
      throw new Error('Error while creating predbiljezba');
    }
  }
};
//ovo sam dosad koristio 17.8. 13.12h
// const createPredbiljezba = async (predbiljezbaID, psihologID, predavanjeIDs) => {
//   console.log(predavanjeIDs);
//   const myArray = predavanjeIDs.split(",");
//   console.log(myArray);
//   try {
//     let pool = await sql.connect(config);
    
//     // Check if the provided Psiholog_ID exists in the referenced table
//     const psihologExists = await pool.request().query(`
//       SELECT * FROM EventRegistration2 WHERE Psiholog_ID = '${psihologID}'
//     `);

//     if (!psihologExists.recordset.length) {
//       throw new Error('Invalid Psiholog_ID');
//     }

//     // Perform the insert operation for each predavanjeID
   
//       console.log('Ovo je predavanjeID iz dbOper: ' + myArray);
//       await pool.request().query(`
//         INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Predavanje_ID)
//         VALUES ('${predbiljezbaID}', '${psihologID}', '${myArray}')
//       `);
    

//     return true; // Return success status
//   } catch (error) {
//     console.log(error);

//     // Handle different types of errors
//     if (error.message === 'Invalid Psiholog_ID') {
//       throw new Error('Invalid Psiholog_ID');
//     } else {
//       throw new Error('Error while creating predbiljezba');
//     }
//   }
// };

// const createPredbiljezba = async (predbiljezbaID,psihologID,predavanjeID) => {
//   try {
//     let pool = await sql.connect(config);
//     console.log(psihologID);
//     // Check if the provided Psiholog_ID exists in the referenced table
//     const psihologExists = await pool.request().query(`
//       SELECT * FROM EventRegistration2 WHERE Psiholog_ID = '${psihologID}'
//     `);

//     if (!psihologExists.recordset.length) {
//       throw new Error('Invalid Psiholog_ID');
//     }
// // // Perform the insert operation for each predavanjeID
// for (const pred of predavanjeID)  {  //
//   console.log('Ovo je predavanjeID iz dbOper: '+pred);
//   await pool.request().query(`
//     INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Predavanje_ID)
//     VALUES ('${predbiljezbaID}', '${psihologID}', '${predavanjeID}')
//   `);
// }
//     // Perform the insert operation

//     // await pool.request().query(`
//     //   INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Predavanje_ID)
//     //   VALUES ('${predbiljezbaID}', '${psihologID}', '${predavanjeID}')
//     // `);
    

//     return true; // Return success status
//   } catch (error) {
//     console.log(error);

//     // Handle different types of errors
//     if (error.message === 'Invalid Psiholog_ID') {
//       throw new Error('Invalid Psiholog_ID');
//     } else {
//       throw new Error('Error while creating predbiljezba');
//     }
//   }
// };

// const createPredbiljezba = async (predbiljezbaData) => {
//   try {
//     let pool = await sql.connect(config);
//     await pool.request().query(`
//       INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Predavanje_ID)
//       VALUES ('${predbiljezbaData.Predbiljezbe_ID}','${predbiljezbaData.Psiholog_ID}', '${predbiljezbaData.Predavanje_ID}')
//     `);
//     return true; // Return success status
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
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