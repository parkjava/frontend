import {Table, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react';


export default function Index() {
    const [inquiry, setInquiry] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/inquiry')
            .then(response => response.json())
            .then(data => setInquiry(data))
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
                </tr>
                </thead>
                <tbody>
                {inquiry.map(inquiry => (
                    <tr key={inquiry.inquiryIndex}>
                        <td>
                            {inquiry.inquiryIndex}
                        </td>
                        <td>
                            <Link to={`/admin/inquirylist/${inquiry.inquiryIndex}`}>{inquiry.inquiryTitle}
                            </Link>
                        </td>
                        <td>
                            {new Date(inquiry.inquiryDate).toLocaleDateString()}
                        </td>
                        <td>
                            {inquiry.inquiryWriter}
                        </td>

                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
