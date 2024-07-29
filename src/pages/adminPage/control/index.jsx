import React, {useState, useEffect} from 'react';
import ROSLIB from 'roslib';
import {Image, Button, Form} from "react-bootstrap";
import '../../../static/common.css'

export default function Index() {
    const [currentSpeed, setCurrentSpeed] = useState(40);
    const [voltage, setVoltage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [buttonInfo, setButtonInfo] = useState('');
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

    const ros = new ROSLIB.Ros({
        url: 'ws://192.168.0.12:9090',
    });

    useEffect(() => {
        ros.on('connection', () => {
            console.log('Connected to websocket server.');
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
        const handleKeyDown = (event) =>{
            const key = event.key.toLowerCase();
            const info = handleKeyPress(key);
            if (info) {
                setButtonInfo(info);
            }
        };
        document.addEventListener('keydown',handleKeyDown);

        return () => {
            document.removeEventListener('keydown',handleKeyDown);
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
            console.log(`Result for service call on ${name}: `, result);
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
        console.log('Published message to /data');
    };

    const handleSpeedChange = (newSpeed) => {
        setCurrentSpeed(newSpeed);
        // Replace with appropriate speed functions
        console.log(`Speed set to ${newSpeed}`);
    };
    // function toggleCheckbox(id){
    //     const checkbox = document.getElementById(id);
    //     checkbox.checked = !checkbox.checked;
    // }
    const handleKeyPress = (key) => {
        const keyMap = {
            '+': {ButtonName: '+', functionCall: () => document.getElementById('speedUp').click()},
            '-': {ButtonName: '-', functionCall: () => document.getElementById('speedDown').click()},
            '1': {ButtonName: '↙', functionCall: () => document.getElementById('leftback').click()},
            '2': {ButtonName: '↓', functionCall: () => document.getElementById('back').click()},
            '3': {ButtonName: '↘', functionCall: () => document.getElementById('rightback').click()},
            '4': {ButtonName: '←', functionCall: () => document.getElementById('left').click()},
            '5': {ButtonName: '■', functionCall: () => document.getElementById('stop').click()},
            '6': {ButtonName: '→', functionCall: () => document.getElementById('right').click()},
            '7': {ButtonName: '↖', functionCall: () => document.getElementById('leftgo').click()},
            '8': {ButtonName: '↑', functionCall: () => document.getElementById('go').click()},
            '9': {ButtonName: '↗', functionCall: () => document.getElementById('rightgo').click()},
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

    return (
        <div className={'commonContainer'}>
            <div className={'control'}>
                <h1>ParkJAVA Control Page</h1>
                <div className={'controlInfo'}>
                    <span style={{position: 'absolute', color: '#77f132', marginRight: '20'}}>
                        <b>{voltage || 'Connect...'}</b></span>
                    <span style={{position: 'absolute', color: "blue"}}>
                        <div className={'switchArea'}>
                        {isChecked ? "AutoMode" : "PilotMode"}
                            <Form.Check
                                type="switch"
                                id="toggleSwitch"
                                checked={isChecked}
                                label={''}
                                onChange={handleSwitchChange}
                            />
                    </div>
                    </span>
                    <Image src={'http://192.168.137.6:8080/stream?topic=/csi_cam_1/image_raw'} width="640" height="360"
                           alt="Live Video"/>
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
        </div>
    );
};