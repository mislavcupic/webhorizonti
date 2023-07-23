//DRUGI TUTORIAL stali smo na 1:00 min tutorial2 part2 
import Psiholog from './src/dbFiles/Psiholog';
const express = require('express')
const app = express();
const sql = require('mssql');
const Psiholog = require('./src/dbFiles/Psiholog');


const config = {
    user: 'HorizontiSnage',
    server:'DESKTOP-KHJLLQS',
    database:'HorizontiSnage',
    password:'Bioskop7',
    options:{
        trustServerCertificate:true,
        trustedConnection:false,
        enableArithAbort:true,
        instancename:'SQLEXPRESS'
    }
    ,
     port: 49676
    }
    let Mislav = new Psiholog(1045,'Mislav','Čupić','mislav@gmail.com');
  
sql.connect(config,function(err){
    var req = new sql.Request();
    //OVO ŽELIM NAPRAVITI I POSPREMITI U BAZU
req.query(`INSERT INTO EventRegistration2 VALUES (${Mislav.Psiholog_ID}, '${Mislav.ime}','${Mislav.prezime}','${Mislav.email}') 
`,function(err,records){
    if(err)console.log(err);
    else console.log(records);
})}
 )
    // req.query("INSERT INTO EventRegistration2 (EventRegistration2.Psiholog_ID, EventRegistration2.ime, EventRegistration2.prezime, EventRegistration2.email) VALUES (1020,'Kreš','Pupuć','kpupuc@gmail.com')",function(err,records){
    //     if(err)console.log(err);
    //     else console.log(records);
    // })})

  //  let Hrvoje = new Psiholog(1005,'Hrvoje','Bekić','hrco@bekic.com');

//     req.query(`INSERT INTO EventRegistration2 VALUES 
//     (${Psiholog.Psiholog_ID}, 
//        '${Psiholog.ime}',
//        '${Psiholog.prezime}',
//        '${Psiholog.email}')`,function(err,records){
//         if(err)console.log(err);
//         else console.log(records);
//     })}
// )



//chat gpt
// req.query(`INSERT INTO EventRegistration2 (Psiholog_ID, \`ime\`, prezime, email) VALUES 
// (${Mislav.Psiholog_ID}, '${Mislav.ime}', '${Mislav.prezime}', '${Mislav.email}')`, function(err, records) {
//     if (err) console.log(err);
//     else console.log(records);
// })


// app.get('/',(req,res)=>{
//     const sqlInsert = "INSERT INTO EventRegistration2 (EventRegistration2.Psiholog_ID, EventRegistration2.ime, EventRegistration2.prezime, EventRegistration2.email) VALUES (1005,'Kreš','Pupuć,'kpupuc@gmail.com');";
//     db.query(sqlInsert, (err,result)=> {res.send("Hello");})});
   


app.listen(3011, () => {
    console.log("running on port 3011");
});










//prvi tutorial
//       dbOperation = require('./src/dbFiles/dbOperation');
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


// // app.listen(API_PORT,()=>console.log(`listening on port ${API_PORT}`));