import React from 'react';
//import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

function HeatmapChart({givenDate, slots}) {
  const today = new Date(givenDate);
  console.log(givenDate)
  console.log(slots.length === 0 ? 0 : slots)

  /*
  const getSlots = getRange(24).map(index => {
    console.log({
      date: shiftDate(today, -index),
      count: slots.length === 0 ? 0 : slots,
    })
    return {
      date: shiftDate(today, -index),
      count: slots.length === 0 ? 0 : slots,
    };
  });
  */

  return (
    <div>
      
      <ReactTooltip />
    </div>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

export default HeatmapChart;

/*
<CalendarHeatmap
        startDate={today}
        endDate={shiftDate(today, 3)}
        values={getSlots}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        
        tooltipDataAttrs={value => {
          //console.log(value.date.toISOString().slice(0, 10))
          console.log(value.date)
          return {
            'data-tip': `${value.date} has count: ${
              value.count
            }`,
          };
        }}
        
        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />
      <ReactTooltip />
*/