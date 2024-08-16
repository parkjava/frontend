import React, {useState, useEffect} from 'react';
import {Table, Container,} from 'react-bootstrap';
import axiosInstance from '../../../common/components/axiosinstance';
import BasicPagination from "../../../common/components/pagination3";


export default function PenaltyList() {
    const [penaltys, setPenaltys] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : penaltys.slice(indexOfFirst, indexOfLast);

    function penaltyApi() {
        axiosInstance
            .get('/api/penalty')
            .then((res) => {
                setPenaltys(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        penaltyApi();
    }, []);

    return (<>
            <Container>
                <h3>새 문의 목록</h3>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th style={{width: 100}}>관할 구역</th>
                        <th>순찰 요약</th>
                        <th>날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((penalty) => (
                        <tr key={penalty.penaltyIndex}>
                            <td>{penalty.penaltyCarNumber}</td>
                            <td>{penalty.penaltyDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <BasicPagination className={'patrolPagination'}
                                 postsPerPage={postsPerPage}
                                 totalPosts={penaltys.length}
                                 paginate={setCurrentPage}></BasicPagination>
            </Container>


        </>
    );
}
