import React from 'react';
import { Table, Container, Pagination } from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function PatrolLog(){
    return (
        <Container>
            <h2>순찰내역</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>NO</th>
                    <th>제&nbsp;&nbsp;목</th>
                    <th>관할구 / 법정 동</th>
                    <th>신고일자</th>
                    <th>처리상태</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <th><Link to={'./detail/1'}>은행동 순찰</Link></th>
                    <th>중구 / 은행동</th>
                    <th>2024.06.15</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>2</td>
                    <th>탄방동 순찰</th>
                    <th>서구 / 탄방동</th>
                    <th>2024.07.13</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>3</td>
                    <th>둔산동 순찰</th>
                    <th>서구 / 둔산1동</th>
                    <th>2024.07.16</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>4</td>
                    <th>목상동 순찰</th>
                    <th>대덕구 / 목상동</th>
                    <th>2024.07.17</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>5</td>
                    <th>괴정동 순찰</th>
                    <th>서구 / 괴정동</th>
                    <th>2024.07.18</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>6</td>
                    <th>용문동 순찰</th>
                    <th>서구 / 용문동</th>
                    <th>2024.07.19</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>7</td>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                </tr>
                <tr>
                    <td>8</td>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>9</td>
                    <th>...</th>
                    <th>...</th>
                    <th>...</th>
                    <th>완료</th>
                </tr>
                <tr>
                    <td>10</td>
                    <th>관평동 단속</th>
                    <th>유성구 / 관평동</th>
                    <th>2024.07.15</th>
                    <th>완료</th>
                </tr>

                </tbody>
            </Table>
            <Pagination>
                <Pagination.First/>
                <Pagination.Prev/>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Container>

    )
}