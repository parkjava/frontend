import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Card} from 'react-bootstrap';
import axios from "axios";
import Button from 'react-bootstrap/Button';

export default function NoticeDetail() {
    const {noticeIndex} = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState();

    useEffect(() => {
        // axios를 사용하여 공지사항 데이터를 가져옵니다.
        axios.get(`http://localhost:8080/api/notice/${noticeIndex}`)
            .then(response => setNotice(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, [noticeIndex]);

    const handleUpdate = () => {
        navigate(`/admin/notice/update/${noticeIndex}`);
    };


    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/notice/delete/${noticeIndex}`)
            .then(response => setNotice(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));

        navigate(`/admin/notice`);
    };


    if (!notice) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Card>
                <Card.Header>{notice.noticeTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {notice.noticeContent}
                    </Card.Text>
                    <Card.Footer>
                        작성자: {notice.adminName} | 게시일: {new Date(notice.createDate).toLocaleDateString('ko-KR')}
                    </Card.Footer>
                    {notice.noticeView}
                </Card.Body>
            </Card>
            <Button variant="info" onClick={handleUpdate}>수정</Button>{' '}
            <Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}
        </Container>
    );
}
