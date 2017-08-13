import React from "react";
import DateInput from "../common/DateInput";

const DateRangeFilter = ({onChange, filterFrom, filterTo}) => {
  return (
    <div>
      <DateInput
        name="from"
        label="From (mm/dd/yyyy)"
        value={filterFrom}
        onChange={onChange}/>

      <DateInput
        name="to"
        label="To (mm/dd/yyyy)"
        value={filterTo}
        onChange={onChange}/>
      <br/>
      <br/>
    </div>
  );
};

DateRangeFilter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  filterFrom: React.PropTypes.string.isRequired,
  filterTo: React.PropTypes.string.isRequired
};

export default DateRangeFilter;
