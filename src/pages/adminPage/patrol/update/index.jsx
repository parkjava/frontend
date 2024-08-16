import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Form} from 'react-bootstrap';
import {Button} from '@mui/material';

import axiosInstance from "../../../../common/components/axiosinstance";

const subareasByArea = {
    동구: [
        '가양1동', '가양2동', '대동', '대청동', '산내동', '삼성동', '성남동', '신인동', '용운동', '용전동', '자양동', '중앙동', '판암1동', '판암2동', '홍도동', '효동'],
    대덕구: [
        '대화동', '덕암동', '목상동', '법1동', '법2동', '비래동', '석봉동', '송촌동', '신탄진동', '오정동', '중리동', '회덕동'
    ],
    서구: [
        '가수원동', '가장동', '갈마1동', '갈마2동', '관저1동', '관저2동', '괴정동', '기성동', '내동', '도마1동', '도마2동', '도안동', '둔산1동', '둔산2동', '둔산3동', '만년동', '변동', '복수동', '용문동', '월평1동', '월평2동', '월평3동', '정림동', '탄방동'
    ],
    중구: [
        '대사동', '대흥동', '목동', '문창동', '문화1동', '문화2동', '부사동', '산성동', '석교동', '오류동', '용두동', '유천1동', '유천2동', '은행동', '선화동', '중촌동', '태평1동', '태평2동'
    ],
    유성구: [
        '관평동', '구즉동', '노은1동', '노은2동', '노은3동', '상대동', '신성동', '온천1동', '온천2동', '원신흥동', '전민동', '진잠동', '학하동'
    ],
};

export default function Index() {
    const {patrolIndex} = useParams();
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
            .get(`/api/patrol/${patrolIndex}`)
            .then((res) => {
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
    }, [patrolIndex]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
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
        <div className={'commonContainer'}>
            <Container>
                <h1 className={'patrolH1'}>순찰내역 수정</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="patrolArea">
                        <Form.Label>관할지역</Form.Label>
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
                    <Button variant={'outlined'} color={'success'} type="submit" className={"mt-3 w-100"}>
                        저장
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
