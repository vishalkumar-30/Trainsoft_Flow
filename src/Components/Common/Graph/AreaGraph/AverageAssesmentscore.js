
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Label, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const data1 = [
  {
    trainingName: "Sample Training",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Sample Java Training",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Python Introduction",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "sample",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Sample",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Python Advanced",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "NodeJs Introduction",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Testing Advanced",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Ruby Rails",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Bootstrap",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Java Introduction",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Spring Introduction",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Labs Testing",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Node Js 2022 Batch 1",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Node.js",
    studentCount: 2,
    assessmentCount: 2,
    trainingAverageScore: 0
  },
  {
    trainingName: "Shell Scripting Jan_2023",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "dummy training",
    studentCount: 0,
    assessmentCount: 0,
    trainingAverageScore: 0
  },
  {
    trainingName: "Assessment Training",
    studentCount: 34,
    assessmentCount: 3,
    trainingAverageScore: 83.34
  }
];

export default function AverageAssesmentscore() {
  return (
   <ResponsiveContainer  width="100%"
   height={500}>
     <AreaChart
     
      data={data1}
      margin={{
        top: 20,
        right: 10,
        left: 10,
        bottom: 20
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="trainingName">
        <Label value="Training Name" offset={-20} position="insideBottom" />
      </XAxis>
      <YAxis
        label={{
          value: "Avg Training Assessmt Score",
          angle: -90,
          position: "insideLeft"
        }}
      />

      <Area
        type="monotone"
        dataKey="trainingAverageScore"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
   </ResponsiveContainer>
  );
}


