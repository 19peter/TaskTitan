import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import PopupForm from "./PopUpForm";
import { useDispatch, useSelector } from "react-redux";
import { getBacklogAction } from "../../redux/store/slices/backlogSlice";
import AddIcon from "@mui/icons-material/Add";
import PopAddTaskForm from "./PopAddTaskForm";

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

const Backlog = () => {
  const tasks = useSelector((state) => state.backlog.backlog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBacklogAction(1)); //id of project
  }, []);

  const [isAddFormOpened, setIsAddFormOpened] = useState(false);
  const handleAddButton = () => {
    setIsAddFormOpened(true);
  };

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState(null);

  const handleEditButton = (taskId) => {
    setIsFormOpened(true);
    setTaskToBeUpdated(tasks.find((task) => task.id === taskId));
    // console.log(taskToBeUpdated);
  };

  if (tasks.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Task Title
                <IconButton onClick={handleAddButton} style={{ color: "white", marginX: "1rem" }}>
                  <AddIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">assignedTo</StyledTableCell>
              <StyledTableCell align="right">status</StyledTableCell>
              <StyledTableCell align="right">Level</StyledTableCell>
              <StyledTableCell align="right">priority</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task.id}>
                <StyledTableCell component="th" scope="row">
                  <IconButton
                    onClick={() => {
                      handleEditButton(task.id);
                    }}
                  >
                    <EditOutlinedIcon></EditOutlinedIcon>
                  </IconButton>
                  {task.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {task.assignedTo.email}
                </StyledTableCell>
                <StyledTableCell align="right">{task.status}</StyledTableCell>
                <StyledTableCell align="right">{task.level}</StyledTableCell>
                <StyledTableCell align="right">{task.priority}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isFormOpened && (
        <PopupForm
          setIsFormOpened={setIsFormOpened}
          taskToBeUpdated={taskToBeUpdated}
        ></PopupForm>
      )}
      {isAddFormOpened && (
        <PopAddTaskForm setIsAddFormOpened={setIsAddFormOpened}></PopAddTaskForm>
      )}
    </div>
  );
};

export default Backlog;
