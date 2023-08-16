import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import CreatePredbiljezba from './CreatePredbiljezba';
import { useNavigate } from 'react-router-dom';

export default function LectureSelection() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const socket = io('http://localhost:8080');
  const navigate = useNavigate();
  //const receivedPsiholog_ID = localStorage.getItem('psihologID');
  const receivedPsihologID = JSON.parse(localStorage.getItem('psihologID'));
  console.log(receivedPsihologID);
 // const dataToSend = [receivedPsihologID,selectedLectures];


  const handleDeleteButton = (predavanjeID) => {
    socket.emit('deletePredavanje', predavanjeID);
  };

  const handleCheckboxChange = (predavanjeID) => {
    if (selectedLectures.includes(predavanjeID)) {
      setSelectedLectures(selectedLectures.filter(id => id !== predavanjeID));
    } else {
      setSelectedLectures([...selectedLectures, predavanjeID]);
   
      
    }
  };
 
  
  const handleSendSelectedPredavanje = () => {
    const dataToSend = [receivedPsihologID, selectedLectures];
    console.log(dataToSend); // Add this line
    localStorage.setItem('myData', JSON.stringify(dataToSend));
    navigate('../createpredbiljezba');
  };
  
  const handleSubmitSelection = () => {
        // Emit selected lecture IDs to the server
        socket.emit('selectedLectures', selectedLectures);
        console.log(selectedLectures);
        
      };
    
  useEffect(() => {
    socket.on('getPredavanja', (fetchingPredavanja) => {
      setLista(fetchingPredavanja);
      setLoading(false);
    });

    socket.on('fetchingError', (errorMessage) => {
      console.error('Error fetching data:', errorMessage);
      setLoading(false);
    });

    // Fetch initial list of Predavanja
    socket.emit('getPredavanja');

    return () => {
      socket.off('getPredavanja');
      socket.off('fetchingError');
    };
  }, []);

  return (
    <>
      <p>Dostupna predavanja:</p>
      <Container>
        <Row>
          <Table striped bordered hover>
            <thead className="bg-primary">
              <tr>
                <th>Odabir</th>
                <th>Naziv</th>
                <th>Tip</th>
                <th>Opis</th>
                <th>Broj polaznika</th>
                <th>Slobodna mjesta</th>
                <th>Ukupno mjesta</th>
                <th>Brisanje predavanja: </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Loading...</td>
                </tr>
              ) : lista && lista.length > 0 ? (
                lista.map((pred) => (
                  <tr className="bg-warning" key={pred.Predavanje_ID}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedLectures.includes(pred.Predavanje_ID)}
                        onChange={() => handleCheckboxChange(pred.Predavanje_ID)}
                      />
                    </td>
                    <td>{pred.naziv}</td>
                    <td>{pred.tip}</td>
                    <td>{pred.opis}</td>
                    <td>{pred.brojPolaznika}</td>
                    <td>{pred.slobodnaMjesta}</td>
                    <td>{pred.ukupnoMjesta}</td>
                    <td>
                      <Button
                        variant="danger"
                        type="delete"
                        onClick={() => handleDeleteButton(pred.Predavanje_ID)}
                      >
                        Obriši
                      </Button>
                    </td>
                  </tr>
      
                ))
              ) : (
                <tr>
                  <td colSpan="8">No data available</td>
                </tr>
              )}
            </tbody>
            
          </Table>
          <Button onClick={() => handleSendSelectedPredavanje()}  variant='success'>Posalji odabrana predavanja</Button>
          <br/><br/>
          <Button onClick={handleSubmitSelection}>Odabir predavanja</Button>
         
        </Row>
      </Container>
    </>
  );
}
