import React, {useState} from "react";

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [nowPage, setNowPage] = useState(1);
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleClick = (page) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        setCurrentPage(page);
        setNowPage(page);
        paginate(page);

    };

    const handleNowPageChange = (e) => {
            const page = parseInt(e.target.value);
            if (!isNaN(page)) {
                setNowPage(e.target.value);
                handleClick(page);
                if (totalPages + 1 <= page) {
                    alert(`최대 입력 가능 페이지 수는 ${totalPages}입니다.\n${totalPages} 페이지로 이동합니다.`)
                    setNowPage(totalPages);
                } else {

                }
            } else {
                setNowPage('');
            }
        }
    ;


    return (
        <>
            <div className="pageContainer">
                <ul className="pagination">
                    <span onClick={() => handleClick(1)} className="page-link">&lt;&lt;</span>
                    <span onClick={() => handleClick(currentPage - 1)} className="page-link">&lt;</span>
                    {pageNumbers.map((number) => (

                        <li key={number}
                            className={`page-item ${currentPage === number ? 'active' : 'noneActive'}`}>
                            <span onClick={() => handleClick(number)} className="page-link">
                                {number}
                            </span>
                        </li>
                    ))}
                    <span onClick={() => handleClick(currentPage + 1)} className="page-link">&gt;</span>
                    <span onClick={() => handleClick(totalPages)} className="page-link">&gt;&gt;</span>
                </ul>
                <span style={{color: '#0d6efd'}} className="total">
                    {totalPages} 페이지 중&nbsp;
                    <input
                        type={"number"}
                        value={nowPage}
                        onChange={handleNowPageChange}
                        style={{width: '30px', textAlign: 'center', color: '#0d6efd'}}
                    />
                    &nbsp;페이지
                </span>
            </div>
        </>
    );
};

export default Pagination;
