import React,{useState,useEffect} from 'react'
import {Table,Container,Row, Button} from 'react-bootstrap'
import { io } from 'socket.io-client';
// import Predavanje from '../dbFiles/Predavanje'
// import { nanoid } from 'nanoid'
export default function LectureSelectionPredb() { //tu mogu gurnuti prop i samo napisati psiholog

    const [lista,setLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = io('http://localhost:8080');
    const getPredbiljezbe = () => {
      socket.emit('getPredbiljezbe');
    };
  
    useEffect(() => {
      getPredbiljezbe();
  
      socket.on('getPredbiljezbe', (fetchingPredbiljezbe) => {
        setLista(fetchingPredbiljezbe);
        console.log(fetchingPredbiljezbe);
        setLoading(false);
       
      });
  
     
  
      socket.on('getPredbiljezbe', (errorMessage) => {
        console.error('Error fetching data:', errorMessage);
        setLoading(false);
      });
  
      return () => {
        socket.off('getPredbiljezbe');
        socket.off('fetchingError');
      };
    }, []);

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
  
        
      
  

      // //chat gpt
      // const getPredbiljezbe = async () => {
      //   try {
      //     const response = await fetch('/registrationfeesaccommodation/lectureselectionpredb');
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      
      //     const data = await response.json();
      //     setLista(data);
      //   } catch (error) {
      //     // Handle the error appropriately, for example, log it or show an error message
      //     console.error('Error fetching data:', error);
      //   }
      // };
      
    
  return (
    <>
    <p>Predbilježbe:</p>
    <Container>
      <Row>
        <Table striped bordered hover>
        
          <thead className="bg-primary" mt-10>
            <tr>
            
              
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
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              lista.map((pred) => (
                <tr className="bg-warning" key={pred.Predbiljezba_ID}>
                   <td>{pred.ime}</td>
                     <td>{pred.prezime}</td>
                    <td>{pred.email}</td>
                    <td>{pred.datetime}</td>
                   <td>{pred.naziv}</td>
                    <td>{pred.tip}</td>
                    <td>{pred.opis}</td>
                
                </tr>
              )))}
          </tbody>
        </Table>
        <Button onClick={getPredbiljezbe}>Prikaz predbiljezbi</Button>
        <br />
      </Row>
    </Container>
  </>
    
      );
    }
    
