import React, {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Container, Table, Alert} from 'react-bootstrap';
import {Button} from '@mui/material';
import axiosInstance from "../../../../common/components/axiosinstance";
import Update from "../update/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarPlus,
    faSquareCaretUp,
    faSquareCaretDown,
    faXmark,
    faPhone,
    faUser, faCalendar
} from "@fortawesome/free-solid-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

export default function Index() {
    const {inquiryIndex} = useParams();
    const [inquiry, setInquiry] = useState(null);
    const [inquiries, setInquiries] = useState([]); // 전체 데이터
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [showMessage, setShowMessage] = useState(false); // 상태 추가

    function inquiryApi() {
        axiosInstance
            .get('/api/inquiry')
            .then((res) => {
                setInquiries(res)
            })
            .catch((err) => console.log(err));
    }

    function inquiryDetailApi() {
        axiosInstance
            .get(`/api/inquiry/${inquiryIndex}`)
            .then((res) => {
                setInquiry(res);
            })
            .catch((err) => console.error('Error fetching inquiry details:', err));
    }

    useEffect(() => {
        inquiryDetailApi();
        inquiryApi()
    }, [inquiryIndex]);

    const handleDelete = () => {
        axiosInstance
            .delete(`/api/inquiry/delete/${inquiryIndex}`)
            .then(response => {
                setInquiry(response)
                navigate('/admin/inquiry'); // 삭제 후 목록 페이지로 리디렉션
            })
            .catch(error => console.error('Error deleting inquiry:', error));

    };

    // const handleUpdate = () => {
    //     navigate(`/admin/inquiry/update/${inquiryIndex}`); // 수정 페이지로 이동
    // };


    if (!inquiry) {
        return <Container>Loading...</Container>;
    }

    const currentInquiryIndex = inquiries.findIndex((item) => item.inquiryIndex === parseInt(inquiryIndex))

    const prevPatrol = currentInquiryIndex < inquiries.length - 1 ? inquiries[currentInquiryIndex + 1].inquiryIndex : null
    const nextPatrol = currentInquiryIndex > 0 ? inquiries[currentInquiryIndex - 1].inquiryIndex : null

    const handleSubmit = () => {
        navigate(`../admin/inquiry`);
    }

    return (
        <div className={'commonContainer'}>
            <Container className='adminInquiryContainer' style={{height: '100vh'}}>
                <h1 className={'adminInquiryH1'}>문의 상세 내역</h1>
                <p className={'adminInquiryTitle'}>
                    {inquiry.inquiryTitle}
                    {inquiry.inquiryAnswer === null ?
                        <span className={'titleAnswerNeed'}>답변 필요</span>
                        :
                        <span className={'titleAnswerComplete'}>답변 완료</span>}
                </p>
                <div className={'d-flex justify-content-between align-items-center'} style={{margin: '10px 5px 10px'}}>
                    <span className={'adminInquiryDate'} style={{marginRight: '5px'}}>
                        <FontAwesomeIcon icon={faUser}/>
                        &nbsp;
                        {inquiry.inquiryWriter}
                    </span>
                    <span className={'adminInquiryPhone'} style={{marginRight: '5px'}}>
                        <FontAwesomeIcon icon={faPhone}/>&nbsp;
                        {inquiry.inquiryPhone}
                    </span>
                    <span className={'adminInquiryEmail'} style={{marginRight: '5px'}}>
                        <FontAwesomeIcon icon={faEnvelope} fill={'solid'}/>&nbsp;
                        {inquiry.inquiryEmail}
                    </span>
                    <span className={'adminInquiryDate'} style={{marginRight: '5px'}}>
                        <FontAwesomeIcon icon={faCalendar}/>&nbsp;
                        {inquiry.inquiryDate.slice(0, 10)}
                    </span>

                </div>

                <Table className={'adminDetailTable'} style={{margin: '0', padding: '0'}} bordered>
                    <tbody>
                    <tr>
                        <td className={'adminPatrolText'} colSpan={8} style={{height: '600px', textAlign: 'start'}}>
                            <p style={{paddingTop: '10px'}}>{inquiry.inquiryContent}</p>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <div className={'d-flex justify-content-start align-items-center'}>
                    <h3>문의답변 </h3>
                    <p className={'m-5'}>
                        {inquiry.inquiryAnswer}
                    </p>
                </div>

                <div className='pageMove'>
                    <ul>
                        <li style={{padding: '8px'}}>
                            {prevPatrol === null ? <><FontAwesomeIcon
                                    icon={faSquareCaretUp}/><span>이전글이 존재하지 않습니다.</span></> :
                                <Link to={`/admin/inquiry/${prevPatrol}`}><FontAwesomeIcon icon={faSquareCaretUp}/>
                                    <span>이전 글</span>
                                </Link>}
                        </li>

                        <li style={{padding: '8px'}}>
                            {nextPatrol === null ? <><FontAwesomeIcon
                                    icon={faSquareCaretDown}/><span>다음글이 존재하지 않습니다.</span></> :
                                <Link to={`/admin/inquiry/${nextPatrol}`}><FontAwesomeIcon icon={faSquareCaretDown}/>
                                    <span>다음 글</span>
                                </Link>}
                        </li>
                    </ul>
                </div>
                <section>
                    {
                        modalOpen &&
                        <div className={'modalContainer'} ref={modalBackground} onClick={e => {
                            if (e.target === modalBackground.current) {
                                setModalOpen(false);
                            }
                        }}>
                            <div className={'inquiryForm'}>
                                <div style={{padding: 0, margin: 0}}>
                                    <FontAwesomeIcon className='modalCloseBtn' icon={faXmark}
                                                     onClick={() => setModalOpen(false)}/>

                                </div>

                                <Update/>

                                {showMessage && (
                                    <Alert variant="success" className="mt-3">
                                        문의가 완료되었습니다
                                    </Alert>
                                )}
                            </div>
                        </div>
                    }
                </section>
                <div className={'d-flex justify-content-between align-items-center'}>
                    <div className={'d-flex justify-content-start align-items-center'}>
                        <Button variant={'outlined'} style={{marginRight: '4px'}} onClick={handleSubmit}>목록으로</Button>
                    </div>
                    <div className={'d-flex justify-content-end align-items-center'}>
                        <Button variant={'outlined'} color={'success'}
                                onClick={() => setModalOpen(true)}>문의답변</Button>
                        <Button variant={'outlined'} color={'warning'} onClick={handleDelete}>문의삭제</Button>
                    </div>
                </div>
            </Container>
            {/*<Button variant="primary" size="md" onClick={handleUpdate}>*/}
            {/*    답변 달기*/}
            {/*</Button>*/}
        </div>
    );
}