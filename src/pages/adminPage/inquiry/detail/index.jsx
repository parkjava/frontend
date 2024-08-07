import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";
import Update from "../update/index";

export default function Index() {
    const {inquiryIndex} = useParams();
    const [inquiry, setInquiry] = useState(null);
    const navigate = useNavigate();

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
    }, []);

    const handleDelete = () => {
        axiosInstance
            .delete(`/api/inquiry/delete/${inquiryIndex}`)
            .then(response => {
                if (response.status !== 204) {
                    throw new Error('Network response was not ok');
                }
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
                <p>문의내용 : {inquiry.inquiryContent}</p>
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
        </div>
    );
}
