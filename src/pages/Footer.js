import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import horizonti_velik_cropped from '../assets/media/horizonti_velik_cropped.png';

export default function Footer() {
  return (
    <footer   style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.8)' }} className='text-white'>
      <div className='p-4'>
        <Container>
          <Row className='py-4 align-items-center'>
            <Col md='6' lg='5' className='text-center text-md-left mb-4 mb-md-0'>
              <img width={40} height={30} src={horizonti_velik_cropped} alt='logo' />
              <h6 className='mb-0 ms-3'>Horizonti snage</h6>
              <p className='mt-2'>
                'Horizonti snage predstavlja svoju drugu konferenciju s temom, kako preživjeti život bez smrti do kraja života'
              </p>
            </Col>
            <Col md='6' lg='7' className='text-center text-md-right'>
              <div className='mb-4'>
                <a href='https://www.psiholoska-komora.hr/' className='me-4 text-reset'>
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href='https://twitter.com' className='me-4 text-reset'>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href='https://google.com' className='me-4 text-reset'>
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href='https://instagram.com' className='me-4 text-reset'>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href='https://linkedin.com' className='me-4 text-reset'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        © {new Date().getFullYear()} Horizonti snage. All rights reserved.
      </div>
    </footer>
  );
}

