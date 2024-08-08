import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Container, Card, Button, Col, Row, Table} from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";
import '../../../../static/common.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScrewdriverWrench, faCalendarPlus} from "@fortawesome/free-solid-svg-icons";

export default function PatrolDetail() {
    const {patrolIndex} = useParams();
    const [patrol, setPetrol] = useState(null); // 특정 index에 해당하는 데이터
    const navigate = useNavigate();

    function patrolDetailApi() {
        axiosInstance
            .get(`/api/patrol/${patrolIndex}`)
            .then((res) => {
                setPetrol(res)
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        patrolDetailApi();
    }, [patrolIndex]);

    const handleEdit = () => {
        navigate(`/admin/patrol/update/${patrolIndex}`);
    };

    const handleDelete = () => {
        axiosInstance
            .delete(`/api/patrol/delete/${patrolIndex}`)
            .then(res => {
                setPetrol(res)
                navigate('/admin/patrol');
            })
            .catch(error => console.error('Error deleting patrol:', error));
    };

    const handleSubmit = () => {
        navigate(`../admin/patrol`);
    }

    if (!patrol) {
        return <Container>Loading...</Container>;
    }

    return (

        <div className={'commonContainer'}>
            {/*<Container>*/}
            <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                <p className={'adminPatrolTitle'} >
                    {patrol.patrolArea}
                </p>
                <div style={{margin: '10px 5px 10px'}}>
                    <p className={'adminPatrolDate'}>
                        <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}} />
                        {patrol.createDate}
                    </p>
                    {patrol.updateDate == null ? null : <p className={'adminPatrolDate'}>
                        <FontAwesomeIcon icon={faScrewdriverWrench} style={{marginRight: '6px'}}/>
                        {patrol.updateDate}
                    </p> }
                </div>
                <Table className={'adminDetailTable'} bordered>
                    <tbody>
                    <tr>
                        <td className={'adminPatrolText'} colSpan={8} style={{height: '600px', textAlign: 'start'}}>
                            <p style={{paddingTop: '10px'}}>{patrol.patrolSummary}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-center">
                            {/*{prevIndex >= 0 && ( // 이전 글 링크를 조건에 따라 렌더링*/}
                            <p>
                                {parseInt(patrolIndex) > 0 ? <Link to={`/admin/patrol/${parseInt(patrolIndex) - 1}`}>이전 글▲</Link> : ''}
                            </p>
                            {/*// )}*/}
                            {/*{nextIndex <= penalties.length && ( // 다음 글 링크를 조건에 따라 렌더링*/}
                            <p>
                                <Link to={`/admin/patrol/${parseInt(patrolIndex) + 1}`}>다음 글▼</Link>
                                
                            </p>
                            {/*// )}*/}
                        </td>
                    </tr>


                    </tbody>

                </Table>
                <div className={'noticeDetailBtn'}>
                    <Button variant="primary" onClick={handleEdit} className="w-30">수정</Button>
                    <Button variant="danger" onClick={handleDelete} className="w-30">삭제</Button>
                    <Button className='noticeListBtn' onClick={handleSubmit}>목록으로</Button>
                </div>
                {/*</Container>*/}
                {/*<Card>*/}
                {/*    <Card.Header>관할 구역: {patrol.patrolArea}</Card.Header>*/}
                {/*    <Card.Body>*/}
                {/*        <Card.Text>*/}
                {/*            {patrol.patrolSummary}*/}
                {/*        </Card.Text>*/}
                {/*    </Card.Body>*/}
                {/*</Card>*/}

                {/*        <div className='d-flex pt-3'><Link to={'../admin/patrol'}>목록으로</Link></div>*/}
            </Container>
        </div>
    );
}