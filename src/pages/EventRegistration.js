import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
import Psiholog from '../dbFiles/Psiholog';
import { nanoid } from 'nanoid';
import CarouselComponent from './CarouselComponent';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';

export default function EventRegistration() {
  let Psiholog_ID = nanoid(10);
  let validates = true;
  const applicationDate = new Date().toLocaleString();
  const navigate = useNavigate();
  const socket = io('http://localhost:8080');

  const [psiholog, setPsiholog] = useState({
    Psiholog_ID: (Psiholog.Psiholog_ID = Psiholog_ID),
    ime: '',
    prezime: '',
    email: '',
    date: ''
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);

  const handleInputIme = (e) => {
    setPsiholog({ ...psiholog, ime: e.target.value });
  };

  const handleInputPrezime = (e) => {
    setPsiholog({ ...psiholog, prezime: e.target.value });
  };

  const handleInputEmail = (e) => {
    setPsiholog({ ...psiholog, email: e.target.value });
  };

  const submitValues = async (e) => {
    e.preventDefault();

    const inputIme = document.getElementById('ime');
    const inputPrezime = document.getElementById('prezime');
    const inputEmail = document.getElementById('email');

    if (psiholog.ime === '' || psiholog.prezime === '' || psiholog.email === '') {
      alert('Ispuni sva polja da bi se nastavio proces prijave na stručni skup "Horizonti snage"');
      return;
    }

    const confirmWindow = window.confirm(`Želite li pospremiti ovako unesene podatke? 
      Ime: ${psiholog.ime},
      Prezime: ${psiholog.prezime},
      Email: ${psiholog.email}`);

    if (confirmWindow) {
      try {
        setIsWaitingForConfirmation(true);

        const updatedPsiholog = {
          ...psiholog,
          Psiholog_ID: nanoid(10),
          date: applicationDate,
        };

        setPsiholog(updatedPsiholog);

        const dataToSend = updatedPsiholog.Psiholog_ID;
        localStorage.setItem('psihologID', JSON.stringify(dataToSend));

        socket.emit('insertData', updatedPsiholog);

        // Set timeout only if submission takes longer than 5000 ms
        const insertionTimeout = setTimeout(() => {
          setIsWaitingForConfirmation(false);
          alert('Insertion took longer than expected. Please try again.');
        }, 15000);

        socket.on('dataInserted', (insertedData) => {
          console.log('Data inserted:', insertedData);
          clearTimeout(insertionTimeout);
          setIsWaitingForConfirmation(false);
          alert('Uspješno pospremljeni prijavni podaci!');
          navigate('../lectureselection');
        });

        inputIme.value = "";
        inputPrezime.value = "";
        inputEmail.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    socket.on('insertionError', (errorMessage) => {
      console.error('Error while inserting data:', errorMessage);
    });
  }, []);

  return (
    <>
      <CarouselComponent />
      <Container fluid>
        <Row>
          <Button variant="primary" size="md" onClick={handleShow}>
            <img width={50} height={40} src={horizonti_velik_cropped} />
            Prijava na 'Horizonti snage'
          </Button>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Prijava na konferenciju 'Horizonti snage'</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {isWaitingForConfirmation ? (
              <div className="spinner-container">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Form onSubmit={submitValues}>
                <Form.Group>
                  <Form.Label htmlFor="ime">Ime:</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Unesi ime"
                    id="ime"
                    name="ime"
                    onChange={handleInputIme}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="prezime">Prezime:</Form.Label>
                  <Form.Control
                    type="prezime"
                    placeholder="Unesi prezime"
                    name="prezime"
                    id="prezime"
                    onChange={handleInputPrezime}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="email">Unesite e-mail adresu:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Unesite svoju e-mail adresu"
                    id="email"
                    onChange={handleInputEmail}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                  Click here to submit form
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}




//ovaj kod sigurno radi
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Form, Button, Modal } from 'react-bootstrap';
// import Psiholog from '../dbFiles/Psiholog';
// import { nanoid } from 'nanoid';
// import CarouselComponent from './CarouselComponent';
// import { io } from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png'



// export default function EventRegistration() {
//   let Psiholog_ID = nanoid(10);
//   let validates = true;
//   const applicationDate = new Date().toLocaleString();
//   const navigate = useNavigate();
//   const socket = io('http://localhost:8080');

//   const [psiholog, setPsiholog] = useState({
//   Psiholog_ID: (Psiholog.Psiholog_ID = Psiholog_ID),
//   ime: '',
//   prezime: '',
//   email: '',
//   date: ''

//   });
  
//   //const dataToSend = psiholog.Psiholog_ID;
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


//   const handleInputIme = (e) => {
//     setPsiholog({ ...psiholog, ime: e.target.value });
//   };

//   const handleInputPrezime = (e) => {
//     setPsiholog({ ...psiholog, prezime: e.target.value });
//   };

//   const handleInputEmail = (e) => {
//     setPsiholog({ ...psiholog, email: e.target.value });
//   };
//   const psiho = new Psiholog(
//     psiholog.Psiholog_ID,
//     psiholog.ime,
//     psiholog.prezime,
//     psiholog.email,
//     applicationDate // Use the formatted date here
//   );
//   const submitValues = (e) => {
//     e.preventDefault();
//     const inputIme = document.getElementById('ime');
//     const inputPrezime = document.getElementById('prezime');
//     const inputEmail = document.getElementById('email');

//     if (psiholog.ime === '' || psiholog.prezime === '' || psiholog.email === '') {
//       alert('Ispuni sva polja da bi se nastavio proces prijave na stručni skup "Horizonti snage"');
//       return;
//     }

//     const confirmWindow = window.confirm(`Želite li pospremiti ovako unesene podatke? 
//       Ime: ${psiholog.ime},
//       Prezime: ${psiholog.prezime},
//       Email: ${psiholog.email}`);
      

//       if (confirmWindow) {
//         try {
//           const updatedPsiholog = {
//             ...psiholog,
//             Psiholog_ID: nanoid(10),
//             date: applicationDate,
//           };
//           setPsiholog(updatedPsiholog); // Update state with the updated Psiholog object
//           socket.emit('insertData', updatedPsiholog);
//           const dataToSend = updatedPsiholog.Psiholog_ID;
//           //send this Psiholog_ID to CreatePredbiljezba.js
//          // socket.emit('Psiholog_ID',updatedPsiholog.Psiholog_ID);
//           console.log(updatedPsiholog.Psiholog_ID);
//           //localStorage.setItem('psihologID', dataToSend);
//           localStorage.setItem('psihologID', JSON.stringify(dataToSend));
//           console.log(dataToSend);
//           inputIme.value = "";
//           inputPrezime.value = "";
//           inputEmail.value = "";
//         } catch (err) {
//           console.log(err);
//         } finally {
//           alert('Uspješno pospremljeni prijavni podaci!');
          
//         }
//       }
//     };
   

//   useEffect(() => {
//     socket.on('insertionError', (errorMessage) => {
//       console.error('Error while inserting data:', errorMessage);
//       // Handle the error and show a notification to the user
//     });
//   }, []);
  
//   useEffect(() => {
//     socket.on('dataInserted', (insertedData) => {
//       console.log('Data inserted:', insertedData);
      
//       navigate('../lectureselection');
//     }); },[]);

//   return (
//     <>
//       <CarouselComponent />
//       <Container fluid>
//         <Row>
//           <Button variant="primary" size="md" onClick={handleShow}> <img width={50} height={40} src={horizonti_velik_cropped} /> 
//             Prijava na 'Horizonti snage'
//           </Button>
//         </Row>

//         <Modal show={show} onHide={handleClose}> {/* style={{width: '60%',
//                       height: '60%',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center'}} */}
//           <Modal.Header closeButton>
//             <Modal.Title>Prijava na konferenciju 'Horizonti snage'</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={submitValues}>
//               <Form.Group>
//                 <Form.Label htmlFor="ime">Ime:</Form.Label>
//                 <Form.Control
//                   type="name"
//                   placeholder="Unesi ime"
//                   id="ime"
//                   name="ime"
//                   onChange={handleInputIme}
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label htmlFor="prezime">Prezime:</Form.Label>
//                 <Form.Control
//                   type="prezime"
//                   placeholder="Unesi prezime"
//                   name="prezime"
//                   id="prezime"
//                   onChange={handleInputPrezime}
//                 />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label htmlFor="email">Unesite e-mail adresu:</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Unesite svoju e-mail adresu"
//                   id="email"
//                   onChange={handleInputEmail}
//                 />
//               </Form.Group>
//               <br />
//               <Button variant="primary" type="submit">
//                 Click here to submit form
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </>
//   );
// }


