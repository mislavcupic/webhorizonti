
// import React, { useState, useEffect } from 'react';
// import { Table, Container, Row, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { io } from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';

// export default function LectureSelection() {
//   const [lista, setLista] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedLectures, setSelectedLectures] = useState([]);
//   const socket = io('http://localhost:8080');
//   const navigate = useNavigate();
//   const receivedPsihologID = JSON.parse(sessionStorage.getItem('psihologID'));
//   const tokenreceived = JSON.parse(sessionStorage.getItem('token'));
//   const role = sessionStorage.getItem('userRole');
//   const roleToken = sessionStorage.getItem('role'); //stavio sam role umjesto psihoRole
 

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

//   const handleSendSelectedPredavanje = () => {
//     sessionStorage.setItem('token', JSON.stringify(tokenreceived));
//     sessionStorage.setItem('psihologID', JSON.stringify(receivedPsihologID)); //tu sam zamijenio pa stavio na token umjesto na receivedPsihologID
//     sessionStorage.setItem('myPredavanja', JSON.stringify(selectedLectures));
//     if (selectedLectures.length === 0) {
//       alert('Morate odabrati barem jedno predavanje!');
//       return;
//     }
//     navigate('../createpredbiljezba');
//   };

//   useEffect(() => {
//     socket.on('getPredavanja', (fetchingPredavanja) => {
//       setLista(fetchingPredavanja);
//       setLoading(false);
//       let odabirRole = role?role:roleToken;
//       console.log(odabirRole);
//     });

//     socket.on('fetchingError', (errorMessage) => {
//       console.error('Error fetching data:', errorMessage);
//       setLoading(false);
//     });

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
//                 <th>Odabir</th>
//                 <th>Naziv</th>
//                 <th>Tip</th>
//                 <th>Opis</th>
//                 <th>Broj polaznika</th>
//                 <th>Slobodna mjesta</th>
//                 <th>Ukupno mjesta</th>
//                 <th>Mjesto održavanja</th>
//                 <th>Vrijeme početka</th>
//                 <th>Brisanje predavanja:</th>
                   
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8">Loading...</td>
//                 </tr>
//               ) : lista && lista.length > 0 ? (
//                 lista.map((pred) => (
//                   <tr
//                     className={`${
//                       pred.slobodnaMjesta <= 0 || pred.ukupnoMjesta === pred.brojPolaznika
//                         ? 'disabled-row'
//                         : 'bg-warning'
//                     }`}
//                     key={pred.Predavanje_ID}
//                   >
//                     <td>
//                       {pred.slobodnaMjesta <= 0 || pred.ukupnoMjesta === pred.brojPolaznika ? (
//                         <td>
//                           <OverlayTrigger
//                             overlay={
//                               <Tooltip
//                                 style={{
//                                   fontSize: '14px',
//                                   backgroundColor: 'red',
//                                   border: '1px solid black',
//                                 }}
//                               >
//                                 Ovo predavanje je popunjeno!
//                               </Tooltip>
//                             }
//                             placement="right"
//                           >
//                             <Form.Check type="checkbox" disabled />
//                           </OverlayTrigger>
//                         </td>
//                       ) : (
//                         <Form.Check
//                           type="checkbox"
//                           checked={selectedLectures.includes(pred.Predavanje_ID)}
//                           onChange={() => handleCheckboxChange(pred.Predavanje_ID)}
//                         />
//                       )}
//                     </td>
//                     <td>{pred.naziv}</td>
//                     <td>{pred.tip}</td>
//                     <td>{pred.opis}</td>
//                     <td>{pred.brojPolaznika}</td>
//                     <td>{pred.slobodnaMjesta}</td>
//                     <td>{pred.ukupnoMjesta}</td>
//                    <td>{pred.mjestoOdrzavanja}</td> 
//                    <td>{pred.vrijemePocetka}</td>
//                     <td>
//                       <Button
//                         variant="danger"
//                         type="delete"
//                         onClick={() => handleDeleteButton(pred.Predavanje_ID)}
//                       >
//                         Obriši
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8">No data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//           <Button onClick={() => handleSendSelectedPredavanje()} variant="success">
//             Posalji odabrana predavanja
//           </Button>
//         </Row>
//       </Container>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export default function LectureSelection() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLectures, setSelectedLectures] = useState([]);
  const socket = io('http://localhost:8080');
  const navigate = useNavigate();
  const receivedPsihologID = JSON.parse(sessionStorage.getItem('psihologID'));
  const tokenreceived = JSON.parse(sessionStorage.getItem('token'));
  const role = sessionStorage.getItem('userRole');
  const roleToken = sessionStorage.getItem('role'); //stavio sam role umjesto psihoRole
 
 

if (roleToken) { // Check if 'role' is not null
  sessionStorage.setItem('userRole', roleToken); // Set the 'userRole' key with the 'role' value
}

const roleTokenToRegular = sessionStorage.getItem('userRole'); // Retrieve the value from localStorage

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

  const handleSendSelectedPredavanje = () => {
    sessionStorage.setItem('token', JSON.stringify(tokenreceived));
    sessionStorage.setItem('psihologID', JSON.stringify(receivedPsihologID)); //tu sam zamijenio pa stavio na token umjesto na receivedPsihologID
    sessionStorage.setItem('myPredavanja', JSON.stringify(selectedLectures));
    if (selectedLectures.length === 0) {
      alert('Morate odabrati barem jedno predavanje!');
      return;
    }
    navigate('../createpredbiljezba');
  };

  useEffect(() => {
    socket.on('getPredavanja', (fetchingPredavanja) => {
      setLista(fetchingPredavanja);
      setLoading(false);
      let odabirRole = role?role:roleToken;
      console.log(odabirRole);
    });

    socket.on('fetchingError', (errorMessage) => {
      console.error('Error fetching data:', errorMessage);
      setLoading(false);
    });

    socket.emit('getPredavanja');

    return () => {
      socket.off('getPredavanja');
      socket.off('fetchingError');
    };
  }, []);

  return (
    <>
      { roleTokenToRegular ==='admin' || roleTokenToRegular==='admin' ? (
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
                    <th>Mjesto održavanja</th>
                    <th>Vrijeme početka</th>
                    <th>Brisanje predavanja:</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9">Loading...</td>
                    </tr>
                  ) : lista && lista.length > 0 ? (
                    lista.map((pred) => (
                      <tr
                        className={`${
                          pred.slobodnaMjesta <= 0 || pred.ukupnoMjesta === pred.brojPolaznika
                            ? 'disabled-row'
                            : 'bg-warning'
                        }`}
                        key={pred.Predavanje_ID}
                      >
                        <td>
                          {pred.slobodnaMjesta <= 0 || pred.ukupnoMjesta === pred.brojPolaznika ? (
                            <td>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip
                                    style={{
                                      fontSize: '14px',
                                      backgroundColor: 'red',
                                      border: '1px solid black',
                                    }}
                                  >
                                    Ovo predavanje je popunjeno!
                                  </Tooltip>
                                }
                                placement="right"
                              >
                                <Form.Check type="checkbox" disabled />
                              </OverlayTrigger>
                            </td>
                          ) : (
                            <Form.Check
                              type="checkbox"
                              checked={selectedLectures.includes(pred.Predavanje_ID)}
                              onChange={() => handleCheckboxChange(pred.Predavanje_ID)}
                            />
                          )}
                        </td>
                        <td>{pred.naziv}</td>
                        <td>{pred.tip}</td>
                        <td>{pred.opis}</td>
                        <td>{pred.brojPolaznika}</td>
                        <td>{pred.slobodnaMjesta}</td>
                        <td>{pred.ukupnoMjesta}</td>
                        <td>{pred.mjestoOdrzavanja}</td>
                        <td>{pred.vrijemePocetka}</td>
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
                      <td colSpan="9">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Button onClick={() => handleSendSelectedPredavanje()} variant="success">
                Posalji odabrana predavanja
              </Button>
            </Row>
          </Container>
        </>
      ) :  roleTokenToRegular ==='user' ||  roleTokenToRegular === 'odbor' ? (
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
                    <th>Mjesto održavanja</th>
                    <th>Vrijeme početka</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8">Loading...</td>
                    </tr>
                  ) : lista && lista.length > 0 ? (
                    lista.map((pred) => (
                      <tr
                        className={`${
                          pred.slobodnaMjesta <= 0 || pred.ukupnoMjesta === pred.brojPolaznika
                            ? 'disabled-row'
                            : 'bg-warning'
                        }`}
                        key={pred.Predavanje_ID}
                      >
                        <td>
                          {pred.slobodnaMjesta <= 0 || pred.ukupnoMjesta === pred.brojPolaznika ? (
                            <td>
                              <OverlayTrigger
                                overlay={
                                  <Tooltip
                                    style={{
                                      fontSize: '14px',
                                      backgroundColor: 'red',
                                      border: '1px solid black',
                                    }}
                                  >
                                    Ovo predavanje je popunjeno!
                                  </Tooltip>
                                }
                                placement="right"
                              >
                                <Form.Check type="checkbox" disabled />
                              </OverlayTrigger>
                            </td>
                          ) : (
                            <Form.Check
                              type="checkbox"
                              checked={selectedLectures.includes(pred.Predavanje_ID)}
                              onChange={() => handleCheckboxChange(pred.Predavanje_ID)}
                            />
                          )}
                        </td>
                        <td>{pred.naziv}</td>
                        <td>{pred.tip}</td>
                        <td>{pred.opis}</td>
                        <td>{pred.brojPolaznika}</td>
                        <td>{pred.slobodnaMjesta}</td>
                        <td>{pred.ukupnoMjesta}</td>
                        <td>{pred.mjestoOdrzavanja}</td>
                        <td>{pred.vrijemePocetka}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Button onClick={() => handleSendSelectedPredavanje()} variant="success">
                Posalji odabrana predavanja
              </Button>
            </Row>
          </Container>
        </>
      ) : (
        <p>Ne možete pristupiti ovom sadržaju</p>
      )}
    </>
  );
}



