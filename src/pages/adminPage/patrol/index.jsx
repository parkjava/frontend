import React, {useState, useEffect} from 'react';
import {Table, Container, Button, Dropdown} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import BasicPagination from '../../../common/components/pagination3';
import axiosInstance from '../../../common/components/axiosinstance';
import {Mobile, PC} from "../../../common/components/responsive";


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
        if (option === 'ten') {
            setPostsPerPage(10);
        } else if (option === 'fifteen') {
            setPostsPerPage(15);
        }
    }

    const postsPerPageLabel = postsPerPage === 10 ? '10개' : '15개';

    return (<>
            <PC>
                <div className={'commonContainer'}>
                    <Container>
                        <h1 className={'patrolH1'}>순찰내역</h1>
                        <hr/>
                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown onSelect={handlePenaltyCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                    노출 설정: {postsPerPageLabel}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ten">10</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifteen">15</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>

                        <Table hover variant="white" className={'patrolTable'}>
                            <thead>
                            <tr className={'trTitle'}>
                                <th>NO</th>
                                <th>순찰요약</th>
                                <th>관할구역</th>
                                <th>순찰자</th>
                                <th>날짜</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentPosts.map((patrol) => (
                                <tr key={patrol.patrolIndex}>
                                    <td>{patrol.patrolIndex}</td>
                                    <td><Link to={`/admin/patrol/${patrol.patrolIndex}`}>{patrol.patrolSummary}</Link>
                                    </td>
                                    <td>{patrol.patrolArea}</td>
                                    <td>{patrol.username}</td>
                                    <td>{patrol.createDate}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <div className={'createButton'}>
                            <Button className={'crButton'} onClick={handleCreateClick}>
                                순찰내역작성
                            </Button>
                        </div>
                        <BasicPagination className={'patrolPagination'}
                                    postsPerPage={postsPerPage}
                                    totalPosts={patrols.length}
                                    paginate={setCurrentPage}></BasicPagination>
                    </Container>
                </div>
            </PC>
            <Mobile>
                <div className={'commonContainer'}>
                    <Container className={'patrolMobileCont'}>
                        <h1 className={'patrolMH1'}>순찰내역</h1>
                        <Container className="d-flex justify-content-end align-items-center pb-2">
                            <Dropdown onSelect={handlePenaltyCount}>
                                <Dropdown.Toggle className={'dropDownToggle'}>
                                    노출 설정: {postsPerPageLabel}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="ten">10</Dropdown.Item>
                                    <Dropdown.Item eventKey="fifteen">15</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>

                        <div className={'m-2'}>
                        <Table hover variant="white">
                            <thead>
                            <tr>
                                {/*<th>NO</th>*/}
                                <th className={'rowTitle'}>순찰요약</th>
                                {/*<th className={'patrolArea'}>관할구역</th>*/}
                                <th className={'rowTitle'}>순찰자</th>
                                <th className={'rowTitle'}>날짜</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentPosts.map((patrol) => (
                                <tr key={patrol.patrolIndex}>
                                    {/*<td>{patrol.patrolIndex}</td>*/}
                                    <td className={'pmtd1'}><Link to={`/admin/patrol/${patrol.patrolIndex}`}>{patrol.patrolSummary}</Link>
                                    </td>
                                    {/*<td>{patrol.patrolArea}</td>*/}
                                    <td className={'pmtd2'}>{patrol.username}</td>
                                    <td className={'pmtd3'}>{patrol.createDate}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        </div>
                        <div className={'createButton'}>
                            <Button className={'crButton'} onClick={handleCreateClick}>
                                순찰내역작성
                            </Button>
                        </div>
                        <BasicPagination className={'patrolPagination'}
                                    postsPerPage={postsPerPage}
                                    totalPosts={patrols.length}
                                    paginate={setCurrentPage}></BasicPagination>
                    </Container>
                </div>
            </Mobile>
        </>
    );
}
