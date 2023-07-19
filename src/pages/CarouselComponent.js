import Carousel from "react-bootstrap/Carousel";


function CarouselComponent() {
    return (
      <div>
      <Carousel >
        <Carousel.Item style={{'height':"80vh"}}>
          <img
            className="d-block w-100 text-white active"
            src="https://www.publicdomainpictures.net/pictures/480000/velka/banner-abstrakt-kunst-hintergrund-1670195980Uci.jpg"
            alt="mental-health"
          />
          <Carousel.Caption>
            <h3>Mental Health</h3>
            <p>Bla</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{'height':"80vh"}}>
          <img
            className="d-block w-100"
            // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkovec-zrak2.jpg')}
            src="https://www.publicdomainpictures.net/pictures/470000/velka/banner-abstrakt-textur-hintergrund-1665436199id1.jpg"
            alt="mental-health 2"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{'height':"80vh"}}>
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