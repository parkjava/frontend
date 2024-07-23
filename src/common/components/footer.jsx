import React from 'react';
import "../../static/footer.css"

export default function Footer() {
    return (
        <div className={'footer'}>
            <div className={'footerTitle'}>
                    Hello, We are Team OOB
            </div>
            <div className='footerValue'>
                <p>
                    Project Subject :  <span style={{color:'red'}}>RED ZONE enforcement</span> Autonomous Driving Robot
                </p>
                <p>
                    Project Date : 7.12 ~ 8.19
                </p>
                <p>
                    TEAM : Choi Youngwon, 오학균, 박현준, 이동민
                </p>
            </div>
        </div>
    );
}

