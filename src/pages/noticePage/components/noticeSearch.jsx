import { Form, Button,Container, } from 'react-bootstrap';
import {useState} from 'react'


export default function NoticeSearch() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('검색어:', searchTerm);
    };
    
    return (<>
    <Container className="d-flex justify-content-end ">
        <Form onSubmit={handleSubmit} className='d-flex pb-2' style={{ width : '200px'}} >
            <Form.Control 
                type="text" 
                placeholder="검색" 
                name='notice'
                value={searchTerm} 
                onChange={handleInputChange}
                className='me-2'
                />
            <Button variant="primary" type="submit" className="" style={{ width : '100px'}}>
            검색
            </Button>
        </Form>
    </Container>
    </>)
}