import {Container, Table, Form,  Button} from 'react-bootstrap';
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function UserInquiry () {
    const [userinquiry, setuserinquiry] = useState({
        title:'',
        detail:''
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuserinquiry({
            ...userinquiry,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("제목:" + JSON.stringify((userinquiry.title),null,2) + "내용: " + JSON.stringify((userinquiry.detail),null,2));
    };
    

    return (
        <Container>
            <h1>문의 내용 작성</h1>
            <Form onSubmit={handleSubmit}>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                <Form.Label>제목</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="제목 입력"
                                    name='title'
                                    value={userinquiry.title}
                                    onChange={handleInputChange}
                                    style={{border: 'none'}}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Label><strong>내용 작성</strong></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={15}
                                    placeholder="내용 입력"
                                    name='detail'
                                    value={userinquiry.detail}
                                    onChange={handleInputChange}
                                    style={{ border: 'none', resize: 'none' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className='d-flex justify-content-end'>
                    <Button variant="primary" type="submit" style={{ width: '100px' }}>
                        작성
                    </Button>
                </div>
            </Form>
            <div><Link to={'/user'}>사용자</Link></div>
        </Container>
    )
}