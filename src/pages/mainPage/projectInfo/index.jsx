import React from 'react';
import {Image} from 'react-bootstrap';
import summerImg from '../../../static/images/summer.jpg'

export default function Index(){
    return (
        <>
            <div>
                <h1>AI인공지능 자율주행 단속로봇</h1>
                <p>자율주행 단속로봇을 이용해 더 정확하게 단속하고 단속이 취약하던 지역까지 모두 단속이 가능합니다.</p>
                <hr/>

            </div>
            <hr/>
            <div>
                <h2>자율주행 단속로봇의 특장점</h2>
                <p>단속 효율을 극대화 할수 있습니다.</p>
                <hr/>

                <p></p>
                <div className="img1">
                    <div className="img2">
                        <Image src={summerImg} className="girlsImage" alt="소녀들사진"/>
                    </div>
                </div>
            </div>
        </>


    );
}