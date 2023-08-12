import React from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Predbiljezba from '../dbFiles/Predbiljezba'
import Psiholog from '../dbFiles/Psiholog'
import Predavanje from '../dbFiles/Predavanje'
export default function CreatePredbiljezba() {

  let Predbiljezbe_ID = nanoid(10);
  const [predbiljezba,setPredbiljezba] = useState([{
    Predbiljezbe_ID: (Predbiljezba.Predbiljezbe_ID = Predbiljezbe_ID),
    ime: '',
    prezime: '',
    email: '',
    naziv: '',
    tip:tip,
    opis: '',
    brojPolaznika: '',
    slobodnaMjesta: '',
    ukupnoMjesta: ''

  }])



  return (
    <>
    <Container fluid>
        <Row>
          <Button variant="primary" size="md" onClick={handleShow}>
            <img width={50} height={40} src={horizonti_velik_cropped} alt="Horizonti Logo" />
            Prijava na 'Horizonti snage'
          </Button>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Prijava na konferenciju 'Horizonti snage'</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                {loading ? (
                  <>
                    <Spinner animation="border" size="md" />
                    Submitting...
                  </>
                ) : (
                  'Click here to submit form'
                )}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  )
}
