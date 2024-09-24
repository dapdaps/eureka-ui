// @ts-nocheck
import { useEffect, useState } from 'react';

export default function useCountDown(props) {
  const { time } = props;
  const [state, setState] = useState({
    time
  });
  // time: data?.fundingLockTimestamp - Date.now() / 1000

  function secondToDate(msd) {
    let time = msd;
    if (time != null && time != '') {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + 'm ' + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + 's';
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time =
          parseInt(time / 3600.0) +
          'h ' +
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
          'm ' +
          parseInt(
            (parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
              60
          ) +
          's';
      } else if (time >= 60 * 60 * 24) {
        time =
          parseInt(time / 3600.0 / 24) +
          'd ' +
          parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24) +
          'h ' +
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
          'm ' +
          parseInt(
            (parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
              60
          ) +
          's';
      } else {
        time = parseInt(time) + 's';
      }
    }
    return time;
  }
  useEffect(() => {
    const tick = setInterval(() => {
      setState((prevState) => ({
        time: prevState.time - 1
      }));
      updateState();
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  return secondToDate(state.time || 0);
}
