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

const InstructorFeedback = () => {

  const [instructorFeedback, setInstructorFeedback] = useState([]);
  
  const { spinner } = useContext(AppContext);

  // get instructor feedback details
  const getInstructorFeedbackDetails = () => {
    try {

      spinner.show();
      RestService.getInstructorFeedbackDetails().then(
        response => {
          if(response.status === 200){
            setInstructorFeedback(response.data);
          }
          
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getInstructorFeedbackDetails()", err)
    }
  }
  

//   const data = [
//     {
//       name: "Completed",

//       rating: avgTrainerFeedbackCompleted.averageTrainerFeedback,
     
//       fill:"#0088FE",
//     },
//     {
//       name: "Ongoing",

//       rating: avgTrainerFeedbackOnGoing.averageTrainerFeedback,
//       fill:"#7DFCD8"
//     }
//   ];


//   const getIntroOfPage = (label) => {
//     if (label === "Completed") {
//       let msg = `Total Training: ${avgTrainerFeedbackCompleted.totalTrainingCount}`;
//       return msg;
//     }
//     if (label === "Ongoing") {
//       let msg = `Total Training: ${avgTrainerFeedbackOnGoing.totalTrainingCount}`;
//       return msg;
//     }

//     return "";
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom-tooltip" style={{padding:"10px"}}>
//           <p className="title-md" >{getIntroOfPage(label)}</p>
//         </div>
//       );
//     }

//     return null;
//   };

  
  useEffect(() => {
    getInstructorFeedbackDetails();
  }, [])

  return (
    <BarChart
      width={600}
      height={400}
      data={instructorFeedback}
      margin={{
        top: 10,
        
        left: 20,
        bottom: 25
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="trainingName">
        <Label value="Training" offset={-20} position="insideBottom" />
      </XAxis>
      <YAxis label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
      {/* <Tooltip content={<CustomTooltip />} cursor={false} wrapperStyle={{ width: 130, backgroundColor: `{data.fill}` }}   /> */}

      <Bar dataKey="instructorAverage" fill='#0088FE' />
      
    </BarChart>
  );
}

export default InstructorFeedback

