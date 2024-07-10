import React from 'react';
import {Navbar, Container, Nav, Carousel} from 'react-bootstrap';

export default function Info(){
    return(
        <>
            <Navbar className='infoNav' bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">Park java</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">공지사항</Nav.Link>
                        <Nav.Link href="#features">만든사람들</Nav.Link>
                        <Nav.Link href="#pricing">문의하기</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div>
                <h1>AI인공지능 자율주행 단속로봇</h1>
                <p>자율주행 단속로봇을 이용해 더 정확하게 단속하고 단속이 취약하던 지역까지 모두 단속이 가능합니다.</p>
                <hr/>
                <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=f5f5f5"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Second slide&bg=eee"//로봇이 찍은 사진 연결
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h5>Third slide label</h5>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <hr/>
            <div>
                <h2>자율주행 단속로봇의 특장점</h2>
                <p>단속 효율을 극대화 할수 있습니다.</p>
                <hr/>
                <h2></h2>
                <p></p>
                <div className="img1">
                    <div className="img2">
                        <img src="../../../../../public/summer.jpg " className="girlsImage" alt="소녀들사진" />
                    </div>
                </div>
            </div>
        </>


    )
}