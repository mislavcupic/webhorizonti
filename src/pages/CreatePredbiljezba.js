import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client'; 
import { nanoid } from 'nanoid';

export default function CreatePredbiljezba() {
  let predbiljezbaID = nanoid(10);
  

  const [selectedPredavanjeID, setSelectedPredavanjeID] = useState('');
  const [predavanjaOptions, setPredavanjaOptions] = useState([]);
  const [predavanjeID,setPredavanjeID] = useState([]);
  const [psihologID, setPsihologID] = useState('');
  const socket = io('http://localhost:8080');

  


  const handleCreatePredbiljezba = (predbiljezbaID,psihologID,predavanjeID) => {
    console.log(predbiljezbaID);
    socket.emit('createPredbiljezba', predbiljezbaID,psihologID,predavanjeID);
  };

  useEffect(() => {
    socket.emit('getPredavanja'); // Request predavanja options
    socket.on('predavanjaOptions', (options) => {
      setPredavanjaOptions(options);
    });
   
  socket.on('Psiholog_ID', (receivedPsihologID) => {
    setPsihologID(receivedPsihologID);
    console.log(receivedPsihologID);
  });

  // Listen for 'predavanje_ID'
  socket.on('predavanje_ID', (receivedPredavanjeID) => {
    setPredavanjeID(receivedPredavanjeID);
    console.log(receivedPredavanjeID);
  });

  // Clean up event listeners
  return () => {
    socket.off('Psiholog_ID');
    socket.off('predavanje_ID');
  };
    return () => {
      socket.off('predavanjaOptions');
    };
  }, []);

  return (
    <>
      <p>Create Predbiljezba:</p>
      <Form>
        <Form.Group controlId="selectedPredavanjeID">
          <Form.Label>Select Lecture</Form.Label>
          <Form.Control
            as="select"
            value={selectedPredavanjeID}
            onChange={(e) => setSelectedPredavanjeID(e.target.value)}
          >
            <option value="">Select a lecture...</option>
            {predavanjaOptions.map((predavanje) => (
              <option key={predavanje.Predavanje_ID} value={predavanje.Predavanje_ID}>
                {predavanje.naziv}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={()=>handleCreatePredbiljezba(predbiljezbaID,psihologID,predavanjaOptions)}>Create Predbiljezba</Button> 
      </Form>
    </>
  );
}
