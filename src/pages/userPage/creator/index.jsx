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
            borderColor: '#5475da' // 빨간색
        },
        {
            name: '박현준',
            title: 'Member',
            image: hyunjun,
            borderColor: '#f6794b' // 파란색
        },
        {
            name: '이동민',
            title: 'Member',
            image: dongmin,
            borderColor: '#f5fa59' // 밝은 파란색
        },
        {
            name: '오학균',
            title: 'Member',
            image: hakgyun,
            borderColor: '#8ffa8f' // 초록색
        }
    ];

    return (
        <div className={'commonContainer'}>
            <div className="App">
                <header className="App-header">
                    <h1 className={'CreateH1'} data-aos="fade-up" data-aos-duration="2000">Our Team Members</h1>
                    <p data-aos="fade-up" data-aos-duration="2000">We are the project team OOB. We created an AI self-driving illegal parking enforcement robot
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
                            <h2>{member.name}</h2>
                            <p className="member-title">{member.title}</p>
                            <p className="hover-text">This letterhead design is meant to project an image of
                                professional reliability.</p>
                            <p className="hover-text">This letterhead this letter.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
