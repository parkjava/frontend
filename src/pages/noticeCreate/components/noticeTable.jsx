import { Table, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NoticeTable() {
    const [noticeText, setNoticeText] = useState({
        title: '',
        detail: '',
        userIndex: '',
        name: '',
        date: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoticeText({
            ...noticeText,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotice = {
            noticeTitle: noticeText.title,
            noticeContent: noticeText.detail,
            userIndex: noticeText.userIndex,
            userName: noticeText.name,
            createDate: noticeText.date,
            updateDate: noticeText.date,
        };

        fetch('http://localhost:8080/api/notice/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotice),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setNoticeText({
                    title: '',
                    detail: '',
                    userIndex: '',
                    name: '',
                    date: '',
                });
                navigate('/notice'); // 작성 후 목록 페이지로 리디렉션
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Table striped bordered hover variant="light">
                    <thead>
                    <tr>
                        <th>
                            <Form.Control
                                type="text"
                                placeholder="제목 입력"
                                name="title"
                                value={noticeText.title}
                                onChange={handleInputChange}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Form.Control
                                as="textarea"
                                rows={15}
                                placeholder="내용 입력"
                                name="detail"
                                value={noticeText.detail}
                                onChange={handleInputChange}
                                style={{ border: 'none', resize: 'none' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <Form.Control
                                type="number"
                                placeholder="유저인덱스 입력"
                                name="userIndex"
                                value={noticeText.userIndex}
                                onChange={handleInputChange}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Form.Control
                                type="name"
                                placeholder="유저이름 입력"
                                name="name"
                                value={noticeText.name}
                                onChange={handleInputChange}
                            />
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <Form.Control
                                type="date"
                                placeholder="작성일 입력"
                                name="date"
                                value={noticeText.date}
                                onChange={handleInputChange}
                            />
                        </th>
                    </tr>
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" style={{ width: '100px' }}>
                        작성dd
                    </Button>
                </div>
            </Form>
            <div>
                <Link to={'/notice'}>목록으로</Link>
            </div>
        </Container>
    );
}
