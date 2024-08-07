import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import {Link, useParams} from "react-router-dom";
import {Table, Card, Container, Row, Col, Button} from "react-bootstrap";
import axiosInstance from "../../../../common/components/axiosinstance";

export default function Index() {
    const {penaltyIndex} = useParams();
    const [penalty, setPenalty] = useState('');
    const [penaltyList, setPenaltyList] = useState('')


    function penaltyApi() {
        axiosInstance
            .get(`api/penalty/desc`)
            .then((res) => {
                setPenaltyList(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        penaltyApi();

    }, []);

    function penaltyDetailApi() {
        axiosInstance
            .get(`api/penalty/${penaltyIndex}`)
            .then((res) => {
                setPenalty(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        penaltyDetailApi();
    }, [penaltyIndex]);


    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    if (!penalty) {
        return <Container>Loading...</Container>;
    }

    // 이전 글, 다음 글 계산
    return (
        <div className={'commonContainer'}>
            <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                <h3 className={'adminPatrolTitle'}>
                    {penalty.penaltyCarNumber}
                </h3>
                <p className={'adminPenaltyDate'}>
                    {new Date(penalty.penaltyDate).toLocaleDateString('ko-KR')}
                </p>
                <p className={'adminPenaltyCash'}>
                    과태료: {formatNumber(penalty.penaltyCash)} 원
                </p>
                <Table className={'adminDetailTable'} bordered>
                    <tbody>
                    <tr>
                        <td className={'imageTable'} colSpan={8} style={{height: '600px'}}>
                            <Card.Text className='cardText'>
                                {penalty.penaltyImageUrl ? (
                                    <Image className='penaltyImage' src={penalty.penaltyImageUrl}/>
                                ) : (
                                    <Image className='penaltyImage'
                                           src={'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg'}/>
                                )}
                            </Card.Text>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-center">
                            {/*{prevIndex >= 0 && ( // 이전 글 링크를 조건에 따라 렌더링*/}
                            <p>
                                <Link to={`/admin/penalty/${parseInt(penaltyIndex) - 1}`}>이전 글▲</Link>
                            </p>
                            {/*// )}*/}
                            {/*{nextIndex <= penalties.length && ( // 다음 글 링크를 조건에 따라 렌더링*/}
                            <p>
                                <Link to={`/admin/penalty/${parseInt(penaltyIndex) + 1}`}>다음 글▼</Link>
                            </p>
                            {/*// )}*/}
                        </td>
                    </tr>
                    </tbody>
                    {/*<Row className="mt-3">*/}
                    {/*    <Col md={6} className="text-md-end">*/}
                    {/*        <Button variant="primary" onClick={handleEdit} className="w-30">수정</Button>*/}
                    {/*    </Col>*/}
                    {/*    <Col md={6} className="text-md-start mt-2 mt-md-0">*/}
                    {/*        <Button variant="danger" onClick={handleDelete} className="w-30">삭제</Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Table>
                <div className={'noticeDetailBtn'}>
                    <Button className='noticeListBtn'><Link
                        to={'../admin/patrol'}>목록으로</Link></Button>

                </div>
            </Container>
        {/*    <Container className='d-flex pt-3 position-relative'>*/}
        {/*        <Table striped="columns" bordered>*/}
        {/*            <thead>*/}
        {/*            <tr>*/}
        {/*                <th rowSpan={2} style={{width: '60px', verticalAlign: 'middle'}}>차량번호</th>*/}
        {/*                <th rowSpan={2} style={{width: '300px', verticalAlign: 'middle'}}>*/}
        {/*                    {penalty.penaltyCarNumber}*/}
        {/*                </th>*/}
        {/*                <th style={{width: '60px'}}>단속일자</th>*/}
        {/*                <th style={{width: '300px'}}>*/}
        {/*                    {new Date(penalty.penaltyDate).toLocaleDateString('ko-KR')}*/}
        {/*                </th>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*                <th style={{width: '60px'}}>과태료</th>*/}
        {/*                <th>{formatNumber(penalty.penaltyCash)} 원</th>*/}
        {/*            </tr>*/}
        {/*            </thead>*/}
        {/*            <tbody>*/}
        {/*            <tr>*/}
        {/*                <td colSpan={4}>*/}
        {/*                    <Card.Text className='cardText'>*/}
        {/*                        {penalty.penaltyImageUrl ? (*/}
        {/*                            <Image className='penaltyImage' src={penalty.penaltyImageUrl}/>*/}
        {/*                        ) : (*/}
        {/*                            <Image className='penaltyImage'*/}
        {/*                                   src={'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg'}/>*/}
        {/*                        )}*/}
        {/*                    </Card.Text>*/}
        {/*                </td>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*                <td colSpan={4} className="text-center">*/}
        {/*                    /!*{prevIndex >= 0 && ( // 이전 글 링크를 조건에 따라 렌더링*!/*/}
        {/*                    <p style={{marginRight: '20px'}}>*/}
        {/*                        <Link to={`/admin/penalty/${parseInt(penaltyIndex) - 1}`}>이전 글</Link>*/}
        {/*                    </p>*/}
                            {/*// )}*/}
        {/*                    /!*{nextIndex <= penalties.length && ( // 다음 글 링크를 조건에 따라 렌더링*!/*/}
        {/*                    <p>*/}
        {/*                        <Link to={`/admin/penalty/${parseInt(penaltyIndex) + 1} `}>다음 글</Link>*/}
        {/*                    </p>*/}
                            {/*// )}*/}
        {/*                </td>*/}
        {/*            </tr>*/}
        {/*            </tbody>*/}
        {/*        </Table>*/}
        {/*        <div className='pt-2 penaltyDoc'><Link to={'../admin/penalty'}>목록으로</Link></div>*/}
        {/*        /!* <Button className='documentButton' variant="info" onClick={handleBack}>목록으로</Button> *!/*/}
        {/*        /!*<Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}*!/*/}
        {/*    // </Container>*/}
        </div>
    );
}
