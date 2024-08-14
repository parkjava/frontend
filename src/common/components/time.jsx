import {useEffect, useState} from "react";

export default function Time() {
    const [time, setTime] = useState('')

    function timeApi() {
        const date = new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            second: '2-digit',
        }).replace(/\./g, '').replace(/\s/g, '-').replace(/-/g, (match, offset) => offset === 4 || offset === 7 ? '-' : ' ').slice(0, 20);
        setTime(date);
    }

    useEffect(() => {
        setInterval(timeApi, 1000);
    }, [setTime, time]);

    return (<>
        {time}
    </>);
}