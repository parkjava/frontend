import React, {useEffect, useState} from 'react';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {Mobile, PC} from "../../common/components/responsive";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    Filler
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import axiosInstance from '../../../src/common/components/axiosinstance';
import axios from "axios";
import '../../static/common.css'
import PatrolList from './components/patrolList'
import PenaltyList from './components/penaltyList'
import InquiryList from './components/inquiryList'
import {Link} from "react-router-dom";

// Chart.js 컴포넌트 등록
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    Filler
);

export default function Index() {
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
                            borderColor: "black",
                            backgroundColor: "rgba(0, 255, 255, 0.2)",
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

    // 차트 옵션 정의
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '샘플 라인 차트',
            },
        },
    };
    const [inquiryData, setinquiryData] = useState({
        labels: [],
        datasets: []
    });

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/inquiry/countDate'); // 엔드포인트 수정
                // console.log("response" + response)
                const data = response;
                // console.log(response)

                // 데이터 확인
                // console.log("data" + data);
                // 데이터가 배열인지 확인
                if (!Array.isArray(data)) {
                    throw new Error('응답 데이터가 배열이 아닙니다.');
                }

                // 데이터 구조에 맞게 변환
                const labels = data.map(item => item.inquiryDate); // X축 레이블
                // console.log("labels" + labels);
                const dataset = data.map(item => item.count);
                // console.log("dataset1" + dataset);
                // const dataset2 = data.map(item => Number(item.patrolArea));
                // console.log("dataset2"+dataset2);

                setinquiryData({
                    labels,
                    datasets: [
                        {
                            label: '일별 문의 개수',
                            data: dataset,
                            borderColor: "black",
                            backgroundColor: "rgba(0, 255, 255, 0.2)",
                            fill: true,
                        }
                        ,
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

    // 차트 옵션 정의
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

    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axiosInstance
                    .get('/members/info')
                    .then(res => setUserName(res))
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsername();
    }, []);


    const [weatherData, setWeatherData] = useState({
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        desc: '',
        icon: '',
        loading: true,
    });

    // const [backgroundClass, setBackgroundClass] = useState('');

    useEffect(() => {
        const cityName = 'Daejeon';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fc7d1ab4ae5b24d538b3e0bc7d2238ff`;
        axios
            .get(url)
            .then((responseData) => {
                const data = responseData.data;
                const weatherDesc = data.weather[0].description.toLowerCase();
                setWeatherData({
                    temp: data.main.temp,
                    temp_max: data.main.temp_max,
                    temp_min: data.main.temp_min,
                    humidity: data.main.humidity,
                    desc: data.weather[0].description,
                    icon: data.weather[0].icon,
                    loading: false,
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const imgSrc = `https://openweathermap.com/img/w/${weatherData.icon}.png`;
    const [activeData, setActiveData] = useState('chart');
    const currentDate = new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\./g, '').replace(/\s/g, '-').replace(/-/g, (match, offset) => offset === 4 || offset === 7 ? '-' : ' ').slice(0, 16);
    const getKoreanDescription = (description) => {
        const lowerCaseDesc = description.toLowerCase();

        if (lowerCaseDesc.includes('clear sky')) {
            return '맑음';
        } else if (lowerCaseDesc.includes('few clouds')) {
            return '구름조금';
        } else if (lowerCaseDesc.includes('scattered clouds')) {
            return '구름많음';
        } else if (lowerCaseDesc.includes('broken clouds')) {
            return '흐림';
        } else if (lowerCaseDesc.includes('shower rain')) {
            return '소나기';
        } else if (lowerCaseDesc.includes('rain')) {
            return '비';
        } else if (lowerCaseDesc.includes('thunderstorm')) {
            return '천둥번개';
        } else if (lowerCaseDesc.includes('mist')) {
            return '안개';
        } else if (lowerCaseDesc.includes('snow')) {
            return '눈';
        } else {
            return '알 수 없는 날씨';
        }
    };

    const getWeatherClass = (description) => {
        if (description.includes('clear sky')) return 'clear-sky';
        if (description.includes('few clouds')) return 'few-clouds';
        if (description.includes('scattered clouds')) return 'scattered-clouds';
        if (description.includes('broken clouds')) return 'broken-clouds';
        if (description.includes('shower rain')) return 'shower-rain';
        if (description.includes('rain')) return 'rain';
        if (description.includes('thunderstorm')) return 'thunderstorm';
        if (description.includes('snow')) return 'snow';
        if (description.includes('mist')) return 'mist';
        else return 'few-clouds';
    };

    const weatherClass = getWeatherClass(weatherData.desc);

    return (
        <div className={`commonContainer ${weatherClass}`}>
            <PC>
                <div className={`adminContainer`}>
                    <div className={`adminHeader `}>
                        <div className={'weather'}>
                            {!weatherData.loading && (
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <div>
                                        {currentDate}
                                    </div>
                                    <div>
                                        <p>
                                            <img src={imgSrc}
                                                 alt="weather icon"/>{getKoreanDescription(weatherData.desc)}
                                        </p>
                                        <span>
                                            최고: {(weatherData.temp_max - 273.15).toFixed(0)}°
                                            최저: {(weatherData.temp_min - 273.15).toFixed(0)}°
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={'adminWelcome'}>
                            <h2>{userName} 님, ParkJAVA 관리자 페이지에 오신 것을 환영합니다.</h2>
                        </div>
                        <div className={'secondF'}>
                            <div className={'adminContent'}>
                                <FormControl>
                                    <RadioGroup
                                        className={"none"}
                                        style={{display: "block"}}
                                        defaultValue="단속내역"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="단속내역" control={<Radio/>} label="단속내역"
                                                          onClick={() => setActiveData('chart')}/>
                                        <FormControlLabel value="문의내역" control={<Radio/>} label="문의내역"
                                                          onClick={() => setActiveData('inquiry')}/>
                                    </RadioGroup>
                                </FormControl>
                                <div className={"dataGraph"}>
                                    <Line data={activeData === 'chart' ? chartData : inquiryData} options={options}/>
                                </div>
                            </div>
                        </div>
                        <div className={'boardArea'}>
                            <div>
                                <PatrolList/>
                            </div>
                            <div>
                                <InquiryList/>
                            </div>
                        </div>
                    </div>
                </div>
            </PC>
            <Mobile>
                <div className={`adminContainer ${weatherClass}`}>
                    <div className={'adminHeader'}>
                        <div className={'weather'}>
                            {!weatherData.loading && (
                                <div className={''}>
                                    {currentDate}<br/>
                                    <img src={imgSrc}
                                         alt="weather icon"/>{getKoreanDescription(weatherData.desc)}<br/>
                                    최고: {(weatherData.temp_max - 273.15).toFixed(0)}°
                                    최저: {(weatherData.temp_min - 273.15).toFixed(0)}°
                                </div>
                            )}
                        </div>
                        <div className={'weatherMobile'}>
                            <FormControl>
                                <RadioGroup
                                    className={"none"}
                                    style={{display: "block"}}
                                    defaultValue="단속내역"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="단속내역" control={<Radio/>} label="단속내역"
                                                      onClick={() => setActiveData('chart')}/>
                                    <FormControlLabel value="문의내역" control={<Radio/>} label="문의내역"
                                                      onClick={() => setActiveData('inquiry')}/>
                                </RadioGroup>
                            </FormControl>
                            <div className={"dataGraphMobile"}>
                                <Line data={activeData === 'chart' ? chartData : inquiryData} options={options}/>
                            </div>
                        </div>

                    </div>
                </div>

            </Mobile>
        </div>
    );
}
