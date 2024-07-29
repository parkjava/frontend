import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';
import axiosInstance from "../../../../../common/components/axiosinstance";

export default function NoticeEdit() {
    const {noticeIndex} = useParams();
    const navigate = useNavigate();  // useHistory 대신 useNavigate 사용
    const [notice, setNotice] = useState({
        noticeTitle: '',
        noticeContent: ''
    });


    function getNoticeUpdateApi() {
        axiosInstance.get(`/api/notice/${noticeIndex}`)
            .then(response => setNotice(response))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }

    function putNoticeUpdateApi() {
        axiosInstance.put(`/api/notice/update/${noticeIndex}`, notice)
            .then(response => {
                setNotice(response)
                navigate('/admin/notice');
            })
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }

    useEffect(() => {
        getNoticeUpdateApi();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNotice({...notice, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        putNoticeUpdateApi();
    };

    return (
        <Container>
            <h2>공지사항 수정</h2>
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
