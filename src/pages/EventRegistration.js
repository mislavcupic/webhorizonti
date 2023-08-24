// //sugg
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import CarouselComponent from './CarouselComponent';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
import '../App.css';



const getFileDetails = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result; // This is the actual file content
      const name = file.name;
      const type = file.type;
      resolve({ name, type, content: buffer }); // Include the content along with metadata
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
};



export default function EventRegistration() {
  let Psiholog_ID = nanoid(10);
  let validates = true;
  const applicationDate = new Date().toLocaleString();
  const navigate = useNavigate();
  const socket = io('http://localhost:8080');

  const [psiholog, setPsiholog] = useState({
    Psiholog_ID: Psiholog_ID,
    ime: '',
    prezime: '',
    email: '',
    date: '',
    participantType: '',
    uploadedFiles: [],
    Sazetci_IDs: []
  });

  const [show, setShow] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleParticipantType = (type) => {
    setPsiholog({ ...psiholog, participantType: type, date: applicationDate });
    setCurrentStep(1);
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);

    setPsiholog((prevPsiholog) => ({
      ...prevPsiholog,
      uploadedFiles: [...prevPsiholog.uploadedFiles, ...newFiles],
      Sazetci_IDs: [...prevPsiholog.Sazetci_IDs, ...newFiles.map(() => nanoid(5))]
    }));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...psiholog.uploadedFiles];
    updatedFiles.splice(index, 1);

    const updatedSazetciIDs = [...psiholog.Sazetci_IDs];
    updatedSazetciIDs.splice(index, 1);

    setPsiholog((prevPsiholog) => ({
      ...prevPsiholog,
      uploadedFiles: updatedFiles,
      Sazetci_IDs: updatedSazetciIDs
    }));
  };

  const submitValues = async (e) => {
    e.preventDefault();

    if (!psiholog.participantType) {
      alert('Molimo vas odaberite tip sudionika.');
      return;
    }

    if (
      (psiholog.participantType === 'Aktivni sudionik' && psiholog.uploadedFiles.length === 0) ||
      !psiholog.ime ||
      !psiholog.prezime ||
      !psiholog.email
    ) {
      alert('Molimo vas da ispunite sva polja.');
      return;
    }

    // Convert the uploaded files to an array of file details
    const fileDetailsPromises = psiholog.uploadedFiles.map(async (file) => {
      const fileDetails = await getFileDetails(file);
      return {
        file: fileDetails,
      };
    });
    const filesWithDetails = await Promise.all(fileDetailsPromises);
    
    // const fileDetailsPromises = psiholog.uploadedFiles.map(async (file) => {
    //   const fileDetails = await getFileDetails(file);
    //   return {
    //     file,
    //     details: fileDetails,
    //   };
    // });
    // const filesWithDetails = await Promise.all(fileDetailsPromises);

    // Rest of the submission logic...

    const insertionTimeout = setTimeout(() => {
      setIsWaitingForConfirmation(false);
      alert('Insertion took longer than expected. Please try again.');
      setCurrentStep(1); // Go back to Step2
    }, 20000);

    // Store Psiholog_ID in local storage
    localStorage.setItem('psihologID', JSON.stringify(psiholog.Psiholog_ID));
    console.log('Data before sending to server:', { ...psiholog, uploadedFiles: filesWithDetails });
    // Pass the modified filesWithDetails array to the server
    socket.emit('insertData', { ...psiholog, uploadedFiles: filesWithDetails });
    socket.on('dataInserted', (insertedData) => {
      console.log('Data inserted:', insertedData);
      clearTimeout(insertionTimeout); // Clear the timeout
      setIsWaitingForConfirmation(false);
      alert('Uspješno pospremljeni prijavni podaci!');
      navigate('../lectureselection');
    });
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
          <Modal show={show} onHide={() => setShow(false)} dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: '14px' }}>Prijava na konferenciju 'Horizonti snage'</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentStep === 0 && (
                <Step1 chooseParticipantType={handleParticipantType} />
              )}
              {currentStep === 1 && (
                <Step2
                  participantType={psiholog.participantType}
                  uploadFile={handleFileUpload}
                  handleInputIme={handleInputIme}
                  handleInputPrezime={handleInputPrezime}
                  handleInputEmail={handleInputEmail}
                  uploadedFiles={psiholog.uploadedFiles}
                  removeFile={handleRemoveFile}
                />
              )}
              {currentStep === 2 && (
                <div className="spinner-container">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </Modal.Body>
            {currentStep !== 2 && (
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={submitValues}>
                  Submit
                </Button>
              </Modal.Footer>
            )}
          </Modal>
        </Row>
      </Container>
    </>
  );
}

function Step1({ chooseParticipantType }) {
//   return (
//     <div>
//       <h5>Choose Participant Type</h5>
//       <Button onClick={() => chooseParticipantType('Aktivni sudionik')} variant='outline-primary'>
//         Aktivni sudionik
//       </Button>
//       <br/>
//       <hr/>
//       <br/>
//       <Button onClick={() => chooseParticipantType('Pasivni sudionik')}variant='outline-primary'>
//         Pasivni sudionik
//       </Button>
//     </div>
//   );
// }
return (
 <Container className="text-center mt-5">
 <h6 color='dark-blue'>Odaberi tip sudjelovanja na konferenciji 'Horizonti snage': </h6>

   
    <Button onClick={() => chooseParticipantType('Aktivni sudionik')} variant="outline-primary">
       Aktivni sudionik
     </Button>
    
   <hr/>
   
     <Button onClick={() => chooseParticipantType('Pasivni sudionik')} variant="outline-primary">
       Pasivni sudionik
     </Button>
   

</Container>
);
};
function Step2({
  participantType,
  uploadFile,
  handleInputIme,
  handleInputPrezime,
  handleInputEmail,
  uploadedFiles,
  removeFile
}) {
  return (
    <div>
      <h3>Enter Details</h3>
      <Form.Group>
        <Form.Label htmlFor="ime">Ime:</Form.Label>
        <Form.Control id="ime" name="ime" type="text" placeholder="Unesi ime" onChange={handleInputIme} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="prezime">Prezime:</Form.Label>
        <Form.Control id="prezime" type="text" placeholder="Unesi prezime" onChange={handleInputPrezime} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control id="email" type="email" placeholder="Unesi email" onChange={handleInputEmail} />
      </Form.Group>
      {participantType === 'Aktivni sudionik' && (
        <Form.Group>
          <Form.Label htmlFor="sazetci">Sažetci:</Form.Label>
          {/* <Form.Control id="sazetci" type="file" accept="*" multiple onChange={uploadFile} /> */}
          <Form.Control id="sazetci" type="file" accept=".docx, .pdf, .xlsx" multiple onChange={uploadFile} />

        </Form.Group>
      )}
      
      {uploadedFiles.length > 0 && (
        <div>
          <h5>Uploaded Files:</h5>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <button onClick={() => removeFile(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
     

    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
// import { nanoid } from 'nanoid';
// import CarouselComponent from './CarouselComponent';
// import { io } from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
// import '../App.css';

// const getFileDetails = (file) => {
//   const { name, type } = file;
//   const reader = new FileReader();

//   return new Promise((resolve, reject) => {
//     reader.onload = (event) => {
//       const data = event.target.result;
//       resolve({ name, type, data });
//     };

//     reader.onerror = (error) => {
//       reject(error);
//     };

//     reader.readAsDataURL(file);
//   });
// };
// export default function EventRegistration() {
//   let Psiholog_ID = nanoid(10);
//   let validates = true;
//   const applicationDate = new Date().toLocaleString();
//   const navigate = useNavigate();
//   const socket = io('http://localhost:8080');

//   const [psiholog, setPsiholog] = useState({
//     Psiholog_ID: Psiholog_ID,
//     ime: '',
//     prezime: '',
//     email: '',
//     date: '',
//     participantType: '',
//     uploadedFiles: [],
//     Sazetci_IDs: []
//   });

//   const [show, setShow] = useState(true);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);

//   const handleInputIme = (e) => {
//     setPsiholog({ ...psiholog, ime: e.target.value });
//   };

//   const handleInputPrezime = (e) => {
//     setPsiholog({ ...psiholog, prezime: e.target.value });
//   };

//   const handleInputEmail = (e) => {
//     setPsiholog({ ...psiholog, email: e.target.value });
//   };

//   const handleParticipantType = (type) => {
//     setPsiholog({ ...psiholog, participantType: type,date: applicationDate });
//     setCurrentStep(1);
//   };

//   const handleFileUpload = (e) => {
//     const newFiles = Array.from(e.target.files);

//     setPsiholog((prevPsiholog) => ({
//       ...prevPsiholog,
//       uploadedFiles: [...prevPsiholog.uploadedFiles, ...newFiles],
//       Sazetci_IDs: [...prevPsiholog.Sazetci_IDs, ...newFiles.map(() => nanoid(5))]
//     }));
//   };

//   const handleRemoveFile = (index) => {
//     const updatedFiles = [...psiholog.uploadedFiles];
//     updatedFiles.splice(index, 1);

//     const updatedSazetciIDs = [...psiholog.Sazetci_IDs];
//     updatedSazetciIDs.splice(index, 1);

//     setPsiholog((prevPsiholog) => ({
//       ...prevPsiholog,
//       uploadedFiles: updatedFiles,
//       Sazetci_IDs: updatedSazetciIDs
//     }));
//   };

 
//   const submitValues = async (e) => {
//     e.preventDefault();
  
//     if (!psiholog.participantType) {
//       alert('Molimo vas odaberite tip sudionika.');
//       return;
//     }
  
//     if (
//       (psiholog.participantType === 'Aktivni sudionik' && psiholog.uploadedFiles.length === 0) ||
//       !psiholog.ime ||
//       !psiholog.prezime ||
//       !psiholog.email
//     ) {
//       alert('Molimo vas da ispunite sva polja.');
//       return;
//     }
  
//     // Convert the uploaded files to an array of file details
//     const fileDetailsPromises = psiholog.uploadedFiles.map(async (file) => {
//       const fileDetails = await getFileDetails(file);
//       return {
//         file,
//         details: fileDetails,
//       };
//     });
//     const filesWithDetails = await Promise.all(fileDetailsPromises);
  
//     // Rest of the submission logic...
  
//     const insertionTimeout = setTimeout(() => {
//       setIsWaitingForConfirmation(false);
//       alert('Insertion took longer than expected. Please try again.');
//       setCurrentStep(1); // Go back to Step2
//     }, 20000);
  
//     // Store Psiholog_ID in local storage
//     localStorage.setItem('psihologID', JSON.stringify(psiholog.Psiholog_ID));
  
//     // Pass the modified filesWithDetails array to the server
//     socket.emit('insertData', { ...psiholog, uploadedFiles: filesWithDetails });
//     socket.on('dataInserted', (insertedData) => {
//       console.log('Data inserted:', insertedData);
//       clearTimeout(insertionTimeout); // Clear the timeout
//       setIsWaitingForConfirmation(false);
//       alert('Uspješno pospremljeni prijavni podaci!');
//       navigate('../lectureselection');
//     });
//   };
  
  
//   useEffect(() => {
//     socket.on('insertionError', (errorMessage) => {
//       console.error('Error while inserting data:', errorMessage);
//     });
//   }, []);

//   return (
//     <>
//       <CarouselComponent />
//       <Container fluid>
//         <Row>
//           <Modal show={show} onHide={() => setShow(false)} dialogClassName="custom-modal">
//             <Modal.Header closeButton>
//               <Modal.Title style={{ fontSize: '14px' }}>Prijava na konferenciju 'Horizonti snage'</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {currentStep === 0 && (
//                 <Step1 chooseParticipantType={handleParticipantType} />
//               )}
//               {currentStep === 1 && (
//                 <Step2
//                   participantType={psiholog.participantType}
//                   uploadFile={handleFileUpload}
//                   handleInputIme={handleInputIme}
//                   handleInputPrezime={handleInputPrezime}
//                   handleInputEmail={handleInputEmail}
//                   uploadedFiles={psiholog.uploadedFiles}
//                   removeFile={handleRemoveFile}
//                 />
//               )}
//               {currentStep === 2 && (
//                 <div className="spinner-container">
//                   <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </Spinner>
//                 </div>
//               )}
//             </Modal.Body>
//             {currentStep !== 2 && (
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={() => setShow(false)}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={submitValues}>
//                   Submit
//                 </Button>
//               </Modal.Footer>
//             )}
//           </Modal>
//         </Row>
//       </Container>
//     </>
//   );
// }

// function Step1({ chooseParticipantType }) {
//   return (
//     <div>
  
//       <h5>Choose Participant Type</h5>
//       <Button onClick={() => chooseParticipantType('Aktivni sudionik')} variant='outline-primary'>
//         Aktivni sudionik
//       </Button>
//       <br/>
//       <hr/>
//       <br/>
//       <Button onClick={() => chooseParticipantType('Pasivni sudionik')}variant='outline-primary'>
//         Pasivni sudionik
//       </Button>
//     </div>
//   );
// }

// function Step2({
//   participantType,
//   uploadFile,
//   handleInputIme,
//   handleInputPrezime,
//   handleInputEmail,
//   uploadedFiles,
//   removeFile
// }) {
//   return (
//     <div>
//       <h3>Enter Details</h3>
//       <Form.Group>
//   <Form.Label htmlFor="ime">Ime:</Form.Label>
//   <Form.Control id="ime" name="ime" type="text" placeholder="Unesi ime" onChange={handleInputIme} />
// </Form.Group>
// <Form.Group>
//   <Form.Label htmlFor="prezime">Prezime:</Form.Label>
//   <Form.Control id="prezime" type="text" placeholder="Unesi prezime" onChange={handleInputPrezime} />
// </Form.Group>
// <Form.Group>
//   <Form.Label htmlFor="email">Email:</Form.Label>
//   <Form.Control id="email" type="email" placeholder="Unesi email" onChange={handleInputEmail} />
// </Form.Group>
// {participantType === 'Aktivni sudionik' && (
//   <Form.Group>
//     <Form.Label htmlFor="sazetci">Sažetci:</Form.Label>
//     <Form.Control id="sazetci" type="file" accept=".docx,.pdf,.xlsx" multiple onChange={uploadFile} />
//   </Form.Group>
// )}
      
//       {uploadedFiles.length > 0 && (
//         <div>
//           <h5>Uploaded Files:</h5>
//           <ul>
//             {uploadedFiles.map((file, index) => (
//               <li key={index}>
//                 <span>{file.name}</span>
//                 <button onClick={() => removeFile(index)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
