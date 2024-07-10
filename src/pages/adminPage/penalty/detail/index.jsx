import React from 'react';
import {Carousel} from 'react-bootstrap';

export default function Index() {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=f5f5f5"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5>차량사진</h5>
                    <p>-차량번호-&nbsp;&nbsp;-단속일자-&nbsp;&nbsp;-과태료-</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=eee"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5>차량사진</h5>
                    <p>-차량번호-&nbsp;&nbsp;-단속일자-&nbsp;&nbsp;-과태료-</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>차량사진</h5>
                    <p>
                        -차량번호-&nbsp;&nbsp;-단속일자-&nbsp;&nbsp;-과태료-
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}