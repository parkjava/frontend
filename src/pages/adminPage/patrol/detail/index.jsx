import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Container, Card, Button, Col, Row, Table} from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";

export default function PatrolDetail() {
    const {patrolIndex} = useParams();
    const [patrol, setPetrol] = useState(null);
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

    if (!patrol) {
        return <Container>Loading...</Container>;
    }

    return (

        <div className={'commonContainer'}>
            {/*<Container>*/}
            <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                <h1 className={'adminPatrolTitle'}>
                    관할구역: {patrol.patrolArea}
                </h1>
                <p className={'adminPatrolDate'}>
                    {new Date(patrol.createDate).toLocaleDateString('ko-KR')}
                </p>
                <Table className={'adminDetailTable'} bordered>
                    <tbody>
                    <tr>
                        <td className={'adminPatrolText'} colSpan={8} style={{height: '600px'}}>
                            {patrol.patrolSummary}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-center">
                            {/*{prevIndex >= 0 && ( // 이전 글 링크를 조건에 따라 렌더링*/}
                            <p>
                                <Link to={`/admin/patrol/${parseInt(patrolIndex) - 1}`}>이전 글▲</Link>
                            </p>
                            {/*// )}*/}
                            {/*{nextIndex <= penalties.length && ( // 다음 글 링크를 조건에 따라 렌더링*/}
                            <p>
                                <Link to={`/admin/patrol/${parseInt(patrolIndex) + 1}`}>다음 글▼</Link>
                            </p>
                            {/*// )}*/}
                        </td>
                    </tr>

                        {/*<td className="text-md-end">*/}
                            <Button variant="primary" onClick={handleEdit} className="w-30">수정</Button>
                        {/*</td>*/}
                        {/*<td className="text-md-start mt-2 mt-md-0">*/}
                            <Button variant="danger" onClick={handleDelete} className="w-30">삭제</Button>
                        {/*</td>*/}

                    </tbody>

                </Table>
                <div className={'noticeDetailBtn'}>
                    <Button className='noticeListBtn'><Link
                        to={'../admin/patrol'}>목록으로</Link></Button>

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