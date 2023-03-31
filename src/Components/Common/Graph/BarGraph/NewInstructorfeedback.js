import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  
  const data = [
    {
      name: "Java",
      Content: 2,
      Instructor: 2,
      amt: 1
    },
    {
      name: "Bootstrap",
      Content: 2,
      Instructor: 4,
      amt: 2
    },
    {
      name: "React",
      Content: 4,
      Instructor: 4,
      amt: 3
    },
    {
      name: "Java Script",
      Content: 5,
      Instructor: 3,
      amt: 3
    },
    {
      name: "Python",
      Content: 4,
      Instructor: 4,
      amt: 4
    },
    {
      name: "HTML 5",
      Content: 5,
      Instructor: 4,
      amt: 2
    },
    {
      name: "Node js",
      Content: 2,
      Instructor: 2,
      amt: 4
    }
  ];
const NewInstructorfeedback = () => {
  return (
    <BarChart
    width={600}
    height={300}
    data={data}
    margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 5
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis  label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}/>
    <Tooltip />
    <Legend />
    <Bar dataKey="Content" stackId="a" fill="#BFCBF7" />
    <Bar dataKey="Instructor" stackId="a" fill="#D0EFFA" />
  </BarChart>
);
}

export default NewInstructorfeedback