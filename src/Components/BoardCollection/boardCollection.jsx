import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BoardSection from '../BoardSection/boardSection';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getBacklogAction } from '../../redux/store/slices/backlogSlice';

const BoardCollection = () => {
    const backlog = useSelector((state)=>state.backlog.backlog)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBacklogAction(1));
    },[])
    return (
        <Stack height={"90vh"}  direction={"row"} spacing={5} padding={"2vw"} sx={{overflowX:"scroll"}}>
            {/* backlog section static */}
            <BoardSection backlog={backlog}></BoardSection>
            {/* <BoardSection></BoardSection>
            <BoardSection></BoardSection>
            <BoardSection></BoardSection>
            <BoardSection></BoardSection>
            <BoardSection></BoardSection> */}

        </Stack>
    );
}

export default BoardCollection;
