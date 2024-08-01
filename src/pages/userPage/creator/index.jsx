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
                    <h1 className={'createTitle'}>ProjectGroup - O.O.B -</h1>
                    <ul className={'team'}>
                        <li className={'teamItem'}>

                            <div className={'profile profile_1'}>
                                <Image src={hakgyun} />
                                <div className={'profileContents'}>
                                    <h2>오학균<span>늙은통나무</span></h2>
                                    <p>
                                        -Frontend-<br/> React<br/> css<br/> bootstrap
                                    </p>
                                </div>
                            </div>
                            {/*<h2 className={'name'}>오학균</h2>*/}
                            {/*<p className={'job'}> 그냥 늙은 통나무</p>*/}
                        </li>
                        <li className={'teamItem'}>
                            {/*<FaClover/>*/}
                            <div className={'profile profile_2'}>
                                <Image src={dongmin}/>
                                <div className={'profileContents'}>
                                    <h2>이동민<span>혼자서도 잘해요</span></h2>
                                    <p>
                                        동민이는 혼자 내버려 두면 알아서 뚝딱뚝딱,
                                        뭐든지 잘 만들어 냅니다.
                                        정말 혼자서도 잘해요.
                                    </p>
                                </div>
                            </div>
                            {/*<h2 className={'name'}>이동민</h2>*/}
                            {/*<p className={'job'}>혼자두면 알아서 잘함</p>*/}
                        </li>
                        <li className={'teamItem'}>
                            {/*<FaDiamond/>*/}
                            <div className={'profile profile_3'}>
                                <Image src={hyunjun}/>
                                <div className={'profileContents'}>
                                    <h2>박현준<span>ROS혐오자</span></h2>
                                    <p>
                                        현준이는 백엔드를 담당하고 싶어했어요.
                                        하지만 프로젝트 초반에 ROS의 구렁텅이에 빠져서
                                        한참을 헤어나오질 못했죠, 그래서 ROS를 혐오해요
                                    </p>
                                </div>
                            </div>
                            {/*<h2 className={'name'}>박현준</h2>*/}
                            {/*<p className={'job'}>Ros지옥에 빠져 죽다살아남</p>*/}
                        </li>
                        <li className={'teamItem'}>
                            {/*<FaHeart/>*/}
                            <div className={'profile profile_4'}>
                                <Image src={zeroone}/>
                                <div className={'profileContents'}>
                                    <h2>최영원<span>만능조장</span></h2>
                                    <p>
                                        영원이는 프론트 백 가릴거 없이 다 곧잘 해요.
                                        백엔드도 순식간에 뚝딱, 프론트도 순식간에 뚝딱
                                        정말 못하는게 없어요.
                                    </p>
                                </div>
                            </div>
                            {/*<h2 className={'name'}>최영원</h2>*/}
                            {/*<p className={'job'}>백엔드 했음</p>*/}
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}