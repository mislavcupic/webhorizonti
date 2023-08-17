
//ovo je verzija do 16.8.2023. u 15:17h, poslije tog sam radio još verzija
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client'; 
import { nanoid } from 'nanoid';


export default function CreatePredbiljezba() {
  const predbiljezbaID = nanoid(10);
 

  const [selectedPredavanjeID, setSelectedPredavanjeID] = useState([]); //umjesto navodnika '' za probu
  const [predavanjaOptions, setPredavanjaOptions] = useState([]);

  const socket = io('http://localhost:8080');
 

const receivedPsiholog = JSON.parse(localStorage.getItem('psihologID'));
const receivedPredavanja = JSON.parse(localStorage.getItem('myPredavanja'));
//const psihologIDArr = receivedData[0];
//const predavanjeIDArr = receivedData[1]; // This is the array of selected Predavanje_ID values
const psihologID = receivedPsiholog; //to je viška, ali sam već tako konstr kod pa da se ne zezam
const predavanjeID = receivedPredavanja;
  console.log(psihologID);
  console.log(predavanjeID);
  //zadnja promjena dodao sam ... na predavanjeID
  //gpt suggestion
  // ...
const handleCreatePredbiljezba = (predbiljezbaID, psihologID, predavanjeID) => {
  console.log("Creating predbiljezbe with:", predbiljezbaID, psihologID, predavanjeID);

  for (const predID of predavanjeID) {
    const predbiljezbaID = nanoid(10);
    console.log("Creating predbiljezba for predavanjeID:", predID);
    socket.emit('createPredbiljezba', predbiljezbaID, psihologID, predID);
  }
};

// // ...



  // const handleCreatePredbiljezba = (predbiljezbaID, psihologID,predavanjeID  ) => {
  //   console.log("Creating predbiljezba with:", predbiljezbaID, psihologID, predavanjeID);

  //   console.log(psihologID);
  //   console.log(predavanjeID);
  //   console.log(predbiljezbaID);
  //   //socket.emit('createPredbiljezba', predbiljezbaID, psihologID, predavanjeID);
    
  //   socket.emit('createPredbiljezba', predbiljezbaID, psihologID, predavanjeID);
  // };

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
//ovaj radi!!!!!!!!!!!! 16.8. s jednim id -om predavanje
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
        {/* <Button variant="primary" onClick={()=>handleCreatePredbiljezba(predbiljezbaID,psihologID,predavanjeID)}>Create Predbiljezba</Button> predavanjeID umj predavanjaOptions */}
       <Button variant="primary" onClick={() => handleCreatePredbiljezba(predbiljezbaID, psihologID, predavanjeID)}>
   Create Predbiljezba
</Button> 
      </Form>
    </>
  );
// (
//   <>
//     <p>Create Predbiljezba:</p>
//     <Form>
//       <Form.Group controlId="selectedPredavanjeID">
//         <Form.Label>Select Lecture(s)</Form.Label>
//         <Form.Control
//           as="select"
//           value={selectedPredavanjeIDs}
//           onChange={(e) => handleCheckboxChange(e.target.value)}
//           multiple // Allow multiple selections
//         >
//           {/* Render predavanja options as checkboxes */}
//           {predavanjaOptions.map((predavanje) => (
//             <option key={predavanje.Predavanje_ID} value={predavanje.Predavanje_ID}>
//               {predavanje.naziv}
//             </option>
//           ))}
//         </Form.Control>
//       </Form.Group>
//       <Button variant="primary" onClick={handleCreatePredbiljezba}>
//         Create Predbiljezba
//       </Button>
//     </Form>
//   </>
// );
}
