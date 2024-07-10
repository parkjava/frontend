import React from 'react';
import {Form} from "react-bootstrap";
import {CiSearch} from "react-icons/ci";


export default function Index() {
    return (
        <>
            <div>
                <h1>공지사항</h1>
                <div>
                    <Form.Select aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                    </Form.Select>
                    <input type={'text'} placeholder={'검색어를 입력하세요'}></input>
                    <CiSearch/>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>등록일</th>
                        <th>조회수</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>첫번째 게시글입니다.</td>
                        <td>2020-10-25</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>두번째 게시글입니다.</td>
                        <td>2020-10-25</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>세번째 게시글입니다.</td>
                        <td>2020-10-25</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>네번째 게시글입니다.</td>
                        <td>2020-10-25</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>다섯번째 게시글입니다.</td>
                        <td>2020-10-25</td>
                        <td>4</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

