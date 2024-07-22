import NoticeTitle from './components/noticeTitle'
import NoticeCreate from './components/noticeCreate'
import NoticeTable from './components/noticeTable';



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