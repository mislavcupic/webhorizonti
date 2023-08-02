import React,{useState,useEffect} from 'react'
import {Table,Container,Row, Button} from 'react-bootstrap'
import Predavanje from '../dbFiles/Predavanje'
import { nanoid } from 'nanoid'
export default function LectureSelection() { //tu mogu gurnuti prop i samo napisati psiholog
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
     //ovo je moja metoda fetch
      // const getPredavanja = async () => {
      //   const data = await fetch('/registrationfeesaccommodation/lectureselection',{
      //     method:'GET',
      //     headers: {
      //         'Content-Type':'application/json',
      //         'Accept': 'application/json'
      //             }
      //   }).then((response)=>
      //     setLista(response)
        
        
      // );
      // console.log(data);
      const getPredavanja = async () => {
        const response = await fetch(
          '/registrationfeesaccommodation/lectureselection'
        ).then((response) => response.json());
    
        setLista(response);
      };
    
      // useEffect(() => {
      //   getPredavanja();
      // }, []);
  return (
    
     <>
        <p>Dostupna predavanja:</p>
        <Container><Row> <Table striped bordered hover>
          <thead className="bg-primary" mt-10>
            <tr>
              {/* <th>ID</th> */}
              <th>Odabir: </th>
              <th>Naziv: </th>
              <th>Tip: </th>
              <th>Opis: </th>
              <th>Broj polaznika: </th>
              <th>Slobodna mjesta: </th>
              <th>Ukupno mjesta: </th>
              {/* <th>Psiholog_ID: </th> */}
            </tr>
          </thead>
          <tbody>
          {lista&&lista.map((pred) => (
                  <tr className="bg-warning" key={pred.Predavanje_ID}>
                    {/* {<th >{pred.Predavanje_ID}</th>} */}
                    {<td><input type='checkbox'></input></td>}
                   { <td>{pred.naziv}</td>}
                    {<td>{pred.tip}</td>}
                   { <td>{pred.opis}</td>}
                    {<td>{pred.brojPolaznika}</td>}
                    {<td>{pred.slobodnaMjesta}</td>}
                    {<td>{pred.ukupnoMjesta}</td>}
                    {/* {<td>{pred.Psiholog_ID}</td>} */}
                  </tr>
                ))}
          </tbody>
          
          </Table><Button onClick={getPredavanja}>Prikaz predavanja</Button></Row></Container>
       
          
        </>
      );
    }
    
