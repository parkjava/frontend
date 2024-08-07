import {Table, Container, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import Pagination from '../../../common/components/pagination2'
import axiosInstance from '../../../common/components/axiosinstance';

export default function Index() {
    const [inquiry, setInquiry] = useState([]);

    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : inquiry.slice(indexOfFirst, indexOfLast);

    function inquiryApi() {
        axiosInstance
            .get('/api/inquiry')
            .then((res) => {
                setInquiry(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        inquiryApi();
    }, []);

    const handlePenaltyCount = (option) => {
        if (option === 'ten') {
            setPostsPerPage(10);
        } else if (option === 'fifteen') {
            setPostsPerPage(15);
        }
    }

    const postsPerPageLabel = postsPerPage === 10 ? '10개' : '15개';

    return (
        <div className={'commonContainer'}>
            <Container>
                <h1 className={'adminInquiryH1'}>문의 목록</h1>
                <hr/>
                <Container className="d-flex justify-content-end align-items-center pb-2">
                    <Dropdown onSelect={handlePenaltyCount}>
                        <Dropdown.Toggle className={'dropDownToggle'}>
                            노출 설정 : {postsPerPageLabel}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="ten">10</Dropdown.Item>
                            <Dropdown.Item eventKey="fifteen">15</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
                <Table hover variant="white" className={'inquiryTable'}>
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>문의제목</th>
                        <th>답변여부</th>
                        {/*<th>문의자</th>*/}
                        <th>문의일자</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map(inquiry => (
                        <tr key={inquiry.inquiryIndex}>
                            <td>
                                {inquiry.inquiryIndex}
                            </td>
                            <td>
                                <Link
                                    to={`/admin/inquiry/${inquiry.inquiryIndex}`}>{inquiry.inquiryTitle}
                                </Link>

                            </td>
                            <td>
                                {inquiry.inquiryAnswer === null ?
                                    <span className={'answerNeed'}>답변 필요</span>
                                    :
                                    <span className={'answerComplete'}>답변 완료</span>}
                            </td>
                            {/*<td>*/}
                            {/*    {inquiry.inquiryWriter}*/}
                            {/*</td>*/}
                            <td>
                                {inquiry.inquiryDate.split('T')[0]}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={inquiry.length}
                    paginate={setCurrentPage}></Pagination>
            </Container>
        </div>
    );
}
