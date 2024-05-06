import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interationPlugin from "@fullcalendar/interaction";
import FormDialog from "./CalendarDialog";
import { useDispatch } from "react-redux";
import {
  UpdateTaskDateAction,
  getTasksWithDates,
  updateTaskAction,
} from "../../redux/store/slices/backlogSlice";
import { useSelector } from "react-redux";
import { getEventsWithDates } from "../../redux/store/slices/eventsWithDates";
import FullScreenDialog from "./DetailsDialog";

const CalendarComp = () => {

  const [allEvents, setAllEvents] = useState([]);
  const [info, setInfo] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [fullScreenDialogFlag, setFullScreenDialogFlag] = useState(false);
  const [taskDetails, setTaskDetails] = useState('');

  // const [event, setEvent] = useState({});
  const dispatch = useDispatch();

  const tsks = useSelector((state) => state.eventsWithDates.eventsWithDates)

  // const Events = tsks?.map((t => {
  //   return {
  //     start: t.startDate,
  //     end : t.endDate,
  //     title: t.title
  //   }
  // }))

  // console.log(tsks);
  // console.log(allEvents);

  useEffect(() => {
    dispatch(getEventsWithDates("1"));
  }, [dispatch]);


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
    setIsDialogOpened(true);
    setInfo(info);
  };

  let eventHandler = (info) => {
    setTaskDetails(info.event.title);
    setFullScreenDialogFlag(true);
  };

  const UpdateTaskDate = (task) => {
    dispatch(
      UpdateTaskDateAction({
        projectId: "1",
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
        events={Events}
        // height={"50vh"}
        selectable="true"
        selectMirror="true"
        expandRows="false"
        // dateClick={func}
        select={selectHandler}
        eventClick={eventHandler}
      />

      {fullScreenDialogFlag &&
        <FullScreenDialog allTasks = {allEvents} task = {taskDetails} setFullScreenDialogFlag = {setFullScreenDialogFlag}></FullScreenDialog>
      }
    </div>
  );
};

export default CalendarComp;
