import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useState} from "react";
import {Mobile, PC} from "./responsive";

export default function BasicPagination({postsPerPage, totalPosts, paginate}) {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const handleChange = (event, value) => {
        setPage(value)
        paginate(value);
    };

    return (<>
            <PC>
                <Stack
                    className={' paginationPc d-flex align-items-center justify-content-center mt-3 mb-3'}
                    spacing={2}>
                    <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" showFirstButton
                                showLastButton/>
                </Stack>
            </PC>
            <Mobile>
                <Stack
                    className={'pagenationMobile d-flex justify-content-center align-items-center mt-3 mb-3'}
                    spacing={2}>
                    <Pagination
                        sx={{
                            '& .MuiPaginationItem-root': {
                                margin: '0 2px',
                                padding: '2px 2px',

                            }
                            ,}}
                        count={totalPages} page={page} onChange={handleChange} color="primary" showFirstButton
                                showLastButton siblingCount={0}/>
                </Stack>
            </Mobile>
        </>

    );
}