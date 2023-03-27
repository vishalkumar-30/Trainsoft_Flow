import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'

import Charts from '../../Charts/Charts'
import { Progress, Card } from '../../Common/BsUtils';
import "react-circular-progressbar/dist/styles.css";
import CalenderGraph from '../../Common/CalenderGraph/CalenderGraph';
import AppContext from '../../../Store/AppContext';
import './home.css'
import RestService from '../../../Services/api.service';
import AssessmentContext from '../../../Store/AssessmentContext';
import LineGraph from '../../Common/Graph/Learner/LineGraph/AssesmentScore';
import AverageAssesmentLearnerscore from '../../Common/Graph/Learner/LineGraph/AssesmentScore';
import SkillsLevelGraph from '../../Common/Graph/Learner/LineGraph/Speedometer/SkillsLevelGraph';
import NewCalender from '../../Common/Graph/Learner/LineGraph/CalenderGraph/NewCalender';
import Weightage from '../../Common/Graph/Learner/Weightage/Weightage';

const UserHome = () => {
    const { user, spinner } = useContext(AppContext)
    const { setCategory } = useContext(AssessmentContext)

    const [trainingprogrss, setTrainingprogrss] = useState([])
    const [ongoingTrainingCount, setongoingTrainingCount] = useState([]);

    const [rank, setRank] = useState([])

    const getLearnersAssessmentScore = () => {
        try {

            spinner.show();
            RestService.getLearnersAssessmentScore().then(
                response => {
                    if (response.status === 200) {
                        setRank(response.data);
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

    const getLearnerAllTrainingsProgress = async () => {
        try {
            spinner.show();
            RestService.getLearnerAllTrainingsProgress().then(
                response => {
                    setTrainingprogrss(response.data.progressDetails);
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
        getAllCategory();
        getLearnerAllTrainingsProgress();
        getLearnersAssessmentScore();
    }, [])

    return (<div>
        <div className="row">
            <div className="col-md-6 " >
                {/* ..........user info......... */}
                <Card title="" >
                    <div className="user-info">
                        <div className="title-lg">Welcome back {user.name}!</div>
                        <div>
                            <div>
                                <div className="jcb"> <div className="aic"> <div className="red-circle"></div> Quiz - AWS</div> <div>3 Jul 2020</div></div>
                                <div className="jcb"> <div className="aic"> <div className="red-circle"></div>Course - Python fundamentals </div> <div>5 Jul 2020</div></div>
                                <div className="jcb"> <div className="aic"><div className="red-circle"></div> Final assessment - AWS </div><div>6 Jul 2020</div></div>

                                <div className="jcb"> <div className="aic"> <div ></div> </div> <div></div></div>

                            </div>
                        </div>
                    </div>
                </Card>
                {/* ..........End user info......... */}
                {/* ..........Technology Activity......... */}

                {/* ..........End Technology Activity......... */}

            </div>
            <div className="col-md-6 ">
                {/* ..........Lms insight......... */}

                <Card title="Assessment-wise Rank"  >
                    {/* <div className="user-info">
            
               <div className="title-sm  my-3">OngoingTrainingCount {ongoingTrainingCount}</div>
               <div className='row'>
               <div className="aic px-2"><div className="red-circle"></div> <div>Progress is less than 50% </div></div>
               <div className="aic px-2"><div className="blue-circle"></div> <div>Progress is Greater than 50% </div></div>
               </div>
               </div> */}
                    <div className="table-bless " style={{ height: "120px", overflowX: "scroll" }}>
                        {rank.length == 0 ? "No assessment Taken" :
                            <Table className="table-borderless">
                                <thead style={{
                                    fontSize: "15px",
                                    fontWeight: "600"
                                }}>
                                    <tr>
                                        <td>Assessment Name</td>
                                        <td  >Rank</td>
                                        {/* <td className="avgScore-w">Avg score</td> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    {rank.map((res, i) =>
                                        <tr key={i}>
                                            <td>{res.assessmentName}</td>
                                            <td>{res.rank}</td>
                                            {/* <td className="text-right">{50}</td> */}
                                        </tr>
                                    )}

                                </tbody>
                            </Table>
                        }
                    </div>

                </Card>

                {/* ..........End Lms insight......... */}
                {/* ..........Calender......... */}

                {/* ..........End Calender......... */}
            </div>
        </div>

        <div className='row mt-3'>
            <div className="col-md-6  ">
                <Card title="Skill Meter" >

                    <SkillsLevelGraph />
                </Card>
            </div>


            <div className="col-md-6  " >

                <Card title="Average Training Progress"  >
                    <div className="user-info">

                        <div className="title-sm  my-3">OngoingTrainingCount {ongoingTrainingCount}</div>
                        {/* <div className='row'>
                            <div className="aic px-2"><div className="red-circle"></div> <div>Progress is less than 50% </div></div>
                            <div className="aic px-2"><div className="blue-circle"></div> <div>Progress is Greater than 50% </div></div>
                        </div> */}
                    </div>
                    <div className="table-bless py-2" style={{ height: "300px", overflowX: "scroll" }}>

                        <Table className="table-borderless">
                            <thead style={{
                                fontSize: "15px",
                                fontWeight: "600"
                            }}>
                                <tr>
                                    <td>Name</td>
                                    <td style={{ width: "60%" }} >Progress</td>
                                    {/* <td className="avgScore-w">Avg score</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {trainingprogrss.map((res, i) =>
                                    <tr key={i}>
                                        <td>{res.trainingName}</td>
                                        <td><Progress striped label={`${res.completion}%`} variant={res.completion <= 50 ? 'danger' : '#7DFCD8'} value={res.completion} /></td>
                                        {/* <td className="text-right">{50}</td> */}
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                </Card>
            </div>
        </div>


        <div className='row'>
            <Card title="" className="mt-3">
                <Weightage />
            </Card>
        </div>
        {/* <Charts ChartType="course" labelLeft="Progress" /> */}
        <div className='row'>
            <Card title="AsssmentScore Details" className="mt-3">

                <AverageAssesmentLearnerscore />
            </Card>
        </div>


        {/* <div className='row'>
            <Card title=""  className="mt-3">
           <Weightage/>
            </Card>
        </div> */}






    </div>)
}

export default UserHome