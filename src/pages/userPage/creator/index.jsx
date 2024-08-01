import React from "react";
import {Image, Container} from 'react-bootstrap';
import zeroone from '../../../static/images/zeroone.png'
import hyunjun from '../../../static/images/hyunjun.png'
import dongmin from '../../../static/images/dongmin.png'
import hakgyun from '../../../static/images/hakgyun.png'
import "../../../static/common.css"


export default function index() {
    return (
        <div className={'commonContainer'}>
            <Container className={'projectInfoContainer'}>
                <div className={'wrapper'}>
                    <h1 className={'createTitle'}>ProjectGroup - 4 O.O.B</h1>
                    <ul className={'team'}>
                        <li className={'teamItem'}>

                            <div className={'profile profile_hak'}>
                                <Image src={hakgyun} style={{backgroundColor: '#00000',}}/>
                                <div className={'profileContents'}>
                                    <h2>I'm a Tree</h2>
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
                            <h2 className={'name'}>오학균</h2>
                            <p className={'job'}> 그냥 늙은 통나무</p>
                        </li>
                        <li className={'teamItem'}>
                            {/*<FaClover/>*/}
                            <div className={'profile profile_dong'}>
                                <Image src={dongmin} style={{backgroundColor: "#00000"}}/>
                                <div className={'profileContents'}>
                                    <span>SoloPlayer</span>
                                    <p>I'm sole</p>
                                </div>
                            </div>
                            <h2 className={'name'}>이동민</h2>
                            <p className={'job'}>혼자두면 알아서 잘함</p>
                        </li>
                        <li className={'teamItem'}>
                            {/*<FaDiamond/>*/}
                            <div className={'profile profile_hyun'}>
                                <Image src={hyunjun} style={{backgroundColor: '#00000'}}/>
                                <div className={'profileContents'}>
                                    <span>LongLegs</span>
                                    <p>Shit!!! ROS....</p>
                                </div>
                            </div>
                            <h2 className={'name'}>박현준</h2>
                            <p className={'job'}>Ros지옥에 빠져 죽다살아남</p>
                        </li>
                        <li className={'teamItem'}>
                            {/*<FaHeart/>*/}
                            <div className={'profile profile_young'}>
                                <Image src={zeroone} style={{backgroundColor: '#00000'}}/>
                                <div className={'profileContents'}>
                                    <span>Leader</span>
                                    <p>help..im heavy...</p>
                                </div>
                            </div>
                            <h2 className={'name'}>최영원</h2>
                            <p className={'job'}>백엔드 했음</p>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}