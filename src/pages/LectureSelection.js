import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';

export default function LectureSelection() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const socket = io('http://localhost:8080');

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

  const handleSendSelectedPredavanje = (predavanjeID) => {
    console.log(predavanjeID);
    socket.emit('predavanje_ID', predavanjeID);
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
          <Button onClick={handleSendSelectedPredavanje(selectedLectures)} variant='success'>Posalji odabrana predavanja</Button>
          <br/><br/>
          <Button onClick={handleSubmitSelection}>Odabir predavanja</Button>
        </Row>
      </Container>
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import { Table, Container, Row, Button, Form } from 'react-bootstrap';
// import { io } from 'socket.io-client';

// export default function LectureSelection() {
//   const [lista, setLista] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLectures, setSelectedLectures] = useState([]);
//   const socket = io('http://localhost:8080');

//   const handleDeleteButton = (predavanjeID) => {
//     socket.emit('deletePredavanje', predavanjeID);
//   };

//   const handleCheckboxChange = (predavanjeID) => {
//     if (selectedLectures.includes(predavanjeID)) {
//       setSelectedLectures(selectedLectures.filter(id => id !== predavanjeID));
//     } else {
//       setSelectedLectures([...selectedLectures, predavanjeID]);
//     }
//   };

//   const handleSubmitSelection = () => {
//     // Emit selected lecture IDs to the server
//     socket.emit('selectedLectures', selectedLectures);
//   };

//   useEffect(() => {
//     socket.on('getPredavanja', (fetchingPredavanja) => {
//       setLista(fetchingPredavanja);
//       setLoading(false);
//     });

//     socket.on('fetchingError', (errorMessage) => {
//       console.error('Error fetching data:', errorMessage);
//       setLoading(false);
//     });

//     // Fetch initial list of Predavanja
//     socket.emit('getPredavanja');

//     return () => {
//       socket.off('getPredavanja');
//       socket.off('fetchingError');
//     };
//   }, []);

//   return (
//     <>
//       <p>Dostupna predavanja:</p>
//       <Container>
//         <Row>
//           <Table striped bordered hover>
//             <thead className="bg-primary">
//               <tr>
//                <th>Odabir</th> 
//                 <th>Naziv</th>
//                 <th>Tip</th>
//                 <th>Opis</th>
//                 <th>Broj polaznika</th>
//                 <th>Slobodna mjesta</th>
//                 <th>Ukupno mjesta</th>
//                 <th>Brisanje predavanja: </th>
        
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="7">Loading...</td>
//                 </tr>
//               ) : lista && lista.length > 0 ? (
//                 lista.map((pred) => (
//                   <tr className="bg-warning" key={pred.Predavanje_ID}>
//                      <td>
//                       <Form.Check
//                         type="checkbox"
//                         checked={selectedLectures.includes(pred.Predavanje_ID)}
//                         onChange={() => handleCheckboxChange(pred.Predavanje_ID)}
//                       />
//                     </td>
//                     <td>{pred.naziv}</td>
//                     <td>{pred.tip}</td>
//                     <td>{pred.opis}</td>
//                     <td>{pred.brojPolaznika}</td>
//                     <td>{pred.slobodnaMjesta}</td>
//                     <td>{pred.ukupnoMjesta}</td>
//                     <td>
//                   <Button
//                      variant="danger"
//                      type="delete"
//                     onClick={() => handleDeleteButton(pred.Predavanje_ID)}
//                    >
//                       Obriši
//                     </Button>
//                  </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//           <Button onClick={handleSubmitSelection}>Odabir predavanja</Button>
         
//         </Row>
//       </Container>
//     </>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Table, Container, Row, Button } from 'react-bootstrap';
// import { io } from 'socket.io-client';


// export default function LectureSelection() {
//   const [lista, setLista] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const socket = io('http://localhost:8080');

//   const handleDeleteButton = (predavanjeID) => {
//     // Emit an event to the server to delete the specified Predavanje
//     socket.emit('deletePredavanje', predavanjeID);
//   };



//   const getPredavanja = () => {
//     socket.emit('getPredavanja');
    
//   };


//  //gptsugg
//  useEffect(() => {
//   // Listen for 'deletePredavanje' and 'getPredavanja' events
//   socket.on('deletePredavanje', (updatedPredavanja) => {
//     // After deletion, set the updated list of Predavanja
//     setLista(updatedPredavanja);
//     setLoading(false);
    
//     // Fetch the updated list of Predavanja after deletion
//     getPredavanja();
//   });

//   socket.on('getPredavanja', (fetchingPredavanja) => {
//     setLista(fetchingPredavanja);
//     setLoading(false);
//   });

//   socket.on('fetchingError', (errorMessage) => {
//     console.error('Error fetching data:', errorMessage);
//     setLoading(false);
//   });

//   // Fetch initial list of Predavanja
//   getPredavanja();

//   // Clean up event listeners when the component unmounts
//   return () => {
//     socket.off('getPredavanja');
//     socket.off('deletePredavanje');
//     socket.off('fetchingError');
//   };
// }, []);

//   return (
//     <>
//       <p>Dostupna predavanja:</p>
//       <Container>
//         <Row>
//           <Table striped bordered hover>
//             <thead className="bg-primary" mt-10>
//             <tr>
            
              
//             <th>Naziv: </th>
//             <th>Tip: </th>
//             <th>Opis: </th>
//             <th>Broj polaznika: </th>
//             <th>Slobodna mjesta: </th>
//             <th>Ukupno mjesta: </th>
//             <th>Brisanje predavanja: </th>
        
            
          
//             {/* <th>Psiholog_ID: </th> */}
//           </tr>
//             </thead>
//             <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="7">Loading...</td>
//               </tr>
//             ) : lista && lista.length > 0 ? (
//               lista.map((pred) => (
//                 <tr className="bg-warning" key={pred.Predavanje_ID}>
//                   <td>{pred.naziv}</td>
//                   <td>{pred.tip}</td>
//                   <td>{pred.opis}</td>
//                   <td>{pred.brojPolaznika}</td>
//                   <td>{pred.slobodnaMjesta}</td>
//                   <td>{pred.ukupnoMjesta}</td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       type="delete"
//                       onClick={() => handleDeleteButton(pred.Predavanje_ID)}
//                     >
//                       Obriši
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No data available</td>
//               </tr>
//             )}
//           </tbody>
//           </Table>
//           <Button onClick={getPredavanja}>Prikaz predavanja</Button>
//           <br />
//         </Row>
//       </Container>
//     </>
//   );
// }
