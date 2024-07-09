import { Link } from "react-router-dom";
import Footer from "../../components/footer"
import MainNavbar from "./components/noticeNavbar"
import NoticeTitle from "./components/noticeTitle"
import NoticeTable from "./components/noticeTable"

function NoticeCreatePage() {
  return (
    <>
      <div>
        <NoticeTitle/>
        <NoticeTable/>
      </div>
      <Footer />
    </>
  );
}

export default NoticeCreatePage;
