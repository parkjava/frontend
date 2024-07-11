import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function Index() {
    const { inquiryIndex } = useParams();
    const [inquiry, setInquiry] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/inquiry/${inquiryIndex}`)
            .then(response => response.json())
            .then(data => setInquiry(data))
            .catch(error => console.error('Error fetching inquiry detail:', error));
    }, [inquiryIndex]);

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
                        작성자: {inquiry.userName} | 게시일: {new Date(inquiry.createDate).toLocaleDateString()}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Container>
    );
}