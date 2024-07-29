import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";

export default function PatrolDetail() {
    const { patrolIndex } = useParams();
    const [patrol, setPetrol] = useState(null);
    const navigate = useNavigate();
    function patrolDetailApi() {
        axiosInstance
            .get(`/api/patrol/${patrolIndex}`)
            .then((res) => {
                setPetrol(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        patrolDetailApi();
    }, []);

    const handleEdit = () => {
        navigate(`/admin/patrol/update/${patrolIndex}`);
    };

    const handleDelete = () => {
       axiosInstance
           .delete(`/api/patrol/delete/${patrolIndex}`)
            .then(res => {
                setPetrol(res)
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