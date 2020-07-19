import React, { useState, useEffect } from 'react';
import moment from 'moment';

const fromNow = (time: number) => moment(time).fromNow();

const TimeFromNow = ({ time }: { time: number }) => {


  const [timeView, setTimeView] = useState(
    () => fromNow(time)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeView = fromNow(time);
      setTimeView(timeView);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <>
      {timeView}
    </>
  )
};

export default TimeFromNow;