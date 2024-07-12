import { Table, Container, Form, Button, Dropdown, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NoticeTable() {
    const [notices, setNotices] = useState([]);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOption, setSearchOption] = useState('title'); // 검색 옵션 상태 추가
    
    const [noResultsMessage, setNoResultsMessage] = useState(''); // 검색 결과가 없을 때 메시지 상태 추가
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' }); // 정렬 설정 상태 추가

    useEffect(() => {
        // axios를 사용하여 공지사항 데이터를 가져옵니다.
        axios.get('http://localhost:8080/api/notice')
            .then(response => setNotices(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, []);

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

        // axios를 사용하여 검색 요청을 보냅니다.
        axios.get(url)
            .then(response => {
                if (response.data.length === 0) {
                    setNoResultsMessage(' 일치하는 검색결과가 없습니다.');
                    setSearchResults([]);
                } else {
                    setNoResultsMessage('');
                    setSearchResults(response.data);
                }
            })
            .catch(error => {
                if (error.response) {
                    // 서버가 응답했지만, 상태 코드가 범위 밖일 경우
                    console.error('공지사항 검색 오류:', error.response.status, error.response.data);
                } else if (error.request) {
                    // 요청이 이루어졌으나 응답이 없을 경우
                    console.error('공지사항 검색 오류: 응답 없음');
                } else {
                    // 요청 설정 중에 오류가 발생했을 경우
                    console.error('공지사항 검색 오류:', error.message);
                }
                setNoResultsMessage('데이터에 없는 검색어입니다');
                setSearchResults([]);
            });
    };

    const handleSearchOptionSelect = (option) => {
        setSearchOption(option); // 검색 옵션 변경
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
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

    return (
        <Container>
            <Container className="d-flex justify-content-end align-items-center">
                <Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        검색 옵션: {searchOptionLabel}
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
                                    <Link to={`/admin/notice/${notice.noticeIndex}`}/>{notice.noticeTitle}</td>
                                <td>{new Date(notice.createDate).toLocaleDateString()}</td>
                                <td>{notice.adminName}</td>
                                <td>{notice.noticeView}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
