import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client'; 
import { nanoid } from 'nanoid';


export default function CreatePredbiljezba() {
  let predbiljezbaID = nanoid(10);
 

  const [selectedPredavanjeID, setSelectedPredavanjeID] = useState('');
  const [predavanjaOptions, setPredavanjaOptions] = useState([]);
  //const [psihologID, setPsihologID] = useState('');
  const socket = io('http://localhost:8080');
 // const receivedData = JSON.parse(localStorage.getItem('myData'));
//   const psihologID = receivedData?.[0];
// const predavanjeID = receivedData?.[1]?.[0];

const receivedData = JSON.parse(localStorage.getItem('myData'));
const psihologIDArr = receivedData[0];
const predavanjeIDArr = receivedData[1]; // This is the array of selected Predavanje_ID values
const psihologID = psihologIDArr.toString();
const predavanjeID = predavanjeIDArr.toString();
  console.log(psihologID);
  console.log(predavanjeID);
  //zadnja promjena dodao sam ... na predavanjeID
  //gpt suggestion
  // ...
// const handleCreatePredbiljezba = (predbiljezbaID, psihologID, selectedPredavanjeIDs) => {
//   console.log("Creating predbiljezbe with:", predbiljezbaID, psihologID, selectedPredavanjeIDs);

//   for (const predavanjeID of selectedPredavanjeIDs) {
//     console.log("Creating predbiljezba for predavanjeID:", predavanjeID);
//     socket.emit('createPredbiljezba', predbiljezbaID, psihologID, predavanjeID);
//   }
// };

// // ...



  const handleCreatePredbiljezba = (predbiljezbaID, psihologID, predavanjeID ) => {
    console.log("Creating predbiljezba with:", predbiljezbaID, psihologID, predavanjeID);

    console.log(psihologID);
    console.log(predavanjeID);
    console.log(predbiljezbaID);
    socket.emit('createPredbiljezba', predbiljezbaID, psihologID,predavanjeID);
  };

  // const handleCreatePredbiljezba = (predbiljezbaID,recievedData[0],recievedData[1]) => {
  //   console.log(recievedData[0]);
  //   console.log(recievedData[1]);
  //   console.log(predbiljezbaID);
  //   socket.emit('createPredbiljezba', predbiljezbaID,recievedData[0],recievedData[1]);
  // };

  useEffect(() => {
    socket.emit('getPredavanja'); // Request predavanja options
    socket.on('predavanjaOptions', (options) => {
      setPredavanjaOptions(options);
    });
   
  // socket.on('Psiholog_ID', (receivedPsihologID) => {
  //   setPsihologID(receivedPsihologID);
  //   console.log(receivedPsihologID);
  // });

  // // Listen for 'predavanje_ID'
  // socket.on('predavanje_ID', (receivedPredavanjeID) => {
  //   setPredavanjeID(receivedPredavanjeID);
  //   console.log(receivedPredavanjeID);
  // });

  // Clean up event listeners
  // return () => {
  //   socket.off('Psiholog_ID');
  //   socket.off('predavanje_ID');
  // };
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
        <Button variant="primary" onClick={()=>handleCreatePredbiljezba(predbiljezbaID,psihologID,predavanjeID)}>Create Predbiljezba</Button> 
        {/*gpt sugg: // <Button variant="primary" onClick={() => handleCreatePredbiljezba(predbiljezbaID, psihologID, selectedPredavanjeIDs)}>
//   Create Predbiljezba
// </Button> */}
      </Form>
    </>
  );
}
