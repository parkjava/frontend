import NoticeTable from './components/noticeTable'
import NoticeTitle from './components/noticeTitle'
import NoticeSearch from './components/noticeSearch'
import NoticeCreate from './components/noticeCreate'


export default function NoticePage() {
  return (
    <>
      <div>
        <NoticeTitle/>
        <NoticeSearch/>
        <NoticeTable/>
        <NoticeCreate/>
      </div>
    </>
  );
}