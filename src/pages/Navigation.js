
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from './Logo'


function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light"  >
    <Navbar.Brand href="#home">
      <Logo
        alt=""
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
     Horizonti
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavDropdown title="About" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/about">O nama</NavDropdown.Item>
          <NavDropdown.Item href="/about/introductionspeech">Pozdravni govor</NavDropdown.Item>
          <NavDropdown.Item href="/about/organizingcomettee">
            Programsko povjerenstvo
          </NavDropdown.Item>
          <NavDropdown.Item href="/about/theplaceofevent">Mjesto odrzavanja</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Kotizacije i smještaj" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/registrationfeesaccommodation">Kotizacije i smještaj</NavDropdown.Item>
          <NavDropdown.Item href="/registrationfeesaccommodation/dataprotection">
            Zaštita podataka
          </NavDropdown.Item>
  
          <NavDropdown.Divider />
          <NavDropdown.Item href="application">
            Prijava na događaj
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Navigation;