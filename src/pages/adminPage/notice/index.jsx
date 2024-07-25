import NoticeTitle from './components/noticeTitle'
import NoticeCreate from './components/noticeCreate'
import NoticeTable from './components/noticeTable';


export default function Index() {
    return (
        <>
            <div className={'commonContainer'}>
                <NoticeTitle/>
                <NoticeTable/>
                <NoticeCreate/>
            </div>
        </>
    );
}