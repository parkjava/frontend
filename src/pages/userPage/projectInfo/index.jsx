import React, {useEffect, useState} from 'react';
import {Image} from 'react-bootstrap';
import metalpikachu from '../../../static/images/metalpikachu.png'
import aipikachu from '../../../static/images/aipikachu.jpg'
import "../../../static/common.css"

export default function Index() {

    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (<>
            <div className={'projectInfo'}>
                <div>
                    <h1 className={'projectTitle'}>AI인공지능 자율주행 단속로봇</h1>
                    <div className={`metal_image ${animate ? 'animate' : ''}`}>
                        <Image src={metalpikachu} alt="metalpikachu"/>
                    </div>
                    <p className={`p-info ${animate ? 'animate' : ''}`}>
                        자율주행 단속로봇을 이용해 더 정확하게 단속하고<br/> 단속이 취약하던 지역까지 모두 단속이 가능합니다.
                    </p>
                    <p className={`p-info2 ${animate ? 'animate' : ''}`}>단속 효율을 극대화 할수 있습니다.</p>
                </div>

                <div className={`img2 ${animate ? 'animate' : ''}`}>
                    <Image src={aipikachu} className="aipikachu" alt="AI생성 피카츄"/>
                </div>
            </div>
        </>
    );
}