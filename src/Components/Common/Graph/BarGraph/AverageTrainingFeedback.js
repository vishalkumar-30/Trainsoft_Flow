import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend
} from "recharts";

import "../Graph.css"

const data1 = {
  COMPLETED: {
    trainingCount: 10,
    trainingFeedbackAverage: 3
  },
  ONGOING: {
    trainingCount: 8,
    trainingFeedbackAverage: 2.5
  }
};

const data = [
  {
    name: "Completed",

    rating: data1.COMPLETED.trainingFeedbackAverage
  },
  {
    name: "Ongoing",

    rating: data1.ONGOING.trainingFeedbackAverage
  }
];
// const data1 = {
//   "COMPLETED": {
//     "totalTrainingCount": 12,
//     "averageTrainerFeedback": 4,
//     "trainerTrainingDetails": null
//   },
//   "ONGOING": {
//     "totalTrainingCount": 10,
//     "averageTrainerFeedback": 3,
//     "trainerTrainingDetails": null
//   }
// }
// const data = [
//   {
//     name: "Completed",

//     rating: data1.COMPLETED.averageTrainerFeedback

//   },
//   {
//     name: "Ongoing",

//     rating: data1.ONGOING.averageTrainerFeedback

//   }
// ];
const onGoingTrainingCount = data1.ONGOING.trainingCount;
const completedTrainingCount = data1.COMPLETED.trainingCount;
const getIntroOfPage = (label) => {
  if (label === "Completed") {
    let msg = `Total Training: ${completedTrainingCount}`;
    return msg;
  }
  if (label === "Ongoing") {
    let msg = `Total Training: ${onGoingTrainingCount}`;
    return msg;
  }

  return "";
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{padding:"10px"}}>
        <p className="intro">{getIntroOfPage(label)}</p>
      </div>
    );
  }

  return null;
};

const AverageTrainingFeedback = () => {
    return (
        <BarChart
          width={600}
          height={500}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 25
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name">
            <Label value="Training" offset={-20} position="insideBottom"  />
          </XAxis>
          <YAxis  label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip />} cursor={false}/>
    
          <Bar dataKey="rating" fill="#0088FE" />
        </BarChart>
      );
}

export default AverageTrainingFeedback