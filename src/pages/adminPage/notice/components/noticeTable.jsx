import {Table, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react';


export default function NoticeTable() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/notice')
            .then(response => response.json())
            .then(data => setNotices(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container>
            <Table striped bordered hover variant="light">
                <thead>
                <tr>
                    <th>NO</th>
                    <th>제목</th>
                    <th>게시일</th>
                    <th>작성자</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                {notices.map(notice => (
                    <tr key={notice.noticeIndex}>
                        <td>
                            {notice.noticeIndex}
                        </td>
                        <td>
                            <Link to={`/admin/notice/${notice.noticeIndex}`}>{notice.noticeTitle}
                            </Link>
                        </td>
                        <td>
                            {new Date(notice.createDate).toLocaleDateString()}
                        </td>
                        <td>
                            {notice.userName}
                        </td>
                        <td>
                            {notice.noticeView}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
