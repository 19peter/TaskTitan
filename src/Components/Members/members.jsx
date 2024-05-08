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
        <h3>Project members</h3>
        <p>Project members can view their board and update their tasks status.</p>
        <hr />
        <h4>Members:</h4>
        {members.map((m) => (
          <div key={uuid()}>{m.email}</div>
        ))}
        <hr />
        <h3>Project Manager</h3>
        <h4>{manager.email}</h4>
      </div>
    </div>
  );
}

export default Members;
