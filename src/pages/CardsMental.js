import React from 'react'
import {Card} from 'react-bootstrap'

export default function CardsMental() {
  return (
    <div>
   
       <Card style={{ width: '18 rem' }} > 
        <Card.Img variant="top" className='card-img' src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Nature-View.jpg"/>
        {/* // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkovec-zrak2.jpg')}  */}
        <Card.Body>
          <Card.Title>Kako do mentalnog zdravlja?</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
        </Card>
      
       
    </div>
  )
}
