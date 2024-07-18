import React from "react";
import {Card, Image} from 'react-bootstrap';
import zeroone from '../../../static/images/zeroone.png'
import hyunjun from '../../../static/images/hyunjun.png'
import dongmin from '../../../static/images/dongmin.jpg'
import hakgyun from '../../../static/images/hakgyun.png'
import "../../../static/common.css"

export default function index() {
    return <body>
    <h1>Project 4 O.O.B</h1>
    <div className={'wrapper'}>
        <ul className={'team'}>
            <li className={'teamItem'}>
                <div className={'profile profile_green'}>
                    <Image src={hakgyun}/>
                    <div className={'profileContents'}>
                        <h2>5hackgun<span>I'm a tree</span></h2>
                        <p>Jo won so gae</p>
                    </div>
                </div>
            </li>
            <li className={'teamItem'}>
                <div className={'profile profile_orange'}>
                    <Image src={dongmin}/>
                    <div className={'profileContents'}>
                        <h2>이동민<span>독고다이</span></h2>
                        <p>조원소개</p>
                    </div>
                </div>
            </li>
            <li className={'teamItem'}>
                <div className={'profile profile_yellow'}>
                    <Image src={hyunjun}/>
                    <div className={'profileContents'}>
                        <h2>박현준<span>키다리</span></h2>
                        <p>조원소개</p>
                    </div>
                </div>
            </li>
            <li className={'teamItem'}>
                <div className={'profile profile_blue'}>
                    <Image src={zeroone}/>
                    <div className={'profileContents'}>
                        <h2>최영원<span>조장</span></h2>
                        <p>조원소개</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    </body>


}