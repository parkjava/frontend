import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../../../common/components/axiosinstance";

export default function Index() {
    const {noticeIndex} = useParams();
    const [notice, setNotice] = useState();


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
    }, [noticeIndex]);

    if (!notice) {
        return <Container>Loading...</Container>;
    }


    return (
        <>
            <div className={'commonContainer'}>
                <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                    <h1 className={'userNoticeTitle'}>
                        {notice.noticeTitle}
                    </h1>
                    <p className={'userNoticeDate'}>
                        {new Date(notice.createDate).toLocaleDateString('ko-KR')}
                    </p>
                    <Table className={'detailTable'} bordered>
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*    /!*<th rowSpan={2} style={{width: '60px', verticalAlign: 'middle'}}>제목</th>*!/*/}
                        {/*    /!*<th colSpan={2} style={{width: '60px'}}>일자</th>*!/*/}
                        {/*    /!*<th className={'userNoticeDate'} colSpan={4} style={{width: '300px'}}>*!/*/}
                        {/*    /!*    {new Date(notice.createDate).toLocaleDateString('ko-KR')}*!/*/}
                        {/*    /!*</th>*!/*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                        <tbody>
                        <tr>
                            <td className={'userNoticeText'} colSpan={8} style={{height: '600px'}}>
                                {notice.noticeContent}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="text-center">
                                {/*{prevIndex >= 0 && ( // 이전 글 링크를 조건에 따라 렌더링*/}
                                <p>
                                    <Link to={`/user/notice/${parseInt(noticeIndex) - 1}`}>이전 글▲</Link>
                                </p>
                                {/*// )}*/}
                                {/*{nextIndex <= penalties.length && ( // 다음 글 링크를 조건에 따라 렌더링*/}
                                <p>
                                    <Link to={`/user/notice/${parseInt(noticeIndex) + 1}`}>다음 글▼</Link>
                                </p>
                                {/*// )}*/}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className={'noticeDetailBtn'}>
                        <Button className='noticeListBtn'><Link
                            to={'../user/notice'}>목록으로</Link></Button>

                    </div>
                </Container>
            </div>
        </>
    );
}
