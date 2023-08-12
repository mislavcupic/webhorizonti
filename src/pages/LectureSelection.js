import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';


export default function LectureSelection() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = io('http://localhost:8080');

  const handleDeleteButton = (predavanjeID) => {
    // Emit an event to the server to delete the specified Predavanje
    
    socket.emit('deletePredavanje', predavanjeID);
  };



  const getPredavanja = () => {
    socket.emit('getPredavanja');
  };

  
  // useEffect(() => {
  //   getPredavanja();
  //  //gptsuggestion
  //  socket.on('deletePredavanje', (updatedPredavanja) => {
    
  //   setLista(updatedPredavanja);
  //   setLoading(false);
  // });
  

  //   // socket.on('deletePredavanje', (deletePredavanje) => {
  //   //   setLista(deletePredavanje);
  //   //   console.log(deletePredavanje);
  //   //   setLoading(false);
     
  //   // });
  //   socket.on('getPredavanja', (fetchingPredavanja) => {
  //     setLista(fetchingPredavanja);
  //     console.log(fetchingPredavanja);
  //     setLoading(false);
     
  //   });

   

  //   socket.on('getPredavanja', (errorMessage) => {
  //     console.error('Error fetching data:', errorMessage);
  //     setLoading(false);
  //   });

  //   return () => {
  //     socket.off('getPredavanja');
  //     socket.off('deletePredavanje');
  //     socket.off('fetchingError');
  //   };
  // }, []);
 //gptsugg
 useEffect(() => {
  socket.on('deletePredavanje', (updatedPredavanja) => {
    setLista(updatedPredavanja);
    setLoading(false);
  });

  socket.on('getPredavanja', (fetchingPredavanja) => {
    setLista(fetchingPredavanja);
    setLoading(false);
  });

  socket.on('fetchingError', (errorMessage) => {
    console.error('Error fetching data:', errorMessage);
    setLoading(false);
  });

  return () => {
    socket.off('getPredavanja');
    socket.off('deletePredavanje');
    socket.off('fetchingError');
  };
}, []);
  return (
    <>
      <p>Dostupna predavanja:</p>
      <Container>
        <Row>
          <Table striped bordered hover>
            <thead className="bg-primary" mt-10>
            <tr>
            
              
            <th>Naziv: </th>
            <th>Tip: </th>
            <th>Opis: </th>
            <th>Broj polaznika: </th>
            <th>Slobodna mjesta: </th>
            <th>Ukupno mjesta: </th>
            <th>Brisanje predavanja: </th>
        
            
          
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
                  <tr className="bg-warning" key={pred.Predavanje_ID}>
                    <td>{pred.naziv}</td>
                    <td>{pred.tip}</td>
                    <td>{pred.opis}</td>
                    <td>{pred.brojPolaznika}</td>
                    <td>{pred.slobodnaMjesta}</td>
                    <td>{pred.ukupnoMjesta}</td>
                    <td><Button variant="danger" type="delete" onClick={() => handleDeleteButton(pred.Predavanje_ID)}>Obriši</Button></td>
                  </tr>
                )))}
            </tbody>
          </Table>
          <Button onClick={getPredavanja}>Prikaz predavanja</Button>
          <br />
        </Row>
      </Container>
    </>
  );
}

