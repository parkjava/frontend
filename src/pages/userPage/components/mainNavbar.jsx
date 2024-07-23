import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function mainNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">parkjava</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="#menu1" className=''>메뉴1</Nav.Link>
            <Nav.Link href="#menu2">메뉴2</Nav.Link>
            <Nav.Link href="#menu3">메뉴3</Nav.Link>
            <Nav.Link href="#menu4">메뉴4</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default mainNavbar;
