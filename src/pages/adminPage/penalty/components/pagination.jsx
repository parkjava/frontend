import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PaginatedItems({ items, itemsPerPage }) {
    function Items({ currentItems }) {
        return (
            <>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>차량 번호</th>
                            <th>과태료</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.map((penalty) => (
                            <tr key={penalty.penaltyIndex}>
                                <td>{penalty.penaltyIndex}</td>
                                <td>
                                    <Link to={`/admin/penalty/${penalty.penaltyIndex}`}>
                                        {penalty.penaltyCarNumber}
                                    </Link>
                                </td>
                                <td>{penalty.penaltyCash}</td>
                                <td>{new Date(penalty.penaltyDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        );
    }

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="다음 >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< 이전"
                renderOnZeroPageCount={null}
            />
        </>
    );
}
