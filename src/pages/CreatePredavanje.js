import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
import Predavanje from '../dbFiles/Predavanje';
import { nanoid } from 'nanoid';
import CarouselComponent from './CarouselComponent';
import { io } from 'socket.io-client';
//import { useNavigate } from 'react-router-dom';
import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
//ovo dodajem sad zbog datetimePickera
import ReactDatetime from "react-datetime";
import "react-datetime/css/react-datetime.css";


export default function CreatePredavanje() {
  let Predavanje_ID = nanoid(10);
//   let validates = true;
  let tip = '';
 
 // const navigate = useNavigate();



  const socket = io('http://localhost:8080');

  const [predavanje, setPredavanje] = useState({
    Predavanje_ID: (Predavanje.Predavanje_ID = Predavanje_ID),
    naziv: '',
    tip:tip,
    opis: '',
    brojPolaznika: '',
    slobodnaMjesta: '',
    ukupnoMjesta: '',
    mjestoOdrzavanja:'',
    vrijemePocetka: null // Initialize vrijemePocetka with null

  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputNaziv = (e) => {
    setPredavanje({ ...predavanje, naziv: e.target.value });
  };

  const handleOptionChange = (e) => {
    setPredavanje({...predavanje,
      tip: e.target.value
    });
  };

  const handleInputOpis = (e) => {
    setPredavanje({ ...predavanje, opis: e.target.value });
  };

  const handleInputBrojPolaznika = (e) => {
    setPredavanje({ ...predavanje, brojPolaznika: e.target.value });
  };

  const handleInputSlobodnaMjesta = (e) => {
    setPredavanje({ ...predavanje, slobodnaMjesta: e.target.value });
  };

  const handleInputUkupnoMjesta = (e) => {
    setPredavanje({ ...predavanje, ukupnoMjesta: e.target.value });
  };

  const handleInputMjestoOdrzavanja = (e) => {
    setPredavanje({ ...predavanje, mjestoOdrzavanja: e.target.value });
  };

  const handleVrijemePocetkaChange = (date) => {
    setPredavanje({
      ...predavanje,
      vrijemePocetka: date,
    });
  };
  
  // const submitValues = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Show loading spinner
  //   const inputNaziv = document.getElementById('naziv');
  //   const inputTip = document.getElementById('tip');
  //   const inputOpis = document.getElementById('opis');
  //   const inputBrojPolaznika = document.getElementById('brojPolaznika');
  //   const inputSlobodnaMjesta = document.getElementById('slobodnaMjesta');
  //   const inputUkupnoMjesta = document.getElementById('ukupnoMjesta');

  //   if (predavanje.naziv === '' || predavanje.tip === '' || predavanje.opis === ''|| predavanje.brojPolaznika==='' || predavanje.slobodnaMjesta==='' || predavanje.ukupnoMjesta==='') {
  //     alert('Ispuni sva polja da bi se nastavio proces stvaranja predavanja');
  //     setLoading(false); // Hide loading spinner
  //     return;
  //   }
  //   if (
  //     predavanje.naziv === '' ||
  //     predavanje.tip === '' ||
  //     predavanje.opis === '' ||
  //     predavanje.brojPolaznika === '' ||
  //     predavanje.slobodnaMjesta === '' ||
  //     predavanje.ukupnoMjesta === '' ||
  //     !predavanje.vrijemePocetka // Check if vrijemePocetka is not set
  //   ) {
  //     alert('Ispuni sva polja da bi se nastavio proces stvaranja predavanja');
  //     setLoading(false); // Hide loading spinner
  //     return;
  //   }
  
  //   const confirmWindow = window.confirm(`Želite li pospremiti ovako unesene podatke? 
  //     Naziv: ${predavanje.naziv},
  //     Tip: ${predavanje.tip},
  //     Opis: ${predavanje.opis},
  //     Broj polaznika: ${predavanje.brojPolaznika},
  //     Slobodna mjesta: ${predavanje.slobodnaMjesta},
  //     Ukupno mjesta: ${predavanje.ukupnoMjesta}
  //     Vrijeme početka: ${predavanje.vrijemePocetka}
  //     `);
  
  //   if (confirmWindow) {
  //     try {
  //       const updatedPredavanje = {
  //         ...predavanje,
  //         Predavanje_ID: nanoid(10),
  //         tip: predavanje.tip,
          // vrijemePocetka: predavanje.vrijemePocetka.format(
          //   "YYYY-MM-DD HH:mm:ss"
          // ), // Format vrijemePocetka
  //       };
  //       setPredavanje(updatedPredavanje);
  //       socket.emit('insertPredavanje', updatedPredavanje);
  
  //       setLoading(false); // Hide loading spinner
  //       alert('Uspješno stvoreno predavanje!');
  //       // Clear input fields
  //       setPredavanje({
  //         ...updatedPredavanje,
  //         naziv: '',
  //         tip: '',
  //         opis: '',
  //         brojPolaznika: '',
  //         slobodnaMjesta: '',
  //         ukupnoMjesta: '',
  //         vrijemePocetka: null,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false); // Hide loading spinner
  //     }
  //   } else {
  //     setLoading(false); // Hide loading spinner
  //   }
  // };
  

  const submitValues = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    const inputNaziv = document.getElementById('naziv');
    const inputTip = document.getElementById('tip');
    const inputOpis = document.getElementById('opis');
    const inputBrojPolaznika = document.getElementById('brojPolaznika');
    const inputSlobodnaMjesta = document.getElementById('slobodnaMjesta');
    const inputUkupnoMjesta = document.getElementById('ukupnoMjesta');
    const inputMjestoOdrzavanja = document.getElementById('mjestoOdrzavanja');
    const inputVrijemePocetka = document.getElementById('vrijemePocetka');

    if (predavanje.naziv === '' || predavanje.tip === '' || predavanje.opis === ''|| predavanje.brojPolaznika==='' || predavanje.slobodnaMjesta==='' || predavanje.ukupnoMjesta==='' ||  !predavanje.vrijemePocetka) {
      alert('Ispuni sva polja da bi se nastavio proces stvaranja predavanja');
      setLoading(false); // Hide loading spinner
      return;
    }

    const confirmWindow = window.confirm(`Želite li pospremiti ovako unesene podatke? 
      Naziv: ${predavanje.naziv},
      Tip: ${predavanje.tip},
      Opis: ${predavanje.opis},
      Broj polaznika: ${predavanje.brojPolaznika},
      Slobodna mjesta: ${predavanje.slobodnaMjesta},
      Ukupno mjesta: ${predavanje.ukupnoMjesta},
      Mjesto održavanja: ${predavanje.mjestoOdrzavanja},
      Vrijeme početka: ${predavanje.vrijemePocetka}
      `);

    if (confirmWindow) {
      try {
        // const formattedDate = format(predavanje.vrijemePocetka, "dd.MM.yyyy HH:mm:ss");

        const updatedPredavanje = {
          ...predavanje,
          Predavanje_ID: nanoid(10),
          tip: predavanje.tip,
          // vrijemePocetka: formattedDate
          
        };
        setPredavanje(updatedPredavanje);
        socket.emit('insertPredavanje', updatedPredavanje);
        
        setLoading(false); // Hide loading spinner
        alert('Uspješno stvoreno predavanje!');
        inputNaziv.value = '';
        inputTip.value = '';
        inputOpis.value = '';
        inputBrojPolaznika.value = '';
        inputSlobodnaMjesta.value = '';
        inputUkupnoMjesta.value = '';
        inputMjestoOdrzavanja.value = '';
        inputVrijemePocetka.value = '';
      } catch (err) {
        console.log(err);
        setLoading(false); // Hide loading spinner
      }
    } else {
      setLoading(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    socket.on('insertionError', (errorMessage) => {
      console.error('Error while inserting predavanje:', errorMessage);
      // Handle the error and show a notification to the user
    });
  }, []);

  useEffect(() => {
    socket.on('predavanjeInserted', (insertedPredavanje) => {
      console.log('Predavanje inserted:', insertedPredavanje);
  //    navigate('/');
    });
    socket.on('refreshPage', () => {
      // Refresh the page
    //  location.reload();
    });
   // socket.emit('Predavanje_ID',Predavanje_ID);
  }, []);

  return (
    <>
      <CarouselComponent />
      <Container fluid>
        <Row>
          <Button variant="danger" size="md" onClick={handleShow}>
            <img width={50} height={40} src={horizonti_velik_cropped} alt="Horizonti Logo" />
            Stvaranje predavanja
          </Button>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Stvaranje predavanja za 'Horizonti snage'</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitValues}>
              <Form.Group>
                <Form.Label htmlFor="naziv">Naziv:</Form.Label>
                <Form.Control
                  type="naziv"
                  placeholder="Naziv predavanja"
                  id="naziv"
                  name="naziv"
                  onChange={handleInputNaziv}
                />
              </Form.Group>
              <Form.Group>
          <Form.Label>Odabir tipa predavanja:</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Radionica"
              name="radioGroup"
              value="Radionica"
              checked={tip === 'Radionica'}
              onChange={handleOptionChange}
            />
            <Form.Check
              type="radio"
              label="Primjer dobre prakse"
              name="radioGroup"
              value="Primjer dobre prakse"
              checked={tip === 'Primjer dobre prakse'}
              onChange={handleOptionChange}
            />
            <Form.Check
              type="radio"
              label="Znanstveni i stručni rad"
              name="radioGroup"
              value="Znanstveni i stručni rad"
              checked={tip === 'Znanstveni i stručni rad'}
              onChange={handleOptionChange}
            />
             <Form.Check
              type="radio"
              label="Poster"
              name="radioGroup"
              value="Poster"
              checked={tip === 'Poster'}
              onChange={handleOptionChange}
            />
             <Form.Check
              type="radio"
              label="Okrugli stol"
              name="radioGroup"
              value="Okrugli stol"
              checked={tip === 'Okrugli stol'}
              onChange={handleOptionChange}
            />
             <Form.Check
              type="radio"
              label="Simpozij"
              name="radioGroup"
              value="Simpozij"
              checked={tip === 'Simpozij'}
              onChange={handleOptionChange}
            />
             <Form.Check
              type="radio"
              label="Ted talk"
              name="radioGroup"
              value="Ted talk"
              checked={tip === 'Ted talk'}
              onChange={handleOptionChange}
            />
             <Form.Check
              type="radio"
              label="Out of the box"
              name="radioGroup"
              value="Out of the box"
              checked={tip === 'Out of the box'}
              onChange={handleOptionChange}
            />
          </div>
        </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="opis">Opis predavanja:</Form.Label>
                <Form.Control
                  type="opis"
                  name="opis"
                  placeholder="Ovdje unesi opis predavanja"
                  id="opis"
                  onChange={handleInputOpis}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="brojPolaznika">Broj polaznika:</Form.Label>
                <Form.Control
                  type="brojPolaznika"
                  name="brojPolaznika"
                  placeholder="Broj polaznika"
                  id="brojPolaznika"
                  onChange={handleInputBrojPolaznika}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="slobodnaMjesta">Slobodna mjesta:</Form.Label>
                <Form.Control
                  type="slobodnaMjesta"
                  name="slobodnaMjesta"
                  placeholder="Slobodna mjesta..."
                  id="slobodnaMjesta"
                  onChange={handleInputSlobodnaMjesta}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="ukupnoMjesta">Ukupno mjesta:</Form.Label>
                <Form.Control
                  type="ukupnoMjesta"
                  name="ukupnoMjesta"
                  placeholder="Ukupno mjesta"
                  id="ukupnoMjesta"
                  onChange={handleInputUkupnoMjesta}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="mjestoOdrzavanja">Mjesto održavanja: </Form.Label>
                <Form.Control
                  type="mjestoOdrzavanja"
                  placeholder="Mjesto održavanja predavanja..."
                  id="mjestoOdrzavanja"
                  name="mjestoOdrzavanja"
                  onChange={handleInputMjestoOdrzavanja}
                />
              </Form.Group>
              <Form.Group>
  <Form.Label htmlFor="vrijemePocetka">Vrijeme početka:</Form.Label>
  <ReactDatetime
    inputProps={{
      id: "vrijemePocetka",
      name: "vrijemePocetka",
      placeholder: "Odaberite datum i vrijeme",
    }}
    value={predavanje.vrijemePocetka} // Use predavanje.vrijemePocetka as the value
    onChange={handleVrijemePocetkaChange}
  />
</Form.Group>


              <br />
              <Button variant="primary" type="submit">
                {loading ? (
                  <>
                    <Spinner animation="border" size="md" />
                    Submitting...
                  </>
                ) : (
                  'Stvori novo predavanje'
                )}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}