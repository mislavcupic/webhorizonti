//with searchstring
import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import forbidden from '../assets/media/forbiden.jpg'
import { useNavigate } from 'react-router-dom';

export default function LectureSelectionPredb() {

const role = localStorage.getItem('role'); // Get the value from 'psihoRole'
const token = JSON.parse(localStorage.getItem('token'));
if (role) { // Check if 'role' is not null
  localStorage.setItem('userRole', role); // Set the 'userRole' key with the 'role' value
}

const roleTokenToRegular = localStorage.getItem('userRole'); // Retrieve the value from localStorage


// Ensure that 'roleTokenToRegular' is used after it has been set

// const role = localStorage.getItem('psihoRole'); // Get the value from 'psihoRole'
// localStorage.setItem('userRole', role); // Set the 'userRole' key with the 'role' value
// const roleTokenToRegular = localStorage.getItem('userRole'); // Retrieve the value from localStorage
// console.log(roleTokenToRegular); // Log the 'userRole' value


  const psihologID = localStorage.getItem('psihologID') ? JSON.parse(localStorage.getItem('psihologID')) : role;
  console.log(roleTokenToRegular); // Log the 'userRole' value
  // storedRole = role;
  let navigate = useNavigate();
 

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const socket = io('http://localhost:8080');
  //const currentDate = new Date();
  // const notification =   Notification.requestPermission().then(perm =>{
  //   alert(perm);
  // })
  // const timeDifference = Math.abs(lista.vrijemePocetka - currentDate);
  // const newDaysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

socket.on('getYourOwnPredbiljezbe', (data) => {
  console.log('Received data:', data); // No need for JSON.parse here

  try {
    const predbiljezbeArray = JSON.parse(data);
    setLista(predbiljezbeArray);
    let odabirRole = role?role:storedRole;
    console.log(odabirRole);
    setLoading(false);
  } catch (error) {
    console.error('Error while processing data:', error);
    setLoading(false);
  }
});
  
const handleNavigate = () => {
  navigate('../registrationfeesaccommodation/eventregistration');
}
  const handleGetPredbiljezbe = () => {
    socket.emit('getPredbiljezbe');
  };

  const handleGetYourOwnPredbiljezbe = (psihologID = token) => {  //umjesto psihologID probat ću gurnut token
    console.log(token);

    socket.emit('getYourOwnPredbiljezbe', psihologID=token);
      console.log('Notifikacija?')
      // let odabirRole = role?role:roleToken;   //zakomentirao sam!
      // console.log(odabirRole);                 //zakomentirao sam!

  
        // Notification.requestPermission().then(perm =>{
        //   alert(perm);
        // })
  
  
  }
  

  useEffect(() => {
   
    socket.on('getPredbiljezbe', (data) => {
      console.log('Received data:', data);
    
      try {
        if (data && data.recordset) {
          const predbiljezbeArray = data.recordset;
          setLista(predbiljezbeArray);
          setLoading(false);
        } else {
          console.error('Received data is in an unexpected format:', data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error while processing data:', error);
        setLoading(false);
      }
    });
    
    
    

    socket.on('fetchingError', (errorMessage) => {
      console.error('Error fetching data:', errorMessage);
      setLoading(false);
    });

    return () => {
      socket.off('getPredbiljezbe');
      socket.off('fetchingError');
    };
  }, []);

  const filteredList = lista.filter((pred) => {
    const loweredSearchQuery = searchQuery.toLowerCase();
    return (
      pred.naziv.toLowerCase().includes(loweredSearchQuery) ||
      pred.tip.toLowerCase().includes(loweredSearchQuery) ||
      pred.ime.toLowerCase().includes(loweredSearchQuery) ||
      pred.prezime.toLowerCase().includes(loweredSearchQuery) ||
      pred.Vrijeme_predbiljezbe.toLowerCase().includes(loweredSearchQuery) ||
      pred.vrijemePocetka.toLowerCase().includes(loweredSearchQuery)||
      pred.mjestoOdrzavanja.toLowerCase().includes(loweredSearchQuery)
    );
  });

  return (
    <>
      {roleTokenToRegular === null || psihologID === null ? (
        // <div><img src={forbiden} style={{width:'50px', height:'50p'}} alt='STOP'></img>You must login to see this page. You have not permission to enter this page. Go to ${handleNavigate} </div>
        <div>
    <img src={forbidden} style={{ width: '50px', height: '50px' }} alt='STOP' />
    Morate se prijaviti kao sudionik da biste vidjeli sadržaj ove stranice. Nemate pravo pristupa sadržaju ove stranice!{' '}
    <span onClick={() => navigate('../eventregistration')}style={{color: 'blue'}}>
      Prijavi se!
    </span>
  </div>
      ) : (
        <>
          <p>Predbilježbe:</p>
          <Container>
            <Row>
              {roleTokenToRegular === 'admin' || roleTokenToRegular === 'odbor' ? (
                <>
                  <Form.Group>
                    <Form.Label htmlFor='pretraga'>Pretraži predbilježbe:</Form.Label>
                    <Form.Control
                      name="pretraga"
                      id="pretraga"
                      type="text"
                      placeholder="Pretraga po nazivu, imenu, prezimenu, tipu predavanja ili vremenu predbilježbe..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form.Group>

                  <br />
                  <hr />

                  <Table striped bordered hover>
                    <thead className="bg-primary">
                      <tr>
                        <th>Ime: </th>
                        <th>Prezime: </th>
                        <th>Email: </th>
                        <th>Datum: </th>
                        <th>Naziv: </th>
                        <th>Tip: </th>
                        <th>Opis: </th>
                        <th>Vrijeme predbilježbe</th>
                        <th>Mjesto održavanja</th>
                        <th>Vrijeme početka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8">Loading...</td>
                        </tr>
                      ) : filteredList.length === 0 ? (
                        <tr>
                          <td colSpan="8">No data available.</td>
                        </tr>
                      ) : (
                        filteredList.map((pred) => (
                          <tr className="bg-warning" key={pred.Predbiljezbe_ID}>
                            <td>{pred.ime}</td>
                            <td>{pred.prezime}</td>
                            <td>{pred.email}</td>
                            <td>{pred.datetime}</td>
                            <td>{pred.naziv}</td>
                            <td>{pred.tip}</td>
                            <td>{pred.opis}</td>
                            <td>{pred.Vrijeme_predbiljezbe}</td>
                            <td>{pred.mjestoOdrzavanja}</td>
                            <td>{pred.vrijemePocetka}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Button onClick={handleGetPredbiljezbe}>Prikaz predbiljezbi</Button>
                </>
              ) : roleTokenToRegular === 'user' && psihologID ? (
                <>
                  <Table striped bordered hover>
                    <thead className="bg-primary">
                      <tr>
                        <th>Ime: </th>
                        <th>Prezime: </th>
                        <th>Email: </th>
                        <th>Datum: </th>
                        <th>Naziv: </th>
                        <th>Tip: </th>
                        <th>Opis: </th>
                        <th>Vrijeme predbilježbe</th>
                        <th>Mjesto održavanja</th>
                        <th>Vrijeme početka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8">Loading...</td>
                        </tr>
                      ) : filteredList.length === 0 ? (
                        <tr>
                          <td colSpan="8">No data available.</td>
                        </tr>
                      ) : (
                        filteredList.map((pred) => (
                          <tr className="bg-warning" key={pred.Predbiljezbe_ID}>
                            <td>{pred.ime}</td>
                            <td>{pred.prezime}</td>
                            <td>{pred.email}</td>
                            <td>{pred.datetime}</td>
                            <td>{pred.naziv}</td>
                            <td>{pred.tip}</td>
                            <td>{pred.opis}</td>
                            <td>{pred.Vrijeme_predbiljezbe}</td>
                            <td>{pred.mjestoOdrzavanja}</td>
                            <td>{pred.vrijemePocetka}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Button  onClick={() => handleGetYourOwnPredbiljezbe(psihologID)}>Osobne predbilježbe</Button>
                </>
              ) : null}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
// return (
//   <>
//     {roleTokenToRegular === null || psihologID === null ? (
//       <div>
//         <img src={forbidden} style={{ width: '50px', height: '50px' }} alt='STOP' />
//         Morate se prijaviti kao sudionik da biste vidjeli sadržaj ove stranice. Nemate pravo pristupa sadržaju ove stranice!{' '}
//         <span onClick={() => navigate('../eventregistration')} style={{ color: 'blue' }}>
//           Prijavi se!
//         </span>
//       </div>
//     ) : (
//       <>
//         <p>Predbilježbe:</p>
//         <Container>
//           <Row>
//             <Table striped bordered hover className="modern-table">
//               <thead className="bg-primary">
//                 <tr>
//                   <th>Header</th>
//                   <th>Data</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td>Loading...</td>
//                     <td></td>
//                   </tr>
//                 ) : filteredList.length === 0 ? (
//                   <tr>
//                     <td>No data available.</td>
//                     <td></td>
//                   </tr>
//                 ) : (
//                   filteredList.map((pred) => (
//                     <>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'ime'}>
//                         <td>Ime:</td>
//                         <td>{pred.ime}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'prezime'}>
//                         <td>Prezime:</td>
//                         <td>{pred.prezime}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'email'}>
//                         <td>E mail:</td>
//                         <td>{pred.email}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'datetime'}>
//                         <td>Datum:</td>
//                         <td>{pred.datetime}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'naziv'}>
//                         <td>Naziv predavanja:</td>
//                         <td>{pred.naziv}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'tip'}>
//                         <td>Tip predavanja:</td>
//                         <td>{pred.tip}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'opis'}>
//                         <td>Opis predavanja:</td>
//                         <td>{pred.opis}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'vrijemePredbiljezbe'}>
//                         <td>Vrijeme predbilježbe:</td>
//                         <td>{pred.Vrijeme_predbiljezbe}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'mjestoOdrzavanja'}>
//                         <td>Mjesto održavanja:</td>
//                         <td>{pred.mjestoOdrzavanja}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID + 'vrijemePocetka'}>
//                         <td>Vrijeme početka:</td>
//                         <td>{pred.vrijemePocetka}</td>
//                       </tr>
//                       <tr className="bg-warning" key={pred.Predbiljezbe_ID}>
//                         <td></td>
//                         <td></td>
//                       </tr>
//                       {/* Add similar rows for other data */}
//                     </>
//                   ))
//                 )}
//                 <tr>
//                   <td>Vrijeme početka:</td>
//                   <td></td>
//                 </tr>
//               </tbody>
//             </Table>
//             <Button onClick={handleGetPredbiljezbe}>Prikaz predbiljezbi</Button>
//           </Row>
//         </Container>
//       </>
//     )}
//   </>
// )};




  
