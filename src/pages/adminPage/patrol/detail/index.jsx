import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

export default function PatrolDetail() {
    const { patrolIndex } = useParams();
    const [patrol, setPetrol] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/patrol/${patrolIndex}`)
            .then(response => response.json())
            .then(data => setPetrol(data))
            .catch(error => console.error('Error fetching patrol detail:', error));
    }, [patrolIndex]);

    const handleEdit = () => {
        navigate(`/admin/patrol/update/${patrolIndex}`);
    };

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/patrol/delete/${patrolIndex}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                navigate('/admin/patrol');
            })
            .catch(error => console.error('Error deleting patrol:', error));
    };

    if (!patrol) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Card>
                <Card.Header>관할 구역: {patrol.patrolArea}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {patrol.patrolSummary}
                    </Card.Text>
                    <Card.Footer>
                    작성자: {patrol.adminName} | 게시일: {new Date(patrol.createDate).toLocaleDateString()}
                    </Card.Footer>
                </Card.Body>
            </Card>
            <Button variant="primary" onClick={handleEdit}>수정</Button>
            <Button variant="danger" onClick={handleDelete}>삭제</Button>
        </Container>
    );
}