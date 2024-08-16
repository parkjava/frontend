import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import axiosInstance from "../../../../common/components/axiosinstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSquareCaretUp, faSquareCaretDown, faCalendarPlus} from "@fortawesome/free-solid-svg-icons";

export default function Index() {
    const {noticeIndex} = useParams();
    const [notice, setNotice] = useState();
    const [notices, setNotices] = useState([]); // 전체 데이터
    const navigate = useNavigate();

    function noticeApi() {
        axiosInstance
            .get('/api/notice')
            .then((res) => {
                setNotices(res)
            })
            .catch((err) => console.log(err));
    }

    function noticeDetailApi() {
        axiosInstance
            .get(`/user/api/notice/${noticeIndex}`)
            .then((res) => {
                setNotice(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {        
        noticeDetailApi();
        noticeApi();
    }, [noticeIndex]);

    if (!notice) {
        return <Container>Loading...</Container>;
    }

    const currentNoticeIndex = notices.findIndex((item) => item.noticeIndex === parseInt(noticeIndex))

    const prevNotice = currentNoticeIndex < notices.length - 1 ? notices[currentNoticeIndex + 1].noticeIndex : null
    const nextNotice = currentNoticeIndex > 0 ? notices[currentNoticeIndex - 1].noticeIndex : null

    const handleSubmit = () => {
        navigate(`../user/notice`);
    }

    return (
        <>
            <div className={'commonContainer'}>
                <Container className='detailContainer' style={{height: '150vh', borderRadius: '20px'}}>
                    <h1>공지 사항</h1>
                    <p className={'userNoticeTitle'}>
                        {notice.noticeTitle}
                    </p>
                    <div className='userNoticeDateDiv'>
                        <p className={'userNoticeDate'}>
                            <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}} />
                            {notice.createDate}
                        </p>
                    </div>
                    <Table className={'detailTable'} style={{marginBottom: '0'}} bordered>
                        <tbody>
                            <tr>
                                <td className={'userNoticeText'}>
                                    {notice.noticeContent}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='pageMove' >
                        <ul>
                            <li>
                            {prevNotice === null ? <><FontAwesomeIcon icon={faSquareCaretUp} /><span>이전글이 존재하지 않습니다.</span></> :  
                                <><Link to={`/user/notice/${prevNotice}`}><FontAwesomeIcon icon={faSquareCaretUp} /><span>이전 글</span>
                            </Link><span style={{paddingLeft: '5%'}}>{notices[currentNoticeIndex+1].noticeTitle}</span></>}
                            </li>

                            <li>
                            {nextNotice === null ? <><FontAwesomeIcon icon={faSquareCaretDown} /><span>다음글이 존재하지 않습니다.</span></> : 
                                <><Link to={`/user/notice/${nextNotice}`}><FontAwesomeIcon icon={faSquareCaretDown} /><span>다음 글</span>
                            </Link><span style={{paddingLeft: '5%'}}>{notices[currentNoticeIndex-1].noticeTitle}</span></>}
                            </li>
                        </ul>
                    </div>

                    <div className={'noticeDetailBtn'} style={{float:'right'}}>
                        <Button className='noticeListBtn' onClick={handleSubmit}>목록으로</Button>
                    </div>
                </Container>
            </div>
        </>
    );
}
