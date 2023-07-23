import React from 'react'
import {Container,Form,Button} from 'react-bootstrap'
import { useState } from 'react';
import Psiholog from '../dbFiles/Psiholog';


export default function EventRegistration() {
  let Psiholog_ID = 1000;
 const [psiholog,setPsiholog] = useState ({
  Psiholog_ID: ++Psiholog_ID,
  ime:Psiholog.ime,
  prezime:Psiholog.prezime,
  email:Psiholog.email
 })
// const handleInput = (e) => {
//  const {name,value} = e.target;
//  console.log(value);
//  if(name===Psiholog_ID){
//   setPsiholog(prevState=>({
//     ...prevState,[name]:parseInt(value)
//   }))
//   return;
//  }
//  setPsiholog(prevState=>({
//   ...prevState, [name]:value
// }))
// }
//USESTATE WITH OBJ
// const setFirstName = e => {
//   setName(existingValues => ({
//     // Retain the existing values
//     ...existingValues,
//     // update the firstName
//     firstName: e.target.value,
//   }))
// }

// const setLastName = e => {
//   setName(existingValues => ({
//     // Retain the existing values
//     ...existingValues,
//     // update the lastName
//     lastName: e.target.value,
//   }))
// }

// const psihologOverall =  setPsiholog({Psiholog_ID:Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email});
 

const handleInputIme = (e) => {
 psiholog.ime = e.target.value;
 setPsiholog({Psiholog_ID:Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email});
}

const handleInputPrezime = (e) => {
  psiholog.prezime = e.target.value;
  setPsiholog({Psiholog_ID:Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email});
 }
 const handleInputEmail = (e) => {
  psiholog.email = e.target.value;
  setPsiholog({Psiholog_ID:Psiholog_ID,ime:psiholog.ime,prezime:psiholog.prezime,email:psiholog.email});
 
  
 
  
  
}
console.log(psiholog);

 const submitValues = (e) => {
  e.preventDefault();
  console.log(psiholog);
  
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
    <div style={{ display: 'block', 
                  width: 700, 
                  padding: 30 }}>
    <Container fluid>
                    <h4>Obrazac za prijavu na konferenciju:</h4>
      <Form onSubmit={(e)=>submitValues(e)} >
      <Form.Group>
          <Form.Label htmlFor='ime'>Ime:</Form.Label>
          <Form.Control type="name" 
                        placeholder="Unesi ime" id='ime' name="ime"  onChange={handleInputIme} />  {/** */}
        </Form.Group>
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
        <Button variant="primary" type="submit">
           Click here to submit form
        </Button>
      </Form>
  </Container>
   /   <Psiholog psiholog = {psiholog} />
    </div>
   </>
  );
}


