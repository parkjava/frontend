import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import cookies from "js-cookie";
import axios from 'axios';
import axiosInstance from "../../../../common/components/axiosinstance";
const subareasByArea = {
    동구: ['중앙동', '신암동', '신천동'],
    대덕구: ['법1동', '법2동', '오정동'],
    서구: ['갈마1동', '갈마2동', '월평1동'],
    유성구: ['노은1동', '노은2동', '전민동'],
    중구: ['은행동', '대흥동', '목동'],
};

export default function Index() {
    const { patrolIndex } = useParams();
    const [patrol, setPatrol] = useState({
        patrolArea: '',
        patrolSummary: '',
        adminName: '',
        createDate: '',
    });
    const navigate = useNavigate();
    const [subareas, setSubareas] = useState([]); // 중분류 상태 추가

    function patrolUpdateApi() {
        axiosInstance
            .get(`/api/patrol;/${patrolIndex}`)
            .then((res)=> {
                const data = res;
                const [patrolArea, subarea] = data.patrolArea.split('/');
                setPatrol({
                    patrolArea,
                    subarea,
                    patrolSummary: data.patrolSummary,
                    adminName: data.adminName,
                    createDate: data.updateDate,
                });
                setSubareas(subareasByArea[patrolArea] || []); // 선택된 대분류에 따른 중분류 설정
            })
            .catch(error => console.error('Error fetching patrol detail:', error));
    }
    useEffect(() => {
        patrolUpdateApi();
    //     axios.get(`http://localhost:8080/api/patrol/${patrolIndex}`)
    //         .then(response => {
    //             const data = response.data;
    //             const [patrolArea, subarea] = data.patrolArea.split('/');
    //             setPatrol({
    //                 patrolArea,
    //                 subarea,
    //                 patrolSummary: data.patrolSummary,
    //                 adminName: data.adminName,
    //                 createDate: data.updateDate,
    //             });
    //             setSubareas(subareasByArea[patrolArea] || []); // 선택된 대분류에 따른 중분류 설정
    //         })
    //         .catch(error => console.error('Error fetching patrol detail:', error));
    }, [patrolIndex]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatrol({
            ...patrol,
            [name]: value,
        });

        if (name === 'patrolArea') {
            setSubareas(subareasByArea[value] || []); // 대분류가 변경될 때 중분류 업데이트
            setPatrol({
                ...patrol,
                patrolArea: value,
                subarea: '', // 대분류가 변경되면 세부 지역 초기화
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPatrol = {
            ...patrol,
            patrolArea: `${patrol.patrolArea}/${patrol.subarea}`,
        };
        axiosInstance
            .put(`/api/patrol/update/${patrolIndex}`, updatedPatrol)
            .then(() => {
                navigate(`/admin/patrol/${patrolIndex}`);
            })
            .catch(error => console.error('Error updating patrol:', error));
    };

    return (
        <Container className={'commonContainer'}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="patrolArea">
                    <Form.Label>관할 지역</Form.Label>
                    <Form.Select
                        aria-label="Select patrol area"
                        name="patrolArea"
                        value={patrol.patrolArea}
                        onChange={handleInputChange}
                    >
                        <option value="">--관할지역--</option>
                        {Object.keys(subareasByArea).map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="subarea" className="mt-3">
                    <Form.Label>세부 지역</Form.Label>
                    <Form.Select
                        aria-label="Select subarea"
                        name="subarea"
                        value={patrol.subarea}
                        onChange={handleInputChange}
                        disabled={!patrol.patrolArea} // 대분류가 선택되지 않으면 중분류 비활성화
                    >
                        <option value="">--세부지역--</option>
                        {subareas.map(subarea => (
                            <option key={subarea} value={subarea}>{subarea}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="patrolSummary" className="mt-3">
                    <Form.Label>순찰 요약</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="patrolSummary"
                        value={patrol.patrolSummary}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <div className="mt-3">
                    <strong>작성자:</strong> {patrol.adminName}
                </div>
                <Button variant="primary" type="submit" className="mt-3">
                    저장
                </Button>
            </Form>
        </Container>
    );
}
