import React from "react";
import {Image} from 'react-bootstrap';
import zeroone from '../../../static/images/zeroone.png'
import hyunjun from '../../../static/images/hyunjun.png'
import dongmin from '../../../static/images/dongmin.png'
import hakgyun from '../../../static/images/hakgyun.png'
import "../../../static/common.css"

import { FaHeart } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import { FaClover } from "react-icons/fa6";
import { ImSpades } from "react-icons/im";

export default function index() {
    return <>
    <h1 className={'createTitle'}>ProjectGroup - 4 O.O.B</h1>
    <div className={'wrapper'}>
        <ul className={'team'}>
            <li className={'teamItem'}>
                <ImSpades/>
                <div className={'profile profile_green'}>
                    <Image src={hakgyun} style={{backgroundColor:'#58FAAC'}}/>
                    <div className={'profileContents'}>
                        <h2>5hakGyun<span>I'm a Tree</span></h2>

                        <p>
                            1I'm Groot!!!!!!!<br/>
                            2I'm Groot!!!!!!!<br/>
                            3I'm Groot!!!!!!!<br/>
                            4I'm Groot!!!!!!!<br/>
                            5I'm Groot!!!!!!!<br/>
                            6I'm Groot!!!!!!!<br/>
                        </p>

                    </div>
                </div>
            </li>
            <li className={'teamItem'}>
                <FaClover/>
                <div className={'profile profile_orange'}>
                    <Image src={dongmin} style={{backgroundColor:"orange"}}/>
                    <div className={'profileContents'}>
                        <h2>LeeDongMin<span>SoloPlayer</span></h2>
                        <p>I'm sole</p>
                    </div>
                </div>
            </li>
            <li className={'teamItem'}>
                <FaDiamond/>
                <div className={'profile profile_yellow'}>
                    <Image src={hyunjun} style={{backgroundColor:'#ffe229'}}/>
                    <div className={'profileContents'}>
                        <h2>ParkHyunJun<span>LongLegs</span></h2>
                        <p>Shit!!! ROS....</p>
                    </div>
                </div>
            </li>
            <li className={'teamItem'}>
                <FaHeart/>
                <div className={'profile profile_blue'}>
                    <Image src={zeroone} style={{backgroundColor:'#1f4dff'}}/>
                    <div className={'profileContents'}>
                        <h2>ChoiYoungWon<span>Leader</span></h2>
                        <p>help....im heavy...</p>
                    </div>
                </div>
            </li>
        </ul>

        <div className={'create-text'}>
            Making....
        </div>
    </div>
    </>


}