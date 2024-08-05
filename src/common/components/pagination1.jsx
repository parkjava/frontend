import React, {useState} from "react";
import '../../static/common.css'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
        console.log(currentPage);

    }

    const handleClick = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
        paginate(page);

    };

    return (
        <nav>
            <ul className={"paginationGroup"}>
          <span onClick={() => handleClick(1)}>
          &lt;&lt;
          </span>
                <span onClick={() => handleClick(currentPage - 1)}>
          &lt;
          </span>
                {pageNumbers.map((number) => (
                    <li key={number}>
              <span onClick={() => handleClick(number)}>
                {number}
              </span>
                    </li>
                ))}
                <span onClick={() => handleClick(currentPage + 1)}>
          &gt;
          </span>
                <span onClick={() => handleClick(totalPages)}>
          &gt;&gt;
          </span>
            </ul>

        </nav>
    );
};

export default Pagination;
