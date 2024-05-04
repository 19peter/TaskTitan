import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";

//#region Styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
//#endregion

//#region data
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
//#endregion

const Backlog = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/projects")
      .then((res) => res.json())
      .then((res) => {
        setTasks(res[0].tasks);
      });
  }, []);

  const handlePriorityChange = (taskId, value) => {
    setTasks(tasks.map(task => task.id === taskId ? {...task, priority: value} : task));
  };

  const handleStatusChange = (taskId, value) => {
    setTasks(tasks.map(task => task.id === taskId ? {...task, status: value} : task));
  };

  const handleLevelChange = (taskId, value) => {
    setTasks(tasks.map(task => task.id === taskId ? {...task, level: value} : task));
  };

  if (tasks.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Task Title</StyledTableCell>
              <StyledTableCell align="right">assignedTo</StyledTableCell>
              <StyledTableCell align="right">status</StyledTableCell>
              <StyledTableCell align="right">Level</StyledTableCell>
              <StyledTableCell align="right">priority</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <IconButton>
                    <EditOutlinedIcon></EditOutlinedIcon>
                  </IconButton>
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.assignedTo.email}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={{ minWidth: 60 }}>
                    <FormControl fullWidth>
                      <InputLabel id={`status-label-${row.id}`}>
                        Status
                      </InputLabel>
                      <Select
                        labelId={`status-label-${row.id}`}
                        id={`status-select-${row.id}`}
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      >
                        <MenuItem value="toDo">To Do</MenuItem>
                        <MenuItem value="inProgress">In Progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={{ minWidth: 60 }}>
                    <FormControl fullWidth>
                      <InputLabel id={`level-label-${row.id}`}>
                        Level
                      </InputLabel>
                      <Select
                        labelId={`level-label-${row.id}`}
                        id={`level-select-${row.id}`}
                        value={row.level}
                        onChange={(e) => handleLevelChange(row.id, e.target.value)}
                      >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="difficult">Difficult</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={{ minWidth: 60 }}>
                    <FormControl fullWidth>
                      <InputLabel id={`priority-label-${row.id}`}>
                        Priority
                      </InputLabel>
                      <Select
                        labelId={`priority-label-${row.id}`}
                        id={`priority-select-${row.id}`}
                        value={row.priority}
                        onChange={(e) => handlePriorityChange(row.id, e.target.value)}
                      >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Backlog;
