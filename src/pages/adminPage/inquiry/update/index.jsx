import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";

export default function InquiryEdit() {
    const { inquiryIndex } = useParams();
    const [inquiry, setInquiry] = useState(null);
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function inquiryUpdateApi(){
        axiosInstance
            .get(`/api/inquiry/${inquiryIndex}`)
            .then(response => setInquiry(response))
            .catch(error => console.error('Error fetching inquiry detail:', error));
    }

    useEffect(() => {
        inquiryUpdateApi();
    }, [inquiryIndex]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInquiry({
            ...inquiry,
            [name]: value,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axiosInstance
            .put(`/api/inquiry/update/${inquiryIndex}`, inquiry)
            .then(response => {
                navigate(`/admin/inquiry/${inquiryIndex}`);

            })
            .catch(error => console.error('Error updating inquiry:', error));
    };

    if (!inquiry) {
        return <Container>Loading...</Container>;
    }

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
