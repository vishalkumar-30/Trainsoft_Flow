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
    <Chart
      options={chartData.options}
      series={labUsage}
      type="donut"
      width="50%"
      height="50%"
    />
  );
}

export default ReportDonutChar