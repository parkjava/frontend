import {Table, Container, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react';
import Pagination from './components/pagination'
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
        if ( option === 'ten') {
            setPostsPerPage(10);
        } else if (option === 'fifteen') {
            setPostsPerPage(15);
        }
    }

    const postsPerPageLabel = postsPerPage === 10 ? '10개' : '15개';

    return (
        <Container>
            <Container className="d-flex justify-content-end align-items-center pb-2">
                <Dropdown onSelect={handlePenaltyCount}>
                    <Dropdown.Toggle>
                        데이터 개수: {postsPerPageLabel}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="ten">10개</Dropdown.Item>
                        <Dropdown.Item eventKey="fifteen">15개</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>

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
                {currentPosts.map(inquiry => (
                    <tr key={inquiry.inquiryIndex}>
                        <td>
                            {inquiry.inquiryIndex}
                        </td>
                        <td>
                            <Link to={`/admin/inquiry/${inquiry.inquiryIndex}`}>{inquiry.inquiryTitle}
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

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={inquiry.length}
                paginate={setCurrentPage}></Pagination>
        </Container>
    );
}
