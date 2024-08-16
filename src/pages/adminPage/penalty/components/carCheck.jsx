import {Table, Container, Form, Button, Dropdown, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Pagination from "../../../../common/components/pagination2"
import axiosInstance from '../../../../common/components/axiosinstance';
import {PC} from '../../../../common/components/responsive';

export default function CarCheck() {
    const [penalties, setPenalties] = useState([]);
    const [penaltyTitle, setPenaltyTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOption, setSearchOption] = useState('carnumber'); // 검색 옵션 상태 추가
    const [noResultsMessage, setNoResultsMessage] = useState(''); // 검색 결과가 없을 때 메시지 상태 추가

    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : penalties.slice(indexOfFirst, indexOfLast);

    function penaltyApi() {
        axiosInstance
            .get('/api/penalty/desc')
            .then((res) => {
                setPenalties(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        penaltyApi();
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
        if (searchOption === 'carnumber') {
            url = `http://localhost:8080/api/penalty/number/${penaltyTitle}`;
        } else if (searchOption === 'date') {
            url = `http://localhost:8080/api/penalty/date/${penaltyTitle}`;
        }

        axiosInstance.get(url)
            .then(res => {
                if (res.length === 0) {
                    setNoResultsMessage(' 일치하는 검색결과가 없습니다.');
                    setSearchResults([]);
                } else {
                    setNoResultsMessage('');
                    setSearchResults(res);
                }
            })
            .catch(err => {
                console.error('검색 오류:', err);
                setNoResultsMessage('데이터에 없는 검색어입니다.');
                setSearchResults([]);
            });
    };

    const handleSearchOptionSelect = (option) => {
        setSearchOption(option); // 검색 옵션 변경
    };

    const handlePenaltyCount = (option) => {
        if (option === 'ten') {
            setPostsPerPage(10);
        } else if (option === 'fifteen') {
            setPostsPerPage(15);
        }
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    // const sortedPenalty = [...(searchResults.length > 0 ? searchResults : penalties)];

    const searchOptionLabel = searchOption === 'carnumber' ? '차량 번호' : '날짜';
    const postsPerPageLabel = postsPerPage === 10 ? '10개' : '15개';

    return (<>

            <PC>
                <div className={'commonContainer'}>
                    <Container>
                        <h1 className={'penaltyH1'}>단속 차량 목록</h1>
                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown onSelect={handlePenaltyCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                    데이터 개수: {postsPerPageLabel}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className={'dropDownToggle'}>
                                    <Dropdown.Item eventKey="ten">10개</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifteen">15개</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>

                        <Container className="d-flex justify-content-end align-items-center">
                            <Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">
                                <Dropdown.Toggle className={'dropDownToggle'} variant="secondary" id="dropdown-basic">
                                    검색 옵션: {searchOptionLabel}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="carnumber">차량 번호</Dropdown.Item>
                                    <Dropdown.Item eventKey="date">날짜</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form onSubmit={handleSubmit} className="d-flex pb-2" style={{width: '300px'}}>
                                <Form.Control
                                    type="text"
                                    placeholder="검색"
                                    name="penalty"
                                    value={penaltyTitle}
                                    onChange={handleInputChange}
                                    className="me-2"
                                />
                                <Button className={"searchButton"} variant="primary" type="submit"
                                        style={{width: '100px'}}>
                                    검색
                                </Button>
                            </Form>
                        </Container>

                        {noResultsMessage ? (
                            <Alert variant="warning">{noResultsMessage}</Alert>
                        ) : (
                            <Table hover variant="white">
                                <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>차량 번호</th>
                                    <th>과태료</th>
                                    <th>날짜</th>
                                </tr>
                                </thead>
                                <tbody>

                                {currentPosts.map(penalty => (
                                    <tr key={penalty.penaltyIndex}>
                                        <td>{penalty.penaltyIndex}</td>
                                        <td><Link
                                            to={`/admin/penalty/${penalty.penaltyIndex}`}>{penalty.penaltyCarNumber}</Link>
                                        </td>
                                        <td>{formatNumber(penalty.penaltyCash)}원</td>
                                        <td>{new Date(penalty.penaltyDate).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        }).replace(/\./g, '-').replace(/\s+/g, '').split('-').slice(0, 3).join('-')}</td>
                                    </tr>
                                ))}

                                </tbody>
                            </Table>
                        )}

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={penalties.length}
                            paginate={setCurrentPage}></Pagination>

                        {/* <Pagination>
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
            </Pagination> */}
                    </Container>
                </div>
            </PC>
        </>
    )
}
