import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Table, Card, Container} from "react-bootstrap";
import Cookies from "js-cookie";

export default function Index() {
    const {penaltyIndex} = useParams();
    const [penalty, setPenalty] = useState();
    const [penalties, setPenalties] = useState([]); // 전체 penalty 목록을 저장하기 위한 상태 추가

    useEffect(() => {
        // 전체 penalty 목록을 가져옵니다.
        axios.get('http://localhost:8080/api/penalty', {
            headers: {
                'Authorization': Cookies.get('Authorization') // 쿠키를 요청 헤더에 포함
            }
        })
            .then(response => setPenalties(response.data))
            .catch(error => console.error('전체 데이터 가져오기 오류:', error));
    }, []);

    useEffect(() => {
        // 개별 penalty 데이터를 가져옵니다.
        axios.get(`http://localhost:8080/api/penalty/${penaltyIndex}`, {
            headers: {
                'Authorization': Cookies.get('Authorization') // 쿠키를 요청 헤더에 포함
            }
        })
            .then(response => setPenalty(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, [penaltyIndex]);


    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    if (!penalty) {
        return <Container>Loading...</Container>;
    }

    // 이전 글, 다음 글 계산
    const prevIndex = parseInt(penaltyIndex, 10) - 1;
    const nextIndex = parseInt(penaltyIndex, 10) + 1;

    return (
        <div className={'commonContainer'}>
            <Container className='d-flex pt-3 position-relative'>
                <Table striped="columns" bordered>
                    <thead>
                    <tr>
                        <th rowSpan={2} style={{width: '60px', verticalAlign: 'middle'}}>차량번호</th>
                        <th rowSpan={2} style={{width: '300px', verticalAlign: 'middle'}}>
                            {penalty.penaltyCarNumber}
                        </th>
                        <th style={{width: '60px'}}>단속일자</th>
                        <th style={{width: '300px'}}>
                            {new Date(penalty.penaltyDate).toLocaleDateString('ko-KR')}
                        </th>
                    </tr>
                    <tr>
                        <th style={{width: '60px'}}>과태료</th>
                        <th>{formatNumber(penalty.penaltyCash)}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={4}>
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
                            {prevIndex >= 0 && ( // 이전 글 링크를 조건에 따라 렌더링
                                <p style={{marginRight: '20px'}}>
                                    <Link to={`/admin/penalty/${prevIndex}`}>이전 글</Link>
                                </p>
                            )}
                            {nextIndex < penalties.length && ( // 다음 글 링크를 조건에 따라 렌더링
                                <p>
                                    <Link to={`/admin/penalty/${nextIndex}`}>다음 글</Link>
                                </p>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <div className='pt-2 penaltyDoc'><Link to={'../admin/penalty'}>목록으로</Link></div>
                {/* <Button className='documentButton' variant="info" onClick={handleBack}>목록으로</Button> */}
                {/*<Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}*/}
            </Container>
        </div>
    );
}
