import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Charts from '../../Charts/Charts'
import { Card } from '../../Common/BsUtils';
import "react-circular-progressbar/dist/styles.css";
import { ICN_COMING_BATCHES, ICN_COPY } from '../../Common/Icon'
import AppContext from '../../../Store/AppContext';
import './home.css'
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';
import LineGraph from '../../Common/Graph/Learner/LineGraph/AssesmentScore';
import AverageAssesmentLearnerscore from '../../Common/Graph/Learner/LineGraph/AssesmentScore';
// import NewCalender from '../../Common/Graph/Learner/LineGraph/CalenderGraph/NewCalender';
import InstructorFeedback from '../../Common/Graph/BarGraph/InstructorFeedback';
import LinearProgressBar from '../../Layout/NewDashboardLearner/LinearProgressBar/LinearProgressBar';
import Upcoming from '../../Layout/NewDashboardLearner/Upcoming/Upcoming';
import CircularProgress from '../../Layout/NewDashboardLearner/CircularProgress/CircularProgress';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import Strength from '../../Layout/NewDashboardLearner/Strength/Strength';
import InstructorLeaderboard from '../../Layout/NewDashboardLearner/Leaderboard/InstructorLeaderboard';
import NewInstructorfeedback from '../../Common/Graph/BarGraph/NewInstructorfeedback';
const InstructorDashboard = () => {

    const { user, batches, course, ROLE, spinner, setCategory } = useContext(AppContext)
    const [batchCount, setBatchCount] = useState(0);
    const [trainingList, setTrainingList] = useState([]);
    const [trainingCompleted, setTrainingListCompleted] = useState([]);
    const [trainingOngoing, setTrainingListOngoing] = useState([]);

    // get instructor trainings 
    //.filter(item => item.status === 'ENABLED' || item.status === 'ARCHIVED')
    const getInstructorTrainings = () => {
        try {
            const pagination = "1";
            let pageSize = 20;
            RestService.getAllTrainingByPage(user.role, pagination, pageSize).then(
                response => {
                    setTrainingList(response.data.filter(item => item.status === 'ENABLED' 
                    || item.status === 'ARCHIVED'));
                    setTrainingListCompleted(response.data.filter(item => item.status === 'ARCHIVED'));
                    setTrainingListOngoing(response.data.filter(item => item.status === 'ENABLED'));
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
        getInstructorTrainings();
        // getTrainings();
        // getUserTagScoreAnanlysis();
        // getUserTagWiseScoring();
        // getOverallLeaderboard();
        // getLearnerWeightedScoresAll();
    }, []);


    return (<div>

        {/* <NewCalender /> */}
        {/* <Card title="Instructor Feedback" action={true} className="mt-3">
            <InstructorFeedback />
        </Card> */}

        <Card title="Instructor Feedback">
            <div className='row'>
                <div className='col-sm-6 col-md-6 pb-3'>
                    {/* <SkillsLevelGraph/> */}
                    {/* <InstructorFeedback /> */}
                    <NewInstructorfeedback />
                </div>
                <div className='col-sm-6 col-md-6'>
                    <div className='row'>
                        <div className="col-sm-6 ">

                            <div className="grid-batch1 ">
                                <div className="mb10">{ICN_COMING_BATCHES}</div>
                                <div>
                                    <div className="batch-title">{trainingOngoing.length}</div>
                                    <div className="batch-label">Ongoing Trainings</div>
                                </div>
                                <div className="jce">
                                    <div className="grid-batch-icon">
                                        <i className="bi bi-arrows-angle-expand"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-6 ">

                            <div className="grid-batch2">
                                <div className="mb10">{ICN_COPY}</div>
                                <div>
                                    <div className="batch-title">{trainingCompleted.length}</div>
                                    <div className="batch-label">Completed Trainings</div>
                                </div>
                                <div className="jce">
                                    <div className="grid-batch-icon">
                                        <i className="bi bi-arrows-angle-expand"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className="col-sm-6 ">

                            <div className="grid-batch3">
                                <div className="mb10">{ICN_COPY}</div>
                                <div>
                                    <div className="batch-title">10</div>
                                    <div className="batch-label">Certificates Earned</div>
                                </div>
                                <div className="jce">
                                    <div className="grid-batch-icon">
                                        <i className="bi bi-arrows-angle-expand"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-6 ">

                            <div className="grid-batch1">
                                <div className="mb10">{ICN_COPY}</div>
                                <div>
                                    <div className="batch-title">02 h :45 min</div>
                                    <div className="batch-label">Hours Invested</div>
                                </div>
                                <div className="jce">
                                    <div className="grid-batch-icon">
                                        <i className="bi bi-arrows-angle-expand"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </Card>

        <div className='row mt-2'>
            <div className='col-sm-6 col-md-6'>
                <Card title="Pending Task">
                    <LinearProgressBar />

                </Card>
            </div>
            <div className='col-sm-6 col-md-6'>
                <Card title="Upcoming Classes">
                    <div className='title-md' style={{ float: "right", margintop: "-40px" }}>
                        {/* <a href='/calender'>  See All</a>
 View All */}
                    </div>
                    <Upcoming />
                </Card>
            </div>
        </div>



        <Card title="" className='mt-2'>
        <label className="m-3 label form-label ">Select Training</label>
                <select className="form-control mb-3 mx-2" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} 
                // onChange={(e) => {
                //     getLearnerWeightedScoresSpecific(e.target.value);

                // }}
                >
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
            <div className='row '>
                <div className='col-sm-2 col-md-2'>
                    <div className='title-md'>
                        Student Performance
                    </div>
                    <InstructorLeaderboard />

                </div>
                <div className='col-sm-3 col-md-3'>
                    <div className='title-md text-center'>
                        Progress
                    </div>
                    {/* <div className='d-flex justify-content-between p-2 border ' style={{width:"100%", borderRadius:"20px", background: "linear-gradient(180deg, #7214AE 0%, rgba(114, 20, 174, 0) 100%)"}}>
  <div className='title-sm'>Videos</div>
  <div >70%</div>
 </div> */}
                    <div className='my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #5CC9EE 0%, rgba(92, 201, 238, 0) 100%)" }}>
                        <div className='title-sm'>Lab</div>
                        <div >70%</div>
                    </div>
                    <div className='my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #7214AE 0%, rgba(114, 20, 174, 0) 100%)" }}>
                        <div className='title-sm'>Assesment</div>
                        <div >70%</div>
                    </div>
                    <div className='my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #5CC9EE 0%, rgba(92, 201, 238, 0) 100%)" }}>
                        <div className='title-sm'>Capstone</div>
                        <div >70%</div>
                    </div>

                    <div className='d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #7214AE 0%, rgba(114, 20, 174, 0) 100%)" }}>
                        <div className='title-sm'>ILT</div>
                        <div >70%</div>
                    </div>





                </div>
                <div className='col-sm-3 col-md-3'>
                    <div className='title-md text-center'>
                        Average Assessments Score
                    </div>
                    <div className=" py-5 ml-5">
                        <div className="flx pb-3" style={{ marginTop: "-40px" }} >
                            <div className="text-center " style={{ width: 100, height: 60 }}>
                                <CircularProgressbar

                                    // maxValue="1000"
                                    // minValue="1" value="580"
                                    // text={`580`}
                                    value="40"
                                    text={`40%`}
                                    styles={buildStyles({
                                        trailColor: "#F5FBFF",
                                        pathColor: "#5CC9EE",

                                    })} />
                                <div className="mt-2">Project Work</div>
                            </div>
                            <div className="text-center assementdashboard" style={{ width: 100, height: 60 }}>
                                <CircularProgressbar
                                    value="70"
                                    text={`70%`}
                                    styles={buildStyles({
                                        trailColor: "#F5FBFF",
                                        pathColor: "#5CC9EE",
                                    })} />
                                <div className="mt-2">MCQs</div>
                            </div>

                            <div className="text-center" style={{ width: 100, height: 60, marginTop: "80px", marginLeft: "40px" }}>
                                <CircularProgressbar
                                    // maxValue="1000"
                                    // minValue="1" value="789"
                                    // text={`789`}
                                    value="65"
                                    text={`65%`}
                                    styles={buildStyles({
                                        trailColor: "#F5FBFF",
                                        pathColor: "#7D00B5",
                                    })} />
                                <div className="mt-2">Lab Assessments </div>
                            </div>

                        </div>
                    </div>


                </div>
                <div className='col-sm-4 col-md-4'>
                    <div className='title-md text-center'>
                        Overall Score/ Progress
                    </div>
                    <div >
                        <CircularProgress progress={50}style={{ margintop: "60px" }} />
                    </div>

                </div>
            </div>
        </Card>
        {/* Strengthy */}


        <div className='row mt-2'>
            <div className='col-sm-4 col-md-4' >
                <Card title="Your Top Skills">
                    <div >
                        <CircularProgress progress={50}/>
                    </div>
                    <div className="table-bless " style={{ marginTop: "-50px" }}>

                        <Table className="table-borderless">

                            <tbody>

                                <tr >
                                    <td style={{ fontWeight: "500", fontSize: "20px", color: "#7214AE" }}><ul><li>Java</li></ul></td>
                                    <td>40%</td>

                                </tr>
                                <tr >
                                    <td><ul><li>Java</li></ul></td>
                                    <td>40%</td>

                                </tr>
                                <tr >
                                    <td><ul><li>Java</li></ul></td>
                                    <td>40%</td>

                                </tr>

                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
            <div className='col-sm-8 col-md-8'>
                {/* <Card>
                    <Strength/>
                </Card> */}
            </div>
        </div>
    </div>)
}

export default InstructorDashboard