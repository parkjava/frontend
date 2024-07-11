import React, {useState, useEffect} from 'react';
import ROSLIB from 'roslib'; // eslint-disable-next-line


export default function Index()  {
    const [ros, setRos] = useState(null);
    const [voltage, setVoltage] = useState('');
    const [ledBlue, setLedBlue] = useState('');
    const [ledGreen, setLedGreen] = useState('');
    const [buzzer, setBuzzer] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('Wait...');
    const [imgSrc, setImgSrc] = useState('');


    useEffect(() => {

        const rosInstance = new ROSLIB.Ros({
            // url: 'ws://192.168.137.6:9090', 핫스팟일 때
            url: 'ws://192.168.137.6:9090'
        });

        rosInstance.on('connection', () => {
            console.log('Connected to websocket server.');
            setConnectionStatus('연결됨');
        });

        rosInstance.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
            setConnectionStatus('Error');
        });

        rosInstance.on('close', () => {
            console.log('Connection to websocket server closed.');
            setConnectionStatus('연결 끊어짐');
        });

        setRos(rosInstance);

        const batteryLevelListener = new ROSLIB.Topic({
            ros: rosInstance,
            name: '/voltage',
            messageType: 'jetbotmini_msgs/Battery',
        });

        batteryLevelListener.subscribe((msg) => {
            setVoltage(msg.Voltage);
        });

        const cameraListener = new ROSLIB.Topic({
            ros: rosInstance,
            name: '/image',
            messageType: 'sensor_msgs/Image',
        });

        cameraListener.subscribe((msg) => {
            setImgSrc(msg.Image);

        });



        return () => {
            batteryLevelListener.unsubscribe();
            rosInstance.close();
        };
    }, []);

    const callService = (name, type, value) => {
        if (!ros) return;

        const exampleService = new ROSLIB.Service({
            ros: ros,
            name: name,
            serviceType: type,
        });

        const param = {};
        setBuzzer('off');
        setLedGreen('off');
        setLedBlue('off');

        if (name === '/Buzzer') {
            param['buzzer'] = value;
            if (value === 0) {
                setBuzzer('off');
            } else if (value === 1) {
                setBuzzer('on')
            }


        } else if (name === '/LEDBLUE') {
            param['ledblue'] = value;
            if (value === 0) {
                setLedBlue('off');
            } else if (value === 1) {
                setLedBlue('on')
            }


        } else if (name === '/LEDGREE') {
            param['ledgree'] = value;
            if (value === 0) {
                setLedGreen('off');
            } else if (value === 1) {
                setLedGreen('on')
            }
        }

        const request = new ROSLIB.ServiceRequest(param);

        exampleService.callService(request, (result) => {
            console.log('Result for service call on /example_service: ', result);
        });
    };

    const voltagePercentage = voltage ? ((voltage / 12.5) * 100).toFixed(1) : '';

    return (
        <div>
            <h1>ROS 관제 페이지</h1>
            <img src='http://192.168.137.6:8080/stream?topic=/csi_cam_0/image_raw' alt='ros' style={{border: "1px solid black", width: "720", height: "480"}}/>
            <h2>연결 상태 : {connectionStatus}</h2>
            <div>
                <h3>배터리 : <span id="voltage">{voltagePercentage}%</span></h3>
                <h3>LEDBLUE : {ledBlue}</h3>
                <h3>LEDGREEN : {ledGreen}</h3>
                <h3>BUZZER : {buzzer}</h3>
                <button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 1)}>BUZZER ON</button>
                <button onClick={() => callService('/Buzzer', 'jetbotmini_msgs/Buzzer', 0)}>BUZZER OFF</button>
                <button onClick={() => callService('/LEDBLUE', 'jetbotmini_msgs/LEDBLUE', 1)}>LEDBLUE ON</button>
                <button onClick={() => callService('/LEDBLUE', 'jetbotmini_msgs/LEDBLUE', 0)}>LEDBLUE OFF</button>
                <button onClick={() => callService('/LEDGREE', 'jetbotmini_msgs/LEDGREE', 1)}>LEDGREE ON</button>
                <button onClick={() => callService('/LEDGREE', 'jetbotmini_msgs/LEDGREE', 0)}>LEDGREE OFF</button>
            </div>
        </div>
    );
};


