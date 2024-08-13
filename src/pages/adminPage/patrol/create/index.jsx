import React, {useState, useEffect} from 'react';
import {Container, Form, Button, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../../../common/components/axiosinstance';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

// 대분류와 중분류의 매핑을 정의
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

export default function PatrolTable() {
    const [patrol, setPatrol] = useState({
        area: '',
        subarea: '',
        summary: '',
        name: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [subareas, setSubareas] = useState([]); // 중분류 상태 추가
    const [name, setName] = useState('');
    const [time, setTime] = useState('')
    const navigate = useNavigate();

    function nameApi() {
        axiosInstance.get('/members/info')
            .then((res) => setName(res))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        nameApi();
    }, [name])


    useEffect(() => {
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
            username: name,
            createDate: patrol.date,
            noticeView: 0,
        };

        // console.log("Sending data:", newPatrol); // 전송할 데이터 로그 확인

        axiosInstance.post('/api/patrol/create', newPatrol)
            .then((response) => {
                setPatrol({
                    area: '',
                    subarea: '',
                    summary: '',
                    username: '',
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

    function timeApi() {
        const date = new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            second: '2-digit',
        }).replace(/\./g, '').replace(/\s/g, '-').replace(/-/g, (match, offset) => offset === 4 || offset === 7 ? '-' : ' ').slice(0, 20);
        setTime(date);
    }


    useEffect(() => {
        setInterval(timeApi, 1000);
    }, [setTime, time]);


    return (
        <div className={'commonContainer'}>
            <Container>
                <h1 className={'patrolH1'}>순찰내역작성</h1>
                <Form onSubmit={handleSubmit}>
                    <h4 className={'d-flex align-items-center justify-content-sm-end'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-person-workspace" viewBox="0 0 16 16">
                            <path
                                d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            <path
                                d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                        </svg>
                        &nbsp;
                        {name}</h4>
                    <h4 className={'d-flex align-items-center justify-content-sm-end'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>
                        &nbsp;
                        {time}
                    </h4>
                    <div className={'createPatrolContainer'}>
                        <FormControl fullWidth onSubmit={handleSubmit}>
                            <InputLabel id="demo-simple-select-label">관할구</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="area"
                                value={patrol.area}
                                label={"관할구"}
                                onChange={handleInputChange}
                            >
                                {Object.keys(subareasByArea).map((area) => (
                                    <MenuItem key={area} value={area}>{area}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth onSubmit={handleSubmit} className={'mh-200'}>
                            <InputLabel id="demo-simple-select-label">관할동</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="subarea"
                                value={patrol.subarea}
                                label={"관할동"}


                                onChange={handleInputChange}
                                disabled={!patrol.area} // 대분류가 선택되지 않으면 중분류 비활성화
                            >
                                {subareas.map((subarea) => (
                                    <MenuItem key={subarea} value={subarea}>{subarea}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/*<Form.Select*/}
                        {/*    aria-label="Default select example"*/}
                        {/*    name="area"*/}
                        {/*    value={patrol.area}*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*>*/}
                        {/*    <option value="">관할 구</option>*/}
                        {/*    {Object.keys(subareasByArea).map((area) => (*/}
                        {/*        <option key={area} value={area}>{area}</option>*/}
                        {/*    ))}*/}
                        {/*</Form.Select>*/}
                        {/*<Form.Select*/}
                        {/*    aria-label="Default select example"*/}
                        {/*    name="subarea"*/}
                        {/*    value={patrol.subarea}*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*    disabled={!patrol.area} // 대분류가 선택되지 않으면 중분류 비활성화*/}
                        {/*>*/}
                        {/*    <option value="">관할 동</option>*/}
                        {/*    {subareas.map((subarea) => (*/}
                        {/*        <option key={subarea} value={subarea}>{subarea}</option>*/}
                        {/*    ))}*/}
                        {/*</Form.Select>*/}
                    </div>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        placeholder="순찰 요약"
                        name="summary"
                        value={patrol.summary}
                        onChange={handleInputChange}
                        style={{resize: 'none'}}
                    />

                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            {Object.values(errors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </Alert>
                    )}
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{width: '100%'}}
                            disabled={!patrol.area || !patrol.subarea || !patrol.summary} // 중분류 추가
                        >
                            작성
                        </Button>
                    </div>
                </Form>
            </Container>

        </div>

    );
}