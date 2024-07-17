import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Table, Card, Container} from "react-bootstrap";
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
            <Table striped="columns"  bordered >
                <thead>
                    <tr>
                        <th rowSpan={2} style={{width:'60px', verticalAlign: 'middle', textAlign: 'center'}}>제목</th>
                        <th rowSpan={2} style={{width:'300px', verticalAlign: 'middle', textAlign: 'center'}}>
                            {penalty.penaltyCarNumber}
                        </th>
                        <th style={{width:'60px', verticalAlign: 'middle', textAlign: 'center'}}>단속일자</th>
                        <th style={{width:'300px'}}>
                            {new Date(penalty.penaltyDate).toLocaleDateString('ko-KR')} 
                        </th>
                    </tr>
                    <tr>
                        <th style={{width:'60px', verticalAlign: 'middle', textAlign: 'center'}}>과태료</th>
                        <th>{formatNumber(penalty.penaltyCash)}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4}>
                            <Card.Text style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{width: '500px', height: '500px'}} src={penalty.penaltyImageUrl}/>                            
                            </Card.Text>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="info" onClick={handleBack}>목록으로</Button>{' '}
            {/*<Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}*/}
        </Container>
    );
}