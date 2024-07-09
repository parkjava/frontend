import React from "react";
import {Container, Navbar} from "react-bootstrap";

export default function Header() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/"><b>ParkJava</b></Navbar.Brand>
                    <Navbar.Brand href="/controll">Controll</Navbar.Brand>
                    <Navbar.Brand href="/notice">Notice</Navbar.Brand>
                    <Navbar.Brand href="/login">Login</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
}
