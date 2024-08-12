import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Container, Button ,Table} from 'react-bootstrap';
import axiosInstance from "../../../../common/components/axiosinstance";
import '../../../../static/common.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScrewdriverWrench, faCalendarPlus, faSquareCaretUp, faSquareCaretDown} from "@fortawesome/free-solid-svg-icons";

export default function PatrolDetail() {
    const {patrolIndex} = useParams();
    const [patrol, setPetrol] = useState(null); // 특정 index에 해당하는 데이터
    const [patrols, setPatrols] = useState([]); // 전체 데이터
    const navigate = useNavigate();


    function patrolApi() {
        axiosInstance
            .get('/api/patrol')
            .then((res) => {
                setPatrols(res)
            })
            .catch((err) => console.log(err));
    }
    
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
        patrolApi();
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

    const currentPatrolIndex = patrols.findIndex((item) => item.patrolIndex === parseInt(patrolIndex))

    const prevPatrol = currentPatrolIndex < patrols.length - 1 ? patrols[currentPatrolIndex + 1].patrolIndex : null
    const nextPatrol = currentPatrolIndex > 0 ? patrols[currentPatrolIndex - 1].patrolIndex : null
    return (

        <div className={'commonContainer'}>
            <Container className='detailContainer' style={{height: '100vh', borderRadius: '20px'}}>
                <h1>순찰 내역</h1>
                <p className={'adminPatrolTitle'} >
                    {patrol.patrolArea}
                </p>
                <div style={{margin: '10px 5px 10px'}}>
                    <p className={'adminPatrolDate'}>
                        <FontAwesomeIcon icon={faCalendarPlus} style={{marginRight: '6px'}} />
                        {patrol.createDate.slice(0,11)}
                    </p>
                    {patrol.updateDate == null ? null : <p className={'adminPatrolDate'}>
                        <FontAwesomeIcon icon={faScrewdriverWrench} style={{marginRight: '6px'}}/>
                        {patrol.updateDate.slice(0,11)}
                    </p> }
                </div>
                <Table className={'adminDetailTable'} style={{margin: '0', padding: '0'}} bordered>
                    <tbody>
                        <tr>
                            <td className={'adminPatrolText'} colSpan={8} style={{height: '600px', textAlign: 'start'}}>
                                <p style={{paddingTop: '10px'}}>{patrol.patrolSummary}</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className='pageMove'>
                    <ul>
                        <li>
                        {prevPatrol === null ? <><FontAwesomeIcon icon={faSquareCaretUp} /><span>이전글이 없습니다.</span></> :  <><Link to={`/admin/patrol/${prevPatrol}`}><FontAwesomeIcon icon={faSquareCaretUp} />
                            <span>이전 글</span></Link><span style={{paddingLeft: '5%'}}>{patrols[currentPatrolIndex+1].patrolArea}</span></>}
                        </li>

                        <li>
                        {nextPatrol === null ? <><FontAwesomeIcon icon={faSquareCaretDown} /><span>다음글이 없습니다.</span></> : 
                            <><Link to={`/admin/patrol/${nextPatrol}`}><FontAwesomeIcon icon={faSquareCaretDown} /><span>다음 글</span></Link>
                            <span style={{paddingLeft: '5%'}}>{patrols[currentPatrolIndex-1].patrolArea}</span></>}
                        </li>
                    </ul>
                </div>

                <div className={'noticeDetailBtn'}>
                    <Button variant="primary" onClick={handleEdit} className="w-30" style={{marginRight:'5px'}}>수정</Button>
                    <Button variant="danger" onClick={handleDelete} className="w-30"style={{marginRight:'5px'}}>삭제</Button>
                    <Button className='patrolListBtn' onClick={handleSubmit} style={{position: 'relative', float: 'right'}}>목록으로</Button>
                </div>
            </Container>
        </div>
    );
}