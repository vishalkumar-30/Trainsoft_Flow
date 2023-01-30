import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';

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


const AverageTrainingFeedback = () => {

  const [avgTrainingFeedbackOnGoing, setAvgTrainingFeedbackOnGoing] = useState({});
  const [avgTrainingFeedbackCompleted, setAvgTrainingFeedbackCompleted] = useState({});
  const { spinner } = useContext(AppContext);

  // get average training feedback
  const getAverageTrainingFeedback = () => {
    try {

      spinner.show();
      RestService.getAverageTrainingFeedback().then(
        response => {
          if (response.status === 200) {
            setAvgTrainingFeedbackCompleted(response.data.COMPLETED);
            setAvgTrainingFeedbackOnGoing(response.data.ONGOING);
          }

        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getAverageTrainingFeedback()", err)
    }
  }

  const data = [
    {
      name: "Completed",

      rating: avgTrainingFeedbackCompleted.trainingFeedbackAverage
    },
    {
      name: "Ongoing",

      rating: avgTrainingFeedbackOnGoing.trainingFeedbackAverage
    }
  ];
  
  // let onGoingTrainingCount = avgTrainingFeedbackOnGoing.trainingCount;
  // let completedTrainingCount = avgTrainingFeedbackCompleted.trainingCount;

  const getIntroOfPage = (label) => {
    if (label === "Completed") {
      let msg = `Total Training: ${avgTrainingFeedbackCompleted.trainingCount}`;
      return msg;
    }
    if (label === "Ongoing") {
      let msg = `Total Training: ${avgTrainingFeedbackOnGoing.trainingCount}`;
      return msg;
    }

    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ padding: "10px" }}>
          <p className="intro">{getIntroOfPage(label)}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    getAverageTrainingFeedback();
  }, [])

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
        <Label value="Training" offset={-20} position="insideBottom" />
      </XAxis>
      <YAxis label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
      <Tooltip content={<CustomTooltip />} cursor={false} />

      <Bar dataKey="rating" fill="#0088FE" />
    </BarChart>
  );
}

export default AverageTrainingFeedback