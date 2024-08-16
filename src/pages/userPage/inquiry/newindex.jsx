import {Form, Row, Col, Button, Alert, Image, Container} from 'react-bootstrap';
import React, {useState, useRef, useEffect} from "react";
import '../../../static/common.css'
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faMagnifyingGlass, faXmark, faComments} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom';
import Logo from '../../../static/images/logo.png'

import styled from 'styled-components'

const SpaceBox = styled.div`
    padding-bottom: ${props => props.paddingbottom}
    margin-bottom: ${props => props.marginbottom}
`

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
        date: '',
    });

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // 상태 추가
    const [isFormValid, setIsFormValid] = useState(false);
    const modalBackground = useRef();

    useEffect(() => {
        // 모든 필드가 입력되었는지 확인
        const allFieldsFilled = Object.values(inquiryText).every(field => field !== '');
        setIsFormValid(allFieldsFilled);
    }, [inquiryText]);


    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setInquiryText(pre => ({
            ...pre,
            date: currentDate,
        }))

        setInquiryList(prevState => ({
            ...prevState,
            date: '',
        }))
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setInquiryText((pre) => ({
            ...pre,
            [name]: value,
        }))

        setInquiryList((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        const inputElement = e.target;
        if (value) {
            inputElement.classList.add('not-empty');
        } else {
            inputElement.classList.remove('not-empty');
        }
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
                    navigate('/user');
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
                    setInquiryList(data);
                    navigate('./')
                } else {
                    alert('문의 내역을 찾을 수 없습니다.');
                }
            })
            .catch((error) => console.error('Error saving data:', error));
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modalOpen]);


    return (
        <>
            <div className={'commonContainer'}>
                <Container>
                    <section>
                        <h1 className={'adminInquiryH1'}>
                            Contact US &nbsp;
                            <FontAwesomeIcon icon={faComment} bounce style={{color: 'rgba(255,0,250,0.49)'}}/>
                        </h1>
                    </section>
                    <section>
                        <div className='outBox' style={{display: 'flex', justifyContent: 'center'}}>
                            <Form onSubmit={handleGet} style={{width: '354px', position: 'relative', top: '5px'}}>
                                <p style={{fontSize:18}}><b>문의하신 적이 있으신가요?</b></p>
                                <div className='inputBox'>
                                    <Form.Group style={{width: '100%'}}>

                                        <Form.Control
                                            className=''
                                            id='inquiryPhoneInput'
                                            type="text"
                                            name="phone"
                                            value={inquiryList.phone || ''}
                                            onChange={handleChange}
                                            autoComplete="off"
                                        />
                                        <label htmlFor='inquiryPhoneInput'>전화번호를 입력하세요</label>
                                        <div className='inquiryIconBox'>
                                            <FontAwesomeIcon className='inquiryIcon' onClick={handleGet}
                                                             icon={faMagnifyingGlass}/>

                                        </div>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>
                        {inquiryList.length > 0 && (
                            <div className="inquiryNewList">
                                <ul>
                                    {inquiryList &&
                                        inquiryList.map((inquiry, index) => (
                                            <li key={index}>
                                                <hr style={{width: '87rem'}}/>
                                                <p>제목: {inquiry.inquiryTitle}</p>
                                                <p>작성자: {inquiry.inquiryWriter}</p>
                                                <p>전화번호: {inquiry.inquiryPhone}</p>
                                                <p>문의내용: {inquiry.inquiryContent}</p>
                                                <p>문의답변: {inquiry.inquiryAnswer}</p>
                                                <p>문의일자: {inquiry.inquiryDate.split('T')[0]}</p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    <section>

                        <div className='inquiryNew'>
                            <div>
                                <hr style={{width: '87rem'}}/>
                                <h2 className='headline'>
                                    문의하기
                                </h2>

                                <FontAwesomeIcon icon={faComments} onClick={() => setModalOpen(true)}
                                                 style={{scale: '3', paddingTop: '1.5rem', cursor: 'pointer'}}/>
                            </div>
                        </div>
                        <SpaceBox $paddingbottom='16px' $marginbottom='32px'></SpaceBox>

                        {
                            modalOpen &&
                            <div className={'modalContainer'} ref={modalBackground} onClick={e => {
                                if (e.target === modalBackground.current) {
                                    setModalOpen(false);
                                }
                            }}>
                                <div className={'inquiryForm'}>
                                    <div style={{padding: 0, margin: 0}}>
                                        <Image src={Logo} width={200}/>
                                        <FontAwesomeIcon className='modalCloseBtn' icon={faXmark}
                                                         onClick={() => setModalOpen(false)}/>
                                    </div>
                                    <Form className={'inquiryIndex'} onSubmit={handleSubmit}>
                                        <Row className={'mt-2'}>
                                            <Form.Group as={Col} controlId="formGridName">
                                                <Form.Control className={'inputBox'}
                                                              type="text"
                                                              placeholder="이름"
                                                              name="name"
                                                              value={inquiryText.name}
                                                              onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" controlId="formGridPhone">
                                                <Form.Control className={'formControl'}
                                                              type="text"
                                                              placeholder="전화번호"
                                                              name="phone"
                                                              value={inquiryText.phone}
                                                              onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>

                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Control className={'formControl'}
                                                          type="email"
                                                          placeholder="이메일"
                                                          name="email"
                                                          value={inquiryText.email}
                                                          onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3 mt-2" controlId="formGridContent">
                                            <Form.Group as={Col} controlId="formGridTitle">
                                                <Form.Control className={'formControl'}
                                                              type="text"
                                                              placeholder="문의제목"
                                                              name="title"
                                                              value={inquiryText.title}
                                                              onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Control className={'formControl mt-2'}
                                                          rows={5}
                                                          as="textarea"
                                                          name="content"
                                                          placeholder={'문의내용'}
                                                          value={inquiryText.content}
                                                          onChange={handleChange}
                                                          style={{whiteSpace: 'pre-line'}}
                                            />
                                        </Form.Group>

                                        <div className={'buttonContainer'}>
                                            <Button className='inquiryButton text-white' variant="primary" type="submit"
                                                    disabled={!isFormValid}>
                                                문의등록
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
                        }

                    </section>
                </Container>
            </div>
        </>
    )
}