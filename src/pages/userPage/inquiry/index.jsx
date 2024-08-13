import {Form, Row, Col, Button, Alert, Container} from 'react-bootstrap';
import React, {useRef, useState, useEffect} from "react";
import '../../../static/common.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import question from '../../../static/images/question.png'
import check from '../../../static/images/checklist.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Card from 'react-bootstrap/Card';

import styled from 'styled-components'

export default function Index() {
    const [inquiryText, setInquiryText] = useState({
        title: '',
        content: '',
        name: '',
        email: '',
        phone: '',
        date: '',
    });

    const [inquiryList, setInquiryList] = useState({
        title: '',
        name: '',
        phone: '',
        content: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // 상태 추가
    
    const [modalOpen, setModalOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const modalBackground = useRef();
    const historyBackground = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        // 모든 필드가 입력되었는지 확인
        const allFieldsFilled = Object.values(inquiryText).every(field => field !== '');
        setIsFormValid(allFieldsFilled);
    }, [inquiryText]);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜 설정
        setInquiryText(prevState => ({
            ...prevState,
            date: currentDate,
        }));
        
        setInquiryList(prevState => ({
            ...prevState,
            date: currentDate,
        }))
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInquiryText({
            ...inquiryText,
            [name]: value,
        });
        setInquiryList({
            ...inquiryList,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newInquiry = {
            inquiryTitle: inquiryText.title,
            inquiryContent: inquiryText.content,
            inquiryWriter: inquiryText.name,
            inquiryEmail: inquiryText.email,
            inquiryPhone: inquiryText.phone,
            inquiryDate: inquiryText.date,
        };


        axios.post('http://localhost:8080/user/api/inquiry/create', newInquiry)
            .then((response) => {
                alert("문의가 접수되었습니다.")
                setInquiryText({
                    title: '',
                    content: '',
                    name: '',
                    email: '',
                    phone: '',
                    date: '', // 성공적으로 등록 후 초기화
                });
                setShowMessage(true); // 메시지 표시
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/user',{replace:true});
                });
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    const handleGet = (e) => {
        e.preventDefault();
        const inquiryPhone = inquiryList.phone
        axios
            .get(`http://localhost:8080/user/api/inquiry/phone/${inquiryPhone}`)
            .then((res) => {
                const data = res.data
                
                if (data.length > 0) {
                    setInquiryList({
                        title: data[0].inquiryTitle,
                        name: data[0].inquiryWriter,
                        phone: data[0].inquiryPhone,
                        content: data[0].inquiryContent,
                        date: data[0].inquiryDate.split('T')[0],
                    });
                } else {
                    alert('문의 내역을 찾을 수 없습니다.');
                }
            })
            .catch((error) => console.error('Error saving data:', error));
    }

    const [backGroundColor, setBackGroundColor] = useState('skyblue')

    const backGroundColorHandler = () => {
        setBackGroundColor(backGroundColor === 'skyblue' ? 'yellow' : 'skyblue')
    }

    
    const StyledButton = styled.button`
    background-color: red;
    padding: 20px;
    border-radius: 10px;
    `

    return (
        <>
            <div className={'commonContainer'}>
                <h1 className='pt-4' style={{textAlign: 'center'}}><FontAwesomeIcon icon={faComment} bounce style={{color: '#B197FC'}} /> <span onClick={backGroundColorHandler} style={{backgroundColor: backGroundColor}}>무늬하기's</span></h1>
                <div className={'cards'}>
                    <Card style={{width: '18rem'}} className={'card1'}>
                        <Card.Img className={'cardImages'} variant="top" src={question}/>
                        <Card.Body className={'cardBody'}>
                            <Card.Title>물어보세요</Card.Title>
                            <Card.Text>
                                궁금한점이 있다면, 얼마든지 문의사항을 작성해 주시기 바람둥
                            </Card.Text>
                            <Button className={'modalOpenBtn'} variant="primary" onClick={() => setModalOpen(true)}>
                                문의하기
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '18rem'}} className={'card2'}>
                        <Card.Img className={'cardImages'} variant="top" src={check}/>
                        <Card.Body className={'cardBody'}>
                            <Card.Title>내가 어떤 문의를 했었지?</Card.Title>
                            <Card.Text>
                                여러분들이 어떠한 문의사항들을 남겼는지 확인할수 있습니다.
                            </Card.Text>
                            <Button className={'setHistoryOpenBtn'} variant="primary" onClick={() => setHistoryOpen(true)}>
                                문의내역
                            </Button>
                        </Card.Body>
                    </Card>
                </div>

                <div>

                    {
                        modalOpen &&
                        <div className={'modalContainer'} ref={modalBackground} onClick={e => {
                            if (e.target === modalBackground.current) {
                                setModalOpen(false);
                            }
                        }}>
                            <div className={'modalContent'}>
                                <div className={'inquiryForm'}>
                                    <h1 className={'inquiryTitle'}>무엇이든 물어보살</h1>
                                    <Form className={'inquiryIndex'} onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridTitle">
                                                <Form.Label className={'formLabel'}>제목</Form.Label>
                                                <Form.Control className={'formControl'}
                                                              type="text"
                                                              placeholder="제목을 적어주세요"
                                                              name="title"
                                                              value={inquiryText.title}
                                                              onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridName">
                                                <Form.Label className={'formLabel'}>작성자</Form.Label>
                                                <Form.Control className={'formControl'}
                                                              type="text"
                                                              placeholder="이름을 적어주세요"
                                                              name="name"
                                                              value={inquiryText.name}
                                                              onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="formGridEmail">
                                                <Form.Label className={'formLabel'}>Email</Form.Label>
                                                <Form.Control className={'formControl'}
                                                              type="email"
                                                              placeholder="email형식에 맞게 작성해주세요"
                                                              name="email"
                                                              value={inquiryText.email}
                                                              onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="formGridPhone">
                                            <Form.Label className={'formLabel'}>전화번호</Form.Label>
                                            <Form.Control className={'formControl'}
                                                          type="text"
                                                          placeholder="전화번호를 적어주세요"
                                                          name="phone"
                                                          value={inquiryText.phone}
                                                          onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGridContent">
                                            <Form.Label className={'formLabel'}>문의내용</Form.Label>
                                            <Form.Control className={'formControl'}
                                                          as="textarea"
                                                          name="content"
                                                          value={inquiryText.content}
                                                          onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGridDate">
                                            <Form.Label className={'formLabel'}>문의일자</Form.Label>
                                            <Form.Control className={'formControl'}
                                                          type="date"
                                                          name="date"
                                                          value={inquiryText.date}
                                                          disabled={true}
                                                          onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <div className={'buttonContainer'}>
                                            <Button className={'inquiryButton'} variant="primary" type="submit"
                                                    disabled={!isFormValid}>
                                                문의등록
                                            </Button>xx
                                            <Button className={'modalCloseBtn'} variant="primary"
                                                    onClick={() => setModalOpen(false)}>
                                                닫기
                                            </Button>
                                        </div>
                                    </Form>

                                    {showMessage && (
                                        <Alert variant="success" className="mt-3">
                                            문의가 완료되었습니다
                                        </Alert>
                                    )}
                                </div>
                            </div>
                        </div>
                    }

                </div>
                
                <Container>
                {
                    historyOpen &&
                    <div className='modalContainer' ref={historyBackground} onClick={e => {
                        if (e.target === historyBackground.current) {
                            setHistoryOpen(false);
                        }
                    }}>
                        <div className='inquiryFormParents'>
                            <div className='inquiryForm'>
                                <h1 className={'inquiryTitle'}>문의 내역 조회</h1>
                                <Form onSubmit={handleGet}>

                                        <Form.Group>
                                            <Form.Label className={'formLabel'}>전화번호</Form.Label>
                                            <Form.Control
                                                className=''
                                                type="text"
                                                placeholder="전화번호를 적어주세요"
                                                name="phone"
                                                value={inquiryList.phone}
                                                onChange={handleChange}/>
                                        </Form.Group>
                                        <div className='d-flex justify-content-between pt-3'>
                                            <Button className='' variant="primary" type="submit">
                                                확인
                                            </Button>
                                            <Button className='' variant="primary"
                                                    onClick={() => setHistoryOpen(false)}>
                                                닫기
                                            </Button>
                                        </div>
                                </Form>
                                <div className='pt-3'>
                                    작성자: {inquiryList.name} <br />
                                    제목: {inquiryList.title} <br />
                                    전화번호: {inquiryList.phone} <br />
                                    내용: {inquiryList.content} <br />
                                    문의일자: {inquiryList.date}
                                </div>
                            </div>
                        </div>
                    </div>   
                }
                </Container>
            </div>
        </>
    );
}