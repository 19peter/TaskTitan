import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TaskSection from "../TaskSection/taskSection";
import { Droppable } from "react-beautiful-dnd";
import "./slider.css";
const BoardSection = ({ name, taskCollection, id }) => {
  return (
    <Stack
      borderRadius={"13px"}
      border={"solid #66fcf1 1px"}
      bgcolor={"#0b0c10"}
      direction={"column"}
      sx={{ minWidth: "350px" }}
      alignItems={"center"}
      height={"80%"}
    >
      <Typography
        borderRadius={"13px 13px 0 0"}
        width={"100%"}
        height={"8%"}
        position={"relative"}
        top={"0"}
        borderBottom={"solid #66fcf1 1px"}
        color={"#c5c6c7"}
        variant="h6"
        marginBottom={"7px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        fontFamily={"cursive"}
      >
        {name}
      </Typography>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Stack
            className="tasksState"
            direction="column"
            width="100%"
            bgcolor={"#0b0c10"}
            alignItems={"center"}
            borderRadius={"13px"}
            height={"87%"}
            sx={{ overflowY: "scroll" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {taskCollection.map((task, index) => (
              <TaskSection key={task.id} {...task} index={index}></TaskSection>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Stack>
  );
};

export default BoardSection;
