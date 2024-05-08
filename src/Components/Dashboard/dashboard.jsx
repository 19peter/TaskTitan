import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import RadarChart from "./RadarChart";
import PolarAreaChart from "./PolarAreaChart ";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // const [projects, setProjects] = useState(null);
  const projects = useSelector(state=>state.projects.projects);
  const cur_user = useSelector(state=>state.currentUser.currentUser);
  const [proName, setProName] = useState([]);
  const [tasksPerPro, setTasksPerPro] = useState([]);
  const [numOfMem, setNumOfMem] = useState([]);
  const [todo, setTodo] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [done, setDone] = useState(0);

  
  useEffect(() => {
    const userProjects = filterProjects(projects,cur_user);
    console.log(projects)
    console.log(projects)
    if (userProjects) {
      const names = userProjects.map(project => project.title);
      const len = userProjects.map(project => project.tasks.length);
      const members = userProjects.map(project => project.members.length);

      let todoCount = 0;
      let inProgressCount = 0;
      let doneCount = 0;

      userProjects.forEach(project => {
        project.tasks.forEach(task => {
          if (task.status === "Todo") {
            todoCount++;
          } else if (task.status === "In Progress") {
            inProgressCount++;
          } else if (task.status === "Done") {
            doneCount++;
          }
        });
      }
    
    );

      setProName(names);
      setTasksPerPro(len);
      setNumOfMem(members);
      setTodo(todoCount);
      setInProgress(inProgressCount);
      setDone(doneCount);
    }
  }, [projects]);

  const filterProjects = (projects, user) => {
    if (!user) return [];
    console.log(projects)
    return projects.filter((project) => 
        project.manager.email === user.email ||
        project.members.some(member => member.email === user.email)
    );
};



  const BarData = {
    labels: proName,
    values: tasksPerPro
  };

  const DoughnutData = {
    labels: ["ToDo", "In Progress", "Done"],
    values: [todo, inProgress, done]
  };
  const LineData = {
    labels: proName,
    values: numOfMem
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "95%", height: "50%", display:"flex", margin:"1%", justifyContent:"space-evenly"}}>
        {" "}
        
      <div style={{width:"15%" , margin:"2%", marginTop:"0px"}}> <DoughnutChart data={DoughnutData} /> </div>
      <div style={{width:"30%",margin:"2%",marginTop:"0px"}}>  <BarChart data={BarData} /> </div>
      </div>
      {/* <div style={{ width: "50%",margin:"2%"}}>
        {" "}
        <h1>Line Chart </h1> 
        <LineChart data={LineData} />
      </div>
     */}
      {/* <div style={{ width: "50%", height: "50%" }}>
        {" "}
        <DoughnutChart data={DoughnutData} />
      </div> */}
      {/* <h1>Radar Chart </h1>
      <div style={{ width: "50%", height: "50%" }}>
        {" "}
        <RadarChart data={chartData} />
      </div>
      <h1>PolarArea Chart </h1>
      <div style={{ width: "50%", height: "50%" }}>
        {" "}
        <PolarAreaChart data={chartData} />
      </div> */}
    </div>
  );
};

export default Dashboard;
