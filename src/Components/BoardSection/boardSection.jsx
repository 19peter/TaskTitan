import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TaskSection from "../TaskSection/taskSection";

const BoardSection = ({backlog}) => {
  return (
    <Stack
      borderRadius={"13px"}
      bgcolor={"#707B7C"}
      direction={"column"}
      sx={{ minWidth: "300px", maxHeight: "75vh" ,overflowY:"scroll"}}
      alignItems={"center"}
    >
      <Typography
        borderRadius={"13px 13px 0 0"}
        width={"100%"}
        height={"10%"}
        position={"relative"}
        top={"0"}
        bgcolor={"black"}
        color={"white"}
        paddingTop={"3%"}
        variant="h6"
        marginBottom={"7px"}
       
      >
        Backlog
      </Typography>
        {backlog.map((task)=><TaskSection key={task.id} {...task}></TaskSection>)}

    </Stack>
  );
};

export default BoardSection;
