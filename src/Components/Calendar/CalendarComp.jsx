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

const CalendarComp = () => {

  const [allEvents, setAllEvents] = useState([]);

  const [info, setInfo] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();

  const tsks = useSelector((state) => state.eventsWithDates.eventsWithDates);

  const Events = tsks.map((m) => {
    return {
      start: m.startDate,
      end: m.endDate,
      title: m.title,
    };
  });

  useEffect(() => {
    setAllEvents((oldEvents) => [...oldEvents, event]);
    dispatch(getEventsWithDates("1"));
  }, [dispatch,event ]);

  let selectHandler = function (info) {
    setIsDialogOpened(true);
    setInfo(info);
  };

  let eventHandler = (info) => {
    console.log(info);
  };

  const UpdateTaskDate = (task) => {
    console.log(task.id);
    console.log(info.startStr);
    console.log(info.endStr);
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
          setEvent={setEvent}
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
    </div>
  );
};

export default CalendarComp;
