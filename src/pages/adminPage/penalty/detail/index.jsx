import React, {useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import {Link, useParams, useNavigate} from "react-router-dom";
import {Table, Container, Button} from "react-bootstrap";
import axiosInstance from "../../../../common/components/axiosinstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScrewdriverWrench, faCalendarPlus, faSquareCaretUp, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";

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
        <div className={'commonContainer'}>
            <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                <h1>단속 내역</h1>
                <p className={'adminPatrolTitle'}>
                    {penalty.penaltyCarNumber}
                </p>
                <div style={{margin: '10px 5px 10px'}}>
                    <p className={'adminPenaltyDate'}>
                        <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}} />
                        {penalty.penaltyDate.slice(0,10)}
                    </p>
                </div>
                <p className={'adminPenaltyCash'}>
                    {formatNumber(penalty.penaltyCash)}원
                </p>
                <Table className={'adminDetailTable'} style={{marginBottom: '0'}} bordered>
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
                    </Table>
                    <div className='pageMove'>
                        <ul>
                            <li>
                            {prevPenalty === null ? (
                                <><FontAwesomeIcon icon={faSquareCaretUp} /><span>이전글이 없습니다.</span></>
                                ) :  (<><Link to={`/admin/penalty/${prevPenalty}`}><FontAwesomeIcon icon={faSquareCaretUp} />
                                <span>이전 글</span></Link>
                                <span style={{paddingLeft: '15%'}}>{penalties[currentPenaltyIndex+1].penaltyCarNumber}</span></>)}
                            </li>

                            <li>
                            {nextPenalty === null ? (<><FontAwesomeIcon icon={faSquareCaretDown} /><span>다음글이 없습니다.</span></>
                                ) : (<><Link to={`/admin/penalty/${nextPenalty}`}><FontAwesomeIcon icon={faSquareCaretDown} />
                                <span>다음 글</span></Link>
                                <span style={{paddingLeft: '15%'}}>{penalties[currentPenaltyIndex-1].penaltyCarNumber}</span></>)}
                            </li>
                        </ul>
                    </div>
                    <Button className='noticeListBtn' onClick={handleSubmit} style={{position: 'relative', float: 'right'}}>목록으로</Button>
            </Container>
        </div>
    );
}
