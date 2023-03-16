import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../../../Store/AppContext';
import RestService from '../../../../../Services/api.service';
import { Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label } from "recharts";

export default function AverageAssesmentLearnerscore() {

  const [learnerAverageScore, setLearnerAverageScore] = useState([]);

  const { spinner } = useContext(AppContext);

  // get average training score
  const getLearnersAssessmentScore = () => {
    try {
      const key = 'trainingName';
      spinner.show();
      RestService.getLearnersAssessmentScore().then(
        response => {
          if (response.status === 200) {
            let resp = response.data;
            let modifiedArr = resp.map(function (element) {
              console.log(element)
              let newobj = {
                trainingName: element.trainingName,
                gainMarks: element.gainMarks
              }
              return newobj;
            });

            const arrayUniqueByKey = [...new Map(modifiedArr.map(item =>
              [item[key], item])).values()];
            setLearnerAverageScore(arrayUniqueByKey);
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
        <LineChart
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
          <YAxis
            label={{
              value: "Assessment Score",
              angle: -90,
              position: "insideLeft"
            }}
          />
          <Tooltip />
          <Line
            dataKey="gainMarks"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}