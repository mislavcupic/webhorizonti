import Carousel from "react-bootstrap/Carousel";


function CarouselComponent() {
    return (
      <div>
      <Carousel>
        <Carousel.Item >
          <img
            className="d-block w-100 text-white active"
            src="https://i0.wp.com/www.randomlengthsnews.com/wp-content/uploads/2023/05/AI_mural_mentalhealth-e1684430089947.jpeg?fit=600%2C332&ssl=1"
            alt="mental-health"
          />
          <Carousel.Caption>
            <h3>Mental Health</h3>
            <p>Bla</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkovec-zrak2.jpg')}
            src="https://mentalhealthtoday.co.uk/media/36941/mental-health-art-prime.jpg"
            alt="mental-health 2"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkoveczrak.jpg')}
            src="https://www.picpedia.org/chalkboard/images/mental-health-treatment.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
     
      </div>
    );
  }
  
  export default CarouselComponent;