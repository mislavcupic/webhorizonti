//DRUGI TUTORIAL stali smo na 1:00 min tutorial2 part2
//import Psiholog from './src/dbFiles/Psiholog';

const express = require('express')
const app = express();
const dbOperation = require('./src/dbFiles/dbOperation');
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = process.env.REACT_APP_PORT;




app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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
//ISKLJUČIVO NAPRAVLJENI RADI SLANJA MAILOVA,SAD ĆU IH PREBACITI SVE U ISTI ONAJ GET I POST app.req
    // app.get("/registrationfeesaccommodation/eventregistration",(req,res) => {
    //     sendEmail().then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
    //  });

    //  app.post("/registrationfeesaccommodation/eventregistration/send_mail",(req,res) => {
    //     sendEmail(req.body).then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
    //  });




 app.get('/registrationfeesaccommodation/eventregistration', async (req,res) =>{
       await dbOperation.createPsiholog();
     const result = await dbOperation.getPsiholozi();
    //    sendEmail().then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
    return;

 });

//moja createPsiholog metoda
// app.post('/registrationfeesaccommodation/eventregistration', async (req, res) =>{
//     await dbOperation.createPsiholog(req.body);
//     const result = await dbOperation.getPsiholozi(req.body.name);
//     console.log(req.body);
//     if(result!=null){
//         res.send(result.recordset);
//         sendEmail(req.body).then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
//     }
// }
// );

//predložena u tutorijalu da bi se izbjegao ERR_HTTP_HEADERS_SENT
// app.post('/registrationfeesaccommodation/eventregistration', async (req, res) => {
//     await dbOperation.createPsiholog(req.body);
    
//     if (!req.body) {
//       return res.status(400).json({
//         status: 'error',
//         error: 'req body cannot be empty',
//       });
//     }
  
//     res.status(200).json({
//       status: 'succes',
//       data: req.body,
//     })
//     const result = dbOperation.getPsiholozi(req.body.name);
//     console.log(req.body);
//     if(result!=null){
//         res.send(result.recordset);
//         sendEmail(req.body).then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message)); //result umj req.body ovdje
//     }
//   });
//predložena gpt-chat
app.post('/registrationfeesaccommodation/eventregistration', async (req, res) => {
  try {
     await dbOperation.createPsiholog(req.body);
     
     const result = await dbOperation.getPsiholozi(req.body.name);
     console.log(req.body);
     
     if (result != null) {
        await sendEmail(req.body);
     }
     
     return res.status(200).json({
        status: 'success',
        data: req.body
     });
  } catch (error) {
     console.log(error);
     return res.status(400).json({
        status: 'error',
        error: error.message
     });
  }
});
 

//PREDAVANJA GET I POST - moj način
// app.get('/registrationfeesaccommodation/lectureselection', async (req,res) =>{
//     await dbOperation.getPredavanja();
//   const result = await dbOperation.getPredavanja();
//   console.log(req);
//   console.log(result.recordset);
//   res.send(result.recordset);
//  //    sendEmail().then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
//  return;

// });

//CHAT GPT ANSWER FOR GET LECTURESELECTION MENU
// Assuming you have required dependencies and initialized the app and dbOperation.

// Improved version of the endpoint handler
app.get('/registrationfeesaccommodation/lectureselection', async (req, res) => {
  try {
    // Fetch the data from the database using dbOperation.getPredavanja()
    const result = await dbOperation.getPredavanja();
    console.log(result.recordset);

    // Send the fetched data as the response
    res.send(result.recordset);
  } catch (error) {
    // If there's an error, handle it gracefully
    console.error('Error while fetching data:', error);
    res.status(500).send('An error occurred while fetching data.');
  }
});

// Additional improvement: If you want to send an email (as it seems commented out in the original code),
// you can use a separate endpoint for that purpose, and you can refactor the code as follows:

// app.post('/sendEmail', async (req, res) => {
//   try {
//     // sendEmail() is assumed to be a function that sends the email
//     const response = await sendEmail();
//     res.send(response.message);
//   } catch (error) {
//     console.error('Error while sending email:', error);
//     res.status(500).send('An error occurred while sending the email.');
//   }
// });

app.post('/registrationfeesaccommodation/lectureselection', async (req,res) =>{
    await dbOperation.getPredavanja();
  const result = dbOperation.getPredavanja();
  console.log(req);
  console.log(result.recordset);
  res.send(result.recordset);
 //    sendEmail().then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
 return;

});

// npm run dev --host localhost:8080

//  O  V  O     N  E  K  A  D     T   R   E  B  A  Š      O   D   K   O  M   E N   T  I  R  A   T  I

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});











//prvi tutorial
//dbOperation = require('./src/dbFiles/dbOperation');
// const Psiholog = require('./src/dbFiles/Psiholog');


//       cors = require('cors');
//  //cors = require('cors');
// const API_PORT = process.env.port || 5000;
// const app = express();

// //defining some variables for mongoDB
// let client;
// let session;
// app.use(express.urlencoded());
// app.use(express.json());
// app.use(cors());

// app.post('/api',function(req,res){
//     console.log('called');
//     res.send({result:'go away'});
// });

// app.post('/hello',function(req,res){
//     console.log('called');
//     res.send({result:'OMG HI'});
// });

// //create metoda

// // let Ines = new Psiholog(1008,'Ines','Bosak Čupić','ines.b@gmail.com');
//   let Darko = new Psiholog(1009,'Darko',' Cupichi','darko009@gmail.com');
//  dbOperation.createPsiholog(Darko);
//  //dbOperation.createPsiholog(Ines);
// //get metoda sql

// //privremeno komentamo ovo ispod
// // dbOperation.getPsiholozi().then(res=> {
// //     console.log(res);
// // })


// app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`));