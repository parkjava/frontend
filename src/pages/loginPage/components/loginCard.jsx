import React, {useState} from 'react';
import { Card, Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';

function LoginCard() {
  const [values, setValues] = useState({
    id: "",
    password: ""
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(JSON.stringify(values,null,2))
  }
  return (
    <Container className="justify-content-center align-items-center vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4"><h2><strong>로그인</strong></h2></Card.Title>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingInput" label="아이디" className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="아이디" 
                    name='id'
                    value={values.id} 
                    onChange={handleChange} />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="비밀번호" className="mb-3">
                  <Form.Control 
                    type="password" 
                    placeholder="비밀번호" 
                    name='password'
                    value={values.password} 
                    onChange={handleChange} />
                </FloatingLabel>

                <Button variant="primary" type="submit" className="w-100">
                  로그인
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginCard;
