import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import {Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from "recharts";

export default function AverageAssesmentscore() {

  const [trainingAverageScore, setTrainingAverageScore] = useState([]);
  const { spinner } = useContext(AppContext);

  // get average training score
  const getTrainingsAverageScore = () => {
    try {

      spinner.show();
      RestService.getTrainingsAverageScore().then(
        response => {
          if (response.status === 200) {
            setTrainingAverageScore(response.data);
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
    getTrainingsAverageScore();
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%"
        height={500}>
        <LineChart

          data={trainingAverageScore}
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
            <Tooltip />

          <Line
   
            dataKey="trainingAverageScore"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>

      </ResponsiveContainer>
    </>
  );
}