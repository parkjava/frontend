import React, {useState} from 'react';
import { Button, Image, Container, Table } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function AdminPage(){
    return (
        <Container>
        <ButtonGroup aria-label="Basic example">
            <p>Mode</p>
            <Button variant="secondary">Auto</Button>
            <Button variant="secondary">Pilot</Button>
            <div>
                <Image src="holder.js/100px250" fluid/>;
            </div>
        </ButtonGroup>
        <div>
            <h6>검출 차량 번호 리스트</h6>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>차량번호</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>87고9898</td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>44나5555</td>

                </tr>
                <tr>
                    <td>3</td>
                    <td>123허1231</td>
                </tr>
                </tbody>
            </Table>
        </div>
        </Container>

    )
}

