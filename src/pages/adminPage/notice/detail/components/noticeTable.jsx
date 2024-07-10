import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function NoticeDetail() {
    const { noticeIndex } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/notice/${noticeIndex}`)
            .then(response => response.json())
            .then(data => setNotice(data))
            .catch(error => console.error('Error fetching notice detail:', error));
    }, [noticeIndex]);

    if (!notice) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Card>
                <Card.Header>{notice.noticeTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {notice.noticeContent}
                    </Card.Text>
                    <Card.Footer>
                        작성자: {notice.userName} | 게시일: {new Date(notice.createDate).toLocaleDateString()}
                    </Card.Footer>
                    {notice.noticeView}
                </Card.Body>
            </Card>
        </Container>
    );
}