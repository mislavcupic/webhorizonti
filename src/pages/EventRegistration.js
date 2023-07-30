import React from 'react'
import {Container,Form,Button} from 'react-bootstrap'
import { useState } from 'react';
import Psiholog from '../dbFiles/Psiholog';
// import { v4 as uuid } from 'uuid';
import { nanoid } from 'nanoid'
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

export default function EventRegistration() {
let Psiholog_ID = nanoid(10); 

  
  
  //Math.floor(Math.random(0,10000)*10000);
  //imam problem jer mi baza i dalje prima brojeve, a promijenio sam u bazi da je id varchar
  //ne prima stringove???
  //moram skužiti kako validacije napraviti
  
 
  const [showModal, setShowModal] = useState(false);
 


 const [psiholog,setPsiholog] = useState ({
  Psiholog_ID: (Psiholog.Psiholog_ID = Psiholog_ID),
  ime: Psiholog.ime,
  prezime: Psiholog.prezime, 
  email: Psiholog.email,
  date: Psiholog.date
  
 })

 


// const [returnedData,setReturnedData] = useState([]);


 

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
     <div>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => setShowModal(true)}
        >
          Launch demo modal
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Modal title
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <Form onSubmit={(e)=>submitValues(e)}>
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
         <Button variant="outline-primary" type="submit" onClick={createPsiholog}>
            Click here to submit form
         </Button>
         <br/>
         <br/>
         <Button variant="outline-primary" type="submit">
            Click here to return data
         </Button>
 
         
       </Form>
            <TEModalBody>Modal body text goes here.</TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Save changes
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
    ************************************************************************ */
     <Container className='container-sm'>
                     <h4>Obrazac za prijavu na konferenciju:</h4>
      
   </Container>
   
     </>

      
  );
}


