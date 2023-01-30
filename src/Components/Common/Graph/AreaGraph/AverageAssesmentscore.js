import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Label, ResponsiveContainer } from "recharts";

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

  // const perChunk = 8 // items per chunk    

  // const inputArray = ['a', 'b', 'c', 'd', 'e']

  // const result = trainingAverageScore.reduce((resultArray, item, index) => {
  //   const chunkIndex = Math.floor(index / perChunk)

  //   if (!resultArray[chunkIndex]) {
  //     resultArray[chunkIndex] = [] // start a new chunk
  //   }

  //   resultArray[chunkIndex].push(item)

  //   return resultArray
  // }, []);

  // console.log(result);

  return (
    <>
      <ResponsiveContainer width="100%"
        height={500}>
        <AreaChart

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

          <Area
            type="monotone"
            dataKey="trainingAverageScore"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>

      </ResponsiveContainer>
    </>
  );
}


