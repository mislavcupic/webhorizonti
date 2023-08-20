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

//ovo je za sve predbiljezbe
const getPredbiljezbe = async() => {
    try{
        let pool = await sql.connect(config);
        let predbiljezbe = pool.request().query('SELECT EventRegistration2.ime, EventRegistration2.prezime, EventRegistration2.email, EventRegistration2.datetime, Predavanja.naziv, Predavanja.tip, Predavanja.opis, Predbiljezbe.Vrijeme_predbiljezbe FROM EventRegistration2, Predavanja, Predbiljezbe WHERE Predbiljezbe.Psiholog_ID = EventRegistration2.Psiholog_ID AND Predbiljezbe.Predavanje_ID = Predavanja.Predavanje_ID');  //tu treba osmisliti pravi upit
        console.log(predbiljezbe);
        return predbiljezbe;
    }
catch(error){
    console.log(error);
}
}


// // Create Predbiljezba operation gpt sugg
const createPredbiljezba = async (predbiljezbaID, psihologID, applicationDate, predavanjeIDs) => {
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
        INSERT INTO Predbiljezbe (Predbiljezbe_ID, Psiholog_ID, Vrijeme_predbiljezbe, Predavanje_ID)
        VALUES ('${predbiljezbaID}', '${psihologID}', '${applicationDate}', '${predavanjeID}')
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


const updatePredavanje = async (updatedPredavanje) => {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`
      UPDATE Predavanja
      SET slobodnaMjesta = ${updatedPredavanje.slobodnaMjesta},
          brojPolaznika = ${updatedPredavanje.brojPolaznika}
      WHERE Predavanje_ID = '${updatedPredavanje.Predavanje_ID}'
    `);
    
    return true; // Return success status
  } catch (error) {
    console.log(error);
    return false;
  }
};


// Fetch Predavanje data by ID
const getPredavanjeByID = async (predavanjeID) => {
  try {
    let pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT *
      FROM Predavanja
      WHERE Predavanje_ID = '${predavanjeID}'
    `);

    return result.recordset[0]; // Return the fetched Predavanje data
  } catch (error) {
    console.log(error);
    return null;
  }
};


module.exports = {
    getPsiholozi,
    createPsiholog,
    getPredavanja,
    getPredbiljezbe,
    createPredbiljezba,
    createPredavanje,
    deletePredavanje,
    updatePredavanje, 
    getPredavanjeByID
}