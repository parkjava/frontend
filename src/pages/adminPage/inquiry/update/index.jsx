import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap';
import {Button} from '@mui/material'
import axiosInstance from "../../../../common/components/axiosinstance";

export default function Index() {
    const {inquiryIndex} = useParams();
    const [inquiry, setInquiry] = useState('');
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function inquiryUpdateApi() {
        axiosInstance
            .get(`/api/inquiry/${inquiryIndex}`)
            .then(response => setInquiry(response))
            .catch(error => console.error('Error fetching inquiry detail:', error));
    }

    useEffect(() => {
        inquiryUpdateApi();
    }, [inquiryIndex]);

    const handleInputChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setInquiry({
            ...inquiry,
            [name]: value,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedInquiry = {
            ...inquiry,
            inquiryAnswer: `${inquiry.inquiryAnswer}`
        }
        axiosInstance
            .put(`/api/inquiry/answer/${inquiryIndex}`, updatedInquiry)
            .then(response => setInquiry(response))
            .catch(error => console.error('Error updating inquiry:', error));
        alert('답변이 완료되었습니다.');
        navigate(`/admin/inquiry`, {replace: true});
    };

    if (!inquiry) {
        return <Container>Loading...</Container>;
    }

    return (
        <>
            <Container className='inquiryAnswerContainer'>
                <Form onSubmit={handleUpdate}>
                    <h2 className={'mb-4 mt-4'} style={{textAlign: 'center'}}>문의 답변</h2>
                    <Form.Group controlId="inquiryAnswer">
                        <Form.Control
                            as="textarea"
                            rows={9}
                            placeholder="답변을 입력하세요"
                            name="inquiryAnswer"

                            onChange={handleInputChange}
                        />
                        <Button
                            variant={"outlined"}
                            color={'primary'}
                            type="submit"
                            className={'answerBtn mt-4'}>
                            등록
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}
