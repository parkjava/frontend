import {Link} from "react-router-dom";
import '../static/common.css';
import MainImage from "../static/images/character.png";
import {Image} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

export default function Index() {
    return <>
        <div className={'commonContainer'}>
            <div className={'welcome'}>
                <p>
                    <Image src={MainImage}
                           className={'mainImg'}
                           width={140}
                           height={140}/>
                </p>
                <span id="maintitle">WELCOME&nbsp;</span>
                <span>ParkJAVA</span>
                <FontAwesomeIcon icon={faGear} spin/>
            </div>
            <div className={'descriptionArea'}>
                <div className={'userDescription'}>
                    <p style={{fontSize: 50}}>사용자</p>
                    <p>
                        페이지에서는 프로젝트소개, 만든이와 공지사항, 문의작성을 수행할 수 있습니다.
                    </p>
                </div>
                <div className={'descriptionSpace'}>
                </div>
                <div className={'adminDescription'}>
                    <p style={{fontSize: 50}}>관리자</p>
                    <p>
                        페이지에서는 관제시스템, 순찰일지, 단속내역, 공지사항, 문의확인 등 CRUD를 수행할 수 있습니다.
                    </p>
                </div>
            </div>
            <ul className={'mainGroup'}>
                <div className={'mainItem'}>
                    <Link to={'/user'}>
                        <li className={'groupChild1'}>
                            <p>👩🏻‍🦰</p>
                            사용자 페이지
                        </li>
                    </Link>
                </div>
                <div className={'mainItem'}>
                    <Link to={'/login'}>
                        <li className={'groupChild2'}>
                            <p>👨🏻‍🔧</p>
                            관리자 페이지
                        </li>
                    </Link>
                </div>
            </ul>

        </div>
    </>
}