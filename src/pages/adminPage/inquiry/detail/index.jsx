import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";
import Update from "../update/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScrewdriverWrench, faCalendarPlus, faSquareCaretUp, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";

export default function Index() {
    const {inquiryIndex} = useParams();
    const [inquiry, setInquiry] = useState(null);
    const [inquiries, setInquiries] = useState([]); // 전체 데이터
    const navigate = useNavigate();

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
            <Container>
                <h1>문의 상세 내역</h1>

                <div className={'d-flex align-items-center justify-content-around'}>
                    <span>문의제목 : {inquiry.inquiryTitle}</span>
                    <span>문의일자: {new Date(inquiry.inquiryDate).toLocaleDateString()}</span>
                </div>
                <div className={'d-flex align-items-center justify-content-around'}>
                    <span>전화번호 : {inquiry.inquiryPhone}</span>
                    <span>이메일 : {inquiry.inquiryEmail}</span>
                </div>
                <p>문의내용 : {inquiry.inquiryContent}<Button className='patrolListBtn' onClick={handleSubmit} style={{position: 'relative', bottom: '40px', float: 'right'}}>목록으로</Button></p>
                <p>문의답변 : {inquiry.inquiryAnswer === null ?
                    <span className={'answerNeed'}>답변 필요</span>
                    :
                    <span>{inquiry.inquiryAnswer}</span>}</p>
                <Button className={'float-end'} variant="danger" size="md" onClick={handleDelete}>문의삭제</Button>
            </Container>
            {/*<Button variant="primary" size="md" onClick={handleUpdate}>*/}
            {/*    답변 달기*/}
            {/*</Button>*/}

            <Update/>

            <div className='pageMove' style={{padding: '13px 20px 0 111px', width: '93%'}}>
                <ul>
                    <li>
                    {prevPatrol === null ? <><FontAwesomeIcon icon={faSquareCaretUp} /><span>이전글이 없습니다.</span></> :  <Link to={`/admin/inquiry/${prevPatrol}`}><FontAwesomeIcon icon={faSquareCaretUp} />
                        <span>이전 글</span>
                    </Link>}
                    </li>

                    <li>
                    {nextPatrol === null ? <><FontAwesomeIcon icon={faSquareCaretDown} /><span>다음글이 없습니다.</span></> : <Link to={`/admin/inquiry/${nextPatrol}`}><FontAwesomeIcon icon={faSquareCaretDown} />
                        <span>다음 글</span>
                    </Link>}
                    </li>
                </ul>
            </div>
            </div>        
    );
}
