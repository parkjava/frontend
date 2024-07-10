import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function NoiceCreate () {

    return (<>
        <Container className="d-flex justify-content-end ">
            <Link to="/noticecreate">
                <Button variant="primary" type="submit" name="noticecreate">
                    공지사항작성
                </Button>
            </Link>
        </Container>
    </>)
}