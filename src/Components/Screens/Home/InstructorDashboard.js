import React, { useContext ,useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table'

import Charts from '../../Charts/Charts'
import { Progress, Card} from '../../Common/BsUtils';
import "react-circular-progressbar/dist/styles.css";

import AppContext from '../../../Store/AppContext';
import './home.css'
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';
import LineGraph from '../../Common/Graph/Learner/LineGraph/AssesmentScore';
import AverageAssesmentLearnerscore from '../../Common/Graph/Learner/LineGraph/AssesmentScore';
import NewCalender from '../../Common/Graph/Learner/LineGraph/CalenderGraph/NewCalender';

const InstructorDashboard = () => {



  














    return (<div>

<NewCalender/>                 
                       





    </div>)
}

export default InstructorDashboard