import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interationPlugin from "@fullcalendar/interaction";
import FormDialog from "./CalendarDialog";

const Calendar = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [info, setInfo] = useState(null);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [event, setEvent] = useState({});
 
  useEffect(() => {
    setAllEvents(oldEvents => [...oldEvents, event])
  } ,[event])
 

  let selectHandler = function (info) {
    setIsDialogOpened(true);
    setInfo(info);
    console.log(info);
 
  };


  let eventHandler = (info) => {
    console.log(info);
  }



  return (
    <div>
      {isDialogOpened === true && (
        <FormDialog
          info= {info}
          setEvent={setEvent}
          setIsDialogOpened={setIsDialogOpened}
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
    </div>
  );
};

export default Calendar;
