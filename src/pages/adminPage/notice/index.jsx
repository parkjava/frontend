import React, {useState, useEffect} from 'react';
import {Table, Container, Form, Dropdown, Alert} from 'react-bootstrap';
import {Button} from '@mui/material'
import {Link} from 'react-router-dom';
import axiosInstance from '../../../common/components/axiosinstance';
import {Mobile, PC} from "../../../common/components/responsive";
import {Search} from "@mui/icons-material";
import BasicPagination from '../../../common/components/pagination3';

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


    function noticeApi() {
        axiosInstance
            .get('/api/notice')
            .then((res) => {
                setNotices(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        noticeApi();
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

        axiosInstance.get(url)
            .then(res => {
                if (res.length === 0) {
                    setNoResultsMessage('일치하는 검색 결과가 없습니다.');
                    setSearchResults([]);
                } else {
                    setNoResultsMessage('');
                    setSearchResults(res);
                }
            })
            .catch(err => {
                console.error('공지사항 검색 오류:', err);
                setNoResultsMessage('데이터에 없는 검색어입니다.');
                setSearchResults([]);
            });
    };

    const handleSearchOptionSelect = (option) => {
        setSearchOption(option);
    };

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

    const searchOptionLabel = searchOption === 'title' ? '제목' : '작성자';


    return (
        <>
            <PC>
                <div className={'commonContainer'}>
                    <Container>
                        <h1 className={'adminNoticeH1'}>📢&nbsp;공지사항</h1>
                        <hr/>
                        <Container className="d-flex justify-content-center align-items-center">
                            {/*<Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">*/}
                            {/*    <Dropdown.Toggle className={'dropDownToggle'} variant="secondary" id="dropdown-basic">*/}
                            {/*        검색 옵션: {searchOptionLabel}*/}
                            {/*    </Dropdown.Toggle>*/}

                            {/*    <Dropdown.Menu>*/}
                            {/*        <Dropdown.Item eventKey="title">공지제목</Dropdown.Item>*/}
                            {/*        <Dropdown.Item eventKey="admin">작성자</Dropdown.Item>*/}
                            {/*    </Dropdown.Menu>*/}
                            {/*</Dropdown>*/}
                            <Form onSubmit={handleSubmit} className="d-flex pb-2" style={{width: '300px'}}>
                                <Form.Control
                                    type="text"
                                    placeholder="제목으로 검색"
                                    name="notice"
                                    value={noticeTitle}
                                    onChange={handleInputChange}
                                    className="me-2"
                                />
                                <Button variant="primary" type="submit" className={"searchButton"}
                                        style={{width: '100px'}}>
                                    <Search className={'adminNoticeSearchIcon'}/>
                                </Button>
                            </Form>
                        </Container>


                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown onSelect={handleNoticeCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                     글 개수 : {postsPerPage}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ten">10</Dropdown.Item>
                                    <Dropdown.Item eventKey="thirty">30</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifty">50</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>


                        {noResultsMessage ? (
                            <Alert variant="warning">{noResultsMessage}</Alert>
                        ) : (

                            <Table hover variant={'white'} className="table">
                                <thead className={'adminNoticeHead'}>
                                <tr>
                                    <th className="no-column" onClick={() => handleSort('noticeIndex')}>NO</th>
                                    <th className="title-column" onClick={() => handleSort('noticeTitle')}>제목</th>
                                    <th className="date-column" onClick={() => handleSort('createDate')}>게시일</th>
                                    <th className="view-column" onClick={() => handleSort('noticeView')}>조회수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentPosts.map(notice => (
                                    <tr key={notice.noticeIndex}>
                                        <td className="no-column">{notice.noticeIndex}</td>
                                        <td className="title-column">
                                            <Link to={`/admin/notice/${notice.noticeIndex}`}>{notice.noticeTitle}</Link>
                                        </td>
                                        <td className="date-column">{notice.createDate}</td>
                                        <td className="view-column">{notice.noticeView}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                        <Container className={'d-flex justify-content-end align-items-center mt-4'}>
                            <Link to="/admin/notice/create">
                                <Button variant={'outlined'} color={'primary'}>
                                    새 공지사항
                                </Button>
                            </Link>
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
                        <Container className="d-flex justify-content-center align-items-center">
                            {/*<Dropdown onSelect={handleSearchOptionSelect} className="me-2 pb-2">*/}
                            {/*    <Dropdown.Toggle className={'dropDownToggle'} variant="secondary" id="dropdown-basic">*/}
                            {/*        검색 옵션: {searchOptionLabel}*/}
                            {/*    </Dropdown.Toggle>*/}

                            {/*    <Dropdown.Menu>*/}
                            {/*        <Dropdown.Item eventKey="title">공지제목</Dropdown.Item>*/}
                            {/*        <Dropdown.Item eventKey="admin">작성자</Dropdown.Item>*/}
                            {/*    </Dropdown.Menu>*/}
                            {/*</Dropdown>*/}
                            <Form onSubmit={handleSubmit} className="d-flex pb-2" style={{width: '300px'}}>
                                <Form.Control
                                    type="text"
                                    placeholder="제목으로 검색"
                                    name="notice"
                                    value={noticeTitle}
                                    onChange={handleInputChange}
                                    className="me-2"
                                />
                                <Button variant="primary" type="submit" className={"searchButton"}
                                        style={{width: '100px'}}>
                                    <Search className={'adminNoticeSearchIcon'}/>
                                </Button>
                            </Form>
                        </Container>


                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown onSelect={handleNoticeCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                    글 개수 : {postsPerPage}개
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ten">10</Dropdown.Item>
                                    <Dropdown.Item eventKey="thirty">30</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifty">50</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>


                        {noResultsMessage ? (
                            <Alert variant="warning">{noResultsMessage}</Alert>
                        ) : (

                            <Table hover variant={'white'} className="table">
                                <thead>
                                <tr>
                                    {/*<th className="no-column" onClick={() => handleSort('noticeIndex')}>NO</th>*/}
                                    <th className="title-column" onClick={() => handleSort('noticeTitle')}>제목</th>
                                    <th className="date-column" onClick={() => handleSort('createDate')}>게시일</th>
                                    <th className="view-column" onClick={() => handleSort('noticeView')}>조회수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentPosts.map(notice => (
                                    <tr key={notice.noticeIndex}>
                                        {/*<td className="no-column">{notice.noticeIndex}</td>*/}
                                        <td className="title-column">
                                            <Link to={`/admin/notice/${notice.noticeIndex}`}>{notice.noticeTitle}</Link>
                                        </td>
                                        <td className="date-column">{notice.createDate}</td>
                                        <td className="view-column"
                                            style={{textAlign: 'center'}}>{notice.noticeView}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                        <Container className={'d-flex justify-content-end align-items-center mt-4'}>
                            <Link to="/admin/notice/create">
                                <Button variant={'outlined'} color={'primary'}>
                                    새 공지사항
                                </Button>
                            </Link>
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
