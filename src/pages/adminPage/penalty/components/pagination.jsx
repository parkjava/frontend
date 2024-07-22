import React, { useState } from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 400;
  border-radius: 5px;
  padding: 2px;
  width: 40px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpanN = styled.span`
    &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }

`;

const PageSpan = styled.span`
    width: 40px;
    height: 40px;
    padding: 5px;
    &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }

`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
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
    <div>
      <nav>
        <PageUl className="pagination">
          <PageSpan onClick={() => handleClick(1)} className="page-link">
          &lt;&lt;
          </PageSpan>
          <PageSpan onClick={() => handleClick(currentPage - 1)} className="page-link">
          &lt;
          </PageSpan>
          {pageNumbers.map((number) => (
            <PageLi key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <PageSpanN onClick={() => handleClick(number)} className="page-link">
                {number}
              </PageSpanN>
            </PageLi>
          ))}
          <PageSpan onClick={() => handleClick(currentPage + 1)} className="page-link">
          &gt;
          </PageSpan>
          <PageSpan onClick={() => handleClick(totalPages)} className="page-link">
          &gt;&gt;
          </PageSpan>
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;
