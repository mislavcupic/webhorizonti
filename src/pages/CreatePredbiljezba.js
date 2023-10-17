//novi - 20.8. onaj sa updateom
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function CreatePredbiljezba() {
  const [lista, setLista] = useState([]);
  const predbiljezbaID = nanoid(10);
  const applicationDate = new Date().toLocaleString();

  const [selectedPredavanjeID, setSelectedPredavanjeID] = useState([]);
  const [predavanjaOptions, setPredavanjaOptions] = useState([]);

  const socket = io('http://localhost:8080');
  const navigate = useNavigate();

  const receivedPsiholog = JSON.parse(sessionStorage.getItem('psihologID'));
  const receivedPredavanja = JSON.parse(sessionStorage.getItem('myPredavanja'));
  const token = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')): null;
  const psihologID = token;
  const predavanjeID = receivedPredavanja;

  useEffect(() => {
    socket.emit('getPredavanja');
    socket.on('predavanjaOptions', (options) => {
      setPredavanjaOptions(options);
    });

    socket.on('getPredavanja', (fetchingPredavanja) => {
      setLista(fetchingPredavanja);
    });

    return () => {
      socket.off('predavanjaOptions');
      socket.off('getPredavanja');
    };
  }, []);

  const handleCreatePredbiljezba = async () => {
    console.log("handleCreatePredbiljezba called"); // Add this line
    try {
      let anyConditionsMet = false; // Flag to track if any conditions are met
      const updatedPredavanjeDataArray = [];

      for (const predID of predavanjeID) {
        const predbiljezbaID = nanoid(10);
        console.log("Creating predbiljezba for predavanjeID:", predID);
        const applicationDate = new Date().toLocaleString();
        socket.emit('createPredbiljezba', predbiljezbaID, psihologID, applicationDate, predID);

        const predavanjeData = lista.find(pred => pred.Predavanje_ID === predID);

        if (predavanjeData) {
          const updatedSlobodnaMjesta = Math.max(0, predavanjeData.slobodnaMjesta - 1);
          const updatedBrojPolaznika = Math.min(predavanjeData.ukupnoMjesta, predavanjeData.brojPolaznika + 1);
          const updatedPredavanjeData = {
            Predavanje_ID: predID,
            slobodnaMjesta: updatedSlobodnaMjesta,
            brojPolaznika: updatedBrojPolaznika,
          };
          updatedPredavanjeDataArray.push(updatedPredavanjeData);
        }
      }

      updatedPredavanjeDataArray.forEach(updatedPredavanjeData => {
        socket.emit('updatePredavanje', updatedPredavanjeData, (response) => {
          if (response.success) {
            console.log('Predavanje data updated successfully.');
          } else {
            console.error('Failed to update Predavanje data:', response.message);
          }
        });
      });

      if (anyConditionsMet) {
        navigate('../lectureselection');
      }
    } catch (error) {
      console.error('Error while creating predbiljezba:', error);
    }
  };

  return (
    <>
      <p>Potvrda predbilježbi</p>
      <Form>
        <Form.Group controlId="selectedPredavanjeID">
          <Form.Label>Odabrali ste predavanja: </Form.Label>
          {/* <Form.Control
            as="select"
            value={selectedPredavanjeID}
            onChange={(e) => setSelectedPredavanjeID(Array.from(e.target.selectedOptions, option => option.value.toString()))}
            multiple
          >
            {predavanjaOptions.map((predavanje) => (
              <option key={predavanje.Predavanje_ID} value={predavanje.Predavanje_ID}>
                {predavanje.naziv}
              </option>
            ))}
          </Form.Control> */}
         <Form.Control
  as="select"
  value={predavanjeID}
  onChange={(e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value.toString());
    setSelectedPredavanjeID(selectedValues);
  }}
  multiple
>
  {predavanjaOptions.map((predavanje) => (
    <option key={predavanje.Predavanje_ID} value={predavanje.Predavanje_ID.toString()}>
      {predavanje.naziv}
    </option>
  ))}
</Form.Control>


        </Form.Group>
        <Button variant="primary" onClick={handleCreatePredbiljezba}>Create Predbiljezba</Button>
      </Form>
    </>
  );
}
