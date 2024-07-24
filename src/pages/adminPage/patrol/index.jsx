import React, {useState, useEffect} from 'react';
import {Table, Container, Button, Dropdown} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import Pagination from '../../../common/components/pagination2'
import axiosInstance from '../../../common/components/axiosinstance';

export default function PetrolList() {
    const [patrols, setPatrols] = useState([]);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const [postsPerPage, setPostsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = searchResults.length > 0 ? searchResults.slice(indexOfFirst, indexOfLast) : patrols.slice(indexOfFirst, indexOfLast);

    function patrolApi() {
        axiosInstance
          .get('/api/patrol')
          .then((res) => {
            console.log('Fetched notices:', res);
            setPatrols(res)
          })
          .catch((err) => console.log(err));
      }

      useEffect(() => {
        patrolApi();
      }, []);

    const handleCreateClick = () => {
        navigate('/admin/patrol/create'); // 작성하기 버튼 클릭 시 페이지 이동
    };

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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>순찰내역</h1>
                <Button variant="primary" onClick={handleCreateClick}>
                    작성하기
                </Button>
            </div>
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

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>순찰자</th>
                    <th>관할구역</th>
                    <th>순찰요약</th>
                    <th>날짜</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((patrol) => (
                    <tr key={patrol.patrolIndex}>
                        <td>{patrol.patrolIndex}</td>
                        <td>{patrol.adminName}</td>
                        <td>{patrol.patrolArea}</td>
                        <td><Link to={`/admin/patrol/${patrol.patrolIndex}`}>{patrol.patrolSummary}</Link></td>
                        <td>{patrol.createDate}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={patrols.length}
                paginate={setCurrentPage}></Pagination>

        </Container>
    );
}
