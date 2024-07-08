import { Table, Container, Form,  Button } from 'react-bootstrap';
import {useState} from 'react'
import {Link} from 'react-router-dom'


export default function NoticeTable() {
    
    
    return (<>
        <Container>
            <Form>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>
                                제목
                            </th>
                            <th>
                                작성자
                            </th>
                            <th>
                                작성날짜
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                내용
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
            <div><Link to={'/notice'}>목록으로</Link></div>
        </Container>
        </>)
}