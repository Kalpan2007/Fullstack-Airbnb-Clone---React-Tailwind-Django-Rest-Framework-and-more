"use client";

import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
    value: RangeKeyDict;
    bookedDates: Date[];
    onChange: (value: RangeKeyDict) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    value,
    bookedDates,
    onChange,
}) => {
    const disabledDates = bookedDates.map((date) => date);

    return (
        <DateRangePicker
            onChange={onChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[value.selection]}
            direction="horizontal"
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    );
};

export default DatePicker;
