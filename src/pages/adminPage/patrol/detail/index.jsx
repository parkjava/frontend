import React from 'react';
import {Form} from 'react-bootstrap';

export default function Index() {
    return (
        <div>
            <Form.Label htmlFor="inputPassword5">제목</Form.Label>
            <Form.Control
                type="text"
                id="inputtext"
                aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text>

            <Form.Select aria-label="Default select example">
                <option>관할구</option>
                <option value="1">서구</option>
                <option value="2">중구</option>
                <option value="3">동구</option>
                <option value="3">유성구</option>
                <option value="3">대덕구</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
                <option>법정동</option>
                <option value="1">탄방동</option>
                <option value="2">관평동</option>
                <option value="3">둔산동</option>
                <option value="3">목상동</option>
                <option value="3">동동동</option>
            </Form.Select>
            <textarea></textarea>
        </div>
    )
}