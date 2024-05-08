import React from "react";
import Backlog from "../Components/Backlog/Backlog";
import CalendarComp from "../Components/Calendar/CalendarComp";
import { Grid } from "@mui/material";

const BacklogCalender = () => {
  return (
    <div>
      {/* <Backlog></Backlog> */}
      <Grid container spacing={2}>
        <Grid item xs={7}>
            <Backlog></Backlog>
        </Grid>
        <Grid item xs={5}>
          <CalendarComp></CalendarComp>
        </Grid>
      </Grid>
    </div>
  );
};

export default BacklogCalender;
