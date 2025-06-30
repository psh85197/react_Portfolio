import { FC, useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

import "@/assets/scss/style.scss";

const Calendarwrap: FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="component-wrap">
      <div className="hgroup-wrap">
        <h2 className="f40-700-130">Calendar</h2>
      </div>
      <div className="component-group">
        <div className="from-group">
          <div className="input-group">
          <label htmlFor="test1" className="input-label">
            <span className="label-txt">Date Picker</span>
          </label>
            <DatePicker
              date={date}
              setDate={setDate}
              placeholder="Select date"
              clearable
            />
          </div>
          <br />
          <br />
          <br />
          <div className="input-group">
          <label htmlFor="test1" className="input-label">
            <span className="label-txt">Disabled Date Picker</span>
          </label>
            <DatePicker
                date={date}
                setDate={setDate}
                placeholder="Disabled date picker"
                disabled
              />
          </div>
          <br />
          <br />
          <br />
          <div className="input-group">
          <label htmlFor="test1" className="input-label">
            <span className="label-txt">Readonly Date Picker</span>
          </label>
              <DatePicker
                date={date}
                setDate={setDate}
                placeholder="Readonly date picker"
                clearable
                readonly
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendarwrap;
