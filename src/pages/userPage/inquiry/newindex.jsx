import {Form, Row, Col, Button, Alert, div} from 'react-bootstrap';
import React, {useRef, useState, useEffect} from "react";
import '../../../static/common.css'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from 'react-router-dom';


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

    const navigate = useNavigate();

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

        setInquiryList((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
                    navigate('./')
                } else {
                    alert('문의 내역을 찾을 수 없습니다.');
                }
            })
            .catch((error) => console.error('Error saving data:', error));
    }

    const DisplayBox = styled.div`
        display: ${props => props.display};
        justify-content: ${props => props.justify};
        padding: ${props => props.padding};
    `

    return (
        <>
            <section>
                <DisplayBox display='flex' justify='center'>
                    <h1 style={{paddingTop: '100px'}}>
                        <FontAwesomeIcon icon={faComment} bounce style={{color: '#B197FC', paddingRight: '5px'}} />ParkJava 문의하기
                    </h1>
                </DisplayBox>
            </section>
            <section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Form onSubmit={handleGet} style={{width: '354px', position: 'relative', top: '10px'}}>
                    <Form.Group style={{width: '100%'}}>
                        <Form.Control
                            className=''
                            type="text"
                            placeholder="전화번호를 적어주세요"
                            name="phone"
                            value={inquiryList.phone}
                            onChange={handleChange}/>
                        <FontAwesomeIcon onClick={handleGet} style={{position: 'absolute', left: '92%', bottom: '30%', cursor: 'pointer'}} icon={faMagnifyingGlass} />
                    </Form.Group>
                </Form>
            </div>
                    <DisplayBox display='flex' justify='center' padding='80px'>
                        <div>
                            작성자: {inquiryList.name} <br />
                            제목: {inquiryList.title} <br />
                            전화번호: {inquiryList.phone} <br />
                            내용: {inquiryList.content} <br />
                            문의일자: {inquiryList.date}
                        </div>
                    </DisplayBox>
            </section>

            {/* <section>
            <div>
                <Button className={'modalOpenBtn'} variant="primary" onClick={() => setModalOpen(true)}>
                    문의하기
                </Button>
            </div>
            </section> */}
        </>
    )
}