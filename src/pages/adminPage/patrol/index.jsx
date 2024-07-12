import React, {useState, useEffect} from 'react';
import {Table, Container, Button} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function NoticeList() {
    const [patrols, setPatrols] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/patrol') // 실제 API 엔드포인트를 여기에 입력하세요.
            .then(response => {
                setPatrols(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // 예제 데이터를 사용 (이제 실제 데이터 사용으로 교체)
        // setPatrols(mockData);
    }, []);

    const handleCreateClick = () => {
        navigate('/admin/patrol/create'); // 작성하기 버튼 클릭 시 페이지 이동
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>순찰내역</h1>
                <Button variant="primary" onClick={handleCreateClick}>
                    작성하기
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>순찰자</th>
                    <th>관할구역</th>
                    <th>순찰요약</th>
                    <th>날짜</th>
                </tr>
                </thead>
                <tbody>
                {patrols.map((patrol) => (
                    <tr key={patrol.patrolIndex}>
                        <td>{patrol.patrolIndex}</td>
                        <td>{patrol.adminName}</td>
                        <td>{patrol.patrolArea}</td>
                        <td>{patrol.patrolSummary}</td>
                        <td>{patrol.createDate}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
