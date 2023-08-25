// import Carousel from "react-bootstrap/Carousel";


// function CarouselComponent() {
//     return (
//       <div>
//       <Carousel >
//         <Carousel.Item style={{'height':"80vh"}}>
//           <img
//             className="d-block w-100 text-white active"
//             src="https://www.publicdomainpictures.net/pictures/480000/velka/banner-abstrakt-kunst-hintergrund-1670195980Uci.jpg"
//             alt="mental-health"
//           />
//           <Carousel.Caption>
//             <h3>Mental Health</h3>
//             <p>Bla</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item style={{'height':"80vh"}}>
//           <img
//             className="d-block w-100"
//             // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkovec-zrak2.jpg')}
//             src="https://www.publicdomainpictures.net/pictures/470000/velka/banner-abstrakt-textur-hintergrund-1665436199id1.jpg"
//             alt="mental-health 2"
//           />
  
//           <Carousel.Caption>
//             <h3>Second slide label</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item style={{'height':"80vh"}}>
//           <img
//             className="d-block w-100"
//             // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkovec-zrak2.jpg')}
//             src="https://c1.wallpaperflare.com/preview/504/588/842/waterfall-nature-water-croatia.jpg"
//             alt="mental-health 2"
//           />
  
//           <Carousel.Caption>
//             <h3>Second slide label</h3>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item style={{'height':"80vh"}}>
//           <img
//             className="d-block w-100"
//             // src={require('C:\\Users\\misla\\web-jelk\\src\\assets\\jelkoveczrak.jpg')}
//             src="https://www.picpedia.org/chalkboard/images/mental-health-treatment.jpg"
//             alt="Third slide"
//           />
  
//           <Carousel.Caption>
//             <h3>Third slide label</h3>
//             <p>
//               Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//             </p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>
     
//       </div>
//     );
//   }
  
//   export default CarouselComponent;
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../App.css"; // Import a CSS file for custom styling

function CarouselComponent() {
  return (
    <div className="carousel-wrapper">
      <Carousel indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.publicdomainpictures.net/pictures/480000/velka/banner-abstrakt-kunst-hintergrund-1670195980Uci.jpg"
            alt="Mental Health"
          />
          <Carousel.Caption>
            <h3>Mental Health</h3>
            <p>Bla</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.publicdomainpictures.net/pictures/470000/velka/banner-abstrakt-textur-hintergrund-1665436199id1.jpg"
            alt="Mental Health 2"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://c1.wallpaperflare.com/preview/504/588/842/waterfall-nature-water-croatia.jpg"
            alt="Mental Health 3"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.picpedia.org/chalkboard/images/mental-health-treatment.jpg"
            alt="Mental Health 4"
          />
          <Carousel.Caption>
            <h3>Fourth slide label</h3>
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
