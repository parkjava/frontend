import UserTitle from "./components/usertitle"
import {Link} from "react-router-dom"


export default function Userpage() {
  return (
    <>
      <div>
        <UserTitle/>
        <Link to='/makeproject'>만든 사람</Link>
        <Link to='/usernotice'>공지 사항</Link>
        <Link to='/userinquiry'>문의 하기</Link>

      </div>
    </>
  );
}