import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import React, {useRef, useState, useEffect} from "react";
import '../../../static/common.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import question from '../../../static/images/question.png'
import check from '../../../static/images/checklist.png'

import Card from 'react-bootstrap/Card';

export default function Index() {
    const [inquiryText, setInquiryText] = useState({
        title: '',
        content: '',
        name: '',
        email: '',
        phone: '',
        date: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // 상태 추가

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
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInquiryText({
            ...inquiryText,
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
                    navigate('/user'); // 3초 후 목록 페이지로 리디렉션
                }, 3000);
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    return (
        <>
            <div className={'commonContainer'}>
                <h1 style={{textAlign: 'center'}}>무늬하기's</h1>
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
                            <Button className={'modalOpenBtn'} variant="primary" onClick={() => setModalOpen(true)}>
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
                                <Form className={'inquiryForm'}>
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
                                </Form>
                                <div>
                                    이거 왜이러냐 씨봉
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};
