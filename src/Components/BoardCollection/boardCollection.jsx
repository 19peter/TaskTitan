import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoardSection from "../BoardSection/boardSection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getBacklogAction,
  updateTaskStatusAction,
} from "../../redux/store/slices/backlogSlice";
import { DragDropContext } from "react-beautiful-dnd";

const BoardCollection = ({ id }) => {
  console.log(id);
  const Tasks = useSelector((state) => state.backlog.backlog);

  const backlogTasks = Tasks.filter(
    (t) => t.status.toLowerCase() === "backlog"
  );
  const toDoTasks = Tasks.filter((t) => t.status.toLowerCase() === "todo");

  const InProgressTasks = Tasks.filter(
    (t) => t.status.toLowerCase() === "in progress"
  );

  const DoneTasks = Tasks.filter((t) => t.status.toLowerCase() === "done");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBacklogAction(id)); //id of project
  }, []);

  const handleDragEnd = (result) => {
    if (result.destination) {
      const { destination, source, draggableId } = result;
      if (source.droppableId == destination.droppableId || !destination) return;

      let params = {};
      switch (destination.droppableId) {
        case "1":
          params = { projectId: 1, taskId: draggableId, newStatus: "Backlog" };
          break;
        case "2":
          params = { projectId: 1, taskId: draggableId, newStatus: "Todo" };
          break;
        case "3":
          params = {
            projectId: 1,
            taskId: draggableId,
            newStatus: "In Progress",
          };
          break;
        case "4":
          params = { projectId: 1, taskId: draggableId, newStatus: "Done" };
          break;
        default:
      }
      // if(destination.droppableId == 2)
      //   {
      //     let params ={projectId:1,taskId:draggableId,newStatus:"toDo"}
      //   }

      dispatch(updateTaskStatusAction(params));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
          id="1"
        ></BoardSection>
        <BoardSection
          name={"ToDo"}
          taskCollection={toDoTasks}
          id="2"
        ></BoardSection>
        <BoardSection
          name={"InProgress"}
          taskCollection={InProgressTasks}
          id="3"
        ></BoardSection>
        <BoardSection
          name={"Done"}
          taskCollection={DoneTasks}
          id="4"
        ></BoardSection>
      </Stack>
    </DragDropContext>
  );
};

export default BoardCollection;
