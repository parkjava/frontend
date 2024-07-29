import React, {useState, useEffect} from 'react';
import {Table, Container, Form, Button, Alert} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axiosInstance from '../../../../common/components/axiosinstance';

const cookies = new Cookies();

// 대분류와 중분류의 매핑을 정의
const subareasByArea = {
    동구: ['중앙동', '신암동', '신천동'],
    대덕구: ['법1동', '법2동', '오정동', '신탄진동'],
    서구: ['갈마1동', '갈마2동', '월평1동'],
    유성구: ['노은1동', '노은2동', '전민동'],
    중구: ['은행동', '대흥동', '목동'],
};

export default function PatrolTable() {
    const [patrol, setPatrol] = useState({
        area: '',
        subarea: '',
        summary: '',
        adminIndex: '',
        name: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [subareas, setSubareas] = useState([]); // 중분류 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const sessionCookie = cookies.get('session'); // 쿠키에서 세션 정보 가져오기
        if (sessionCookie) {
            try {
                const admin = JSON.parse(sessionCookie);  // JSON으로 파싱
                setPatrol((prevState) => ({
                    ...prevState,
                    adminIndex: admin.index.toString(),
                    name: admin.name.toString(),
                }));
            } catch (error) {
                console.error('Error parsing admin data:', error);
            }
        }

        const today = new Date();
        const formattedDate = today.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(/\./g, '').replace(/\s/g, '-').replace(/-/g, (match, offset) => offset === 4 || offset === 7 ? '-' : ' ').slice(0, 16);

        setPatrol((prevState) => ({
            ...prevState,
            date: formattedDate,
        }));
    }, []);

    useEffect(() => {
        // 대분류가 변경될 때마다 중분류 업데이트
        if (patrol.area) {
            setSubareas(subareasByArea[patrol.area] || []);
        } else {
            setSubareas([]);
        }
    }, [patrol.area]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPatrol({
            ...patrol,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!patrol.area) newErrors.area = '관할구역을 입력해주세요';
        if (!patrol.subarea) newErrors.subarea = '세부지역을 선택해주세요';
        if (!patrol.summary) newErrors.summary = '내용을 입력해주세요';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setShowAlert(true);
            return;
        }

        const newPatrol = {
            patrolArea: patrol.area + '/' + patrol.subarea,
            patrolSummary: patrol.summary,
            adminIndex: patrol.adminIndex,
            adminName: patrol.name,
            createDate: patrol.date,
            noticeView: 0,
        };
        console.log("Sending data:", newPatrol); // 전송할 데이터 로그 확인
        axiosInstance.post('/api/patrol/create', newPatrol)
            .then((response) => {
                setPatrol({
                    area: '',
                    subarea: '',
                    summary: '',
                    adminIndex: '',
                    name: '',
                    date: '',
                });
                setShowAlert(false);
                navigate('/admin/patrol');
            })
            .catch((error) => {
                console.error('Error saving data:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    setErrors({summary: '데이터 저장 중 오류가 발생했습니다.'}); // 에러 메시지 설정
                    setShowAlert(true);
                }
            });
    };

    return (
        <div className={'commonContainer'}>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Table striped bordered hover variant="light">
                        <thead>
                        <tr>
                            <th>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="area"
                                    value={patrol.area}
                                    onChange={handleInputChange}
                                >
                                    <option value="">--관할지역--</option>
                                    {Object.keys(subareasByArea).map((area) => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </Form.Select>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="subarea"
                                    value={patrol.subarea}
                                    onChange={handleInputChange}
                                    disabled={!patrol.area} // 대분류가 선택되지 않으면 중분류 비활성화
                                >
                                    <option value="">--세부지역--</option>
                                    {subareas.map((subarea) => (
                                        <option key={subarea} value={subarea}>{subarea}</option>
                                    ))}
                                </Form.Select>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={15}
                                    placeholder="순찰 요약"
                                    name="summary"
                                    value={patrol.summary}
                                    onChange={handleInputChange}
                                    style={{border: 'none', resize: 'none'}}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            {Object.values(errors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </Alert>
                    )}
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{width: '100px'}}
                            disabled={!patrol.area || !patrol.subarea || !patrol.summary} // 중분류 추가
                        >
                            작성
                        </Button>
                    </div>
                </Form>
                <div>
                    <Link to={'/admin/patrol'}>목록으로</Link>
                </div>
            </Container>
        </div>
    );
}
