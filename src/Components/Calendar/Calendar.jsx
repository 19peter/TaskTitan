import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interationPlugin from "@fullcalendar/interaction";
import FormDialog from "./CalendarDialog";

const Calendar = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState(null);

  let selectHandler = function (info) {
    setIsDialogOpened(true);
    // alert('Selected range: ' + info.startStr + ' to ' + info.endStr)
    setInfo(info)
    console.log(event);
  };

  const AddProgectTitle = (title) => {
    setTitle(title);
    console.log(title);
    setEvent({ start: info.startStr, end: info.endStr, title: title });
    setAllEvents([...allEvents, event]);
  };

  const eventHandler = function () {};

  return (
    <div>
      {isDialogOpened === true && (
        <FormDialog
          setTitle={AddProgectTitle}
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
        // eventClick={eventHandler}
      />
    </div>
  );
};

export default Calendar;
