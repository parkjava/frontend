import MainNavbar from './components/noticeNavbar'
import NoticeTitle from './components/noticeTitle'
import NoticeTable from './components/noticeTable'



export default function NoticeDetailPage() {
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