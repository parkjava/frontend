import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NoticeTitle () {
    return ( <>
        <Container className="d-flex justify-content-center p-5">
            <h1>공지사항 작성</h1>
        </Container>
        </>
    )
}