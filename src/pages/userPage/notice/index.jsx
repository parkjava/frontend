import React, {useState, useEffect} from 'react';
import {Table, Container, Form, Button, Dropdown, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BasicPagination from '../../../common/components/pagination3';
import Cookies from "js-cookie";
import {Mobile, PC} from "../../../common/components/responsive";
import {Search} from "@mui/icons-material";

export default function Index() {
    const [notices, setNotices] = useState([]);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchOption, setSearchOption] = useState('title');
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [sortConfig, setSortConfig] = useState({key: '', direction: ''});

    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : notices.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/api/notice`, {
            headers: {
                'Authorization': Cookies.get('Authorization') // 쿠키를 요청 헤더에 포함
            }
        })
            .then(response => {
                setNotices(response.data); // 전체 공지사항 목록

            },)
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
            url = `http://localhost:8080/user/api/notice/title/${noticeTitle}`;
        } else if (searchOption === 'admin') {
            url = `http://localhost:8080/user/api/notice/name/${noticeTitle}`;
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

    // const handleSearchOptionSelect = (option) => {
    //     setSearchOption(option);
    // };

    const handleNoticeCount = (option) => {
        if (option === 'ten') {
            setPostsPerPage(10);
        } else if (option === 'thirty') {
            setPostsPerPage(30);
        } else if (option === 'fifty') {
            setPostsPerPage(50);
        }
    }

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
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


    // const searchOptionLabel = searchOption === 'title' ? '제목' : '작성자';

    return (<>
            <PC>
                <div className={'commonContainer'}>
                    <Container className={'userNoticeContainer'}>
                        <h1 className={'adminNoticeH1'}>📢&nbsp;공지사항</h1>
                        <hr/>
                        <Container className="d-lg-flex justify-content-end align-items-center">
                            {/*<Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">*/}
                            {/*    <Dropdown.Toggle className={'dropDownToggle'} variant="secondary" id="dropdown-basic">*/}
                            {/*        검색 옵션: {searchOptionLabel === 'title' ? '제목' : '작성자'}*/}
                            {/*    </Dropdown.Toggle>*/}
                            {/*    <Dropdown.Menu>*/}
                            {/*        <Dropdown.Item eventKey="title">제목</Dropdown.Item>*/}
                            {/*        <Dropdown.Item eventKey="admin">작성자</Dropdown.Item>*/}
                            {/*    </Dropdown.Menu>*/}
                            {/*</Dropdown>*/}
                            <Form onSubmit={handleSubmit}
                                  className="d-lg-flex justify-content-end align-items-center mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="제목으로 검색"
                                    name="notice"
                                    value={noticeTitle}
                                    onChange={handleInputChange}
                                    className="me-2"
                                />
                                <Button className={'userNoticeSearch'} variant="primary" type="submit"
                                        style={{width: '100px'}}>
                                    <Search className={'userNoticeSearchIcon'}/>
                                </Button>
                            </Form>
                        </Container>
                        {noResultsMessage ? (
                            <Alert variant="warning">{noResultsMessage}</Alert>
                        ) : (
                            <Table bordered hover variant="white">
                                <thead>
                                <tr>
                                    <th className={'userNoticeTableHead'} onClick={() => handleSort('noticeIndex')}>NO
                                    </th>
                                    <th className={'userNoticeTableHead'} onClick={() => handleSort('noticeTitle')}>제목
                                    </th>
                                    <th className={'userNoticeTableHead'} onClick={() => handleSort('createDate')}>게시일
                                    </th>
                                    <th className={'userNoticeTableHead'} onClick={() => handleSort('noticeView')}>조회수
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentPosts.map(notice => (
                                    <tr key={notice.noticeIndex}>
                                        <td>{notice.noticeIndex}</td>
                                        <td>
                                            <Link to={`/user/notice/${notice.noticeIndex}`}>{notice.noticeTitle}</Link>
                                        </td>
                                        <td>{new Date(notice.createDate).toLocaleDateString()}</td>
                                        {/*<td>{notice.adminName}</td>*/}
                                        <td>{notice.noticeView}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown color="primary" exclusive onSelect={handleNoticeCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                    글 개수 설정 : {postsPerPage}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ten">10개</Dropdown.Item>
                                    <Dropdown.Item eventKey="thirty">30개</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifty">50개</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                        <BasicPagination
                            postsPerPage={postsPerPage}
                            totalPosts={notices.length}
                            paginate={setCurrentPage}></BasicPagination>
                    </Container>

                </div>
            </PC>
            <Mobile>
                <div className={'commonContainer'}>
                    <Container>
                        <h1 className={'adminNoticeH1'}>📢<br/>공지사항</h1>
                        <Container className="d-flex justify-content-center align-items-center wd-100 mb-4 ">
                            <Form onSubmit={handleSubmit}>
                                <Form.Control
                                    type="text"
                                    placeholder="제목으로 검색"
                                    name="notice"
                                    value={noticeTitle}
                                    onChange={handleInputChange}
                                    className="me-2 flex-grow-1"
                                />
                            </Form>
                            <Button className={'userNoticeSearch'} style={{maxHeight: 38}} variant="primary"
                                    type="submit">
                                <Search className={'userNoticeSearchIcon'}/>
                            </Button>
                        </Container>
                        {noResultsMessage ? (
                            <Alert variant="warning">{noResultsMessage}</Alert>
                        ) : (
                            <Table className={'userNoticeTableMobile'} bordered hover variant="white">
                                <thead>
                                <tr>
                                    {/*<th onClick={() => handleSort('noticeIndex')}>NO</th>*/}
                                    <th className={'userNoticeTh'} onClick={() => handleSort('noticeTitle')}>제목</th>
                                    <th className={'userNoticeTh'} onClick={() => handleSort('createDate')}>게시일</th>
                                    <th className={'userNoticeTh'} onClick={() => handleSort('noticeView')}>조회수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentPosts.map(notice => (
                                    <tr key={notice.noticeIndex}>
                                        {/*<td>{notice.noticeIndex}</td>*/}
                                        <td>
                                            <Link to={`/user/notice/${notice.noticeIndex}`}>{notice.noticeTitle}</Link>
                                        </td>
                                        <td className={'noticeDate'}>{new Date(notice.createDate).toLocaleDateString()}</td>
                                        {/*<td>{notice.adminName}</td>*/}
                                        <td>{notice.noticeView}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown onSelect={handleNoticeCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                    글 개수 설정 : {postsPerPage}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ten">10개</Dropdown.Item>
                                    <Dropdown.Item eventKey="thirty">30개</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifty">50개</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>

                        <BasicPagination
                            postsPerPage={postsPerPage}
                            totalPosts={notices.length}
                            paginate={setCurrentPage}></BasicPagination>
                    </Container>

                </div>
            </Mobile>
        </>
    );
}
