import React, { useState, useContext, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppContext from '../../../../../Store/AppContext';
import RestService from '../../../../../Services/api.service';
import TrainigprogressReport from './TrainigprogressReport';
import "./style.css";

const Weightage = () => {

  const [alignment, setAlignment] = useState('specific');
  const [trainingList, setTrainingList] = useState([]);
  const [weightageAll, setWeightageAll] = useState([]);
  const [weightageSpecific, setWeightageSpecific] = useState([]);
  // const [trainingAll, setTrainingAll] = useState('ALL');
  const [trainingSpecific, setTrainingSpecific] = useState('');
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

  //get specific training weightage
  const getLearnerWeightedScoresSpecific = () => {
    try {
      spinner.show();
      RestService.getLearnerWeightedScores(trainingSpecific).then(
        response => {
          if (response.status === 200) {
            setWeightageSpecific(response.data);
            spinner.hide();
          }
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getLearnerWeightedScores()", err)
    }
  }

  //get all training weightage
  const getLearnerWeightedScoresAll = () => {
    try {
      spinner.show();
      RestService.getLearnerWeightedScores('ALL').then(
        response => {
          if (response.status === 200) {
            setWeightageAll(response.data);
            spinner.hide();
          }
        },
        err => {
          spinner.hide();
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getLearnerWeightedScores()", err)
    }
  }

  useEffect(() => {
    getTrainings();
    getLearnerWeightedScoresAll();
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

        <ToggleButton value="specific" style={{ fontWeight: "700" }}>Specific Training</ToggleButton>
        <ToggleButton value="all">All Training</ToggleButton>

      </ToggleButtonGroup>
      {
        alignment === 'specific' ?
          <div className='mt-2' style={{ background: "#ACEBFD" }}>
            <div className='row'>
              <div className='col-6'>
                <label className="m-3 label form-label ">Select Training</label>
                <select className="form-control mb-3 mx-2" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                  setTrainingSpecific(e.target.value);

                }}>
                  <option hidden>Select Training</option>
                  {
                    trainingList.map((item) => {
                      return (
                        <>
                          <option value={item.sid}>

                            {item.name}

                          </option>
                        </>
                      )
                    })
                  }
                </select>

              </div>
              <div className='col-4 mt-5 mx-1'>
                <button type="button" style={{ width: "100%" }}
                  className="btn btn-primary"
                  disabled={trainingSpecific.length === 3}
                  onClick={() => getLearnerWeightedScoresSpecific()}>Filter</button>
              </div>
            </div>

            {
              weightageSpecific.length > 0 ?
                <TrainigprogressReport list={weightageSpecific} />
                : ''
            }
          </div>
          :
          
            weightageAll.length > 0 ? 
            <TrainigprogressReport list={weightageAll} /> 
            : ''
          
         
      }

    </div>
  )
}

export default Weightage