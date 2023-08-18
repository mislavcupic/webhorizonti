import React, { useState } from 'react'
import { Container, Row, Form, Button, Modal, Spinner } from 'react-bootstrap';
import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';
import { useNavigate } from 'react-router-dom';

export default function InsertToken() {
  const navigate = useNavigate();
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const [input,setInput] = useState('');
  const handleInputToken = (e) =>{
    setInput(e.target.value);
  }
  const submitValues = async (e) => {
    e.preventDefault();

    const inputToken = document.getElementById('token');
   

    if (inputToken === '' && inputToken.value.length()!== 10) {
      alert('Ispravi unos ili ponovno kopiraj token na ovo mjesto  da bi se nastavio proces prijave na stručni skup "Horizonti snage"');
      return;
    }

    const confirmWindow = window.confirm(`Želite li pospremiti ovako unesene podatke?
      Token: ${input}`)
      
    if (confirmWindow) {
      try {
        setIsWaitingForConfirmation(true);

        localStorage.setItem('token', JSON.stringify(input));

    

        // Set timeout only if submission takes longer than 5000 ms
        const insertionTimeout = setTimeout(() => {
          setIsWaitingForConfirmation(false);
          alert('Insertion took longer than expected. Please try again.');
        }, 15000);

       
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
                  <Form.Label htmlFor="ime">Unesi dobiveni token:</Form.Label>
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
