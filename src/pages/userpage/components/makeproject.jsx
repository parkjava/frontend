import { Table, Container } from 'react-bootstrap';

import {Link} from 'react-router-dom'

export default function Makeproject() {
    return (
        <Container>
            <h1 className='p-3'>만든 사람들</h1>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th colSpan={2} className='p-2' style={{width: '50%'}}>
                            Ros, Backend
                            </th>
                            <th colSpan={2} className='p-2' style={{width: '50%'}} >
                            Frontend
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{width: '25%'}}>
                                <p>Reader</p>
                                <p>최영원</p>
                                <p>Rosbridge server <br/> Spring <br/> MySQL</p>
                            </td>
                            <td style={{width: '25%'}}>
                                <p>Member</p>
                                <p>박현준</p>
                                <p>Rosbridge server <br/> Spring <br/> MySQL</p>
                            </td>
                            <td style={{width: '25%'}}>
                                <p>Member</p>
                                <p>오학균</p>
                                <p>React <br/> HTML, CSS</p>
                            </td>
                            <td style={{width: '25%'}}>
                                <p>Member</p>
                                <p>이동민</p>
                                <p>React <br/> HTML, CSS</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            <div><Link to={'/user'}>사용자</Link></div>
        </Container>
        )
}