import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from './Logo';
import '../App.css'; // You can create a CSS file for custom styling

function Navigation() {
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="modern-navbar">
      <Navbar.Brand href="#home">
        <Logo alt="" width="30" height="30" className="d-inline-block align-top" type="file" />
        Horizonti
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="About" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/about">O nama</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/about/introductionspeech">Pozdravni govor</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/about/organizingcomettee">Programsko povjerenstvo</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/about/theplaceofevent">Mjesto odrzavanja</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Kotizacije i smještaj" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/registrationfeesaccommodation">Kotizacije i smještaj</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/dataprotection">Zaštita podataka</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/eventregistration">Prijava na događaj</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/formsofparticipation">
              Oblici sudjelovanja
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/inserttoken">
              Token - prijava predavanja
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/lectureselectionpredb">
              Predbilježbe
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/createpredavanje">
              Stvori predavanje
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/createpredbiljezba">
              Stvori novu predbiljezbu
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/registrationfeesaccommodation/eventregistration">Prijava</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
