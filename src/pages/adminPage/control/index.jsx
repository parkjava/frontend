import React, {useState, useEffect, useRef} from 'react';
import ROSLIB from 'roslib';
import {Image, Form, Spinner} from "react-bootstrap";
import '../../../static/common.css'
import {getDownloadURL, ref, listAll, deleteObject, getStorage} from "firebase/storage";
import {storage} from "../../../firebase";
import axiosInstance from "../../../common/components/axiosinstance";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Tooltip, Button, IconButton, CircularProgress} from "@mui/material";
import CreatePatrol from "./component/patrolModal"
import {Battery20, Battery90, BatteryFull, Delete, HelpOutline, SaveAlt} from "@mui/icons-material";
import {GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState} from "@mui/x-charts";
import {Line} from "react-chartjs-2";
import PatrolList from "./component/patrolList"
import {Mobile, PC} from "../../../common/components/responsive";
import Time from '../../../common/components/time'
import {GiBattery100, GiBattery75} from "react-icons/gi";

export default function Index() {
    const [currentSpeed, setCurrentSpeed] = useState(40);
    const [voltage, setVoltage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [buttonInfo, setButtonInfo] = useState('');
    const [images, setImages] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [checkState, setCheckState] = useState(new Array(images.length).fill(false))
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });


    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/penalty/countDate'); // 엔드포인트 수정
                const data = response;


                // console.log('PenaltyData:', data);

                // 데이터가 배열인지 확인
                if (!Array.isArray(data)) {
                    throw new Error('응답 데이터가 배열이 아닙니다.');
                }

                // 데이터 구조에 맞게 변환
                const labels = data.map(item => item.penaltyDate); // X축 레이블
                // console.log("labels============================="+labels)

                const dataset1 = data.map(item => item.count);
                // console.log("dataset================"+dataset1)
                // const dataset2 = data.map(item => Number(item.patrolArea));


                setChartData({
                    labels,
                    datasets: [
                        {
                            label: '일별 단속 내역 개수',
                            data: dataset1,
                            borderColor: "#0059bf",
                            backgroundColor: "rgba(0,110,255,0.2)",
                            borderWidth: 1,
                            borderDash: [5, 5],
                            borderDashOffset: 2,
                            fill: true,
                        }
                        // ,
                        // {
                        //     label: 'Patrol Area',
                        //     data: dataset2,
                        //     borderColor: "black",
                        //     backgroundColor: "rgba(255, 192, 203, 0.2)",
                        //     fill: true,
                        // }
                    ]
                });
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            }
        };

        fetchData();
    }, []); // 빈 배열을 넣어 컴포넌트 마운트 시 한 번만 호출되게 함
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };


    const [penalties, setPenalties] = useState([])

    function penaltyApi() {
        axiosInstance
            .get('/api/penalty/desc')
            .then((res) => {
                setPenalties(res)
            })
            .catch((err) => console.log(err));
    }


    const handleSwitchChange = (e) => {
        setIsChecked(e.target.checked);
        if (isChecked === false) {
            publishMessage(true)
            callService('/LEDGREE', 'jetbotmini_msgs/srv', 0)
            callService('/LEDBLUE', 'jetbotmini_msgs/srv', 1)

        } else if (isChecked === true) {
            publishMessage(false)
            callService('/LEDBLUE', 'jetbotmini_msgs/srv', 0)
            callService('/LEDGREE', 'jetbotmini_msgs/srv', 1)
        }
    };

    const fetchImages = async () => {
        try {
            // Storage에서 디렉토리 참조를 생성합니다.
            const imagesRef = ref(storage, "/");

            // 디렉토리의 모든 파일 목록을 가져옵니다.
            const result = await listAll(imagesRef);

            // 모든 파일에 대해 다운로드 URL과 이름을 가져옵니다.
            const imagePromises = result.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                return {name: itemRef.name, url};
            });

            // 모든 이미지 정보를 가져옵니다.
            const images = await Promise.all(imagePromises);

            // 상태에 이미지 정보를 저장합니다.
            setImages(images);
            // for (let i; i< images.length; i++){
            //     if (images[i].name === penalties)
            // }
            console.log(images[0].name)
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };


    useEffect(() => {
        // setInterval(async () => {
        fetchImages();
        penaltyApi()
        console.log("images: ",images)
        // }, )
    }, []);

    const ros = new ROSLIB.Ros({
        url: 'ws://192.168.0.12:9090',
    });

    useEffect(() => {
        ros.on('connection', () => {
        });
        ros.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
        });

        const batteryLevelListener = new ROSLIB.Topic({
            ros: ros, name: '/voltage', messageType: 'jetbotmini_msgs/Battery',
        });

        batteryLevelListener.subscribe((message) => {
            const voltage = message.Voltage;
            const percentage = Math.round((voltage / 12.5) * 100);
            setVoltage(`${percentage}%`);
        });
    }, [ros]);

    useEffect(() => {
        ros.on('connection', () => {
        });
        ros.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
        });

        const modeStateListener = new ROSLIB.Topic({
            ros: ros, name: '/data', messageType: 'jetbotmini_msgs/ModeState',
        });

        modeStateListener.subscribe((message) => {
            const mode = message.modestate;
            if (mode === true) {
                setIsChecked(true);
            } else if (mode === false) {
                setIsChecked(false);
            }

        });
    }, [ros]);


    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            const info = handleKeyPress(key);
            if (info) {
                setButtonInfo(info);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, []);

    const callService = (name, type, value) => {

        if (modalOpen) { // 모달 열려 있으면 함수 호출 안되도록
            return;
        }

        const exampleService = new ROSLIB.Service({
            ros: ros, name: name, serviceType: type,
        });

        const param = {};
        if (name === '/Buzzer') {
            param['buzzer'] = value;
        } else if (name === '/LEDBLUE') {
            param['ledblue'] = value;
        } else if (name === '/LEDGREE') {
            param['ledgree'] = value;
        } else if (name === '/Motor') {
            // console.log(currentSpeed / 100);
            if (value === 'leftback') {
                param['rightspeed'] = -(currentSpeed / 100);
                param['leftspeed'] = 0;
            } else if (value === 'back') {
                param['rightspeed'] = -(currentSpeed / 100);
                param['leftspeed'] = -(currentSpeed / 100);
            } else if (value === 'rightback') {
                param['rightspeed'] = 0;
                param['leftspeed'] = -(currentSpeed / 100);
            } else if (value === 'left') {
                param['rightspeed'] = currentSpeed / 100;
                param['leftspeed'] = -(currentSpeed / 100);
            } else if (value === 'stop') {
                param['rightspeed'] = 0;
                param['leftspeed'] = 0;
            } else if (value === 'right') {
                param['rightspeed'] = -(currentSpeed / 100);
                param['leftspeed'] = currentSpeed / 100;
            } else if (value === 'leftgo') {
                param['rightspeed'] = currentSpeed / 100;
                param['leftspeed'] = 0;
            } else if (value === 'go') {
                param['rightspeed'] = currentSpeed / 100;
                param['leftspeed'] = currentSpeed / 100;
            } else if (value === 'rightgo') {
                param['rightspeed'] = 0;
                param['leftspeed'] = currentSpeed / 100;
            }
        }

        const request = new ROSLIB.ServiceRequest(param);

        exampleService.callService(request, (result) => {
        });
    };

    const publishMessage = (modestate) => {
        const exampleTopic = new ROSLIB.Topic({
            ros: ros, name: '/data', messageType: 'ModeState',
        });

        const message = new ROSLIB.Message({
            modestate: modestate,

        });

        exampleTopic.subscribe((message) => {
            const voltage = message.ModeState;

            // console.log(voltage)
        });

        exampleTopic.publish(message);

        // console.log(message)
    };

    useEffect(() => {
        publishMessage();
    }, []);

    const modalBackground = useRef();

    const handleSpeedChange = (newSpeed) => {
        setCurrentSpeed(newSpeed);
        // Replace with appropriate speed functions
    };

    function GaugePointer() {
        const {valueAngle, outerRadius, cx, cy} = useGaugeState();

        if (valueAngle === null) {
            // No value to display
            return null;
        }

        const target = {
            x: cx + outerRadius * Math.sin(valueAngle),
            y: cy - outerRadius * Math.cos(valueAngle),
        };
        return (
            <g>
                <circle cx={cx} cy={cy} r={5} fill="red"/>
                <path
                    d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                    stroke="red"
                    strokeWidth={3}
                />
            </g>
        );
    }


    const handleKeyPress = (key) => {
        const keyMap = {
            'w': {ButtonName: '↑', functionCall: () => document.getElementById('go').click()}, // 앞으로
            'ㅈ': {ButtonName: '↑', functionCall: () => document.getElementById('go').click()}, // 앞으로
            's': {ButtonName: '↓', functionCall: () => document.getElementById('back').click()}, // 뒤로
            'ㄴ': {ButtonName: '↓', functionCall: () => document.getElementById('back').click()}, // 뒤로
            'a': {ButtonName: '↖', functionCall: () => document.getElementById('left').click()}, // 좌회전
            'ㅁ': {ButtonName: '↖', functionCall: () => document.getElementById('left').click()}, // 좌회전
            'd': {ButtonName: '→', functionCall: () => document.getElementById('right').click()}, // 오른쪽 턴
            'ㅇ': {ButtonName: '→', functionCall: () => document.getElementById('right').click()}, // 오른쪽 턴
            'q': {ButtonName: '↗', functionCall: () => document.getElementById('rightgo').click()}, // 우회전
            'ㅂ': {ButtonName: '↗', functionCall: () => document.getElementById('rightgo').click()}, // 우회전
            'e': {ButtonName: '←', functionCall: () => document.getElementById('leftgo').click()}, // 왼쪽 턴
            'ㄷ': {ButtonName: '←', functionCall: () => document.getElementById('leftgo').click()}, // 왼쪽 턴
            'z': {ButtonName: '↙', functionCall: () => document.getElementById('leftback').click()}, // 시계방향 뒤로 턴
            'ㅋ': {ButtonName: '↙', functionCall: () => document.getElementById('leftback').click()}, // 시계방향 뒤로 턴
            'c': {ButtonName: '↘', functionCall: () => document.getElementById('rightback').click()}, // 반시계방향 뒤로 턴
            'ㅊ': {ButtonName: '↘', functionCall: () => document.getElementById('rightback').click()}, // 반시계방향 뒤로 턴
            '+': {ButtonName: '+', functionCall: () => document.getElementById('speedUp').click()},
            '-': {ButtonName: '-', functionCall: () => document.getElementById('speedDown').click()},
            ' ': {ButtonName: '↑', functionCall: () => document.getElementById('stop').click()}, //정지
        };

        if (key in keyMap) {
            keyMap[key].functionCall();

            return `입력키: ${keyMap[key].ButtonName}`;
        }
        console.log(key)
        return null;
    };

    useEffect(() => {
        // `checkState`를 `images`의 길이에 맞게 초기화합니다.

        setCheckState(new Array(images.length).fill(false));
    }, [images]);

    const handleCheckBoxChange = (index) => {
        setCheckState(prevState =>
            prevState.map((item, i) => (i === index ? !item : item))
        );
        console.log(index)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectImages = images.filter((_, index) => checkState[index])
        const currentDate = new Date().toISOString().split('T')[0]

        selectImages.forEach((image) => {
            const selectImage = {
                penaltyImageUrl: image.url,
                penaltyCarNumber: image.name,
                penaltyCash: 100000,
                penaltyDate: currentDate,
            }

            axiosInstance.post('/api/penalty/create', selectImage)
                .then((response) => {
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    if (error.response) {
                        console.error('Response data:', error.response.data);
                    }
                });
        })
        alert('저장되었습니다.')
        fetchImages();
    }


    const handleDelete = (e) => {
        e.preventDefault()
        const selectImages = images.filter((_, index) => checkState[index])
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, `gs://parkjavastorage.appspot.com/${selectImages[0].name}`);
        const ok = window.confirm('정말 삭제하시겠습니까?')
        if (ok) {
            try {
                // 파일 삭제를 수행합니다.
                deleteObject(desertRef);
            } catch (error) {
                console.error('Error deleting file:', error);
                alert('파일 삭제 중 오류가 발생했습니다.');
            }
        }
        fetchImages();
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [modalOpen]);

    const backGround = "http://192.168.0.12:8080/stream?topic=/csi_cam_1/image_raw";

    return (<>
        <Mobile>
            <div className={'commonContainer'}>
                <h1>지원하지 않는 해상도입니다.</h1>
            </div>
        </Mobile>
        <PC>
            <div className={'commonContainer'}>
                <h1 className={'controlH1'}>관제센터</h1>
                <div className={'controlInfo'}>
                    <div className={'controlGraph'}>
                        <Line data={chartData} options={options}/>
                        <PatrolList/>
                        <Button
                            className={'w-100'}
                            onClick={() => setModalOpen(true)}
                            variant="outlined">
                            새 순찰내역 작성
                        </Button>
                    </div>
                    <div className={'controlVideo'}
                         style={{background: `url(${backGround})`}}>
                        <div className={'text-end m-2 '} style={{color: "#19ff00"}}>
                            {voltage < 90 ?
                                <GiBattery75 className={'mw-100 fa-rotate-90'} style={{scale:1.4}}/> : <GiBattery100 className={'fa-rotate-90'} style={{scale:1.4}}/>
                                ||
                                <CircularProgress style={{width: 20, height: 20}}/>}<br/>
                            <Time/>
                        </div>
                        <div className={'gauge float-start text-center position-absolute fw-bold'}
                             style={{}}>
                            SPEED : {currentSpeed}
                            <GaugeContainer
                                width={100}
                                height={100}
                                startAngle={-110}
                                endAngle={110}
                                value={currentSpeed}
                            >
                                <GaugeReferenceArc/>
                                <GaugeValueArc/>
                                <GaugePointer/>
                            </GaugeContainer>
                            <Button id={'speedUp'} variant={'contained'} className={'m-1'}
                                    onClick={() => handleSpeedChange(Math.min(100, currentSpeed + 10))}
                                    disabled={isChecked}>
                                +
                            </Button>
                            <Button id={'speedDown'} variant={'contained'} color={'error'} className={'m-1'}
                                    onClick={() => handleSpeedChange(Math.max(40, currentSpeed - 10))}
                                    disabled={isChecked}>
                                -
                            </Button>
                        </div>
                        <div className={'controlBtnGroup position-absolute'}>
                            <div className={'d-flex align-items-center justify-content-center mb-1'}
                                 style={{color: "#17efc7"}}>
                                <Form.Check
                                    type="switch"
                                    id="toggleSwitch"
                                    checked={isChecked}
                                    label={isChecked ? "Auto" : "Drive️"}
                                    onChange={handleSwitchChange}
                                />
                            </div>
                            <div className={"d-flex"}>
                                <Button id={'leftgo'} variant="contained" className={'controlBtn'} color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'leftgo')}
                                        title={'좌회전'} disabled={isChecked}>↖
                                </Button>
                                <Button id={'go'} className={'controlBtn'} variant="contained" color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'go')}
                                        title={'전진'} disabled={isChecked}>↑
                                </Button>
                                <Button id={'rightgo'} className={'controlBtn'} variant="contained"
                                        color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'rightgo')}
                                        title={'우회전'} disabled={isChecked}>↗
                                </Button>
                            </div>
                            <div className={"d-flex"}>
                                <Button id={'left'} className={'controlBtn'} variant="contained" color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'left')}
                                        title={'좌측 턴'} disabled={isChecked}>←
                                </Button>
                                <Button id={'stop'} className={'controlBtn'} variant="contained" color={'error'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'stop')}
                                        title={'정지'} disabled={isChecked}>■
                                </Button>
                                <Button id={'right'} className={'controlBtn'} variant="contained" color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'right')}
                                        title={'우측 턴'} disabled={isChecked}>→
                                </Button>
                            </div>
                            <div className={"d-flex"}>
                                <Button id={'leftback'} className={'controlBtn'} variant="contained"
                                        color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'leftback')}
                                        title={'좌로 후진'} disabled={isChecked}>↙
                                </Button>
                                <Button id={'back'} className={'controlBtn'} variant="contained" color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'back')}
                                        title={'후진'} disabled={isChecked}>↓
                                </Button>
                                <Button id={'rightback'} className={'controlBtn'} variant="contained"
                                        color={'success'}
                                        onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'rightback')}
                                        title={'우로 후진'} disabled={isChecked}>↘
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={'penaltyList'}>
                        <h3>
                            🚔 불법주차 차량번호
                            <Tooltip title="검출된 차량과 사진의 차량번호가 일치하다면 체크 후, 저장 및 삭제를 수행합니다." placement="top">
                                <IconButton>
                                    <HelpOutline/>
                                </IconButton>
                            </Tooltip>
                        </h3>
                        <ul className={'penaltyUl'}>
                            {images.length > 0 ? (images.map((image, index) => (
                                <div key={index}>
                                    <li className={'penaltyLi'}>
                                        <Image src={image.url} alt={image.name}
                                               className={'carNumberImg'}/>
                                        <div className={'carNumber'}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={checkState[index] || false}
                                                onChange={() => handleCheckBoxChange(index)}
                                                id={`defaultCheck1${index}`}
                                            />{image.name}
                                        </div>
                                    </li>
                                </div>))) : <Spinner animation="border" role="status" variant={'primary'}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}

                        </ul>
                        <div>
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                color="success"
                                endIcon={<SaveAlt/>}
                            >
                                저장
                            </Button>
                            <Button

                                onClick={handleDelete}
                                variant="contained"
                                color="error"
                                endIcon={<Delete/>}>
                                삭제
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {
                modalOpen &&
                <div className={'modalContainer'} ref={modalBackground} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}>
                    <div className={'controlModal'}>
                        <FontAwesomeIcon className='modalCloseBtn' icon={faXmark}
                                         onClick={() => setModalOpen(false)}/>
                        <CreatePatrol/>
                    </div>
                </div>
            }
        </PC>
    </>);
};