import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../../../Store/AppContext';

import RestService from '../../../../../Services/api.service';
import { AreaChart, Area,Legend,Line,LineChart, XAxis, YAxis, CartesianGrid, Label, ResponsiveContainer,Tooltip } from "recharts";
export default function AverageAssesmentLearnerscore() {

  const [learnerAverageScore, setLearnerAverageScore] = useState([]);
  
  const { spinner } = useContext(AppContext);

  // get average training score
  const getLearnersAssessmentScore = () => {
    try {

      spinner.show();
      RestService.getLearnersAssessmentScore().then(
        response => {
          if (response.status === 200) {
            console.log(response.data)
            let resp=response.data;

            let modifiedArr = resp.map(function(element){
              console.log(element)
              let newobj={
                trainingName:element.trainingName,
                percentage:element.percentage.toFixed()
              }
            
              return newobj;
          });

            setLearnerAverageScore(modifiedArr);
          
           
           
          }

        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getTrainingsAverageScore()", err)
    }
  }

  useEffect(() => {
    getLearnersAssessmentScore();
  }, []);



  return (
    <>
 
      <ResponsiveContainer width="100%"
        height={500}>
        <AreaChart
         
          data={learnerAverageScore}
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
          <Tooltip />
          <YAxis
            label={{
              value: " %",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Area
            type="monotone"
            dataKey="percentage"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>

      </ResponsiveContainer>



{/* <LineChart
      width="100%"
      height={500}
      data={learnerAverageScore}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
   
      <XAxis dataKey="trainingName">
            <Label value="Training Name" offset={-20} position="insideBottom" />
          </XAxis>
      <YAxis  label={{
              value: " %",
              angle: -90,
              position: "insideLeft"
            }}/>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="percentage"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line  dataKey="percentage"stroke="#82ca9d" />
    </LineChart> */}


    </>
  );
}