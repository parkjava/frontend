import React, {useState, useEffect} from 'react';
import ROSLIB from 'roslib';
import {Image, Button, Form} from "react-bootstrap";
import '../../../static/common.css'

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
            param['rightspeed'] = value;
            param['leftspeed'] = value;
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

    const handleKeyPress = (key) => {
        const keyMap = {
            '1': {ButtonName: '↙', functionCall: () => toggleCheckbox('leftback')},
            '2': {ButtonName: '↓', functionCall: () => toggleCheckbox('back')},
            '3': {ButtonName: '↘', functionCall: () => toggleCheckbox('rightback')},
            '4': {ButtonName: '←', functionCall: () => toggleCheckbox('left')},
            '5': {ButtonName: '■', functionCall: () => toggleCheckbox('stop')},
            '6': {ButtonName: '→', functionCall: () => toggleCheckbox('right')},
            '7': {ButtonName: '↖', functionCall: () => toggleCheckbox('leftgo')},
            '8': {ButtonName: '↑', functionCall: () => toggleCheckbox('go')},
            '9': {ButtonName: '↗', functionCall: () => toggleCheckbox('rightgo')},
        };

        if (key in keyMap) {
            return `입력키: ${keyMap[key].ButtonName}`;
        }
        return null;
    };

    const toggleCheckbox = (direction) => {
        // Handle the direction change
        console.log(`Direction: ${direction}`);
    };

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
                    <Image src={'http://192.168.0.12:8080/stream?topic=/csi_cam_1/image_raw'} width="640" height="360"
                           alt="Live Video"/>
                </div>
                <Button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 1)}>BUZZER ON</Button>
                <Button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 0)}>BUZZER OFF</Button>
                <Button onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 1)}>앞으로</Button>

                <div>
                    <Button className="Button" onClick={() => publishMessage(true)}>자율주행</Button>
                    <Button className="Button" onClick={() => publishMessage(false)}>직접주행</Button>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button className="Button"
                            onClick={() => handleSpeedChange(Math.max(40, currentSpeed - 10))}>-</Button>
                    <span id="speedValue">{currentSpeed}</span>
                    <Button className="Button"
                            onClick={() => handleSpeedChange(Math.min(100, currentSpeed + 10))}>+</Button>
                </div>
                <div className="Button" id="Button-info"></div>
                <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <tbody>
                    <tr>
                        <td colSpan="6" style={{textAlign: 'center'}}>
                            <Button className="Button" onMouseDown={() => toggleCheckbox('forward')}
                                    onTouchStart={() => toggleCheckbox('forward')}
                                    onMouseUp={() => toggleCheckbox('stop')}
                                    onTouchEnd={() => toggleCheckbox('stop')}>Forward</Button>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: 'center'}}>
                            <Button className="Button" onMouseDown={() => toggleCheckbox('left')}
                                    onTouchStart={() => toggleCheckbox('left')} onMouseUp={() => toggleCheckbox('stop')}
                                    onTouchEnd={() => toggleCheckbox('stop')}>Left</Button>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Button className="Button" onMouseDown={() => toggleCheckbox('stop')}
                                    onTouchStart={() => toggleCheckbox('stop')}>Stop</Button>
                        </td>
                        <td style={{textAlign: 'center'}}>
                            <Button className="Button" onMouseDown={() => toggleCheckbox('right')}
                                    onTouchStart={() => toggleCheckbox('right')}
                                    onMouseUp={() => toggleCheckbox('stop')}
                                    onTouchEnd={() => toggleCheckbox('stop')}>Right</Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6" style={{textAlign: 'center'}}>
                            <Button className="Button" onMouseDown={() => toggleCheckbox('backward')}
                                    onTouchStart={() => toggleCheckbox('backward')}
                                    onMouseUp={() => toggleCheckbox('stop')}
                                    onTouchEnd={() => toggleCheckbox('stop')}>Backward</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

