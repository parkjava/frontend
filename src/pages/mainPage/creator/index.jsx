import React from "react";
import {Card, Image} from 'react-bootstrap';
import zeroone from '../../../static/images/zeroone.png'
import hyunjun from '../../../static/images/hyunjun.png'
import dongmin from '../../../static/images/dongmin.jpg'
import hakgyun from '../../../static/images/hakgyun.png'

export default function index(){
    return <>
        <h1>프로젝트 4조 -OOB-</h1>
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Image style={{width: '16rem'}} src={zeroone}/>
                <Card.Title>최영원</Card.Title>
                <Card.Text>
                    조원소개
                </Card.Text>

            </Card.Body>
        </Card>
        <div>
            <p>mbti</p>
            <p>성격</p>
            <p>mbti</p>
            <p>성격</p>
        </div>
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Image style={{width: '16rem', float: 'right'}} src={hyunjun}/>
                <Card.Title>박현준</Card.Title>
                <Card.Text>
                    조원소개
                </Card.Text>

            </Card.Body>
        </Card>
        <div>
            <p>mbti</p>
            <p>성격</p>
            <p>mbti</p>
            <p>성격</p>
        </div>
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Image style={{width: '16rem'}} src={dongmin}/>
                <Card.Title>이동민</Card.Title>
                <Card.Text>
                    조원소개
                </Card.Text>

            </Card.Body>
        </Card>
        <div>
            <p>mbti</p>
            <p>성격</p>
            <p>mbti</p>
            <p>성격</p>
        </div>
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Image style={{width: '16rem'}} src={hakgyun}/>
                <Card.Title>오학균</Card.Title>
                <Card.Text>
                    조원소개
                </Card.Text>

            </Card.Body>
        </Card>
        <div>
            <p>mbti</p>
            <p>성격</p>
            <p>mbti</p>
            <p>성격</p>
        </div>
    </>
}