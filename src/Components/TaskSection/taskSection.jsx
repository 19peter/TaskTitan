import {
  Box,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SpeedIcon from "@mui/icons-material/Speed";
import { orange } from "@mui/material/colors";

const TaskSection = ({ id, title, assignedTo, priority, level, status }) => {
  return (
    <Box
      width={"80%"}
      height={"10%"}
      p={"20px"}
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"#F2F4F4"}
      borderRadius={"13px"}
      margin={"10px 0"}
    >
      <Typography textAlign={"left"} variant={"body1"}>
        {title}
      </Typography>
      <Stack direction={"row"} justifyContent={"end"}>
        <Tooltip
          title={assignedTo.name}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={priority}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          {priority === "high" && (
            <IconButton>
              <ErrorIcon color="error" />
            </IconButton>
          )}
          {priority === "low" && (
            <IconButton>
              <ErrorIcon color="success" />
            </IconButton>
          )}
          {priority === "medium" && (
            <IconButton>
              <ErrorIcon sx={{ color: "#FF6600" }} />
            </IconButton>
          )}
        </Tooltip>
        <Tooltip
          title={level}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          {level === "difficult" && (
            <IconButton>
              <SpeedIcon color="error" />
            </IconButton>
          )}
          {level === "intermediate" && (
            <IconButton>
              <SpeedIcon sx={{ color: "#FF6600" }} />
            </IconButton>
          )}
          {level === "easy" && (
            <IconButton>
              <SpeedIcon color="success" />
            </IconButton>
          )}
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default TaskSection;
