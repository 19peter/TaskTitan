import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectById } from '../../redux/store/slices/projectSlice';
import { useSelector } from 'react-redux';
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
const ProjectDashboard = ({id}) => {
  const project = useSelector(state=>state.projects.project);
  const cur_user=useSelector(state=>state.currentUser.currentUser)
  const dispatch=useDispatch()
let len =0;  
let todoCount = 0;
  let inProgressCount = 0;
  let doneCount = 0;
  let name=""
  useEffect(()=>{
    dispatch(getProjectById(id));
  },[dispatch])

if(!project) return <div>Loading ...</div>

     name=project.title
     len =project.tasks.length
     todoCount = 0;
       inProgressCount = 0;
       doneCount = 0;
      project.tasks.forEach(task => {
        if (task.status === "Todo") {
          todoCount++;
        } else if (task.status === "In Progress") {
          inProgressCount++;
        } else if (task.status === "Done") {
          doneCount++;
        }
      });
    //   setTasksPerPro(len);
    //   setTodo(todoCount);
    //   setInProgress(inProgressCount);
    //   setDone(doneCount);

const BarData = {
    labels: [name],
    values: [len]
  };

  const DoughnutData = {
    labels: ["ToDo", "In Progress", "Done"],
    values: [todoCount, inProgressCount, doneCount]
  };
    return (
        <div  style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>

<div style={{ width: "95%", height: "50%", display:"flex", margin:"2%", justifyContent:"space-evenly"}}>
        {" "}
      <div style={{width:"25%" , margin:"2%"}}> <h1>Doughnut Chart </h1>  <DoughnutChart data={DoughnutData} /> </div>
      <div style={{width:"50%",margin:"2%"}}> <h1>Bar Chart </h1> <BarChart data={BarData} /> </div>
      </div>
            
        </div>
    );
}

export default ProjectDashboard;
