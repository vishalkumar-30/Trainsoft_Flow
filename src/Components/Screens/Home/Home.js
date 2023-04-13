import React, { useContext, useEffect, useState } from 'react'
import Charts from '../../Charts/Charts'
import Table from 'react-bootstrap/Table'
import { ICN_COPY, ICN_COMING_BATCHES } from '../../Common/Icon';
import { Progress, Card } from '../../Common/BsUtils';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CalenderGraph from '../../Common/CalenderGraph/CalenderGraph';
import AppContext from '../../../Store/AppContext';
import useFetch from "../../../Store/useFetch";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import { Router } from '../../Common/Router';
import "react-circular-progressbar/dist/styles.css";
import './home.css'
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';
import WeeklyLogin from '../../Common/Graph/LineGraph/WeeklyLogin';
import AverageTrainerFeedback from '../../Common/Graph/BarGraph/AverageTrainerFeedback';
import AverageTrainingFeedback from '../../Common/Graph/BarGraph/AverageTrainingFeedback';
import AverageAssesmentscore from '../../Common/Graph/LineGraph/AverageAssesmentscore';
import Trainingpichart from '../../Common/Graph/PiChart/Trainingpichart';
import CircularProgress from '../../Layout/NewDashboardLearner/CircularProgress/CircularProgress';
import InstructorLeaderboard from '../../Layout/NewDashboardLearner/Leaderboard/InstructorLeaderboard';



const AdminHome = () => {

    const { user, batches, course, ROLE, spinner, setCategory } = useContext(AppContext)
    const [batchCount, setBatchCount] = useState(0)
    const [trainingprogrss, setTrainingprogrss] = useState([])
    const [ongoingTrainingCount, setongoingTrainingCount] = useState(0);

    const getTrainingprogress = async () => {
        try {
            spinner.show();
            RestService.getOngoingTrainingProgress().then(
                response => {
                    setTrainingprogrss(response.data.trainingDetails);
                    setongoingTrainingCount(response.data.ongoingTrainingCount);
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

    // get batches by sid
    const getBatchCount = async () => {
        try {
            RestService.getCount("vw_batch").then(
                response => {
                    setBatchCount(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatch()", err)
        }
    }

    // get All topic
    const getAllCategory = async () => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getAllCategory()
            setCategory(data)
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAllTopic()", err)
        }
    }
    useEffect(() => {
        getBatchCount();
        getAllCategory();
        getTrainingprogress()

    }, [])

    return (<div>

        <Card title="Filter Training based on date">
            <div className='row'>
                <div className='col-sm-6 col-md-6 pb-3'>
                    {/* <SkillsLevelGraph/> */}
                    {/* <InstructorFeedback /> */}
                    {/* <NewInstructorfeedback/> */}
                    <Trainingpichart />
                </div>
                <div className='col-sm-6 col-md-6'>
                    <div className='row'>
                        <div className="col-sm-6 ">

                            <div className="grid-batch1 ">
                                <div className="mb10">{ICN_COMING_BATCHES}</div>
                                <div>
                                    <div className="batch-title">{course.length}</div>
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
                                    <div className="batch-title">{batchCount}</div>
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
                                    <div className="batch-title">{batchCount}</div>
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
                                    <div className="batch-title">{batchCount}</div>
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
        <Card title="" className='mt-2'>
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
                                    value="80"
                                    text={`80%`}
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
                                    value="75"
                                    text={`75%`}
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
                        <CircularProgress progress={50} style={{ margintop: "60px" }} />
                    </div>
                </div>
            </div>
        </Card>

    </div>)
}

const Home = () => {
    const { setCourse, setBatches, setDepartment, spinner } = useContext(AppContext)
    const { setCategory } = useContext(AssessmentContext)

    // get All topic
    const getAllCategory = async () => {
        spinner.show("Loading... wait");
        try {
            let { data } = await RestService.getAllCategory()
            setCategory(data)
            spinner.hide();
        } catch (err) {
            spinner.hide();
            console.error("error occur on getAllTopic()", err)
        }
    }
    // get all courses
    const allCourse = useFetch({
        method: "get",
        url: GLOBELCONSTANT.COURSE.GET_COURSE,
        errorMsg: 'error occur on get course'
    });
    // get all batches
    const allBatches = useFetch({
        method: "get",
        url: GLOBELCONSTANT.BATCHES.GET_BATCH_LIST,
        errorMsg: 'error occur on get Batches'
    });

    // get all batches
    const allDepartment = useFetch({
        method: "get",
        url: GLOBELCONSTANT.INSTRUCTOR.GET_INSTRUCTOR,
        errorMsg: 'error occur on get Batches'
    });




    useEffect(() => {
        getAllCategory()
        allCourse.response && setCourse(allCourse.response)
        allBatches.response && setBatches(allBatches.response)
        allDepartment.response && setDepartment(allDepartment.response)
    }, [allCourse.response, allBatches.response, allDepartment.response])

    return (<>
        <Router>
            <AdminHome path="/" />
        </Router>
    </>)

}
export default Home