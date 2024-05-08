import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from '../../redux/store/slices/projectSlice';
import { v4 as uuid } from 'uuid';

const Members = ({ id }) => {
  const project = useSelector(state => state.projects.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  if (!project) return <div>Loading...</div>;

  const { members, manager } = project;

  return (
    <div>
      <div style={{ textAlign: "left", marginLeft: "2%" }}>
        <h3 style={{color:"white"}}>Project members</h3>
        <p style={{color:"#9e9e9e",marginBottom:"2%"}}>Project members can view their board and update their tasks status.</p>
        <hr />
        <h4 style={{color:"white",marginTop:"2%"}}>Members:</h4>
        {members.map((m) => (
          <div key={uuid()} style={{color:"#9e9e9e", marginBottom:"2%"}}>{m.email}</div>
        ))}
        <hr />
        <h3 style={{color:"white",marginTop:"2%"}}>Project Manager</h3>
        <h4 style={{color:"#9e9e9e"}}>{manager.email}</h4>
      </div>
    </div>
  );
}

export default Members;
