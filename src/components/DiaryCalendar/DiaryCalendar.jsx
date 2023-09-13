import React, { useState } from "react";
import css from './DiaryCalendar.module.css';
function DiaryCalendar() {
    const [date, setDate] = useState();

    console.log("Date", date);
    return (
          <div className={css.calendar}>
            <h3>{date}</h3>
            <input style={{marginLeft: "20px" }} type="date" onChange={e=>setDate(e.target.value)} />
        </div>
    );
}
export default DiaryCalendar;