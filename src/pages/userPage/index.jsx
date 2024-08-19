import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import YouTube from 'react-youtube';
import {Mobile, PC} from "../../common/components/responsive";

export default function Index() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <PC>
                <div className={'commonContainer'}>
                    <div className={'mainBackground'}>
                        <div className={'mainPage'}>
                            <h2>안녕하세요, PARKJAVA입니다!<br/><br/>
                            PARKJAVA는 불법 주정차 차량을 단속하는 로봇프로젝트입니다.
                            <br/>사용자 페이지에서는 PARKJAVA 프로젝트 및 팀원 소개,<br/>
                            공지사항 및 문의에 관한 정보를 확인할 수 있습니다.</h2>
                            <YouTube style={{marginLeft:180}}
                                     videoId="N6n9KsH-vBM" //동영상 주소
                                     opts={{
                                         width: "600px",
                                         height: "400px",
                                         marginLeft: "400px",
                                         playerVars: {
                                             autoplay: 1, //자동 재생 여부
                                             modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                                             loop: 1, //반복 재생
                                             playlist: "N6n9KsH-vBM", //반복 재생으로 재생할 플레이 리스트
                                         },
                                     }}
                                     onReady={(e) => {
                                         e.target.mute(); //소리 끔
                                     }}
                            />
                        </div>
                    </div>

                </div>
            </PC>
            <Mobile>
                <div className={'commonContainer'}>
                    <div className={'mainBackground'}>
                        <div className={'mainPage'}>
                            <YouTube className={'youtubeMainMobile'}
                                     videoId="1QYXjT1o-1w" //동영상 주소
                                     opts={{
                                         width: "600px",
                                         height: "400px",
                                         marginLeft: "400px",
                                         playerVars: {
                                             autoplay: 1, //자동 재생 여부
                                             modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
                                             loop: 1, //반복 재생
                                             playlist: "1QYXjT1o-1w", //반복 재생으로 재생할 플레이 리스트
                                         },
                                     }}
                                     onReady={(e) => {
                                         e.target.mute(); //소리 끔
                                     }}
                            />
                        </div>
                    </div>
                    <div className={'mainPageContent'}>
                        이부분에는 어떠한 컨텐츠를 넣어야 할까용?
                    </div>
                </div>
            </Mobile>
        </>

    )
        ;
}

