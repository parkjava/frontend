import NoticeTitle from './components/noticeTitle'
import NoticeCreate from './components/noticeCreate'
import NoticePagination from './components/noticePagination';



export default function Index() {
  return (
    <>
      <div>
        <NoticeTitle/>
        <NoticePagination/>
        <NoticeCreate/>

      </div>
    </>
  );
}