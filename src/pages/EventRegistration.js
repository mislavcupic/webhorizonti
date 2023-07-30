import React from 'react'
import {Container,Row,Form,Button} from 'react-bootstrap'
import { useState } from 'react';
import Psiholog from '../dbFiles/Psiholog';
// import { v4 as uuid } from 'uuid';
import { nanoid } from 'nanoid'
import { Modal } from 'react-bootstrap';
import './EventCss.css';


export default function EventRegistration() {
let Psiholog_ID = nanoid(10);



  //Math.floor(Math.random(0,10000)*10000);
  //imam problem jer mi baza i dalje prima brojeve, a promijenio sam u bazi da je id varchar
  //ne prima stringove???
  //moram skužiti kako validacije napraviti






 const [psiholog,setPsiholog] = useState ({
  Psiholog_ID: (Psiholog.Psiholog_ID = Psiholog_ID),
  ime: Psiholog.ime,
  prezime: Psiholog.prezime,
  email: Psiholog.email,
  date: Psiholog.date

 })




// bootstrap modal code
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//errorhandling
const [error,setError] = useState({
  errorIme: "",
  errorPrezime:"",
  errorEmail:""
});




const handleInputIme = (e) => {
 psiholog.ime = e.target.value;
 setPsiholog({Psiholog_ID:psiholog.Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email,datetime:psiholog.date});

 }


const handleInputPrezime = (e) => {
  psiholog.prezime = e.target.value;
  setPsiholog({Psiholog_ID:psiho.Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email,datetime:psiholog.date});
 }
 const handleInputEmail = (e) => {
  psiholog.email = e.target.value;
  setPsiholog({Psiholog_ID:psiholog.Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email,datetime:psiholog.date});

}
const psiho = new Psiholog(psiholog.Psiholog_ID,psiholog.ime,psiholog.prezime,psiholog.email,psiholog.date)

/*const fetchData = async () => {
  //console.log(psiho); //ovo radi kad ubijem createPsiholog()
  const newData = await fetch('/registrationfeesaccommodation/eventregistration', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({name: psiho.email})
  }).then(res => res.json())
  console.log(newData);
  setReturnedData(newData[1]);
  sendEmail();

 } NE TREBA ZA SADA*/



console.log('Psiho:')
console.log(psiho);

//module.exports = psiho;

 const submitValues = (e) => {
  e.preventDefault();

  //clearanje submit forme
  const firstNameInput = document.getElementById('ime');
  firstNameInput.value='';
  const lastNameInput = document.getElementById('prezime');
  lastNameInput.value='';
  const emailInput = document.getElementById('email');
  emailInput.value='';

  if(firstNameInput.length <2){
    setError({errorIme: 'Unesite ime!'});
  }
  //ovo mi ne treba
  // setPsiholog({
  //   ime: "",
  //   prezime:"",
  //   email:"",

  // })



  }

//OVO ĆE TI TREBATI, SAMO PRIVREMENO KOMENTIRAM RADI PROVJERE
const createPsiholog = async () => {
  if(psiho.Psiholog_ID && psiho.ime && psiho.prezime && psiho.email&&psiho.date){
    const newData = await fetch('/registrationfeesaccommodation/eventregistration',{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({...psiho})

    }).then((response) => {
      console.log(response);
    });
    console.log(newData);
  }else{
    return alert('Ispuni sva polja da bi nastavio proces prijave');
  }
}

// const [errors,setErrors] =useState ({});
// function handleInput(e) {
//   const newObj = {...values,[e.target.ime]:event.target.value}
//   setValues(newObj);
// }

// function handleValidation (e){
//   e.preventDefault();
//   setErrors(Validation(values));
// }
  return (

    <>
    <Container fluid>
      <Row>
        <Button variant="outline-secondary" size="md" onClick={handleShow}>
        Prijava na 'Horizonti snage'
      </Button>
      </Row>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prijava na konferenciju Horizonti snage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>submitValues(e)}>
           <Form.Group>
           <Form.Label htmlFor='ime'>Ime:</Form.Label>
           <Form.Control type="name"
                         placeholder="Unesi ime" id='ime' name="ime"  onChange={handleInputIme} />  {/** */}
         </Form.Group>
         <div style={{color:'red'}}>{error.errorIme}</div>
         <Form.Group>
           <Form.Label htmlFor='prezime'>Prezime:</Form.Label>
           <Form.Control type="prezime"
                         placeholder="Unesi prezime"  name="prezime" id='prezime' onChange={handleInputPrezime}/>
         </Form.Group>
         <Form.Group>
           <Form.Label htmlFor='email'>Unesite e - mail adresu:</Form.Label>
           <Form.Control type="email" name="email"
                         placeholder="Unesite svoju e - mail adresu" id='email'onChange={handleInputEmail} />
         </Form.Group>


         <br/>
         <Button variant="outline-primary" type="submit" onClick={createPsiholog}>
            Click here to submit form
         </Button>
         <br/>
         <br/>
         <Button variant="outline-primary" type="submit">
            Click here to return data
         </Button>


         </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>

      </Modal>
     
      </Container>
     {/* <Container className='container-sm'>
                     <h4>Obrazac za prijavu na konferenciju:</h4>

   </Container> */}

     </>


  );
}


