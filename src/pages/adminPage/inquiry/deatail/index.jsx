import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

export default function Index() {
    const { inquiryIndex } = useParams();
    const [inquiry, setInquiry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/inquiry/${inquiryIndex}`)
            .then(response => response.json())
            .then(data => setInquiry(data))
            .catch(error => console.error('Error fetching inquiry detail:', error));
    }, [inquiryIndex]);

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/inquiry/delete/${inquiryIndex}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                navigate('/admin/inquiry'); // 삭제 후 목록 페이지로 리디렉션
            })
            .catch(error => console.error('Error deleting inquiry:', error));
    };

    const handleUpdate = () => {
        navigate(`/admin/inquiry/update/${inquiryIndex}`); // 수정 페이지로 이동
    };

    if (!inquiry) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Card>
                <Card.Header>{inquiry.inquiryTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {inquiry.inquiryContent}
                    </Card.Text>
                    <Card.Footer>
                        작성자: {inquiry.inquiryWriter} | 게시일: {new Date(inquiry.inquiryDate).toLocaleDateString()}
                    </Card.Footer>
                    <Button variant="danger" size="md" onClick={handleDelete}>
                        삭제
                    </Button>{' '}
                    <Button variant="primary" size="md" onClick={handleUpdate}>
                        수정
                    </Button>{' '}
                </Card.Body>
            </Card>
        </Container>
    );
}
