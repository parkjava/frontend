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
                    className={'d-flex align-items-center justify-content-center mt-5 mb-3'}
                    spacing={2}>
                    <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" showFirstButton
                                showLastButton/>
                </Stack>
            </PC>
            <Mobile>
                <Stack
                    className={'d-flex align-items-center justify-content-center mt-5 mb-3 '}
                    spacing={2}>
                    <Pagination
                        sx={{
                            '& .MuiPaginationItem-root': {
                                margin: '0 2px', // 좌우 간격을 줄임
                                padding: '2px 4px',
                            }
                            ,
                        }}
                        count={totalPages} page={page} onChange={handleChange} color="primary" showFirstButton
                        showLastButton siblingCount={0}/>
                </Stack>
            </Mobile>
        </>

    );
}