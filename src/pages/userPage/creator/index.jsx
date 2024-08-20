import React, {useEffect} from "react";
import zeroone from '../../../static/images/zeroone.png';
import hyunjun from '../../../static/images/hyunjun.png';
import dongmin from '../../../static/images/dongmin.png';
import hakgyun from '../../../static/images/hakgyun.png';
import "../../../static/common.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index() {
    useEffect(() => {
        AOS.init();
    }, [])
    const teamMembers = [
        {
            name: '최영원',
            title: 'Leader',
            image: zeroone,
            greetings: 'ROS & FullStack',
            part: '프로젝트의 환경을 구축, 코드 형상관리를 맡았습니다. ROS, FE, BE 가리지 않고 모든 개발에 같이 참여하였습니다.',
            borderColor: '#5475da' // 빨간색
        },
        {
            name: '박현준',
            title: 'Member',
            image: hyunjun,
            greetings: 'ROS & BackEnd',
            part: 'ROS의 주요 기능들과 OpenCV 개발을 맡았고, 에서는 관리자 페이지의 Chart 부분에 대한 API 및 화면구현을 하였습니다.',
            borderColor: '#f6794b' // 파란색
        },
        {
            name: '이동민',
            title: 'Member',
            image: dongmin,
            greetings: 'FrontEnd',
            part: 'API 호출, 페이지네이션, Modal 등 공통 모듈을 개발하였고, 조회페이지 별 검색기능을 구현, Firebase 연동을 구현하였습니다.',
            borderColor: '#f5fa59' // 밝은 파란색
        },
        {
            name: '오학균',
            title: 'Member',
            image: hakgyun,
            greetings: 'FrontEnd',
            part: '페이지 디자인 총괄을 하였으며 반응형 웹 개발을 위한 공통모듈을 제작하였고, 주로 조회 및 상세페이지 개발과 소개페이지 등을 구현하였습니다.',
            borderColor: '#8ffa8f' // 초록색
        }
    ];

    return (
        <div className={'commonContainer'}>
            <div className="App">
                <header className="App-header">
                    <h1 className={'CreateH1'} data-aos="fade-up" data-aos-duration="2000">Our Team Members</h1>
                    <p data-aos="fade-up" data-aos-duration="2000">We are the project team OOB. We created an AI
                        self-driving illegal parking enforcement robot
                        project.</p>
                </header>
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div className="team-member" data-aos="flip-left"
                             data-aos-easing="ease-out-cubic"
                             data-aos-duration="1500" key={index}>
                            <div className="member-image" style={{borderColor: member.borderColor}}>
                                <img src={member.image} alt={member.name}/>
                            </div>
                            <h2 className={'mt-4'}>{member.name}</h2>
                            <p className="member-title">{member.title}</p>
                            <b><p className="hover-text">{member.greetings}</p></b>
                            <p className="hover-text">{member.part}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
