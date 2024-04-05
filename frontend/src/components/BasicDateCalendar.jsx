import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function BasicDateCalendar({ value, onChange }) {
  const handleDateChange = (newValue) => {
    // Check if the selected date is not in the past
    const currentDate = new Date();
    if (newValue > currentDate) {
      onChange(newValue);
    } else {
      // Alert or handle the case where the selected date is in the past
      console.error("Selected date cannot be in the past.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={handleDateChange} />
    </LocalizationProvider>
  );
}
