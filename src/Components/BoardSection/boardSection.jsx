import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TaskSection from "../TaskSection/taskSection";
import { Droppable } from "react-beautiful-dnd";
import "./slider.css";
const BoardSection = ({ name, taskCollection, id }) => {
  return (
    <Stack
      borderRadius={"13px"}
      bgcolor={"#1F2833"}
      direction={"column"}
      sx={{ minWidth: "300px" }}
      alignItems={"center"}
    >
      <Typography
        borderRadius={"13px 13px 0 0"}
        width={"100%"}
        height={"10%"}
        position={"relative"}
        top={"0"}
        bgcolor={"#0b0c10"}
        color={"#45a29e"}
        paddingTop={"3%"}
        variant="h6"
        marginBottom={"7px"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        {name}
      </Typography>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Stack
            className="tasksState"
            direction="column"
            width="100%"
            bgcolor={"#1F2833"}
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
