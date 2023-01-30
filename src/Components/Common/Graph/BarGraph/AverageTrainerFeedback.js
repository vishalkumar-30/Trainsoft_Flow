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

const AverageTrainerFeedback = () => {

  const [avgTrainerFeedbackOnGoing, setAvgTrainerFeedbackOnGoing] = useState({});
  const [avgTrainerFeedbackCompleted, setAvgTrainerFeedbackCompleted] = useState({});
  const { spinner } = useContext(AppContext);

  // get average trainer feedback
  const getAverageTrainerFeedback = () => {
    try {

      spinner.show();
      RestService.getAverageTrainerFeedback().then(
        response => {
          if(response.status === 200){
            setAvgTrainerFeedbackCompleted(response.data.COMPLETED);
            setAvgTrainerFeedbackOnGoing(response.data.ONGOING);
          }
          
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getAverageTrainerFeedback()", err)
    }
  }
  

  const data = [
    {
      name: "Completed",

      rating: avgTrainerFeedbackCompleted.averageTrainerFeedback
    },
    {
      name: "Ongoing",

      rating: avgTrainerFeedbackOnGoing.averageTrainerFeedback
    }
  ];


  const getIntroOfPage = (label) => {
    if (label === "Completed") {
      let msg = `Total Training: ${avgTrainerFeedbackCompleted.totalTrainingCount}`;
      return msg;
    }
    if (label === "Ongoing") {
      let msg = `Total Training: ${avgTrainerFeedbackOnGoing.totalTrainingCount}`;
      return msg;
    }

    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="intro">{getIntroOfPage(label)}</p>
        </div>
      );
    }

    return null;
  };

  
  useEffect(() => {
    getAverageTrainerFeedback();
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

export default AverageTrainerFeedback

