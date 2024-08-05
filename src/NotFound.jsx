import './static/common.css'
import React from 'react'
import {Link} from "react-router-dom";
export default function NotFound() {
    return (<>
            <div className={'commonContainer'}>
                <div className={'container404'}>
                    <div className={'notFoundTitle'}>
                        <p className={'notFoundMsg'}>
                            Not Found
                        </p>
                        <p>
                            요청하신 페이지를 찾을 수 없습니다.
                        </p>
                        <p>
                            <Link to={'/'}>홈으로 돌아가기</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
