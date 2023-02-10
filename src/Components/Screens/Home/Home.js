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



const AdminHome = () => {
    const { user, batches, course, ROLE, spinner, setCategory } = useContext(AppContext)
    const [batchCount, setBatchCount] = useState(0)
    const [trainingprogrss,setTrainingprogrss]=useState([])
    const[ongoingTrainingCount,setongoingTrainingCount]=useState(0);



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
        <div className="row">
            <div className="col-md-6">
                {/* ..........user info......... */}
                <Card title="">
                    <div className="user-info">
                        <div className="title-lg">Welcome back {user.name}!</div>
                        <div>
                            <p className="mb-2">Since your last login on the system, there were:</p>
                            <div>
                                <div className="aic"><div className="red-circle"></div> <div>21 new enrollment</div></div>
                                <div className="aic"><div className="red-circle"></div> <div>15 courses completed </div></div>
                                <div className="aic"><div className="red-circle"></div> <div>45 new messages </div></div>

                            </div>
                        </div>




                    </div>
                </Card>
                {/* ..........End user info......... */}

            </div>
            <div className="col-md-2 ">
                
                    <WeeklyLogin />
             
            </div>
           

            <div className="col-md-2 ">
             
               
                <div className="grid-batch bg-purple">
                                <div className="mb10">{ICN_COMING_BATCHES}</div>
                                <div>
                                    <div className="batch-title">{course.length}</div>
                                    <div className="batch-label">Total Course</div>
                                </div>
                                <div className="jce">
                                    <div className="grid-batch-icon">
                                        <i className="bi bi-arrows-angle-expand"></i>
                                    </div>
                                </div>
                            </div>
             
              
            </div>

            <div className="col-md-2 ">
             
              
             <div className="grid-batch">
                             <div className="mb10">{ICN_COPY}</div>
                             <div>
                                 <div className="batch-title">{batchCount}</div>
                                 <div className="batch-label">On-going batches</div>
                             </div>
                             <div className="jce">
                                 <div className="grid-batch-icon">
                                     <i className="bi bi-arrows-angle-expand"></i>
                                 </div>
                             </div>
                         </div>
          
           
         </div>

        </div>
     
        <div className='row mt-3' >
            <div className='col-6'>
                <Card title="Average Trainer Feedback" >
                    <AverageTrainerFeedback />
                </Card>
            </div>

            <div className='col-6'>
                <Card title="Average Training Feedback" >
                    <AverageTrainingFeedback />
                </Card>
            </div>




        </div>

        {/* Average TrAINING aSSESMENT SCORE  */}

        <div className="row mt-3 mx-1">
            <Card title="Average Training Asssment Score" >
                <AverageAssesmentscore />
            </Card>

        </div>
        <div className="row mt-3">
            <div className="col-md-6">
           
                <Card title="Filter Training based on date">
                            <Trainingpichart />
                        </Card>
               

            </div>
            <div className="col-md-6  ">
               
            <Card title="Average Training Progress"  >
            <div className="user-info">
         
            <div className="title-sm  my-3">OngoingTrainingCount {ongoingTrainingCount}</div>
            {/* <div className='row'>
            <div className="aic px-2"><div className="red-circle"></div> <div>Progress is less than 50% </div></div>
            <div className="aic px-2"><div className="blue-circle"></div> <div>Progress is Greater than 50% </div></div>
            </div> */}
            </div>
                            <div className="table-bless py-2" style={{height:"420px",overflowX:"scroll"}}>
                                
                                <Table className="table-borderless">
                                    <thead style={{fontSize: "15px",
    fontWeight: "600"}}>
                                        <tr>
                                            <td>Name</td>
                                            <td style={{width:"60%"}} >Progress</td>
                                            {/* <td className="avgScore-w">Avg score</td> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainingprogrss.map((res, i) =>
                                            <tr key={i}>
                                                <td>{res.trainingName}</td>
                                                <td><Progress  striped     label={`${res.completionPercentage}%`} variant={res.completionPercentage<=50? 'danger' : '#7DFCD8'} value={res.completionPercentage}  /></td>
                                                {/* <td className="text-right">{50}</td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>

                        </Card>
            </div>

       
        </div>
    
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