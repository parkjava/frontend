import React, {useEffect, useState} from 'react';
import axios from "axios";
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


                console.log('PenaltyData:', data);

                // 데이터가 배열인지 확인
                if (!Array.isArray(data)) {
                    throw new Error('응답 데이터가 배열이 아닙니다.');
                }

                // 데이터 구조에 맞게 변환
                const labels = data.map(item => item.penaltyDate); // X축 레이블
                console.log("labels============================="+labels)

                const dataset1 = data.map(item => item.count);
                console.log("dataset================"+dataset1)
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
                console.log(response)

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
                text: '샘플 라인 차트',
            },
        },
    };
    return (
        <>
            <div className={'commonContainer'}>
                <div className={'container404'}>
                    <div className={'adminMainText'}>
                        이곳은 관리자 페이지입니다.<br/>
                        이곳에선 실시간 단속영상 및 문의사항 등을 확인할 수 있고,<br/>
                        공지사항을 작성할 수 있습니다.<br/>
                    </div>
                    <div className={'graph'}>
                        <Line data={chartData} options={options}/>
                    </div>
                    <div className={'graph'}>
                        <Line data={inquiryData} options={options2}/>
                    </div>
                    {/* 라인 차트 렌더링 */}
                </div>
            </div>
        </>
    );
}
