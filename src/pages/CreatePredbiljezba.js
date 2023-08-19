
// //ovo je verzija do 16.8.2023. u 15:17h, poslije tog sam radio još verzija
// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { io } from 'socket.io-client'; 
// import { nanoid } from 'nanoid';


// export default function CreatePredbiljezba() {
//   const predbiljezbaID = nanoid(10);
//   const applicationDate = new Date().toLocaleString();

//   const [selectedPredavanjeID, setSelectedPredavanjeID] = useState([]); //umjesto navodnika '' za probu
//   const [predavanjaOptions, setPredavanjaOptions] = useState([]);

//   const socket = io('http://localhost:8080');
 

// const token = JSON.parse(localStorage.getItem('token'));
// const receivedPsiholog = JSON.parse(localStorage.getItem('psihologID'));
// const receivedPredavanja = JSON.parse(localStorage.getItem('myPredavanja'));

// const psihologID = token; //to je viška, ali sam već tako konstr kod pa da se ne zezam
// const predavanjeID = receivedPredavanja;
//   console.log(psihologID);
//   console.log(predavanjeID);
//   //zadnja promjena dodao sam ... na predavanjeID
  
// const handleCreatePredbiljezba = (predbiljezbaID, psihologID,applicationDate,predavanjeID) => {
//   console.log("Creating predbiljezbe with:", predbiljezbaID, psihologID,applicationDate, predavanjeID);

//   for (const predID of predavanjeID) {
//     const predbiljezbaID = nanoid(10);
//     console.log("Creating predbiljezba for predavanjeID:", predID);
//     const applicationDate = new Date().toLocaleString();
//     socket.emit('createPredbiljezba', predbiljezbaID, psihologID,applicationDate, predID );
//   }
// };

// // // ...




 

//   useEffect(() => {
//     socket.emit('getPredavanja'); // Request predavanja options
//     socket.on('predavanjaOptions', (options) => {
//       setPredavanjaOptions(options);
//     });
   


//   // Clean up event listeners
//   // return () => {
//   //   socket.off('Psiholog_ID');
//   //   socket.off('predavanje_ID');
//   // };
//     return () => {
//       socket.off('predavanjaOptions');
//     };
//   }, []);
// //ovaj radi!!!!!!!!!!!! 16.8. s jednim id -om predavanje
//   return (
//     <>
//       <p>Create Predbiljezba:</p>
//       <Form>
//         <Form.Group controlId="selectedPredavanjeID">
//           <Form.Label>Odabrana predavanja: </Form.Label>
//           <Form.Control
//             as="select"
//             value={selectedPredavanjeID}
//             onChange={(e) => setSelectedPredavanjeID(e.target.value)}
//           >
//             <option value="">Select a lecture...</option>
//             {predavanjaOptions.map((predavanje) => (
//               <option key={predavanje.Predavanje_ID} value={predavanje.Predavanje_ID}>
//                 {predavanje.naziv}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//         {/* <Button variant="primary" onClick={()=>handleCreatePredbiljezba(predbiljezbaID,psihologID,predavanjeID)}>Create Predbiljezba</Button> predavanjeID umj predavanjaOptions */}
//        <Button variant="primary" onClick={() => handleCreatePredbiljezba(predbiljezbaID, psihologID,applicationDate, predavanjeID)}>
//    Create Predbiljezba
// </Button> 
//       </Form>
//     </>
//   );

// }
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client'; 
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function CreatePredbiljezba() {
    const predbiljezbaID = nanoid(10);
  const applicationDate = new Date().toLocaleString();
  const [selectedPredavanjeID, setSelectedPredavanjeID] = useState([]); // Change this to an array
  const [predavanjaOptions, setPredavanjaOptions] = useState([]);
  const [selectedPredavanja, setSelectedPredavanja] = useState([]); // Add this state to store selected predavanja
  const navigate = useNavigate();

  const socket = io('http://localhost:8080');
  const token = JSON.parse(localStorage.getItem('token'));
const receivedPsiholog = JSON.parse(localStorage.getItem('psihologID'));
const receivedPredavanja = JSON.parse(localStorage.getItem('myPredavanja'));
  const psihologID = token; //to je viška, ali sam već tako konstr kod pa da se ne zezam
const predavanjeID = receivedPredavanja;
  console.log(psihologID);
  console.log(predavanjeID);
  //zadnja promjena dodao sam ... na predavanjeID
  useEffect(() => {
    socket.emit('getPredavanja'); // Request predavanja options
    socket.on('predavanjaOptions', (options) => {
      setPredavanjaOptions(options);
    });

    return () => {
      socket.off('predavanjaOptions');
    };
  }, []);

  const handleCreatePredbiljezba = () => {
    

    // Prepare the list of selected predavanja for the confirmation message
    const selectedPredavanjaNames = selectedPredavanjeID.map(id => {
      const predavanje = predavanjaOptions.find(option => option.Predavanje_ID === id);
      return predavanje ? predavanje.naziv : '';
    });

    const confirmationMessage = `Želiš li potvrditi odabir ovih predavanja?\n${selectedPredavanjaNames.join('\n')}`;
    const isConfirmed = window.confirm(confirmationMessage);

    if (isConfirmed) {
      // Perform the creation of predbiljezba
      console.log("Creating predbiljezbe with:", predbiljezbaID, psihologID,applicationDate, predavanjeID);

        for (const predID of predavanjeID) {
          const predbiljezbaID = nanoid(10);
          console.log("Creating predbiljezba for predavanjeID:", predID);
          const applicationDate = new Date().toLocaleString();
          socket.emit('createPredbiljezba', predbiljezbaID, psihologID,applicationDate, predID );
        }

      // Once predbiljezba is created, you can navigate accordingly
    } else {
      // Navigate back to the lecture selection
      navigate('../lectureselection'); // You need to import 'navigate' from your router library
    }
  };

  return (
    <>
      <p>Create Predbiljezba:</p>
      <Form>
        <Form.Group controlId="selectedPredavanjeID">
          <Form.Label>Odabrana predavanja: </Form.Label>
          <Form.Control
            as="select"
            multiple // Allow multiple selections
            value={selectedPredavanjeID}
            onChange={(e) => setSelectedPredavanjeID(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {predavanjaOptions.map((predavanje) => (
              <option key={predavanje.Predavanje_ID} value={predavanje.Predavanje_ID}>
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

