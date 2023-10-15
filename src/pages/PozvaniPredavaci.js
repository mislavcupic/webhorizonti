import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardGroup } from 'react-bootstrap';
import '../App.css';

import mislav1 from '../assets/media/BackgroundEraser_20231014_103845539.png';
import mislav2 from '../assets/media/BackgroundEraser_20231014_103826161.png';

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
  const examDate = new Date('2023-10-14');
  const examDate2 = new Date('2023-10-14');
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

  // Use state to track image source change
  const [mislavImage, setMislavImage] = useState(mislav1);

  const handleImageHover = () => {
    setMislavImage(mislav2); // Change the image source to mislav2
  };

  const handleImageLeave = () => {
    setMislavImage(mislav1); // Change the image source back to mislav1 when the user stops hovering
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <div className="custom-card">
                  <Card.Img
                  style={{width:'350px', height:'385px'}}
                    variant="top"
                    className="card-img custom-image" // Add the custom-image class
                    src={mislavImage} // Use the mislavImage state variable
                    onMouseOver={handleImageHover} // Handle image source change on hover
                    onMouseOut={handleImageLeave} // Handle image source change on hover out
                  />
                  <div className="img-overlay-predavaci"></div>
                </div>
                <Card.Body>
                  <Card.Title>{list[1]}</Card.Title>
                  <Card.Text>{listDescription[1]}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{handleRemainingTime()}</small>
                </Card.Footer>
              </Card>
              <Card>
                <div className="custom-card">
                  <Card.Img
                  style={{width:'350px', height:'385px'}}
                    variant="top"
                    className="card-img custom-image" // Add the custom-image class
                    src={mislavImage} // Use the mislavImage state variable
                    onMouseOver={handleImageHover} // Handle image source change on hover
                    onMouseOut={handleImageLeave} // Handle image source change on hover out
                  />
                  <div className="img-overlay-predavaci"></div>
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
          {/* ... Repeat the same pattern for other cards */}
        </Row>
        {/* ... Repeat the same pattern for other rows */}
      </Container>
    </div>
  );
}
