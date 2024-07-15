import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Card, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";


export default function Index() {
    const {penaltyIndex} = useParams();
    const navigate = useNavigate();
    const [penalty, setPenalty] = useState();

    useEffect(() => {
        // axios를 사용하여 공지사항 데이터를 가져옵니다.
        axios.get(`http://localhost:8080/api/penalty/${penaltyIndex}`)
            .then(response => setPenalty(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, [penaltyIndex]);

    const handleBack = () => {
        navigate(`/admin/penalty`);
    };
    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };


    // const handleDelete = () => {
    //     axios.delete(`http://localhost:8080/api/penalty/delete/${penaltyIndex}`)
    //         .then(response => setPenalty(response.data))
    //         .catch(error => console.error('데이터 가져오기 오류:', error));
    //
    //     navigate(`/admin/penalty`);
    // };


    if (!penalty) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Card>
                <Card.Header>{penalty.penaltyCarNumber}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Image src={penalty.penaltyImageUrl}/>
                        <td>{formatNumber(penalty.penaltyCash)}</td>
                    </Card.Text>
                    <Card.Footer>
                        단속일: {new Date(penalty.penaltyDate).toLocaleDateString('ko-KR')}
                    </Card.Footer>
                    {penalty.penaltyView}
                </Card.Body>
            </Card>
            <Button variant="info" onClick={handleBack}>목록으로</Button>{' '}
            {/*<Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}*/}
        </Container>
    );
}