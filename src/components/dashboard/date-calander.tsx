'use client';

import { useState } from 'react';
import { Calendar } from '../ui/calendar';

const DateCalander = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md w-full border shadow"
    />
  );
};

export default DateCalander;
