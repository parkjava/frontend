import React, {useState} from "react";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleClick = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
        paginate(page);
    };

    return (
        <>
            <nav>
                <ul className="pagination">
                    <span onClick={() => handleClick(1)} className="page-link">&lt;&lt;</span>
                    <span onClick={() => handleClick(currentPage - 1)} className="page-link">&lt;</span>
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <span onClick={() => handleClick(number)} className="page-link">
                              {number}
                            </span>
                        </li>
                    ))}
                    <span onClick={() => handleClick(currentPage + 1)} className="page-link">&gt;</span>
                    <span onClick={() => handleClick(totalPages)} className="page-link">&gt;&gt;</span>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
