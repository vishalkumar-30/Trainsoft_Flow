import React, {useState} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip'

import 'react-calendar-heatmap/dist/styles.css';


const ReportHeatmapChart = ({ data }) => {
  // const data = [
  //   { date: '2023-01-17', count: 1 },
  //   { date: '2023-01-18', count: 1 },
  //   { date: '2023-01-20', count: 1 },
  //   { date: '2023-01-23', count: 1 },
  //   { date: '2023-01-25', count: 1 },
  //   { date: '2023-01-30', count: 2 },
  //   { date: '2023-01-31', count: 2 },
  //   { date: '2023-02-01', count: 1 },
  //   { date: '2023-02-02', count: 3 },
  //   { date: '2023-02-03', count: 3 },
  //   { date: '2023-02-07', count: 5 },
  //   { date: '2023-02-08', count: 4 },
  //   { date: '2023-02-09', count: 4 },
  //   { date: '2023-02-10', count: 3 },
  //   { date: '2023-02-13', count: 2 },
  //   { date: '2023-02-14', count: 4 },
  //   { date: '2023-02-15', count: 7 },
  //   { date: '2023-02-16', count: 7 },
  //   { date: '2023-02-17', count: 3 },
  //   { date: '2023-02-18', count: 2 },
  //   { date: '2023-02-20', count: 9 },
  //   { date: '2023-02-24', count: 3 },
  //   { date: '2023-02-25', count: 1 },
  //   { date: '2023-02-26', count: 2 },
  //   { date: '2023-02-27', count: 1 },
  //   { date: '2023-02-28', count: 6 },
  //   { date: '2023-03-01', count: 1 },
  //   { date: '2023-03-02', count: 4 },
  //   { date: '2023-03-03', count: 4 },
  //   { date: '2023-03-04', count: 5 },
  //   { date: '2023-03-05', count: 4 },
  //   { date: '2023-03-06', count: 9 },
  //   { date: '2023-03-07', count: 9 },
  //   { date: '2023-03-08', count: 2 },
  //   { date: '2023-03-09', count: 7 },
  //   { date: '2023-03-10', count: 6 },
  //   { date: '2023-03-11', count: 1 },
  //   { date: '2023-03-12', count: 1 },
  //   { date: '2023-03-13', count: 7 },
  //   { date: '2023-03-14', count: 5 },
  //   { date: '2023-03-15', count: 5 },
  //   { date: '2023-03-16', count: 9 },
  //   { date: '2023-03-17', count: 1 },
  //   { date: '2023-03-18', count: 4 },
  //   { date: '2023-03-20', count: 4 },
  //   { date: '2023-03-21', count: 1 },
  //   { date: '2023-03-22', count: 4 },
  //   { date: '2023-03-23', count: 4 },
  //   { date: '2023-03-24', count: 4 },
  //   { date: '2023-04-17', count: 3 },
  //   { date: '2023-04-18', count: 4 },
  //   { date: '2023-04-19', count: 5 },
  //   { date: '2023-04-20', count: 3 },
  //   { date: '2023-04-21', count: 4 },
  //   { date: '2023-04-23', count: 1 },
  //   { date: '2023-04-24', count: 5 },
  //   { date: '2023-04-25', count: 5 },
  //   { date: '2023-04-26', count: 4 },
  //   { date: '2023-04-27', count: 5 },
  //   { date: '2023-04-28', count: 4 },
  //   { date: '2023-04-29', count: 4 },
  //   { date: '2023-05-01', count: 5 },
  //   { date: '2023-05-02', count: 5 },
  //   { date: '2023-05-03', count: 7 },
  //   { date: '2023-05-04', count: 10 },
  //   { date: '2023-05-05', count: 7 },
  //   { date: '2023-05-06', count: 3 },
  //   { date: '2023-05-07', count: 6 },
  //   { date: '2023-05-08', count: 5 },
  //   { date: '2023-05-09', count: 4 },
  //   { date: '2023-05-10', count: 2 }
  // ]
  
  // let data = [];
  // // const dataLength = (data["monthlyLoginDetails"]);
  // for (let i = 0; i < loginDetails[0].monthlyLoginDetails.length; i++) {
  //   let value = Object.values(loginDetails[0].monthlyLoginDetails[i].dayWiseLoginCount);
  //   let key = Object.keys(loginDetails[0].monthlyLoginDetails[i].dayWiseLoginCount)
  //   for (let j = 0; j < value.length; j++) {
  //     data.push({
  //       "date": key[j].substring(0, 10),
  //       "count": value[j]
  //     })
  //   }

  // }
  const [tooltipContent, setTooltipContent] = useState('');

  const values =
    data.map((month) => {
      return (
        {
          date: new Date(month.date),
          value: month.count
        }
      )

    }, []);

  // Define the color scale based on the contribution value
  const colorScale = ["#49167E", "#49167E", "#49167E", "#49167E"];

  // Define the tooltip content
  const tooltipDataAttrs = (value) => {
    if (!value) {
      return null;
    }
    return {
      'data-tip': `${value.date} has count: ${
        value.count
      }`,
    };
  };

  return (
    <div>
      <CalendarHeatmap
        startDate={new Date("2023-01-01")}
        endDate={new Date("2023-12-31")}
        values={values}
        showWeekdayLabels={true}
        tooltipDataAttrs={tooltipDataAttrs}
        // onClick={(value) =>
        //   console.log(
        //     `${value.date}: ${value.count} logins`
        //   )
        // }
        onMouseLeave={() => {
          setTooltipContent('');
        }}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${Math.max(0, Math.min(4, value.value))}`;
        }}
        gutterSize={3}
      />
      {/* <ReactTooltip /> */}
      <ReactTooltip />
      {/* <style>
        {colorScale.map(
          (color, index) =>
            `.color-github-${index} {
              background-color: ${color};
            }`
        )}
      </style> */}
    </div>
  );
};






export default ReportHeatmapChart;
