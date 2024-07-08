import { Table, Container, Form,  Button } from 'react-bootstrap';
import {useState} from 'react'
import {Link} from 'react-router-dom'


export default function NoticeTable() {
    
    const [noticeText, setNoticeText] = useState({
        title:'',
        detail:''
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoticeText({
            ...noticeText,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("제목:" + JSON.stringify((noticeText.title),null,2) + "내용: " + JSON.stringify((noticeText.detail),null,2));
    };
    
    return (<>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>
                                <Form.Control
                                    type="text"
                                    placeholder="제목 입력"
                                    name='title'
                                    value={noticeText.title}
                                    onChange={handleInputChange}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={15}
                                    placeholder="내용 입력"
                                    name='detail'
                                    value={noticeText.detail}
                                    onChange={handleInputChange}
                                    style={{ border: 'none', resize: 'none' }}
                                />
                            </td>
                        </tr>
                        {/* <tr>
                            <td>
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Control type="file" multiple />
                                </Form.Group>
                            </td>
                        </tr> */}
                    </tbody>
                </Table>
                <div className='d-flex justify-content-end'>
                    <Button variant="primary" type="submit" style={{ width: '100px' }}>
                        작성
                    </Button>
                </div>
            </Form>
            <div><Link to={'/notice'}>목록으로</Link></div>
        </Container>
        </>)
}