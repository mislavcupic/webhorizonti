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
const { createPsiholog, getPredavanja, getPredbiljezbe, createPredavanje, deletePredavanje, createPredbiljezba } = require('./src/dbFiles/dbOperation');

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
          text: `Pozdrav ${userPsiholog.ime} ${userPsiholog.prezime}, Vaša prijava na stručni skup "Horizonti snage" uspješno je izvršena dana ${userPsiholog.date}. Vaša kontakt mail adresa je ${userPsiholog.email}`
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
// Event for creating predbiljezba
socket.on('createPredbiljezba', async (predbiljezbaData) => {
  try {
    const result = await createPredbiljezba(predbiljezbaData);
    if (result) {
      io.emit('predbiljezbaStatus', 'success'); // Emit success status
    } else {
      io.emit('predbiljezbaStatus', 'error'); // Emit error status
    }
  } catch (error) {
    console.log('Error while creating predbiljezba:', error);
    io.emit('predbiljezbaStatus', 'error'); // Emit error status
  }
});

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

  // Event for creating predbiljezba
  socket.on('createPredbiljezba', (predbiljezbaData) => {
    // Perform validation and store predbiljezbaData in your database
    // For simplicity, we'll just emit a success status here
    socket.emit('predbiljezbaStatus', 'success');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });














//   socket.on('getPredavanja', async (data) => {
//     try {
//       const predavanja = await getPredavanja(data);
//       io.emit('fetchedPredavanjaPost', predavanja.recordset);
//     } catch (error) {
//       console.error('Error while fetching data:', error);
//       socket.emit('fetchingError', 'An error occurred while fetching data.');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
















// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const cors = require('cors');
// const port = process.env.REACT_APP_PORT || 8080;
// const nodemailer = require('nodemailer');
// const path = require('path');

// // Serve static files (build folder) for the React app
// app.use(express.static(path.join(__dirname, 'build')));

// // Catch-all route to serve index.html for client-side routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // Import database operations
// const { createPsiholog, createPredavanje, deletePredavanje, createPredbiljezba } = require('./src/dbFiles/dbOperation');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const allowedOrigins = ['http://localhost:8080']; // Add the URL of your React app

// app.use(cors({
//   origin: allowedOrigins,
// }));

// // Email sending function
// function sendEmail(userPsiholog) {
//   // Email sending logic here
// }

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('insertData', async (data) => {
//     try {
//       setTimeout(async () => {
//         await createPsiholog(data);
//         sendEmail(data);
//         io.emit('dataInserted', data);
//       }, 5000);
//     } catch (error) {
//       console.error('Error while inserting data:', error);
//       socket.emit('insertionError', 'An error occurred while inserting data.');
//     }
//   });

//   socket.on('createPredbiljezba', async (predbiljezbaData) => {
//     try {
//       const result = await createPredbiljezba(predbiljezbaData);
//       if (result) {
//         io.emit('predbiljezbaStatus', 'success');
//       } else {
//         io.emit('predbiljezbaStatus', 'error');
//       }
//     } catch (error) {
//       console.log('Error while creating predbiljezba:', error);
//       io.emit('predbiljezbaStatus', 'error');
//     }
//   });

//   socket.on('insertPredavanje', async (data) => {
//     try {
//       setTimeout(async () => {
//         await createPredavanje(data);
//         io.emit('predavanjeInserted', data);
//       }, 5000);
//     } catch (error) {
//       console.error('Error while inserting data:', error);
//       socket.emit('insertionError', 'An error occurred while inserting predavanje.');
//     }
//   });

//   socket.on('getPredavanja', async () => {
//     try {
//       const predavanja = await getPredavanja();
//       io.emit('getPredavanja', predavanja);
//     } catch (error) {
//       console.error('Error while fetching data:', error);
//       socket.emit('fetchingError', 'An error occurred while fetching data.');
//     }
//   });

//   socket.on('deletePredavanje', async (predavanjeID) => {
//     try {
//       await deletePredavanje(predavanjeID);
//       const updatedPredavanja = await getPredavanja();
//       io.emit('getPredavanja', updatedPredavanja);
//     } catch (error) {
//       console.log('Error while deleting or fetching data:', error);
//       socket.emit('fetchingError', 'An error occurred while deleting or fetching data.');
//     }
//   });

//   socket.on('getPredbiljezbe', async () => {
//     try {
//       const predbiljezbe = await getPredbiljezbe();
//       io.emit('getPredbiljezbe', predbiljezbe);
//     } catch (error) {
//       console.error('Error while fetching data:', error);
//       io.emit('fetchingError', 'An error occurred while fetching data.');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(port, () => {
//   console.log(`Listening on port: ${port}`);
// });

