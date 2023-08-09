import React,{useState,useEffect} from 'react'
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

      //  const createPsiholog = async () => {
      //   if(psiho.Psiholog_ID && psiho.ime && psiho.prezime && psiho.email&&psiho.date){
      //     const newData = await fetch('/registrationfeesaccommodation/eventregistration',{
      //       method:'POST',
      //       headers: {
      //         'Content-Type':'application/json',
      //         'Accept': 'application/json'
      //       },
      //       body: JSON.stringify({...psiho})
      
      //     }).then((response) => {
      //       console.log(response);
      //     });
      //     console.log(newData);
      //   }
      // }
  
        
      
  

      //chat gpt
      const getPredbiljezbe = async () => {
        try {
          const response = await fetch('/registrationfeesaccommodation/lectureselectionpredb');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          setLista(data);
        } catch (error) {
          // Handle the error appropriately, for example, log it or show an error message
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        getPredbiljezbe();
      }, []);
  return (
    
     <>
        <p>Dostupna predavanja:</p>
        <Container><Row> <Table striped bordered hover>
          <thead className="bg-primary" mt-10>
            <tr>
              {/* <th>ID</th> */}
              <th>Odabir: </th>
              <th>Ime: </th>
              <th>Prezime: </th>
              <th>Email: </th>
              <th>Datum: </th>
              <th>Naziv: </th>
              <th>Tip: </th>
              <th>Opis: </th>
              
            
              {/* <th>Psiholog_ID: </th> */}
            </tr>
          </thead>
          <tbody>
          {lista&&lista.map((pred) => (
                  <tr className="bg-warning" key={pred.Predavanje_ID}>
                    {/* {<th >{pred.Predavanje_ID}</th>} */}
                    {<td><input type='checkbox'></input></td>}
                    { <td>{pred.ime}</td>}
                    { <td>{pred.prezime}</td>}
                   { <td>{pred.email}</td>}
                   { <td>{pred.datetime}</td>}
                   {<td>{pred.naziv}</td>}
                    {<td>{pred.tip}</td>}
                   { <td>{pred.opis}</td>}
             
                 
                    {/* {<td>{pred.Psiholog_ID}</td>} */}
                  </tr>
                ))}
          </tbody>
          
          </Table><Button onClick={getPredbiljezbe}>Prikaz predavanja</Button><br/></Row></Container>
       
          
        </>
      );
    }
    
