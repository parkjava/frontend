import { Table, Container } from 'react-bootstrap';
import NoticeSearch from './noticesearch'
import NoticeTitle from './noticetitle'

export default function UserNotice() {
    return (
    <Container>
        <NoticeTitle/>
        <NoticeSearch/>
        <Table striped bordered hover variant="light">
            <thead>
            <tr>
            <th>NO</th>
            <th>제목</th>
            <th>게시일</th>
            <th>작성자</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>1</td>
            <td>예시</td>
            <td>240404</td>
            <td>@mdo</td>
            </tr>
            <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>240404</td>
            <td>@fat</td>
            </tr>
            <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>240404</td>
            <td>@twitter</td>
            </tr>
            </tbody>
        </Table>
    </Container>
    )
}