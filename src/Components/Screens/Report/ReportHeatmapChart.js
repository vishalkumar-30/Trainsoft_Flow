import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';


const generateData = (count, yrange) => {
  const res = [];
  for (let i = 0; i < count; i++) {
    const x = `day${i + 1}`;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    res.push({ x, y });
  }
  return res;
};

const ReportHeatmapChart = () => {
  const [options, setOptions] = React.useState({
    chart: {
      height: 400,
      type: 'heatmap',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
       
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: -30,
              to: 5,
              name: 'low',
              color: '#ccbddb',
            },
            {
              from: 6,
              to: 20,
              name: 'medium',
              color: '#a06cd4',
            },
            {
              from: 21,
              to: 45,
              name: 'high',
              color: '#7f13eb',
            },
            {
              from: 46,
              to: 55,
              name: 'extreme',
              color: '#49167E',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    title: {
      text: 'Login History',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Series 1',
      data: generateData(12, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Series 2',
      data: generateData(12, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Series 3',
      data: generateData(12, {
        min: -30,
        max: 55,
       
      }),
    },
    {
      name: 'Series 4',
      data: generateData(12, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Series 5',
      data: generateData(12, {
        min: -30,
        max: 55,
      }),
    },
  ]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="heatmap"
      height={400}
    />
  );
};




export default ReportHeatmapChart;
