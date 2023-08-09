import React,{ useState,useEffect } from 'react'
import { MDBSelect } from 'mdb-react-ui-kit'
import {Table,Container,Row, Button} from 'react-bootstrap'
// import Predavanje from '../dbFiles/Predavanje'
// import { nanoid } from 'nanoid'
export default function LectureSelectionPredb() { //tu mogu gurnuti prop i samo napisati psiholog
   // let Predavanje_ID = nanoid(5);
    // const [predavanje,setPredavanje] = useState ({
    //     Predavanje_ID: Predavanje.Predavanje_ID,
    //     naziv: Predavanje.naziv,
    //     tip: Predavanje.tip,
    //     opis: Predavanje.opis,
    //     brojPolaznika: Predavanje.brojPolaznika,
    //     slobodnaMjesta: Predavanje.slobodnaMjesta,
    //     ukupnoMjesta: Predavanje.ukupnoMjesta,
    //     Psiholog_ID: Predavanje.Psiholog_ID
    //    })
  
//console.log(psiholog);
    const [lista,setLista] = useState([{}]);

      //  const handlePredavanje = () => {
      //  const newValues = [{Predavanje_ID: `${Predavanje_ID}`,naziv:'Razvojna psihologija i napredak',tip:'Radionica',opis:'Ova radionica produbit će neke teme vezane uz Piageta',brojPolaznika:20 , slobodnaMjesta:20,ukupnoMjesta: 20,Psiholog_ID:'_uDxrnt4Jw'}]
      // //  setPredavanje(newValues);
      //  }

      //CREATE PREDBILJEZBA POST

       const createPredbiljezba = async () => {
        if(predbiljezba.Psiholog_ID && predbiljezba.Predavanje_IDe){
          const newData = await fetch('/registrationfeesaccommodation/createpredbiljezba',{
            method:'POST',
            headers: {
              'Content-Type':'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({...predbiljezba})
      
          }).then((response) => {
            console.log(response);
          });
          console.log(newData);
        }
      }
  
        
      
  


  return (
    
     <>
         <Container fluid>
    


     
          <Form onSubmit={(e)=>submitValues(e)}>
           <Form.Group>
           <Form.Label htmlFor='ime'>Ime:</Form.Label>
           <Form.Control type="name"
                         placeholder="Unesi ime" id='ime' name="ime"  onChange={handleInputIme} />  {/** */}
         </Form.Group>
         {/* <div style={{color:'red'}}>{error.errorIme}</div> validacije errori*/}
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
         <Form.Control><FormGroup> <MDBSelect
      label='Example label'
      data={[
        { text: '', value: 1 },
        { text: 'Two', value: 2 },
        { text: 'Three', value: 3 },
        { text: 'Four', value: 4 },
        { text: 'Five', value: 5 },
        { text: 'Six', value: 6 },
        { text: 'Seven', value: 7 },
        { text: 'Eight', value: 8 },
      ]}
    /></FormGroup></Form.Control>
        
         <br/>
         <Button variant="primary" type="submit" onClick={createPredbiljezba}>
            Click here to submit form
         </Button>
         <br/>
         
         </Form>
       
        <Button onClick={createPredbiljezba}>Prijava na seminare</Button>
       </Container >
          
        </>
      );
    }
    
