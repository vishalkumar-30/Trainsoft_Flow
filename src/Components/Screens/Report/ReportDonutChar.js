import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ReportDonutChar = ({labUsage}) => {

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "donut",
      },
      //   fill: { colors: ['red', 'green', 'yellow'] },
      //   colors: ['red', 'green', 'yellow'],
      labels: ["Started", "Paused", "Completed"],
    },
    // series: [44, 55, 13],
    // series: labUsage
  });

  return (
  < div >
         <div class="card " >
  <div class="card-header title-sm" style={{background: "#F7F7F7", marginBottom:"0px"}}>
  The donut chart provides a comprehensive overview of lab resource usage, displaying data for three parameters: Started, Paused, and Completed. The chart effectively represents the utilization of lab resources.
  </div>
 

  <div style={{marginLeft:"20%"
  }}>
  <Chart
      options={chartData.options}
      series={labUsage}
      type="donut"
      width="45%"

    />
  </div>
   </div>
  </div>
  );
}

export default ReportDonutChar