import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import {Link, useParams, useNavigate} from "react-router-dom";
import {Table, Container} from "react-bootstrap";
import {Button} from '@mui/material';
import axiosInstance from "../../../../common/components/axiosinstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarPlus, faSquareCaretUp, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";
import {Mobile, PC} from "../../../../common/components/responsive";

export default function Index() {
    const {penaltyIndex} = useParams();
    const [penalty, setPenalty] = useState('');
    const [penalties, setPenalties] = useState([]); // 전체 데이터
    const navigate = useNavigate();

    function penaltyApi() {
        axiosInstance
            .get('/api/penalty/desc')
            .then((res) => {
                setPenalties(res)
            })
            .catch((err) => console.log(err));
    }

    function penaltyDetailApi() {
        axiosInstance
            .get(`/api/penalty/${penaltyIndex}`)
            .then((res) => {
                setPenalty(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        penaltyDetailApi();
        penaltyApi()
    }, [penaltyIndex]);


    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    if (!penalty) {
        return <Container>Loading...</Container>;
    }

    const currentPenaltyIndex = penalties.findIndex((item) => item.penaltyIndex === parseInt(penaltyIndex))

    const prevPenalty = currentPenaltyIndex < (penalties.length - 1) ? penalties[currentPenaltyIndex + 1].penaltyIndex : null
    const nextPenalty = currentPenaltyIndex > 0 ? penalties[currentPenaltyIndex - 1].penaltyIndex : null

    const handleSubmit = () => {
        navigate(`../admin/penalty`);
    }

    // 이전 글, 다음 글 계산
    return (
        <>
            <PC>
                <div className={'commonContainer'}>
                    <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                        <h1 className={'penaltyH1'}>🚓<br/> 단속 차량 상세 내역</h1>
                        <p className={'adminPatrolTitle'}>
                            차량번호 : {penalty.penaltyCarNumber}
                        </p>
                        <div className={'d-flex justify-content-between align-items-center'}
                             style={{margin: '10px 5px 10px'}}>
                            <span className={'adminPenaltyDate'}>
                                <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}}/>
                                단속일자 : {penalty.penaltyDate.slice(0, 10)}
                            </span>
                            <span className={'adminPenaltyCash'}>
                            과태료 : {formatNumber(penalty.penaltyCash)}원
                        </span>
                        </div>

                        <Table bordered>
                            <tbody>
                            <tr>
                                <td className={'imageTable'} colSpan={8} style={{height: '600px'}}>
                                    <p className='cardText'>
                                        {penalty.penaltyImageUrl ? (
                                            <Image className='penaltyImage' src={penalty.penaltyImageUrl}/>
                                        ) : (
                                            <Image className='penaltyImage'
                                                   src={'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg'}/>
                                        )}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <div className='pageMove'>
                                <ul>
                                    <li>
                                        {prevPenalty === null ? (
                                            <><FontAwesomeIcon icon={faSquareCaretUp}/><span>이전글이 존재하지 않습니다.</span></>
                                        ) : (<Link to={`/admin/penalty/${prevPenalty}`}><FontAwesomeIcon
                                            icon={faSquareCaretUp}/>
                                            <span>이전 글</span>
                                        </Link>)}
                                    </li>

                                    <li>
                                        {nextPenalty === null ? (<><FontAwesomeIcon icon={faSquareCaretDown}/><span>다음글이 존재하지 않습니다.</span></>
                                        ) : (<Link to={`/admin/penalty/${nextPenalty}`}><FontAwesomeIcon
                                            icon={faSquareCaretDown}/>
                                            <span>다음 글</span>
                                        </Link>)}
                                    </li>
                                </ul>
                            </div>

                        </Table>
                        <Button className={'float-end'} variant={'contained'} color={'primary'}
                                onClick={handleSubmit}>목록으로</Button>
                    </Container>

                </div>
            </PC>
            <Mobile>
                <div className={'commonContainer'}>
                    <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                        <p className={'adminPatrolTitle'}>
                            차량번호 : {penalty.penaltyCarNumber}
                        </p>
                        <div style={{margin: '10px 5px 10px'}}>
                            <p className={'adminPenaltyDate'}>
                                <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}}/>
                                {penalty.penaltyDate.slice(0, 10)}
                            </p>
                        </div>
                        <p className={'adminPenaltyCash'}>
                            과태료 : {formatNumber(penalty.penaltyCash)}원
                        </p>
                        <Table className={'adminDetailTable'} bordered>
                            <tbody>
                            <tr>
                                <td className={'imageTableMobile'} colSpan={8} style={{height: '600px'}}>
                                    <p className='cardTextMobile'>
                                        {penalty.penaltyImageUrl ? (
                                            <Image className='penaltyImageMobile' src={penalty.penaltyImageUrl}/>
                                        ) : (
                                            <Image className='penaltyImageMobile'
                                                   src={'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg'}/>
                                        )}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                            <div className='pageMoveMobile'>
                                <ul>
                                    <li>
                                        {prevPenalty === null ? (
                                            <><FontAwesomeIcon icon={faSquareCaretUp}/><span>이전글이 존재하지 않습니다.</span></>
                                        ) : (<Link to={`/admin/penalty/${prevPenalty}`}><FontAwesomeIcon
                                            icon={faSquareCaretUp}/>
                                            <span>이전 글</span>
                                        </Link>)}
                                    </li>
                                    <li>
                                        {nextPenalty === null ? (<><FontAwesomeIcon icon={faSquareCaretDown}/><span>다음글이 존재하지 않습니다.</span></>
                                        ) : (<Link to={`/admin/penalty/${nextPenalty}`}><FontAwesomeIcon
                                            icon={faSquareCaretDown}/>
                                            <span>다음 글</span>
                                        </Link>)}
                                    </li>
                                </ul>
                            </div>
                        </Table>
                        <Button className={'float-end'} variant={'contained'} color={'primary'}
                                onClick={handleSubmit}>목록으로</Button>
                    </Container>
                </div>
            </Mobile>
        </>
    );
}
