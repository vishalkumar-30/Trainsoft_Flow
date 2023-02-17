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

      rating: avgTrainerFeedbackCompleted.averageTrainerFeedback,
     
      fill:"#0088FE",
    },
    {
      name: "Ongoing",

      rating: avgTrainerFeedbackOnGoing.averageTrainerFeedback,
      fill:"#7DFCD8"
    }
  ];


  const getIntroOfPage = (label) => {
    if (label === "Completed") {
      let msg = `Total Completed Training: ${avgTrainerFeedbackCompleted.totalTrainingCount}`;
      return msg;
    }
    if (label === "Ongoing") {
      let msg = `Total Ongoing Training: ${avgTrainerFeedbackOnGoing.totalTrainingCount}`;
      return msg;
    }

    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{padding:"10px"}}>
          <p className="title-md" >{getIntroOfPage(label)}</p>
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
      width={550}
      height={400}
      data={data}
      margin={{
        top: 10,
        
        left: 20,
        bottom: 25
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name">
        <Label value="Training" offset={-20} position="insideBottom" />
      </XAxis>
      <YAxis label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
      {/* <Tooltip  cursor={false} wrapperStyle={{  backgroundColor: `{data.fill}` }}   /> */}
      <Tooltip content={<CustomTooltip />} wrapperStyle={{ width: 100, backgroundColor: `{data.fill}`  }} />
    {/* <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} /> */}
      <Bar dataKey="rating" fill='fill' />
      
    </BarChart>
  );
}

export default AverageTrainerFeedback

