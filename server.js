const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');
const port = process.env.REACT_APP_PORT || 8080;
const nodemailer = require('nodemailer');
const path = require('path');

// Serve static files (build folder) for the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Import database operations
// Import database operations
const { createPsiholog, getPredavanja, getPredbiljezbe, createPredavanje, deletePredavanje, createPredbiljezba,updatePredavanje, getPredavanjeByID} = require('./src/dbFiles/dbOperation');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:8080']; // Add the URL of your React app

app.use(cors({
  origin: allowedOrigins,
}));
function sendEmail (userPsiholog) {

  console.log(userPsiholog);

  return new Promise((resolve,reject) =>{
      var transporter = nodemailer.createTransport({
          service: "gmail",
          auth:{
              user:'mislav.cupic@gmail.com',
              pass: process.env.REACT_APP_GOOGLE_PASS,

          }
          ,
      });
      const mail_configs = {
          from: 'mislav.cupic@gmail.com',
          to:   userPsiholog.email,
          subject: "Potvrda prijave na stručni skup",
          text: `Pozdrav ${userPsiholog.ime} ${userPsiholog.prezime}, Vaša prijava na stručni skup "Horizonti snage" uspješno je izvršena dana ${userPsiholog.date}. Vaša kontakt mail adresa je ${userPsiholog.email}. Čuvajte ovu poruku jer se na njoj nalazi i token s kojim ćete se kasnije prijavljivati na predavanja. Vaš token za prijavu na predavanja: ${userPsiholog.Psiholog_ID}`
      };
      transporter.sendMail(mail_configs,function(err,info){
          if(err){
              console.log(err);
              return reject({message: 'an error has occured'});
          }
          return resolve({message:"Vaši podaci uspješno su spremljeni"});
          });

      })
  }
// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('insertData', async (data) => {
    try {
      setTimeout(async () => {
        await createPsiholog(data);
        sendEmail(data);
        io.emit('dataInserted', data);
      }, 5000);
      // Emit the refresh event
 // socket.emit('refreshPage');

    } catch (error) {
      console.error('Error while inserting data:', error);
      socket.emit('insertionError', 'An error occurred while inserting data.');
    }
  });
// // Event for creating predbiljezba
// socket.on('createPredbiljezba', async (predbiljezbaData) => {
//   try {
//     const result = await createPredbiljezba(predbiljezbaData);
//     if (result) {
//       io.emit('predbiljezbaStatus', 'success'); // Emit success status
//       console.log(predbiljezbaData)
//     } else {
//       io.emit('predbiljezbaStatus', 'error'); // Emit error status
//     }
//   } catch (error) {
//     console.log('Error while creating predbiljezba:', error);
//     io.emit('predbiljezbaStatus', 'error'); // Emit error status
//   }
// });

  socket.on('insertPredavanje', async (data) => {
    try {
      setTimeout(async () => {
        await createPredavanje(data);
        io.emit('predavanjeInserted', data);
      }, 5000);
      // Emit the refresh event
 // socket.emit('refreshPage');

    } catch (error) {
      console.error('Error while inserting data:', error);
      socket.emit('insertionError', 'An error occurred while inserting predavanje.');
    }
  });

  socket.on('getPredavanja', async () => {
    try {
      const predavanja = await getPredavanja();
      io.emit('getPredavanja', predavanja);
      io.emit('predavanjaData', predavanja); // Emit the data using the correct event name for createpredbiljezba.js
    } catch (error) {
      console.error('Error while fetching data:', error);
      socket.emit('fetchingError', 'An error occurred while fetching data.');
    }
  });
//gptsugg
socket.on('deletePredavanje', async (predavanjeID) => {
  try {
    await deletePredavanje(predavanjeID); // Delete the predavanje
    console.log('Deleted predavanje with ID:', predavanjeID);

    // Get the updated predavanja after deletion
    const updatedPredavanja = await getPredavanja();
    console.log('Updated predavanja list:', updatedPredavanja);

    // Emit the updated predavanja list to all clients
    io.emit('getPredavanja', updatedPredavanja);
  } catch (error) {
    console.log('Error while deleting or fetching data:', error);
    socket.emit('fetchingError', 'An error occurred while deleting or fetching data.');
  }
});
  // socket.on('deletePredavanje', async (predavanjeID) => {
  //   try {
  //     const predavanje = await deletePredavanje(predavanjeID);
  //     console.log('Received predavanjeID:', predavanjeID);
  //     io.emit('deletePredavanje', predavanje);
  //     const predavanja = await getPredavanja();
  //     console.log(predavanja);
  //     io.emit('getPredavanja', predavanja);
  //   } catch (error) {
  //     console.log(error);
  //     socket.emit('fetchingError', 'An error occurred while fetching data.');
  //   }
  // });




  socket.on('getPredbiljezbe', async () => {
    try {
      const predbiljezbe = await getPredbiljezbe();
      console.log(predbiljezbe);
      io.emit('getPredbiljezbe', predbiljezbe);
    } catch (error) {
      console.error('Error while fetching data:', error);
      io.emit('fetchingError', 'An error occurred while fetching data.');
    }
  });

  // Event for creating predbiljezba - gpt


  //ovaj je dobar i radi!!!!!!!!!
  // socket.on('createPredbiljezba', async (predbiljezbaID,psihologID,predavanjeID) => {
  //   try {
  //    // const { predbiljezbaID, psihologID, predavanjeID } = predbiljezbaData;
  //     console.log("Predbilježba_ID: "+predbiljezbaID);
  //     console.log("Psiholog_ID: "+psihologID);
  //     console.log("Predavanje_ID: "+predavanjeID)
  //     const result = await createPredbiljezba (predbiljezbaID, psihologID, predavanjeID);
  //     if (result) {
  //       io.emit('predbiljezbaStatus', 'success'); // Emit success status
  //     } else {
  //       io.emit('predbiljezbaStatus', 'error'); // Emit error status
  //     }
  //   } catch (error) {
  //     console.log('Error while creating predbiljezba:', error);
  //     io.emit('predbiljezbaStatus', 'error'); // Emit error status
  //   }
  // });
 //gpt 17.8.
 socket.on('createPredbiljezba', async (predbiljezbaID, psihologID, applicationDate, ...predavanjeIDs ) => {
  try {
    console.log("Predbilježba_ID: " + predbiljezbaID);
    console.log("Psiholog_ID: " + psihologID);
    console.log("Vrijeme predbiljezbe: "+applicationDate)
    console.log("Predavanje_ID: " + predavanjeIDs.join(', ')); // Join array elements for logging
  
    const result = await createPredbiljezba(predbiljezbaID, psihologID,applicationDate, ...predavanjeIDs );
    if (result) {
      io.emit('predbiljezbaStatus', 'success');
    } else {
      io.emit('predbiljezbaStatus', 'error');
    }
  } catch (error) {
    console.log('Error while creating predbiljezba:', error);
    io.emit('predbiljezbaStatus', 'error');
  }
});

// Event for updating Predavanje data
// // Event for updating Predavanje data
socket.on('updatePredavanje', async (updatedPredavanje, callback) => {
  try {
    // Update the Predavanje data in the database
    const success = await updatePredavanje(updatedPredavanje);

    if (success) {
      // Emit the updated Predavanje data to all clients
      io.emit('updatedPredavanje', updatedPredavanje);

      callback({ success: true }); // Callback to acknowledge the update

      // Additional logic for updating slobodnaMjesta and brojPolaznika
      const predavanjeID = updatedPredavanje.Predavanje_ID;
      const updatedPredavanjeData = await getPredavanjeByID(predavanjeID); // Fetch updated Predavanje data from the database

      if (updatedPredavanjeData) {
        // Calculate new values for slobodnaMjesta and brojPolaznika
        const newSlobodnaMjesta = Math.max(0, updatedPredavanjeData.slobodnaMjesta);
        const newBrojPolaznika = Math.min(updatedPredavanjeData.ukupnoMjesta, updatedPredavanjeData.brojPolaznika);

        // Update the Predavanje data with new values
        updatedPredavanjeData.slobodnaMjesta = newSlobodnaMjesta;
        updatedPredavanjeData.brojPolaznika = newBrojPolaznika;

        // Update the Predavanje data in the database
        const updateResult = await updatePredavanje(updatedPredavanjeData);
        if (updateResult) {
          io.emit('updatedPredavanje', updatedPredavanjeData);
        }
      }
    } else {
      callback({ success: false, message: 'Failed to update Predavanje data in the database.' });
    }
  } catch (error) {
    console.error('Error while updating Predavanje data:', error);
    callback({ success: false, message: 'An error occurred while updating Predavanje data.' });
  }
});


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});














