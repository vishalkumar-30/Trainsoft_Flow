
import React, { useState, useContext, useEffect } from 'react'

import "./style.css"

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppContext from '../../../../../Store/AppContext'
import RestService from '../../../../../Services/api.service'
import { Progress } from '../../../BsUtils';
import TrainigprogressReport from './TrainigprogressReport';

const Weightage = () => {
    const [alignment, setAlignment] = useState('all');
  const [trainingList, setTrainingList] = useState([]);
  const [training, setTraining] = useState('');
  const { spinner } = useContext(AppContext);

  const handleChange = (e, value) => {
    setAlignment(value);
  };

  // get all training
  const getTrainings = () => {
    try {

      RestService.getTrainings().then(
        response => {
          setTrainingList(response.data.filter(item => item.status === 'ENABLED'));
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getTrainings()", err)
    }
  }

  useEffect(() => {
    getTrainings();
  }, []);
  return (
    <div>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">All Training</ToggleButton>
      <ToggleButton value="specific">Specific Training</ToggleButton>

    </ToggleButtonGroup>
    {
      alignment === 'all' ?
        <TrainigprogressReport/>
        :
        <div>
          <div className='row'>
            <div className='col-4'>
              <label className="mb-2 label form-label ">Select Training</label>
              <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                setTraining(e.target.value);

              }}>
                <option hidden>Select Training</option>
                {
                  trainingList.map((item) => {
                    return (
                      <>
                        <option value={item.sid}>
                          {item.name}
                          {/* {item.name.length > 22 ? item.name.substring(0, 22) + "..." : item.name} */}
                        </option>
                      </>
                    )
                  })
                }

              </select>


            </div>
            <div className='col-2 mt-4'>
              <button type="button" style={{ paddingBottom: "10px" }} className="btn btn-primary">Filter</button>
            </div>
          </div>
          

        </div>

    }


  </div>
  )
}

export default Weightage