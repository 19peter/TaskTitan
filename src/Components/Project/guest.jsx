import React from 'react';
import { useSelector } from 'react-redux';

const Guest = () => {
    // const cur_user = useSelector(state=>state.currentUser.currentUser);
    return (
        <div style={{textAlign:"left",marginLeft:"2%"}}>
            <h3 >Project members</h3>
            <p>Project members can view their board and update their tasks status.</p>
            <hr></hr>
            <h4>Members:</h4>
        </div>
    );
}

export default Guest;
