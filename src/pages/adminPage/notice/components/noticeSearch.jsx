import { Form, Button,Container, } from 'react-bootstrap';
import {useState} from 'react'


export default function NoticeSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 클라이언트에서 서버로 검색어를 전송하고 데이터를 가져오는 fetch 요청을 보냅니다.
        fetch(`http://localhost:8080/api/notice/title/${searchTerm}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSearchResults(data); // 검색 결과를 상태에 설정합니다.
                console.log(data)
            })
            .catch(error => console.error('Error searching notices:', error));

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

        {searchResults.map(seraching => (
            <ul key={seraching.noticeIndex}>
                <li>
                    {seraching.noticeTitle}
                </li>
                <li>
                    {new Date(seraching.createDate).toLocaleDateString()}
                </li>
                <li>
                    {seraching.userName}
                </li>
                <li>
                    {seraching.noticeView}
                </li>
            </ul>
        ))}

    </Container>
    </>)
}