import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function NoticeEdit() {
    const { noticeIndex } = useParams();
    const navigate = useNavigate();  // useHistory 대신 useNavigate 사용
    const [notice, setNotice] = useState({
        noticeTitle: '',
        noticeContent: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/notice/${noticeIndex}`)
            .then(response => setNotice(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, [noticeIndex]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice({ ...notice, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('수정하시겠습니까?')) {
            axios.put(`http://localhost:8080/api/notice/update/${noticeIndex}`, notice)
                .then(() => {
                    navigate(`/admin/notice/${noticeIndex}`);  // 수정 후 해당 공지사항 상세 페이지로 이동
                })
                .catch(error => console.error('데이터 수정 오류:', error));
        }
    };

    return (
        <Container>
            <h2>공지사항 수정</h2>
            작성자인덱스 : {notice.adminIndex}, 작성자이름 : {notice.adminName}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNoticeTitle">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                        type="text"
                        name="noticeTitle"
                        value={notice.noticeTitle}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formNoticeContent">
                    <Form.Label>내용</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="noticeContent"
                        value={notice.noticeContent}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    수정 완료
                </Button>
            </Form>
        </Container>
    );
}
