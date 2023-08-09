const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');
const port = process.env.REACT_APP_PORT || 8080;
const nodemailer = require('nodemailer');


// Import database operations
const { createPsiholog, getPredavanja } = require('./src/dbFiles/dbOperation');


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
    } catch (error) {
      console.error('Error while inserting data:', error);
      socket.emit('insertionError', 'An error occurred while inserting data.');
    }
   
  });
  socket.on('getPredavanja', async () => {
    try {
      const predavanja = await getPredavanja();
      io.emit('getPredavanja', predavanja);
    } catch (error) {
      console.error('Error while fetching data:', error);
      socket.emit('fetchingError', 'An error occurred while fetching data.');
    }
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





