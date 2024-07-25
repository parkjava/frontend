import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import {Image} from "react-bootstrap";

export default function Index(){
    const [currentSpeed, setCurrentSpeed] = useState(40);
    const [voltage, setVoltage] = useState('');

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
            '1': { buttonName: '↙', functionCall: () => toggleCheckbox('leftback') },
            '2': { buttonName: '↓', functionCall: () => toggleCheckbox('back') },
            '3': { buttonName: '↘', functionCall: () => toggleCheckbox('rightback') },
            '4': { buttonName: '←', functionCall: () => toggleCheckbox('left') },
            '5': { buttonName: '■', functionCall: () => toggleCheckbox('stop') },
            '6': { buttonName: '→', functionCall: () => toggleCheckbox('right') },
            '7': { buttonName: '↖', functionCall: () => toggleCheckbox('leftgo') },
            '8': { buttonName: '↑', functionCall: () => toggleCheckbox('go') },
            '9': { buttonName: '↗', functionCall: () => toggleCheckbox('rightgo') },
        };

        if (key in keyMap) {
            return `입력키: ${keyMap[key].buttonName}`;
        }
        return null;
    };

    const toggleCheckbox = (direction) => {
        // Handle the direction change
        console.log(`Direction: ${direction}`);
    };

    return (
        <div className={'commonContainer'}>
            <h1>Live Video Streaming</h1>
            <Image src={'http://192.168.0.12:8080/stream?topic=/csi_cam_1/image_raw'} width="800" height="600" alt="Live Video" />
            <h3>배터리 잔량 : <span id="voltage">{voltage}</span></h3>
            <button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 1)}>BUZZER ON</button>
            <button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 0)}>BUZZER OFF</button>
            <button onClick={() => callService('/Motor', 'jetbotmini_msgs/srv/Motor', 1)}></button>
            <div>
                <button className="button" onClick={() => publishMessage(true)}>자율주행</button>
                <button className="button" onClick={() => publishMessage(false)}>직접주행</button>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button className="button" onClick={() => handleSpeedChange(Math.max(40, currentSpeed - 10))}>-</button>
                <span id="speedValue">{currentSpeed}</span>
                <button className="button" onClick={() => handleSpeedChange(Math.min(100, currentSpeed + 10))}>+</button>
            </div>
            <div className="button" id="button-info"></div>
            <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <tbody>
                <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                        <button className="button" onMouseDown={() => toggleCheckbox('forward')} onTouchStart={() => toggleCheckbox('forward')} onMouseUp={() => toggleCheckbox('stop')} onTouchEnd={() => toggleCheckbox('stop')}>Forward</button>
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'center' }}>
                        <button className="button" onMouseDown={() => toggleCheckbox('left')} onTouchStart={() => toggleCheckbox('left')} onMouseUp={() => toggleCheckbox('stop')} onTouchEnd={() => toggleCheckbox('stop')}>Left</button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="button" onMouseDown={() => toggleCheckbox('stop')} onTouchStart={() => toggleCheckbox('stop')}>Stop</button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <button className="button" onMouseDown={() => toggleCheckbox('right')} onTouchStart={() => toggleCheckbox('right')} onMouseUp={() => toggleCheckbox('stop')} onTouchEnd={() => toggleCheckbox('stop')}>Right</button>
                    </td>
                </tr>
                <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                        <button className="button" onMouseDown={() => toggleCheckbox('backward')} onTouchStart={() => toggleCheckbox('backward')} onMouseUp={() => toggleCheckbox('stop')} onTouchEnd={() => toggleCheckbox('stop')}>Backward</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

