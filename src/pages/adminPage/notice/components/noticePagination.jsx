import React, { useState, useEffect } from 'react';
import { Table, Container, Form, Button, Dropdown, Alert, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function NoticePagination() {
    const [notices, setNotices] = useState([]);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOption, setSearchOption] = useState('title');
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchNotices();
    }, [offset, limit]);

    const fetchNotices = () => {
        axios.get(`http://localhost:8080/api/notice/paginate/${limit}/${offset}`)
            .then(response => {
                setNotices(response.data); // 전체 공지사항 목록
                setTotal(response.data.length); // 전체 공지사항 개수
            })
            .catch(error => console.error('데이터 가져오기 오류:', error));
    };

    const handleInputChange = (e) => {
        setNoticeTitle(e.target.value);
        if (e.target.value === '') {
            setSearchResults([]);
            setNoResultsMessage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (noticeTitle.trim() === '') {
            setSearchResults([]);
            setNoResultsMessage('');
            return;
        }

        let url = '';
        if (searchOption === 'title') {
            url = `http://localhost:8080/api/notice/title/${noticeTitle}`;
        } else if (searchOption === 'admin') {
            url = `http://localhost:8080/api/notice/name/${noticeTitle}`;
        }

        axios.get(url)
            .then(response => {
                if (response.data.length === 0) {
                    setNoResultsMessage('일치하는 검색 결과가 없습니다.');
                    setSearchResults([]);
                } else {
                    setNoResultsMessage('');
                    setSearchResults(response.data);
                }
            })
            .catch(error => {
                console.error('공지사항 검색 오류:', error);
                setNoResultsMessage('데이터에 없는 검색어입니다.');
                setSearchResults([]);
            });
    };

    const handleSearchOptionSelect = (option) => {
        setSearchOption(option);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // 페이지 변환 변수
    const handlePageChange = (pageNumber) => {
        setOffset((pageNumber - 1) * limit);
    };

    const sortedNotices = [...(searchResults.length > 0 ? searchResults : notices)];

    if (sortConfig.key) {
        sortedNotices.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }

    const searchOptionLabel = searchOption === 'title' ? '제목' : '작성자';
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return (
        <Container>
            <Container className="d-flex justify-content-end align-items-center">
                <Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        검색 옵션: {searchOptionLabel === 'title' ? '제목' : '작성자'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="title">제목</Dropdown.Item>
                        <Dropdown.Item eventKey="admin">작성자</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form onSubmit={handleSubmit} className="d-flex pb-2" style={{ width: '300px' }}>
                    <Form.Control
                        type="text"
                        placeholder="검색"
                        name="notice"
                        value={noticeTitle}
                        onChange={handleInputChange}
                        className="me-2"
                    />
                    <Button variant="primary" type="submit" className="" style={{ width: '100px' }}>
                        검색
                    </Button>
                </Form>
            </Container>
            {noResultsMessage ? (
                <Alert variant="warning">{noResultsMessage}</Alert>
            ) : (
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('noticeIndex')}>NO</th>
                            <th onClick={() => handleSort('noticeTitle')}>제목</th>
                            <th onClick={() => handleSort('createDate')}>게시일</th>
                            <th onClick={() => handleSort('adminName')}>작성자</th>
                            <th onClick={() => handleSort('noticeView')}>조회수</th>
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
                                <td>{notice.adminName}</td>
                                <td>{notice.noticeView}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </Container>
    );
}
