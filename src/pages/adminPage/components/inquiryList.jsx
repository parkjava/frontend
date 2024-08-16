import React, {useState, useEffect} from 'react';
import {Table, Container,} from 'react-bootstrap';
import axiosInstance from '../../../common/components/axiosinstance';
import BasicPagination from "../../../common/components/pagination3";
import {Link} from "react-router-dom";


export default function InquiryList() {
    const [inquirys, setInquirys] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : inquirys.slice(indexOfFirst, indexOfLast);

    function inquiryApi() {
        axiosInstance
            .get('/api/inquiry')
            .then((res) => {
                setInquirys(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        inquiryApi();
    }, []);

    return (<>
            <Container>
                <h3>새 문의 목록</h3>
                <Table striped bordered hovers>
                    <thead>
                    <tr>
                        <th style={{width: 300}}>문의제목</th>
                        <th>문의자</th>
                        <th>날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((inquirys) => (
                        <tr key={inquirys.inquiryIndex}>
                            <td><Link to={`/admin/inquiry/${inquirys.inquiryIndex}`}>{inquirys.inquiryTitle}</Link></td>
                            <td>{inquirys.inquiryWriter}</td>
                            <td>{inquirys.inquiryDate.split('T')[0]}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <BasicPagination className={'patrolPagination'}
                                 postsPerPage={postsPerPage}
                                 totalPosts={inquirys.length}
                                 paginate={setCurrentPage}></BasicPagination>
            </Container>


        </>
    );
}
