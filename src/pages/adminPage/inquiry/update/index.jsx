import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';

export default function InquiryEdit() {
    const {inquiryIndex} = useParams();
    const [inquiry, setInquiry] = useState({inquiryTitle: '', inquiryContent: ''});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/inquiry/${inquiryIndex}`)
            .then(response => response.json())
            .then(data => setInquiry(data))
            .catch(error => console.error('Error fetching inquiry detail:', error));
    }, [inquiryIndex]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInquiry({
            ...inquiry,
            [name]: value,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/inquiry/update/${inquiryIndex}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inquiry),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                navigate(`/admin/inquiry/${inquiryIndex}`);
            })
            .catch(error => console.error('Error updating inquiry:', error));
    };

    return (
        <div className={'commonContainer'}>
            <Container>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="inquiryTitle">
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="inquiryTitle"
                            value={inquiry.inquiryTitle}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="inquiryContent">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter content"
                            name="inquiryContent"
                            value={inquiry.inquiryContent}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        수정
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
