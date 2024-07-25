import NoticeTitle from "./components/noticeTitle"
import NoticeTable from "./components/noticeTable"

export default function Index() {
    return (
        <>
            <div className={'commonContainer'}>
                <NoticeTitle/>
                <NoticeTable/>
            </div>
        </>
    );
}


