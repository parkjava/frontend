import React, {useState, useEffect} from 'react';
import {Table, Container,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Pagination from '../../../../common/components/pagination2'
import axiosInstance from '../../../../common/components/axiosinstance';


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
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>관할구역</th>
                        <th>순찰요약</th>
                        <th>날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPosts.map((patrol) => (
                        <tr key={patrol.patrolIndex}>
                            <td>{patrol.patrolArea}</td>
                            <td>{patrol.patrolSummary}</td>
                            <td>{patrol.createDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Pagination className={'patrolPagination'}
                            postsPerPage={postsPerPage}
                            totalPosts={patrols.length}
                            paginate={setCurrentPage}></Pagination>
            </Container>


        </>
    );
}
