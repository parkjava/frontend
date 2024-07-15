import NoticeTable from './components/noticeTable'
import NoticeTitle from './components/noticeTitle'
import NoticeCreate from './components/noticeCreate'



export default function Index() {
  return (
    <>
      <div>
        <NoticeTitle/>
        <NoticeTable/>
        <NoticeCreate/>

      </div>
    </>
  );
}