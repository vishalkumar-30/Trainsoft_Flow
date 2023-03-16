import React, { useState, useContext, useEffect } from 'react'
import { Progress } from '../../BsUtils'
import Table from 'react-bootstrap/Table'
import { SelectInput } from '../../InputField/InputField'
import "./TrainingProgress.css"
import HeatMapProgress from './HeatMapProgress'
import { Helmet } from "react-helmet";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AppContext from '../../../../Store/AppContext'
import RestService from '../../../../Services/api.service'

import DropdownItem from '../../DropdownItem/DropdownItem'
const TrainingProgress = () => {
  const [alignment, setAlignment] = useState('all');
  const [trainingList, setTrainingList] = useState([]);
  const [training, setTraining] = useState('');
  const { spinner } = useContext(AppContext);

  const defaultExpandedRows = { 1: true };
  const [rowExpandHeight, setRowExpandHeight] = useState(350);
  const [expandedRows, setExpandedRows] = useState({ 1: true, 2: true });
  const [collapsedRows, setCollapsedRows] = useState(null);
  const renderRowDetails = ({ data, toggleRowExpand }) => {
    return <div style={{ padding: 20 }}>
      <button onClick={toggleRowExpand}>Collapse row</button>
      <h3>Row details:</h3>
      <table>
        <tbody>
          {Object.keys(data).map((name, i) => {
            return <tr key={i}>
              <td>{name}</td>
              <td>{data[name]}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  };

  const columns = [
    { name: 'name', header: 'Training', minWidth: 20, defaultFlex: 2 },
    { name: 'total', header: 'Total', minWidth: 40, defaultFlex: 1 },
    { name: 'completed', header: 'Completed', minWidth: 40, defaultFlex: 1 },
    { name: 'completionPercentage', header: 'Progress', minWidth: 40, defaultFlex: 1 },
  ];

  const gridStyle = { minHeight: 100 };

  const dataSource = [
    { id: 1, name: 'John McQueen', total: 6, completed: 3, completionPercentage: <Progress striped label={`50%`} value={50} /> }
  ];


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
          <DropdownItem title="Training Completion" total={<Progress striped label={`70%`} value={70} />} theme="dark">


            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='title-sm'>1</td>
                    <td colspan="3">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DropdownItem>
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
            <ReactDataGrid
              idProperty="id"
              expandedRows={expandedRows}
              collapsedRows={collapsedRows}
              defaultExpandedRows={defaultExpandedRows}
              renderRowDetails={renderRowDetails}
              rowExpandHeight={rowExpandHeight}
              columns={columns}
              dataSource={dataSource}
              style={gridStyle}
            />

          </div>

      }


    </div>
  )
}

export default TrainingProgress