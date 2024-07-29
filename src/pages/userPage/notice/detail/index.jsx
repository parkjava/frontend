import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


export default function Index() {
    const {noticeIndex} = useParams();
    const [notice, setNotice] = useState();


    useEffect(() => {
        // axios를 사용하여 공지사항 데이터를 가져옵니다.
        axios.get(`http://localhost:8080/user/api/notice/${noticeIndex}`)
            .then(response => setNotice(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, [noticeIndex]);


    if (!notice) {
        return <Container>Loading...</Container>;
    }

    return (
        <>
            <div className={'commonContainer'}>
                <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                    <Table className={'detailTable'} bordered>
                        <thead>
                        <tr>
                            <th rowSpan={2} style={{width: '60px', verticalAlign: 'middle'}}>제목</th>
                            <th rowSpan={2} style={{width: '300px', verticalAlign: 'middle'}}>
                                {notice.noticeTitle}
                            </th>
                            <th colSpan={2} style={{width: '60px'}}>일자</th>
                            <th colSpan={4} style={{width: '300px'}}>
                                {new Date(notice.createDate).toLocaleDateString('ko-KR')}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan={8} style={{height: '600px'}}>
                                {notice.noticeContent}
                            </td>
                        </tr>

                        </tbody>
                    </Table>
                    <div className={'noticeDetailBtn'}>
                        <Button className='noticeListBtn' variant="info"><Link
                            to={'../user/notice'}>목록으로</Link></Button>
                        {/* <Button className='documentButton' variant="info" onClick={handleBack}>목록으로</Button> */}
                        {/*<Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}*/}
                    </div>
                </Container>
            </div>
        </>
    );
}
