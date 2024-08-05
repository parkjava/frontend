import React, {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <div className={'commonContainer'}>
                <div className={'mainBackground'}>
                    <div className={'mainPage'}>
                    </div>
                </div>
                <div className={'mainPageContent'}>
                </div>
            </div>
        </>
    );
}

