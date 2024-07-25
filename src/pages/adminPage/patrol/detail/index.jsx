import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';

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
        <div className={'commonContainer'}>
        <Container>
            <Card>
                <Card.Header>관할 구역: {patrol.patrolArea}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {patrol.patrolSummary}
                    </Card.Text>
                    <Card.Footer>
                    작성자: {patrol.adminName} | 수정일: {new Date(patrol.updateDate).toLocaleDateString()}
                    </Card.Footer>
                </Card.Body>
            </Card>
            <Row className="mt-3">
                <Col md={6} className="text-md-end">
                    <Button variant="primary" onClick={handleEdit} className="w-30">수정</Button>
                </Col>
                <Col md={6} className="text-md-start mt-2 mt-md-0">
                    <Button variant="danger" onClick={handleDelete} className="w-30">삭제</Button>
                </Col>
            </Row>
            <div className='d-flex pt-3'><Link to={'../admin/patrol'} >목록으로</Link></div>
        </Container>
        </div>
    );
}