import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProjects } from '../../redux/store/slices/projectSlice';
import {v4 as uuid} from "uuid";
const Members = ({id}) => {
    const project = useSelector(state => state.projects.projects);
    let member=[]
    let manager={}
    let filteredProject=[]

    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getProjects())

    },[dispatch])

    filteredProject=project.filter((p)=>p.id.toString()===id.toString())
        member=filteredProject[0].members;
        manager=filteredProject[0].manager;
    

    if(! manager ) return <div>Loading</div>
    return (
        <div>
             <div style={{textAlign:"left",marginLeft:"2%"}}>
            <h3 >Project members</h3>
            <p>Project members can view their board and update their tasks status.</p>
            <hr></hr>
            <h4>Members:</h4>
            {member.map((m)=><div key={uuid()}>{m.email} </div>)}
            <hr></hr>
            <h3>Project Manager</h3>
            <h4>{manager.email} </h4>
        </div>
        </div>
    );
}

export default Members;