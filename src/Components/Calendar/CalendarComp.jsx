import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interationPlugin from "@fullcalendar/interaction";
import FormDialog from "./CalendarDialog";
import { useDispatch } from "react-redux";
import {
  UpdateTaskDateAction,
  getBacklogAction,
  getTasksWithDates,
  updateTaskAction,
} from "../../redux/store/slices/backlogSlice";
import { getAllUsersAction } from "../../redux/store/slices/usersSlice";
import { useSelector } from "react-redux";
import { getEventsWithDates } from "../../redux/store/slices/eventsWithDates";
import FullScreenDialog from "./DetailsDialog";

const CalendarComp = ({id}) => {

  const [allEvents, setAllEvents] = useState([]);
  const [info, setInfo] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [fullScreenDialogFlag, setFullScreenDialogFlag] = useState(false);
  const [taskDetails, setTaskDetails] = useState('');
  const dispatch = useDispatch();

  const tsks = useSelector((state) => state.eventsWithDates.eventsWithDates)
  const AllTasks = useSelector((state) => state.backlog.backlog)

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const allUsers = useSelector((state) => state.users.users);
  const userObj = allUsers?.find((u) => u.id === currentUser.id);
  const [isAuthourized, setIsAuthourized ] = useState(true);

  useEffect(() => {
    userObj?.userProjects?.forEach((m) => {
      if (m.projectId === id) {
        if (m.role === "member") {
          setIsAuthourized(false);
        }
      }
    });
  }, [userObj, id])


  useEffect(() => {
    dispatch(getEventsWithDates(id));
    dispatch(getBacklogAction(id));
    dispatch(getAllUsersAction());
  }, [dispatch, id]);


  useEffect(() => {
    setAllEvents(tsks?.map((t => {
      return {
        start: t.startDate,
        end: t.endDate,
        title: t.title
      }
    })))
  }, [tsks])

  // useEffect(() => {
  //   setAllEvents((old) => {
  //     console.log(old);
  //     // return {...old, event}
  //   })
  // }, [event])

  let selectHandler = function (info) {
    if (isAuthourized) {
      setIsDialogOpened(true);
      setInfo(info);
    }

  };

  let eventHandler = (info) => {
    setTaskDetails(info.event.title);
    setFullScreenDialogFlag(true);
  };

  const UpdateTaskDate = (task) => {
    dispatch(
      UpdateTaskDateAction({
        projectId: id,
        taskId: task.id,
        startDate: info.startStr,
        endDate: info.endStr,
      })
    );
  };

  return (
    <div>
      {isDialogOpened === true && (
        <FormDialog 
          id={id}
          info={info}
          setAllEvents={setAllEvents}
          setIsDialogOpened={setIsDialogOpened}
          UpdateTaskDate={UpdateTaskDate}
        ></FormDialog>
      )}
      <FullCalendar
        className="Calendar"
        plugins={[dayGridPlugin, timeGridPlugin, interationPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={allEvents}
        // height={"50vh"}
        selectable="true"
        selectMirror="true"
        expandRows="false"
        // dateClick={func}
        select={selectHandler}
        eventClick={eventHandler}
      />

      {fullScreenDialogFlag &&
        <FullScreenDialog allTasks={AllTasks} task = {taskDetails} setFullScreenDialogFlag = {setFullScreenDialogFlag}></FullScreenDialog>
      }
    </div>
  );
};

export default CalendarComp;