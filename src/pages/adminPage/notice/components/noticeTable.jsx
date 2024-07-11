import { Table, Container, Form, Button, Dropdown  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function NoticeTable() {
    const [notices, setNotices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/notice')
            .then(response => response.json())
            .then(data => setNotices(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            setSearchResults([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }
        fetch(`http://localhost:8080/api/notice/title/${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => console.error('Error searching notices:', error));
    };

    const handleSort = (option) => {
        setSortOption(option);
    };

    // 검색 결과가 있을 때는 검색 결과를 표시하고, 없을 때는 전체 데이터를 표시합니다.
    const sortedNotices = [...(searchResults.length > 0 ? searchResults : notices)];

    if (sortOption === 'views') {
        sortedNotices.sort((a, b) => b.noticeView - a.noticeView);
    } else if (sortOption === 'recent') {
        sortedNotices.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    }

    return (
        <Container>
            <Container className="d-flex justify-content-end align-items-center">
                <Dropdown onSelect={handleSort} className="me-2 pb-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        정렬 옵션
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="views">조회순</Dropdown.Item>
                        <Dropdown.Item eventKey="recent">최신순</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form onSubmit={handleSubmit} className="d-flex pb-2" style={{ width: '300px' }}>
                    <Form.Control
                        type="text"
                        placeholder="검색"
                        name="notice"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="me-2"
                    />
                    <Button variant="primary" type="submit" className="" style={{ width: '100px' }}>
                        검색
                    </Button>
                </Form>
            </Container>
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
                {sortedNotices.map(notice => (
                    <tr key={notice.noticeIndex}>
                        <td>{notice.noticeIndex}</td>
                        <td>
                            <Link to={`/admin/notice/${notice.noticeIndex}`}>{notice.noticeTitle}</Link>
                        </td>
                        <td>{new Date(notice.createDate).toLocaleDateString()}</td>
                        <td>{notice.userName}</td>
                        <td>{notice.noticeView}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}
