import React, {useState, useEffect} from 'react';
import ROSLIB from 'roslib';
import {Image, Button, Form} from "react-bootstrap";
import '../../../static/common.css'
import {getDownloadURL, ref, listAll} from "firebase/storage";
import {storage} from "../../../firebase";


export default function Index() {
    const [currentSpeed, setCurrentSpeed] = useState(40);
    const [voltage, setVoltage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
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

    const [buttonInfo, setButtonInfo] = useState('');

    const [images, setImages] = useState([]);

    useEffect(() => {
        // setInterval(async () => {
        // console.log('렌더링했당')
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
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
        // }, 3000)
    }, []);

    const ros = new ROSLIB.Ros({
        url: 'ws://192.168.137.6:9090',
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
            ros: ros,
            name: '/voltage',
            messageType: 'jetbotmini_msgs/Battery',
        });

        batteryLevelListener.subscribe((message) => {
            const voltage = message.Voltage;
            const percentage = Math.round((voltage / 12.5) * 100);
            setVoltage(`${percentage}%`);
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
        const exampleService = new ROSLIB.Service({
            ros: ros,
            name: name,
            serviceType: type,
        });

        const param = {};
        if (name === '/Buzzer') {
            param['buzzer'] = value;
        } else if (name === '/LEDBLUE') {
            param['ledblue'] = value;
        } else if (name === '/LEDGREE') {
            param['ledgree'] = value;
        } else if (name === '/Motor') {
            console.log(currentSpeed / 100);
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
            ros: ros,
            name: '/data',
            messageType: 'ModeState',
        });

        const message = new ROSLIB.Message({
            modestate: modestate,
        });

        exampleTopic.publish(message);
    };

    const handleSpeedChange = (newSpeed) => {
        setCurrentSpeed(newSpeed);
        // Replace with appropriate speed functions
    };


    const handleKeyPress = (key) => {
        const keyMap = {
            'w': {ButtonName: '↑', functionCall: () => document.getElementById('go').click()}, // 앞으로
            'W': {ButtonName: '↑', functionCall: () => document.getElementById('go').click()}, // 앞으로
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
            ' ': {ButtonName: '↑', functionCall: () => document.getElementById('stop').click()}, // 앞으로
        };

        if (key in keyMap) {
            keyMap[key].functionCall();
            return `입력키: ${keyMap[key].ButtonName}`;
        }
        return null;
    };

    // const toggleCheckbox = (direction) => {
    //     // Handle the direction change
    //     console.log(`Direction: ${direction}`);
    // };

    return (<>
        <div className={'commonContainer'}>
            <div className={'control'}>
                <div className={'controlInfo'}>
                    <p>{voltage || 'Battery Loading..'}</p>
                    {isChecked ? "AutoMode" : "PilotMode"}
                    <Form.Check
                        type="switch"
                        id="toggleSwitch"
                        checked={isChecked}
                        label={''}
                        onChange={handleSwitchChange}
                    />

                    <div className={'controlVideo'}>
                        <Image src={'http://192.168.137.6:8080/stream?topic=/csi_cam_1/image_raw'} width="1024"
                               height="768"
                        />
                    </div>
                    <div className={'penaltyList'}>
                        <h2>단속 차량 번호</h2>
                        <ul className={'penaltyUl'}>
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <div>
                                        <li key={index} className={'penaltyLi'}>
                                            <Image src={image.url} alt={image.name}/>
                                            <p key={index}>{image.name}</p>
                                        </li>
                                        <Button className={'btn-success'}>저장</Button>
                                        <Button className={'btn-danger'}>삭제</Button>
                                    </div>
                                ))
                            ) : null }
                        </ul>
                    </div>
                </div>

            </div>
            <Button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 1)}>BUZZER ON</Button>
            <Button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 0)}>BUZZER OFF</Button>
            <Button onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 1)}>앞으로</Button>
            <Button onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', (0, 0))}>정지</Button>

            <div>
                <Button className="Button" onClick={() => publishMessage(true)}>자율주행</Button>
                <Button className="Button" onClick={() => {
                    publishMessage(false);
                }}>직접주행</Button>
            </div>
            <div style={{textAlign: 'center'}}>
                <Button className="Button" id={'speedDown'}
                        onClick={() => handleSpeedChange(Math.max(40, currentSpeed - 10))}>-</Button>
                <span id="speedValue">{currentSpeed}</span>
                <Button className="Button" id={'speedUp'}
                        onClick={() => handleSpeedChange(Math.min(100, currentSpeed + 10))}>+</Button>
            </div>
            <div className="Button" id="Button-info"></div>
            <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tbody>
                <tr>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'leftgo'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'leftgo')}>↖</Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'go'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'go')}>↑</Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'rightgo'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'rightgo')}>↗</Button>
                    </td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'left'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'left')}>←</Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'stop'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'stop')}>■</Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'right'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'right')}>→</Button>
                    </td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'leftback'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'leftback')}>↙</Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'back'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'back')}>↓</Button>
                    </td>
                    <td style={{textAlign: 'center'}}>
                        <Button id={'rightback'}
                                onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 'rightback')}>↘</Button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <div id="button-info">{buttonInfo}</div>
            </div>
        </div>
    </>);
};