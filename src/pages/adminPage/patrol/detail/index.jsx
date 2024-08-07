import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Container, Card, Button, Col, Row} from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";
import '../../../../static/common.css'

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
    }, []);

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
            <div style={{margin: '0', padding: '20px 15px 40px'}}>
                <span><strong>관할 구역:</strong> {patrol.patrolArea}</span>
                <hr style={{margin:'0'}}/>
                <span style={{fontSize: '12px'}}>{patrol.createDate}</span> {/*생성 날짜*/}
                <div style={{padding: '30px 0px 40px'}}>
                    {patrol.patrolSummary}
                </div>
                <div className="mt-3" >
                    <span className="text-md-end" >
                        <Button variant="primary" onClick={handleEdit} className="w-30">수정</Button>
                    </span>
                    <span className="text-md-start mt-2 mt-md-0">
                        <Button variant="danger" onClick={handleDelete} className="w-30">삭제</Button>
                    </span>
                </div>
                <div className='d-flex pt-3'><Link to={'../admin/patrol'}>목록으로</Link></div>
            </div>
        </div>
    );
}