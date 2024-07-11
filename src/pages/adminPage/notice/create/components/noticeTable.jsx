import { Table, Container, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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

    useEffect(() => {
        // 'user' 키로 localStorage에서 데이터를 가져옵니다.
    const user = localStorage.getItem('user');
    
    // 'user' 데이터가 존재하는지 확인합니다.
    if (user) {
        try {
            // JSON 문자열을 객체로 변환합니다.
            const userData = JSON.parse(user);
            
            // userData 객체에서 userIndex와 userName을 추출합니다.
            const { userIndex, userName } = userData;
            
            // 상태를 업데이트하여 userIndex와 name 필드에 저장합니다.
            setNoticeText((prevState) => ({
                ...prevState,           // 기존 상태를 복사합니다.
                userIndex: userIndex.toString(), // userIndex를 문자열로 변환하여 설정합니다.
                name: userName,         // userName을 설정합니다.
            }));
        } catch (error) {
            // JSON 파싱 중에 오류가 발생하면 오류를 콘솔에 출력합니다.
            console.error('Error parsing user data:', error);
        }
    }

    // 현재 날짜를 YYYY-MM-DD 형식으로 가져옵니다.
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // 상태를 업데이트하여 date 필드에 현재 날짜를 설정합니다.
    setNoticeText((prevState) => ({
        ...prevState,
        date: formattedDate,
    }));

}, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행됩니다.

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
            noticeView : 0
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
                navigate('/admin/notice'); // 작성 후 목록 페이지로 리디렉션
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
                        작성
                    </Button>
                </div>
            </Form>
            <div>
                <Link to={'/notice'}>목록으로</Link>
            </div>
        </Container>
    );
}
