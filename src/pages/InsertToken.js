import React, { useState } from 'react'
import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function InsertToken() {
  const navigate = useNavigate();
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const socket = io('http://localhost:8080');
const [input,setInput] = useState('');
  const handleInputToken = (e) =>{
    setInput(e.target.value);
  }
  const submitValues = async (e) => {
    e.preventDefault();

    const inputToken = document.getElementById('token');
   

    if (inputToken.textContent === '' && input.length!== 10) {
      alert('Ispravi unos ili ponovno kopiraj token na ovo mjesto da bi se nastavio proces prijave na stručni skup "Horizonti snage"');
      return;
    }
    setIsWaitingForConfirmation(true);

    // Emit the 'checkPsiholog' event to the server
    socket.emit('checkPsiholog', input);

    // Listen for responses from the server
    socket.on('PsihologFound', (psiho) => {
      // setUserRole(psiho.role);
      sessionStorage.setItem('role', psiho.role);
      console.log(psiho.role);
      setIsWaitingForConfirmation(false);
      alert('Uspješno pospremljeni prijavni podaci!');
      navigate('../lectureselection');
    });

    socket.on('PsihologNotFound', () => {
      setIsWaitingForConfirmation(false);
      alert('No matching Psiholog found.');
    });

    socket.on('ServerError', () => {
      setIsWaitingForConfirmation(false);
      alert('Internal server error.');
    });
 

    const confirmWindow = window.confirm(`Želite li pospremiti ovako unesene podatke?
      Token: ${input}`)
      
    if (confirmWindow) {
      try {
        setIsWaitingForConfirmation(true);

        sessionStorage.setItem('token', JSON.stringify(input));

    

        // Set timeout only if submission takes longer than 5000 ms
        const insertionTimeout = setTimeout(() => {
          setIsWaitingForConfirmation(false);
          alert('Insertion took longer than expected. Please try again.');
        }, 1500);

       
          clearTimeout(insertionTimeout);
          setIsWaitingForConfirmation(false);
          alert('Uspješno pospremljeni prijavni podaci!');
          navigate('../lectureselection');
        

        inputToken.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
    <Container fluid>
        <Row>
          <Button variant="outline-warning" size="md" onClick={handleShow}>
            <img width={50} height={40} src={horizonti_velik_cropped} />
            Prijava na predavanja
          </Button>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Prijava na predavanja</Modal.Title>
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
                  <Form.Label htmlFor="token">Unesi dobiveni token:</Form.Label>
                  <Form.Control
                    type="token"
                    placeholder="Unesi token"
                    id="token"
                    name="token"
                    onChange={handleInputToken}
                  />
                </Form.Group>
                
                <br />
                <Button variant="primary" type="submit">
                 Prijava na predavanja
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  )
}

// import React, { useState } from 'react';
// import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
// import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client'; // Import Socket.io client library

// const socket = io('http://localhost:8080'); // Replace with your server's address

// export default function InsertToken() {
//   const navigate = useNavigate();
//   const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
//   const [show, setShow] = useState(false);
//   const [input, setInput] = useState('');
// //  const [userRole,setUserRole] = useState(null);


//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleInputToken = (e) => {
//     setInput(e.target.value);
//   };

//   const submitValues = async (e) => {
//     e.preventDefault();

//     if (input.length !== 10) {
//       alert('Ispravi unos ili ponovno kopiraj token na ovo mjesto da bi se nastavio proces prijave na stručni skup "Horizonti snage"');
//       return;
//     }

  //   setIsWaitingForConfirmation(true);

  //   // Emit the 'checkPsiholog' event to the server
  //   socket.emit('checkPsiholog', input);

  //   // Listen for responses from the server
  //   socket.on('PsihologFound', (psiho) => {
  //     // setUserRole(psiho.role);
  //     localStorage.setItem('role', psiho.role);
  //     console.log(psiho.role);
  //     setIsWaitingForConfirmation(false);
  //     alert('Uspješno pospremljeni prijavni podaci!');
  //     navigate('../lectureselection');
  //   });

  //   socket.on('PsihologNotFound', () => {
  //     setIsWaitingForConfirmation(false);
  //     alert('No matching Psiholog found.');
  //   });

  //   socket.on('ServerError', () => {
  //     setIsWaitingForConfirmation(false);
  //     alert('Internal server error.');
  //   });
  // };

//   return (
//     <Container fluid>
//       <Row>
//         <Button variant="outline-warning" size="md" onClick={handleShow}>
//           <img width={50} height={40} src={horizonti_velik_cropped} alt="Horizonti Logo" />
//           Prijava na predavanja
//         </Button>
//       </Row>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Prijava na predavanja</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {isWaitingForConfirmation ? (
//             <div className="spinner-container">
//               <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </div>
//           ) : (
//             <Form onSubmit={submitValues}>
//               {/* <Form.Group>
//                 <Form.Label htmlFor="ime">Unesi dobiveni token:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Unesi token"
//                   name="token"
//                   value={input}
//                   onChange={handleInputToken}
//                 />
//               </Form.Group> */}
//               <Form.Group>
//   <Form.Label htmlFor="token">Unesi dobiveni token:</Form.Label>
//   <Form.Control
//     type="text"
//     id="token" 
//     placeholder="Unesi token"
//     name="token"
//     value={input}
//     onChange={handleInputToken}
//   />
// </Form.Group>


//               <br />
//               <Button variant="primary" type="submit">
//                 Prijava na predavanja
//               </Button>
//             </Form>
//           )}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

