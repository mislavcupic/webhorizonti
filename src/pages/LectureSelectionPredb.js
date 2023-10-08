//with searchstring
import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button, Form } from 'react-bootstrap';
import { io } from 'socket.io-client';
import forbidden from '../assets/media/forbiden.jpg'
import { useNavigate } from 'react-router-dom';

export default function LectureSelectionPredb() {
  const storedRole = localStorage.getItem('userRole');
  const psihologID = localStorage.getItem('psihologID') ? JSON.parse(localStorage.getItem('psihologID')) : null;
  let navigate = useNavigate();
 

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const socket = io('http://localhost:8080');


  
socket.on('getYourOwnPredbiljezbe', (data) => {
  console.log('Received data:', data); // No need for JSON.parse here

  try {
    const predbiljezbeArray = JSON.parse(data);
    setLista(predbiljezbeArray);
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

  const handleGetYourOwnPredbiljezbe = (psihologID) => {
    socket.emit('getYourOwnPredbiljezbe', psihologID);
      console.log('Notifikacija?')
  
        Notification.requestPermission().then(perm =>{
          alert(perm);
        })
  
  
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
      pred.Vrijeme_predbiljezbe.toLowerCase().includes(loweredSearchQuery)
    );
  });

  return (
    <>
      {storedRole === null || psihologID === null ? (
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
              {storedRole === 'admin' || storedRole === 'odbor' ? (
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
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Button onClick={handleGetPredbiljezbe}>Prikaz predbiljezbi</Button>
                </>
              ) : storedRole === 'user' && psihologID ? (
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

