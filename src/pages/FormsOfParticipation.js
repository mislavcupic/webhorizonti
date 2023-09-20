
// import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import '../App.css'; // Import your CSS file

export default function FormsOfParticipation() {
  const list = [
    'Radionica',
    'Primjer dobre prakse',
    'Znanstveni i stručni radovi',
    'Poster',
    'Okrugli stol',
    'Simpozij',
    'Ted talk',
    'Out of the box',
  ];
  const listDescription = [
    'Interaktivno učenje i poučavanje sudionika o odabranoj temi, kojim se kod njih razvija neka vještina ili osjetljivost za neki problem.',
    'Prikazi provedenih aktivnosti u nastavi, školskih projekata, preventivnih programa, programa za rad s darovitima, raznih tematskih aktivnosti...',
    'Prikazi provedenih istraživanja (npr. akcijskih i/ili razvojnih) i njihovih rezultata',
    'Prezentacije različitih tema, koje omogućuju intenzivniju interakciju autora s drugim sudionicima tijekom trajanja poster-sekcije. Posteri trebaju biti vertikalne orijentacije, dimenzija 90 cm (širina) x 120 cm (visina).',
    'Rasprava više stručnjaka o nekoj temi aktualnoj za školsku psihologiju. Voditelj/ica prijavljuje temu okruglog stola i vodi njegovu prijavu i organizaciju.',
    'Događaj na kojem sudionici imaju izlaganja i raspravu o zajedničkoj temi. Voditelj simpozija predlaže temu i bira sudionike te određuje trajanje pojedinačnih izlaganja koje je najčešće 10-15 minuta.',
    'Kratko inspirativno i dinamično predavanje o nekoj aktualnoj temi vezanoj uz područje psihologije.',
    'Prikazi korištenja novih, inovativnih i kreativnih tehnika u radu, npr. igre, storytelling, larp...',
  ];

  const currentDate = new Date();
  const examDate = new Date('2023-07-29'); // Replace with your desired exam date
  const examDate2 = new Date('2023-07-28');
  const timeDifference = Math.abs(examDate - currentDate);
  const newDaysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const newHoursRemaining = Math.ceil(timeDifference / (1000 * 60 * 60));

  const handleRemainingTime = () => {
    if (newDaysRemaining <= 1) {
      return 'objavljeno prije ' + newHoursRemaining + ' sati';
    }
    return 'objavljeno prije ' + newDaysRemaining + ' dana';
  };

  const timeDifference2 = Math.abs(examDate2 - currentDate);
  const newDaysRemaining2 = Math.ceil(timeDifference2 / (1000 * 60 * 60 * 24));

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://i0.hippopx.com/photos/168/829/316/faculty-workshop-professional-training-academic-preview.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[0]}</Card.Title>
                  <Card.Text>{listDescription[0]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{handleRemainingTime()}</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://www.thebluediamondgallery.com/handwriting/images/practice.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[1]}</Card.Title>
                  <Card.Text>{listDescription[1]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{handleRemainingTime()}</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://c0.wallpaperflare.com/preview/817/823/802/knowledge-spark-flash-hand.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[2]}</Card.Title>
                  <Card.Text>{listDescription[2]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {'objavljeno prije ' + newDaysRemaining2 + ' dana'}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://c1.wallpaperflare.com/preview/812/952/1011/brain-mind-psychology-idea.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[3]}</Card.Title>
                  <Card.Text>{listDescription[3]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {'objavljeno prije ' + newDaysRemaining + ' dana'}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://i0.hippopx.com/photos/495/478/444/team-table-playmobil-round-table-preview.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[4]}</Card.Title>
                  <Card.Text>{listDescription[4]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {'objavljeno prije ' + newDaysRemaining + ' dana'}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://c1.wallpaperflare.com/preview/677/164/866/audience-speech-speaker-presentation.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[5]}</Card.Title>
                  <Card.Text>{listDescription[5]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {'objavljeno prije ' + newDaysRemaining + ' dana'}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://pb-assets.tedcdn.com/system/baubles/files/000/001/441/original/TEDWomen2015_attend_hero.jpg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[6]}</Card.Title>
                  <Card.Text>{listDescription[6]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {'objavljeno prije ' + newDaysRemaining + ' dana'}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                    variant="top"
                    className="card-img"
                    src="https://upload.wikimedia.org/wikipedia/commons/1/11/Thinking_out_of_the_box_4.svg"
                  />
                  <div className="img-overlay"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[7]}</Card.Title>
                  <Card.Text>{listDescription[7]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {'objavljeno prije ' + newDaysRemaining + ' dana'}
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
