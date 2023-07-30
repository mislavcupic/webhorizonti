//DRUGI TUTORIAL stali smo na 1:00 min tutorial2 part2
//import Psiholog from './src/dbFiles/Psiholog';

const express = require('express')
const app = express();
const dbOperation = require('./src/dbFiles/dbOperation');
const cors = require('cors');
const nodemailer = require('nodemailer');
const port = 7000;




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
                pass:'kgaoznzuauyusjvs',

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


app.post('/registrationfeesaccommodation/eventregistration', async (req, res) =>{
    await dbOperation.createPsiholog(req.body);
    const result = await dbOperation.getPsiholozi(req.body.name);

    console.log(req.body);


    if(result!=null){
        res.send(result.recordset);
        sendEmail(req.body).then((response)=> req.send(response.message)).catch((err)=> res.status(500).send(err.message));
    }
});

// npm run dev --host localhost:8080

//ovo nekad moraš odkomat
// app.listen(port, () => {
//     console.log(`listening on port: ${port}`);
// });











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