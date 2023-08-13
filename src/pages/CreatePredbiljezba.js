// import React, { useState, useEffect } from 'react';
// import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
// import Predavanje from '../dbFiles/Predavanje';
// import { nanoid } from 'nanoid';
// import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
// import { io } from 'socket.io-client';

// export default function CreatePredbiljezba() {
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [predavanja, setPredavanja] = useState([]);
//   const [selectedPredavanja, setSelectedPredavanja] = useState([]);
//   const socket = io('http://localhost:8080'); // Adjust the Socket.io server URL

//   useEffect(() => {
//     socket.on('predavanjaData', (data) => {
//       setPredavanja(data);
//     });

//     fetchPredavanja();

//     return () => {
//       socket.off('predavanjaData');
//     };
//   }, []);

//   const handleShow = () => {
//     setShow(true);
//   };

//   const handleClose = () => {
//     setShow(false);
//     setSelectedPredavanja([]);
//   };

//   const fetchPredavanja = () => {
//     socket.emit('getPredavanja');

//     socket.on('predavanjaData', (data) => {
//       setPredavanja(data);
//     });
//   };

//   const handleCheckboxChange = (event, predavanje) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setSelectedPredavanja([...selectedPredavanja, predavanje]);
//     } else {
//       const updatedSelected = selectedPredavanja.filter((item) => item.Predavanje_ID !== predavanje.Predavanje_ID);
//       setSelectedPredavanja(updatedSelected);
//     }
//   };

//   const submitPredbiljezba = (e) => {
//     e.preventDefault();

//     if (selectedPredavanja.length === 0) {
//       alert('Select at least one predavanje.');
//       return;
//     }

//     const ime = e.target.ime.value;
//     const prezime = e.target.prezime.value;
//     const email = e.target.email.value;

//     if (!ime || !prezime || !email) {
//       alert('Ispuni sva polja.');
//       return;
//     }

//     setLoading(true);

//     const predbiljezbaData = {
//       ime,
//       prezime,
//       email,
//       selectedPredavanja,
//     };

//     socket.emit('createPredbiljezba', predbiljezbaData);

//     socket.on('predbiljezbaStatus', (status) => {
//       setLoading(false);
//       setShow(false);
//       setSelectedPredavanja([]);

//       if (status === 'success') {
//         alert('Predbiljezba submitted successfully.');
//       } else {
//         alert('Error submitting predbiljezba.');
//       }
//     });
//   };

//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Button variant="primary" size="md" onClick={handleShow}>
//             <img width={50} height={40} src={horizonti_velik_cropped} alt="Horizonti Logo" />
//             Prijava na 'Horizonti snage'
//           </Button>
//         </Row>

//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Prijava na konferenciju 'Horizonti snage'</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={submitPredbiljezba}>
//               <Form.Group>
//                 <Form.Label htmlFor="ime">Ime:</Form.Label>
//                 <Form.Control type="text" placeholder="Unesi ime" id="ime" name="ime" required />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label htmlFor="prezime">Prezime:</Form.Label>
//                 <Form.Control type="text" placeholder="Unesi prezime" id="prezime" name="prezime" required />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label htmlFor="email">Unesite e-mail adresu:</Form.Label>
//                 <Form.Control type="email" placeholder="Unesite svoju e-mail adresu" id="email" name="email" required />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Odaberite predavanja:</Form.Label>
//                 {predavanja.map((predavanje) => (
//                   <Form.Check
//                     key={predavanje.Predavanje_ID}
//                     type="checkbox"
//                     label={predavanje.naziv}
//                     value={predavanje.Predavanje_ID}
//                     onChange={(e) => handleCheckboxChange(e, predavanje)}
//                   />
//                 ))}
//               </Form.Group>
//               <Button variant="primary" type="submit">
//                 {loading ? <Spinner animation="border" size="sm" /> : 'Prijavi se'}
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { io } from 'socket.io-client'; 
import { nanoid } from 'nanoid';

export default function CreatePredbiljezba() {
  const [selectedPredavanjeID, setSelectedPredavanjeID] = useState('');
  const [predavanjaOptions, setPredavanjaOptions] = useState([]);
  const socket = io('http://localhost:8080');

  const handleCreatePredbiljezba = () => {
    socket.emit('createPredbiljezba', selectedPredavanjeID);
  };

  useEffect(() => {
    socket.emit('getPredavanja'); // Request predavanja options
    socket.on('predavanjaOptions', (options) => {
      setPredavanjaOptions(options);
    });

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
        <Button variant="primary" onClick={handleCreatePredbiljezba}>Create Predbiljezba</Button>
      </Form>
    </>
  );
}
