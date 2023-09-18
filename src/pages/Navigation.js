import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from './Logo';
import '../App.css'; // You can create a CSS file for custom styling
import HamburgerIcon from '../assets/media/hamburger-icon.png'; // Import your hamburger icon image

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'hsla(232, 87%, 98%, 0.8)', height: '100px' }} variant="dark" className={`modern-navbar sticky-top ${menuOpen ? 'opened' : ''}`}>
      <Navbar.Brand href="/">
        <Logo alt="" width="30" height="30" className="d-inline-block align-top" type="file" />
        Horizonti
      </Navbar.Brand>
      <Navbar.Toggle onClick={toggleMenu} aria-controls="responsive-navbar-nav" className="menu">
        <img src={HamburgerIcon} style={{width:'42px', height:'30px', backgroundColor: 'hsla(210, 70%, 50%, 0.8)'}} alt="Hamburger Menu" className={`hamburger-icon ${menuOpen ? 'opened' : ''}`} />
      </Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={`mr-auto ${menuOpen ? 'nav-open' : ''}`}>
          <Nav.Link href="/" className={`nav-link ${menuOpen ? 'nav-link-open' : ''}`}>Home</Nav.Link>
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
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registrationfeesaccommodation/popissazetaka">
              Popis sažetaka
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/registrationfeesaccommodation/eventregistration" className={`nav-link ${menuOpen ? 'nav-link-open' : ''}`}>Prijava</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;

