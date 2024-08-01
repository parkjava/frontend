import React, {useEffect, useState} from 'react';
import "../../static/footer.css"
import {useLocation} from "react-router-dom";

export default function Footer() {
    const [footerLocation, setFooterLocation] = useState('')
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/user')) {
            setFooterLocation('user')
        } else if (location.pathname.startsWith('/admin')) {
            setFooterLocation('admin')
        } else {
            setFooterLocation('admin')
        }
    }, [location])

    return (
        <>
            {footerLocation === 'user' ?
                <div className={'footer'}>
                    <div className={'footerTitle'}>
                        Hello, We are Team OOB
                    </div>
                    <div className='footerValue'>
                        <span>
                            Project Subject : <span style={{color: 'red'}}>RED ZONE enforcement</span> Autonomous
                            Driving
                            Robot
                        </span>
                        <span>
                            Project Date : 7.12 ~ 8.19
                        </span>
                        <span>
                            TEAM : Choi Youngwon, 오학균, 박현준, 이동민
                        </span>
                    </div>
                </div>
                : null
            }

        </>
    );
}

