import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Table, Container} from 'react-bootstrap';
import {Button} from '@mui/material';
import '../../../../../static/common.css'
import axiosInstance from "../../../../../common/components/axiosinstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faScrewdriverWrench,
    faCalendarPlus,
    faSquareCaretUp,
    faSquareCaretDown,
    faEye
} from "@fortawesome/free-solid-svg-icons";

export default function NoticeTable() {
    const {noticeIndex} = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    const [notices, setNotices] = useState([]); // 전체 데이터

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
            .get(`/api/notice/${noticeIndex}`)
            .then((res) => setNotice(res))
            .catch((err) => console.log(err));

    }

    useEffect(() => {
        noticeDetailApi();
        noticeApi();
    }, [noticeIndex]);


    const handleDelete = () => {
        axiosInstance.delete(`/api/notice/delete/${noticeIndex}`)
            .then(res => {
                setNotice(res)
                navigate('/admin/notice');
            })
            .catch(error => console.error('데이터 가져오기 오류:', error));


    };

    const handleUpdate = () => {
        navigate(`/admin/notice/update/${noticeIndex}`);
    };

    const currentNoticeIndex = notices.findIndex((item) => item.noticeIndex === parseInt(noticeIndex))

    const prevPatrol = currentNoticeIndex < notices.length - 1 ? notices[currentNoticeIndex + 1].noticeIndex : null
    const nextPatrol = currentNoticeIndex > 0 ? notices[currentNoticeIndex - 1].noticeIndex : null

    const handleSubmit = () => {
        navigate(`../admin/notice`);
    }

    return (
        <>
            <div className={'commonContainer'} style={{paddingTop: '0'}}>
                <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                    <h1 className={'adminNoticeH1'}>공지 상세</h1>
                    <p className={'adminNoticeTitle'}>
                        {notice.noticeTitle}
                    </p>
                    <div style={{margin: '10px 5px 10px'}}>
                        <div className={'adminNoticeDate'}>
                            <p className='adminNoticeView'>
                                <FontAwesomeIcon icon={faEye} style={{marginRight: '3px'}}/>
                                {notice.noticeView}
                            </p>
                            <p className='adminNoticeDate'>
                                <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}}/>
                                {notice.createDate}
                            </p>
                            {notice.updateDate == null ? null : <p className={'adminNoticeDate'}>
                                <FontAwesomeIcon icon={faScrewdriverWrench} style={{marginRight: '6px'}}/>
                                {notice.updateDate}
                            </p>}
                        </div>
                    </div>
                    <Table className={'adminDetailTable'} style={{marginBottom: '0'}} bordered>
                        <tbody>
                        <tr>
                            <td className={'adminNoticeText'} colSpan={8} style={{height: '600px'}}>
                                {notice.noticeContent}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className='pageMove'>
                        <ul>
                            <li>
                                {prevPatrol === null ? (<><FontAwesomeIcon
                                    icon={faSquareCaretUp}/><span>이전글이 존재하지 않습니다.</span></>) : (<>
                                    <Link to={`/admin/notice/${prevPatrol}`}><FontAwesomeIcon
                                        icon={faSquareCaretUp}/><span>이전 글</span></Link>
                                    <span
                                        style={{paddingLeft: '15%'}}>{notices[currentNoticeIndex + 1].noticeTitle}</span>
                                </>)}
                            </li>

                            <li>
                                {nextPatrol === null ? <><FontAwesomeIcon icon={faSquareCaretDown}/><span>다음글이 존재하지 않습니다.</span></> : (<>
                                    <Link to={`/admin/notice/${nextPatrol}`}><FontAwesomeIcon icon={faSquareCaretDown}/><span>다음 글</span></Link>
                                    <span
                                        style={{paddingLeft: '15%'}}>{notices[currentNoticeIndex - 1].noticeTitle}</span>
                                </>)}
                            </li>
                        </ul>
                    </div>
                    <div className={'noticeDetailBtn'}>
                        <Button variant={'outlined'} color={'warning'} onClick={handleUpdate} className="w-30"
                                style={{marginRight: '5px'}}>수정</Button>
                        <Button variant={'outlined'} color={'error'} onClick={handleDelete} className="w-30"
                                style={{marginRight: '5px'}}>삭제</Button>
                        <Button variant={'outlined'} color={'primary'} className='noticeListBtn' onClick={handleSubmit}
                                style={{position: 'relative', float: 'right'}}>목록으로</Button>
                    </div>
                </Container>
            </div>
        </>
    );
}
