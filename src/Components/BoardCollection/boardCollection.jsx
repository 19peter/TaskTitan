import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoardSection from "../BoardSection/boardSection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBacklogAction } from "../../redux/store/slices/backlogSlice";

const BoardCollection = () => {
  const Tasks = useSelector((state) => state.backlog.backlog);
  const backlogTasks = Tasks.filter(
    (t) => t.status.toLowerCase() === "backlog"
  );
  const toDoTasks = Tasks.filter((t) => t.status.toLowerCase() === "todo");
  const InProgressTasks = Tasks.filter(
    (t) => t.status.toLowerCase() === "inprogress"
  );
  const DoneTasks = Tasks.filter((t) => t.status.toLowerCase() === "done");

  console.log("here", toDoTasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBacklogAction(1)); //id of project
  }, []);
  return (
    <Stack
      height={"90vh"}
      direction={"row"}
      spacing={5}
      padding={"2vw"}
      sx={{ overflowX: "scroll" }}
    >
      {/* backlog section static */}
      {/* <BoardSection backlog={backlog}></BoardSection> */}

      <BoardSection
        name={"Backlog"}
        taskCollection={backlogTasks}
      ></BoardSection>
      <BoardSection name={"ToDo"} taskCollection={toDoTasks}></BoardSection>
      <BoardSection
        name={"InProgress"}
        taskCollection={InProgressTasks}
      ></BoardSection>
      <BoardSection name={"Done"} taskCollection={DoneTasks}></BoardSection>
    </Stack>
  );
};

export default BoardCollection;
