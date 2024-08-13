import {Link} from "react-router-dom";
import '../static/common.css';
import MainImage from "../static/images/character.png";
import {Image} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";

export default function Index() {
    useEffect(() => {
        AOS.init();
    }, [])
    return <>
        <div className={'commonContainer'}>
            <div className={'welcome'} data-aos="fade-right" data-aos-duration="1500">
                <p>
                    <Image src={MainImage} className={'mainImg'}/>
                </p>
                WELCOME&nbsp;ParkJAVA&nbsp;&nbsp;
                <FontAwesomeIcon icon={faGear} spin/>
            </div>
            <div className={'descriptionArea'}>
                <div className={'userDescription'} data-aos="fade-up" data-aos-duration="2000">
                    <p style={{fontSize: 50}}>사용자</p>
                    <p>
                        페이지에서는 프로젝트소개, 만든이와 공지사항, 문의작성을 수행할 수 있습니다.
                    </p>
                </div>
                <div className={'descriptionSpace'}>
                </div>
                <div className={'adminDescription'} data-aos="fade-up" data-aos-duration="3000">
                    <p style={{fontSize: 50}}>관리자</p>
                    <p>
                        페이지에서는 관제시스템, 순찰일지, 단속내역, 공지사항, 문의확인 등 CRUD를 수행할 수 있습니다.
                    </p>
                </div>
            </div>
            <ul className={'mainGroup'}>
                <div className={'mainItem'} data-aos="flip-left" data-aos-duration="1000">
                    <Link to={'/user'}>
                        <li className={'groupChild1'}>
                            <p>👩🏻‍🦰</p>
                            사용자 접속
                        </li>
                    </Link>
                </div>
                <div className={'mainItem'} data-aos="flip-left" data-aos-duration="1000">
                    <Link to={'/login'}>
                        <li className={'groupChild2'}>
                            <p>👨🏻‍🔧</p>
                            관리자 접속
                        </li>
                    </Link>
                </div>
            </ul>
        </div>

    </>
}