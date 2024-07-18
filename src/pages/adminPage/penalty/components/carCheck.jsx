import { Table, Container, Form, Button, Dropdown, Alert, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CarCheck(){
    const [penalties, setPenalties] = useState([]);
    const [penaltyTitle, setPenaltyTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOption, setSearchOption] = useState('title'); // 검색 옵션 상태 추가
    const [noResultsMessage, setNoResultsMessage] = useState(''); // 검색 결과가 없을 때 메시지 상태 추가

    useEffect(() => {
        // axios를 사용하여 공지사항 데이터를 가져옵니다.
        axios.get('http://localhost:8080/api/penalty')
            .then(response => setPenalties(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, []);

    const handleInputChange = (e) => {
        setPenaltyTitle(e.target.value);
        if (e.target.value === '') {
            setSearchResults([]);
            setNoResultsMessage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (penaltyTitle.trim() === '') {
            setSearchResults([]);
            setNoResultsMessage('');
            return;
        }

        let url = '';
        if (searchOption === 'title') {
            url = `http://localhost:8080/api/penalty/number/${penaltyTitle}`;
        } else if (searchOption === 'date') {
            url = `http://localhost:8080/api/penalty/date/${penaltyTitle}`;
        }

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

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    const sortedPenalty = [...(searchResults.length > 0 ? searchResults : penalties)];

    const searchOptionLabel = searchOption === 'title' ? '차량 번호' : '날짜';

    return (
        <Container>
            <p>단속 차량 목록</p>

            <Container className="d-flex justify-content-end align-items-center">
                <Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        검색 옵션: {searchOptionLabel}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="title">차량 번호</Dropdown.Item>
                        <Dropdown.Item eventKey="date">날짜</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form onSubmit={handleSubmit} className="d-flex pb-2" style={{ width: '300px' }}>
                    <Form.Control
                        type="text"
                        placeholder="검색"
                        name="penalty"
                        value={penaltyTitle}
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
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>NO</th>
                        <th>차량 번호</th>
                        <th>과태료</th>
                        <th>날짜</th>
                    </tr>
                    </thead>
                    <tbody>

                    {sortedPenalty.map(penalty => (
                        <tr key={penalty.penaltyIndex}>
                            <td>{penalty.penaltyIndex}</td>
                            <td><Link to={`/admin/penalty/${penalty.penaltyIndex}`}>{penalty.penaltyCarNumber}</Link></td>
                            <td>{formatNumber(penalty.penaltyCash)}</td>
                            <td>{new Date(penalty.penaltyDate).toLocaleDateString()}</td>
                        </tr>
                    ))}

                    </tbody>
                </Table>
            )}
            <Pagination>
                <Pagination.First/>
                <Pagination.Prev/>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Container>

    )
}
