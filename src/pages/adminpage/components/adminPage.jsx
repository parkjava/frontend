import React, {useState} from 'react';
import { Button, Image, Container } from 'react-bootstrap';
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
            <textarea></textarea>
        </div>
        </Container>

    )
}

