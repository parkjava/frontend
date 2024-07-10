import {Link} from "react-router-dom";

export default function Index() {
    return (
        <>
            <div>
                <Link to={'/main'}>User</Link>
                <br/>
                <Link to={'/admin'}>Admin</Link>
            </div>
        </>
    );
}