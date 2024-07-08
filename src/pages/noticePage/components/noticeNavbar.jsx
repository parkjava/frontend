import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function MainNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">parkjava</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="#menu1" className=''>관제페이지</Nav.Link>
            <Nav.Link href="#menu2">차량 조회</Nav.Link>
            <Nav.Link href="#menu3">신고 내역</Nav.Link>
            <Nav.Link href="#menu4">공지 사항</Nav.Link>
            <Nav.Link href="#menu5">네비게이션</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

