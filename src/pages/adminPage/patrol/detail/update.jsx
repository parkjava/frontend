import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function PatrolUpdatePage() {
    const { patrolIndex } = useParams();
    const [patrol, setPatrol] = useState({
        patrolArea: '',
        patrolSummary: '',
        adminName: '',
        createDate: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/patrol/${patrolIndex}`)
            .then(response => response.json())
            .then(data => setPatrol(data))
            .catch(error => console.error('Error fetching patrol detail:', error));
    }, [patrolIndex]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatrol({
            ...patrol,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/patrol/update/${patrolIndex}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patrol),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                navigate('/admin/patrol');
            })
            .catch(error => console.error('Error updating patrol:', error));
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="patrolArea">
                    <Form.Label>관할 구역</Form.Label>
                    <Form.Control
                        type="text"
                        name="patrolArea"
                        value={patrol.patrolArea}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="patrolSummary" className="mt-3">
                    <Form.Label>순찰 요약</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="patrolSummary"
                        value={patrol.patrolSummary}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <div>
                {patrol.adminName}
                </div>
                <Button variant="primary" type="submit" className="mt-3">
                    저장
                </Button>
            </Form>
        </Container>
    );
}
