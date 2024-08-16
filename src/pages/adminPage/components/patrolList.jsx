import React, {useState, useEffect} from 'react';
import {Table, Container,} from 'react-bootstrap';
import axiosInstance from '../../../common/components/axiosinstance';
import BasicPagination from "../../../common/components/pagination3";
import {Link} from "react-router-dom";


export default function PetrolList() {
    const [patrols, setPatrols] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : patrols.slice(indexOfFirst, indexOfLast);

    function patrolApi() {
        axiosInstance
            .get('/api/patrol')
            .then((res) => {
                setPatrols(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        patrolApi();
    }, []);

    return (<>
            <Container>
                <h3>새 순찰 목록</h3>
                <Table striped bordered hovers style={{minWidth: 600}}>
                    <thead>
                    <tr>
                        <th>순찰 요약</th>
                        <th style={{width: 100}}>관할 구역</th>
                        <th>날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((patrol) => (
                        <tr key={patrol.patrolIndex}>
                            <td><Link to={`/admin/patrol/${patrol.patrolIndex}`}>{patrol.patrolSummary}</Link></td>
                            <td>{patrol.patrolArea}</td>
                            <td>{patrol.createDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <BasicPagination className={'patrolPagination'}
                                 postsPerPage={postsPerPage}
                                 totalPosts={patrols.length}
                                 paginate={setCurrentPage}></BasicPagination>
            </Container>


        </>
    );
}
