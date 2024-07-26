import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Table, Container, Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../../../../../static/common.css'
import axiosInstance from '../../../../../common/components/axiosinstance';

export default function NoticeTable() {
    const {noticeIndex} = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState();

    function noticeDetailApi() {
        axiosInstance
          .get(`/api/notice/${noticeIndex}`)
          .then((res) => setNotice(res))
          .catch(error => console.error('데이터 가져오기 오류:', error));
      }

      useEffect(() => {
        noticeDetailApi();
      }, [noticeIndex]);

    const handleUpdate = () => {
        navigate(`/admin/notice/update/${noticeIndex}`);
    };


    const handleDelete = () => {
        axiosInstance.delete(`/api/notice/delete/${noticeIndex}`)
            .then(response => setNotice(response))
            .catch(error => console.error('데이터 가져오기 오류:', error));

        navigate(`/admin/notice`);
    };


    if (!notice) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Table striped="columns" bordered>
                <thead>
                <tr>
                    <th style={{width: '80px'}}>제목</th>
                    <th style={{width: '300px'}}>
                        {notice.noticeTitle}
                    </th>
                    <th style={{width: '80px'}}>작성자</th>
                    <th style={{width: '300px'}}>
                        {notice.adminName}
                    </th>
                    <th style={{width: '80px'}}>작성일</th>
                    <th style={{width: '300px'}}>
                        {new Date(notice.createDate).toLocaleDateString('ko-KR')}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={6}>
                        <Card.Text>
                            {notice.noticeContent}
                        </Card.Text>
                        <Card.Footer>
                            조회수: {notice.noticeView}
                        </Card.Footer>
                    </td>
                </tr>
                </tbody>
            </Table>
            <Button variant={"link"}>목록으로</Button>
            <div>
                <Button variant="info" onClick={handleUpdate}>수정</Button>{' '}
                <Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}
            </div>
        </Container>
    );
}
