import React from 'react'
import { CardGroup, Container, Col, Row } from 'react-bootstrap'
import CardsMental from './CardsMental'

export default function DataProtection() {
  return (
    <> 
    <Container>
      <Row> 
        <Col>
          <CardGroup  > 
             <CardsMental/> 
          </CardGroup>
        </Col>
        <Col>
           <CardGroup  > 
              <CardsMental/> 
           </CardGroup>
        </Col>
      </Row>
    </Container>
     
    
   
    Data Protection site...


  </>
  )
}
