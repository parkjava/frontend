import MainNavbar from './components/noticeNavbar'
import NoticeTable from './components/noticeTable'
import NoticeTitle from './components/noticeTitle'


export default function NoticePage() {
  return (
    <>
      <div>
        <MainNavbar/>
        <NoticeTitle/>
        <NoticeTable/>
      </div>
    </>
  );
}