import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../../Store/AppContext';
import { Card } from '../../Common/BsUtils';
import SkillsLevelGraph from '../../Common/Graph/Learner/LineGraph/Speedometer/SkillsLevelGraph';
import { ICN_COMING_BATCHES, ICN_COPY } from '../../Common/Icon';
import LinearProgressBar from './LinearProgressBar/LinearProgressBar';
import "./NewDashboardLearner.css";
import Table from 'react-bootstrap/Table';
import CircularProgress from './CircularProgress/CircularProgress';
import Strength from './Strength/Strength';
import LeaderboardTimeline from './Leaderboard/Timeline';
import Upcoming from './Upcoming/Upcoming';
import RestService from '../../../Services/api.service';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";


const DashboardLearner = () => {

    const { user, batches, course, ROLE, spinner, setCategory } = useContext(AppContext);
    const [trainingList, setTrainingList] = useState([]);
    const [overallAnalysis, setOverallAnalysis] = useState('');
    const [trainingDetails, setTrainingDetails] = useState([]);
    const [trainingDetailsAll, setTrainingDetailsAll] = useState([]);
    const [tagsScore, setTagsScore] = useState({});
    const [overallLeaderboard, setOverallLeaderboard] = useState([]);
    const [ranking, setRanking] = useState(40);
    const [skill, setSkill] = useState(0);
    const [count, setCount] = useState(0);
    const [ongoingTrainingDetails, setOngoingTrainingDetails] = useState([]);
    const [completedTrainingDetails, setCompletedTrainingDetails] = useState([]);
    const [learnerCertificateDetails, setLearnerCertificateDetails] = useState([]);
    const [hoursInvested, setHoursInvested] = useState("");
    // const [fourCards, setFourCards] = useState([]);
    let weakness = [], strength = [];
    let sum = 0;

    // get learner trainings
    const getLearnerTrainings = () => {
        try {
            RestService.getAllTrainingByPage().then(
                response => {
                    setTrainingList(response.data.filter(item => item.status === 'ENABLED'
                        || item.status === 'ARCHIVED'));
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
    const getLearnerWeightedScoresSpecific = (value) => {
        try {
            spinner.show();
            RestService.getLearnerWeightedScores(value).then(
                response => {
                    if (response.status === 200) {
                        setTrainingDetails(response.data);
                        for (let i = 0; i < overallLeaderboard.length; i++) {
                            if (response.data.length > 0) {
                                for (let j = 0; j < overallLeaderboard[i].rankingDetails.length; j++) {
                                    if (overallLeaderboard[i].trainingSid === response.data[0].trainingSid &&
                                        overallLeaderboard[i].rankingDetails[j].isLoggedIn) {

                                        console.log(overallLeaderboard[i].rankingDetails[j].rank);
                                        setRanking(overallLeaderboard[i].rankingDetails[j].rank);
                                        break;
                                    }
                                }
                            }

                        }
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

    //get specific training weightage
    const getLearnerWeightedScoresAll = () => {
        try {
            let totalSkill = 0, count = 0, complete = [];
            spinner.show();
            RestService.getLearnerWeightedScores('ALL').then(
                response => {
                    if (response.status === 200) {
                        setTrainingDetailsAll(response.data.filter(item => item.trainingStatus === 'ENABLED'
                            || item.trainingStatus === 'ARCHIVED'));
                        for (let i = 0; i < response.data.length; i++) {
                            if ((response.data[i].trainingStatus === "ENABLED") ||
                                (response.data[i].trainingStatus === "ARCHIVED")) {

                                // if (response.data[i].learnerWeightedDetailsTO
                                //     .courseCompletionStatus.completionPercentage === 100) {
                                //         console.log(response.data[i].trainingName);
                                //         complete.push({
                                //         "completeTrainingName": response.data[i].trainingName
                                //     })
                                // }
                                if (!isNaN(response.data[i].learnerWeightedDetailsTO.percentage)) {
                                    totalSkill += response.data[i].learnerWeightedDetailsTO.percentage;
                                    count++;
                                }
                            }
                        }
                        spinner.hide();
                        setSkill(totalSkill);
                        setCount(count);
                        // setCompletedTraining(training=>({
                        //     ...training,
                        //     complete
                        // }))
                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getLearnerWeightedScoresAll()", err)
        }
    }

    // get overall analysis
    const getUserTagScoreAnanlysis = () => {
        try {
            RestService.getUserTagScoreAnanlysis().then(
                response => {
                    if (response.status === 200) {
                        setOverallAnalysis(response.data.analysis);
                    }

                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getUserTagScoreAnanlysis()", err)
        }
    }

    // get tagwise scoring
    const getUserTagWiseScoring = () => {
        try {
            RestService.getUserTagWiseScoring().then(
                response => {
                    if (response.status === 200) {
                        setTagsScore(response.data);
                    }

                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getUserTagWiseScoring()", err)
        }
    }

    //get overall leaderboard
    const getOverallLeaderboard = () => {
        try {
            RestService.getOverallLeaderboard().then(
                response => {
                    if (response.status === 200) {
                        setOverallLeaderboard(response.data);
                    }

                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getOverallLeaderboard()", err)
        }
    }

    // get four card details
    const getLearnerDasboardCardsDetails = () => {
        try {
            RestService.getLearnerDasboardCardsDetails().then(
                response => {
                    if (response.status === 200) {
                        setOngoingTrainingDetails(response.data.ongoingTrainingDetails);
                        setCompletedTrainingDetails(response.data.completedTrainingDetails);
                        setLearnerCertificateDetails(response.data.learnerCertificateDetails);
                        setHoursInvested(response.data.hourseInvestedDetails);
                    }

                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getLearnerDasboardCardsDetails()", err)
        }
    }

    const keys = Object.keys(tagsScore);
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (tagsScore[k].totalTagPercentage > 0 && tagsScore[k].totalTagPercentage < 50) {
            weakness.push(k);
        }
        else if (tagsScore[k].totalTagPercentage > 0 && tagsScore[k].totalTagPercentage >= 50) {
            strength.push({
                "tags": k,
                "totalTagPercentage": tagsScore[k].totalTagPercentage
            });
            sum += tagsScore[k].totalTagPercentage;
        }

    }

    useEffect(() => {
        getLearnerTrainings();
        getUserTagScoreAnanlysis();
        getUserTagWiseScoring();
        getOverallLeaderboard();
        getLearnerWeightedScoresAll();
        getLearnerDasboardCardsDetails();
    }, []);


    return (
        <>

            <Card title="Skill meter">
                <div className='row'>
                    <div className='col-sm-6 col-md-6 pb-3'>
                        <SkillsLevelGraph skills={(skill / count).toFixed(2)} />
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='row'>
                            <div className="col-sm-6 ">

                                <div className="grid-batch1 ">
                                    <div className="mb10">{ICN_COMING_BATCHES}</div>
                                    <div>
                                        <div className="batch-title">{ongoingTrainingDetails.count}</div>
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
                                        <div className="batch-title">{completedTrainingDetails.count}</div>
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
                                        <div className="batch-title">{learnerCertificateDetails.count}</div>
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
                                        <div className="batch-title">{hoursInvested.hoursInvested}</div>
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

            {/* leaderboard */}

            <Card title="" className='mt-2'>


                <label className="m-3 label form-label title-md ">Select Training</label>
                <select className="form-control mb-3 mx-2" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                    getLearnerWeightedScoresSpecific(e.target.value);

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

                <div className='row '>
                    <div className='col-sm-2 col-md-2'>
                        <div className='title-md'>
                            Leaderboard
                        </div>
                        <LeaderboardTimeline ranking={ranking} />

                    </div>
                    <div className='col-sm-3 col-md-3'>
                        <div className='title-md text-center'>
                            Progress
                        </div>
                        {
                            trainingDetails.length && trainingDetails[0].learnerWeightedDetailsTO.videoCompletion !== null ?
                                <div className='d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #7214AE 0%, rgba(114, 20, 174, 0) 100%)" }}>
                                    <div className='title-sm'>Videos</div>
                                    <div>
                                        {isNaN(trainingDetails[0].learnerWeightedDetailsTO.videoCompletion.overalllAverageWeightage) ?
                                            "0%"
                                            :
                                            `${trainingDetails[0].learnerWeightedDetailsTO.videoCompletion.overalllAverageWeightage * 100}%`
                                        }
                                    </div>
                                </div>
                                : ''
                        }
                        {
                            trainingDetails.length && trainingDetails[0].learnerWeightedDetailsTO.labDetails !== null ?

                                <div className='my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #5CC9EE 0%, rgba(92, 201, 238, 0) 100%)" }}>
                                    <div className='title-sm'>Lab</div>
                                    <div>
                                        {isNaN(trainingDetails[0].learnerWeightedDetailsTO.labDetails.overalllAverageWeightage) ?
                                            "0%"
                                            :
                                            `${(trainingDetails[0].learnerWeightedDetailsTO.labDetails.overalllAverageWeightage * 100).toFixed(2)}%`
                                        }
                                    </div>
                                </div>
                                : ''
                        }
                        {trainingDetails.length && trainingDetails[0].learnerWeightedDetailsTO.assessmentDetails !== null ?
                            <div className='my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #7214AE 0%, rgba(114, 20, 174, 0) 100%)" }}>
                                <div className='title-sm'>Assesment</div>
                                <div>
                                    {isNaN(trainingDetails[0].learnerWeightedDetailsTO.assessmentDetails.overalllAverageWeightage) ?
                                        "0%"
                                        :
                                        `${(trainingDetails[0].learnerWeightedDetailsTO.assessmentDetails.overalllAverageWeightage * 100).toFixed(2)}%`
                                    }
                                </div>
                            </div>
                            : ''
                        }
                        <div className='my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #5CC9EE 0%, rgba(92, 201, 238, 0) 100%)" }}>
                            <div className='title-sm'>Capstone</div>
                            <div >70%</div>
                        </div>
                        {
                            trainingDetails.length && trainingDetails[0].learnerWeightedDetailsTO.documentDetails !== null ?
                                <div className=' my-2 d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #7214AE 0%, rgba(114, 20, 174, 0) 100%)" }}>
                                    <div className='title-sm'>Document</div>
                                    <div>
                                        {isNaN(trainingDetails[0].learnerWeightedDetailsTO.documentDetails.overalllAverageWeightage) ?
                                            "0%"
                                            :
                                            `${trainingDetails[0].learnerWeightedDetailsTO.documentDetails.overalllAverageWeightage * 100}%`
                                        }
                                    </div>
                                </div>
                                : ''
                        }

                        {
                            trainingDetails.length && trainingDetails[0].learnerWeightedDetailsTO.codingQuestionDetails !== null ?
                                <div className='d-flex justify-content-between p-2 border ' style={{ width: "100%", borderRadius: "20px", background: "linear-gradient(180deg, #5CC9EE 0%, rgba(92, 201, 238, 0) 100%)" }}>
                                    <div className='title-sm'>Coding Questions</div>
                                    <div>
                                        {isNaN(trainingDetails[0].learnerWeightedDetailsTO.codingQuestionDetails.overalllAverageWeightage) ?
                                            "0%"
                                            :
                                            `${trainingDetails[0].learnerWeightedDetailsTO.codingQuestionDetails.overalllAverageWeightage * 100}%`
                                        }
                                    </div>
                                </div>
                                : ''
                        }

                    </div>
                    <div className='col-sm-3 col-md-3'>
                        <div className='title-md text-center'>
                            Assessments
                        </div>
                        <div className=" py-5 ml-5">
                            <div className="flx pb-3" style={{ marginTop: "-40px" }} >
                                <div className="text-center " style={{ width: 100, height: 60 }}>
                                    <CircularProgressbar

                                        // maxValue="1000"
                                        // minValue="1" value="580"
                                        // text={`580`}
                                        value="30"
                                        text={`30%`}
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
                                        value="40"
                                        text={`40%`}
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
                            <CircularProgress progress={trainingDetails.length > 0 ? (
                                trainingDetails[0].learnerWeightedDetailsTO.courseCompletionStatus.completionPercentage > 100 ?
                                    100 : trainingDetails[0].learnerWeightedDetailsTO.courseCompletionStatus.completionPercentage.toFixed(1))
                                : 50}
                                style={{ margintop: "60px" }} />

                        </div>

                    </div>
                </div>
            </Card>
            <div className='row mt-2'>
                <div className='col-sm-4 col-md-4' >
                    <Card title="Your Top Skills">
                        {
                            isNaN(sum / strength.length) ?
                                "Way more to achieve"
                                :

                                <div >
                                    <CircularProgress progress={sum / strength.length}
                                    />
                                </div>
                        }
                        <div className="table-bless " style={{ marginTop: "-50px" }}>

                            <Table className="table-borderless">

                                <tbody>
                                    {
                                        strength.length > 0 && strength.map((skill) => {
                                            return (
                                                <>
                                                    <tr >
                                                        <td className='title-sm'><ul><li>{skill.tags}</li></ul></td>
                                                        <td>{skill.totalTagPercentage}</td>

                                                    </tr>
                                                </>
                                            )
                                        })

                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </div>
                <div className='col-sm-8 col-md-8'>
                    <Card>
                        <Strength recommendations={overallAnalysis} weakness={weakness} strength={strength} />
                    </Card>
                </div>
            </div>


        </>
    )
}

export default DashboardLearner