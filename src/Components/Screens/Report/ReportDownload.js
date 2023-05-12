import React, { useState, useEffect, useContext } from 'react'
import { Formik } from "formik"
import { Button } from "../../Common/Buttons/Buttons"
import { SelectInput } from "../../Common/InputField/InputField"
import * as Yup from 'yup';
import axios from 'axios';
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';
import useToast from '../../../Store/ToastHook';
import { DOWNLOAD_ICON } from '../../Common/Icon';
import ReportBarchart from './ReportBarchart';
import ReportDonutChar from './ReportDonutChar';
import ReportHeatmapChart from './ReportHeatmapChart';
import ReportHorizontalBarChart from './ReportHorizontalBarChart';
import ReportBarchartLabs from './ReportBarchartLabs';
import ReportBarchartLabs2 from './ReportBarchartLabs2';
import ReportBarchart2 from './ReportBarchart2';

const ReportDownload = () => {

    const [report, setReport] = useState([]);
    const [reportName, setReportName] = useState('');
    const [reportSid, setReportSid] = useState('');
    const [trainingSid, setTrainingSid] = useState('ALL');
    const [assessmentSid, setAssessmentSid] = useState('ALL');
    const [passPercentage, setPassPercentage] = useState('50');
    const { user, spinner, ROLE } = useContext(AppContext);
    const [trainingList, setTrainingList] = useState([]);
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const [labList, setLabList] = useState([]);
    const [labId, setLabId] = useState('ALL');
    const [instructorList, setInstructorList] = useState([]);
    const [instructorSid, setInstructorSid] = useState('ALL');
    const [labUsage, setLabUsage] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [name, setName] = useState([]);
    const [learnerList, setLearnerList] = useState([]);
    const [selectLearner, setSelectLearner] = useState('ALL');
    const [trainingAssessmentList, setTrainingAssessmentList] = useState(null);
    const [trainingLabsList1, setTrainingLabsList1] = useState(null);
    const [loginDetails, setLoginDetails] = useState([]);

    // const [trainingLabsList2, setTrainingLabsList2] = useState(null);
    // const [trainingLabsList3, setTrainingLabsList3] = useState(null);

    let assessment = [];
    let instructor = [];
    let reportTypeWithSid = [];
    let data = [];

    const Toast = useToast();
    // get all training
    const getTrainings = async (pagination = "1") => {
        try {
            let pageSize = 30;
            spinner.show();
            const status = "ENABLED";
            RestService.getAllTrainingByPage(user.role, pagination, pageSize, status).then(
                response => {
                    setTrainingList(response.data);
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

    //get all section and content
    const getTrainingContentsByTrainingSid = async (trainingSid) => {
        try {
            spinner.show();
            RestService.getTrainingContentsByTrainingSid(trainingSid).then(
                response => {

                    if (response.status === 200) {
                        setTrainingDetailsList(response.data.courseSectionResponseTO);

                    }
                },
                err => {
                    spinner.hide();

                }
            ).finally(() => {
                spinner.hide();

            });
        } catch (err) {
            console.error("error occur on getTrainingContentsByTrainingSid()", err)
        }
    }

    // get all labs
    const getAllLabs = () => {
        try {
            spinner.show();
            RestService.getAllLabs().then(
                response => {

                    if (response.status === 200) {
                        setLabList(response.data.labDetails);

                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllLabs()", err)
        }

    }

    // get all instructor
    const getInstructor = () => {
        try {
            spinner.show();
            RestService.getInstructor().then(
                response => {
                    if (response.status === 200) {
                        setInstructorList(response.data);
                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getInstructor()", err)
        }
    }

    // assessment report
    const generateReport = () => {
        // const instructor = "ALL";

        try {
            spinner.show();
            RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportSid, trainingSid).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'AssessmentReport.xlsx');
                document.body.appendChild(link);
                link.click();
                setAssessmentSid('ALL');
                setLabId('ALL');
                setPassPercentage('50');

                setTrainingSid('ALL');
            })

                .finally(() => {
                    spinner.hide();
                });
        }
        catch (err) {
            console.error('error occur on generateReport', err)
        }
    }

    // training feedback, login history, lab test report
    const generateThreeReport = () => {
        // const instructor = "ALL";

        try {
            spinner.show();
            RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportSid, trainingSid).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'AssessmentReport.xlsx');
                document.body.appendChild(link);
                link.click();
                setAssessmentSid('ALL');
                setLabId('ALL');
                setPassPercentage('50');

                setTrainingSid('ALL');
            })

                .finally(() => {
                    spinner.hide();
                });
        }
        catch (err) {
            console.error('error occur on generateReport', err)
        }
    }

    // assessment report
    // const generateLabReport = () => {
    //     // const instructor = "ALL";
    //     try {
    //         spinner.show();
    //         RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportSid, trainingSid).then((response) => {
    //             const url = window.URL.createObjectURL(new Blob([response.data]));
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', 'TrainingLabsReport.xlsx');
    //             document.body.appendChild(link);
    //             link.click();
    //             setAssessmentSid('ALL');
    //             setLabId('ALL');
    //             setPassPercentage('50');
    //             setTrainingSid('ALL');
    //         })

    //             .finally(() => {
    //                 spinner.hide();
    //             });
    //     }
    //     catch (err) {
    //         console.error('error occur on generateReport', err)
    //     }
    // }

    //get lab usage details
    const getLabUsageDetails = () => {
        {
            try {
                spinner.show();
                RestService.getLabUsageDetails().then(
                    response => {
                        if (response.status === 200) {
                            setLabUsage((Object.values(response.data)));
                        }
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getLabUsageDetails()", err)
            }
        }
    }

    //get trainer feedback details
    const getTrainerFeedbackDetails = () => {
        {
            try {
                spinner.show();
                RestService.getTrainerFeedbackDetails().then(
                    response => {
                        if (response.status === 200) {
                            setFeedback(response.data.map(feedback => feedback.feedback.toFixed(1)));
                            setName(response.data.map(name => name.trainerName));
                        }
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getTrainerFeedbackDetails()", err)
            }
        }
    }

    //get training feedback details
    const getTrainingFeedbackDetails = () => {
        {
            try {
                spinner.show();
                RestService.getTrainingFeedbackDetails().then(
                    response => {
                        if (response.status === 200) {
                            setFeedback(response.data.map(feedback => feedback.feedback.toFixed(1)));
                            setName(response.data.map(name => name.trainingName));
                        }
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getTrainingFeedbackDetails()", err)
            }
        }
    }

    // get training assessment details
    const getTrainingAssessmentDetails = () => {
        {
            try {
                spinner.show();
                RestService.getTrainingAssessmentDetails(assessmentSid, selectLearner, trainingSid).then(
                    response => {
                        if (response.status === 200) {

                            setTrainingAssessmentList(response.data);

                        }
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getTrainingAssessmentDetails()", err)
            }
        }

    }

    // get lab score details
    const getLabScoreDetails = () => {
        {
            try {
                spinner.show();
                RestService.getLabScoreDetails(labId, selectLearner, trainingSid).then(
                    response => {
                        if (response.status === 200) {


                            setTrainingLabsList1(response.data);


                        }
                    },
                    err => {
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } catch (err) {
                console.error("error occur on getLabScoreDetails()", err)
            }
        }

    }
    //get login details
    const getLoginDetails = () => {
        {
            try {
                spinner.show();
                RestService.getLoginDetails().then(
                    response => {
                        if (response.status === 200) {


                            setLoginDetails(response.data);
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
                console.error("error occur on getLoginDetails()", err)
            }
        }
    }

    // get all learners
    const getLearners = async (pagination = 1) => {
        try {
            let pageSize = 100
            spinner.show('Loading... please wait')
            RestService.getAllUserByPage("ALL", pagination, pageSize).then(
                response => {
                    setLearnerList(response.data.map((res => {
                        return (
                            { "sid": res.sid, "name": res.appuser.name })
                    })))

                    spinner.hide();
                },
                err => {
                    console.error("error occur on getLearners()", err)
                    spinner.hide();
                }
            )
        } catch (err) {
            console.error("error occur on getLearners()", err)
            spinner.hide();
        }
    }
    if (trainingDetailsList.length > 0) {
        for (let i = 0; i < trainingDetailsList.length; i++) {
            for (let j = 0; j < trainingDetailsList[i].courseContentResposeTOList.length; j++) {
                if (trainingDetailsList[i].courseContentResposeTOList[j].type === "ASSESSMENT") {
                    assessment.push({
                        "contentName": trainingDetailsList[i].courseContentResposeTOList[j].contentName,
                        "sid": trainingDetailsList[i].courseContentResposeTOList[j].sid
                    })
                }
            }
        }
    }
    for (let i = 0; i < trainingDetailsList.length; i++) {
        for (let j = 0; j < trainingDetailsList[i].courseContentResposeTOList.length; j++) {
            if (trainingDetailsList[i].courseContentResposeTOList[j].type === "ASSESSMENT") {
                assessment.push({
                    "contentName": trainingDetailsList[i].courseContentResposeTOList[j].contentName,
                    "sid": trainingDetailsList[i].courseContentResposeTOList[j].sid
                })
            }
        }
    }

    for (let i = 0; i < instructorList.length; i++) {
        instructor.push({
            "name": instructorList[i].appuser.name,
            "sid": instructorList[i].appuser.sid
        })
    }

    for (let i = 0; i < report.length; i++) {
        reportTypeWithSid.push({
            "typeNSid": `${report[i].reportType},${report[i].sid}`
        })
    }


    if (loginDetails.length > 0) {
        for (let i = 0; i < loginDetails[0].monthlyLoginDetails.length; i++) {
            let value = Object.values(loginDetails[0].monthlyLoginDetails[i].dayWiseLoginCount);
            let key = Object.keys(loginDetails[0].monthlyLoginDetails[i].dayWiseLoginCount)
            for (let j = 0; j < value.length; j++) {
                data.push({
                    "date": key[j].substring(0, 10),
                    "count": value[j]
                })
            }

        }
    }

    useEffect(() => {
        axios.get("https://trainsoft.live/insled/v2/get-report-seed-data").then((res) => {
            setReport(res.data);
        });
        getTrainings();
        getAllLabs();
        getInstructor();
        getLearners();

    }, []);

    useEffect(() => {
        if (reportName === "Lab Usage") {
            getLabUsageDetails();
        }
        if (reportName === "Trainer Feedback") {
            getTrainerFeedbackDetails();
        }
        if (reportName === "Training Feedback") {
            getTrainingFeedbackDetails();
        }
        if (reportName === "Login History") {
            getLoginDetails();
        }
    }, [reportName]);


    return (
        <>
            {
                user.role === ROLE.SUPERVISOR ?
                    <div className='col-6'>
                        <label className="mb-2 label form-label ">Report Type</label>
                        <div className="input-wrapper">

                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                setReportName(e.target.value.split(',')[0]);
                                setReportSid(e.target.value.split(',')[1])
                            }}>
                                <option value="" disabled selected hidden>Select Report Type</option>
                                {
                                    reportTypeWithSid.map((item) => {
                                        return (
                                            <>
                                                <option value={item.typeNSid}>{item.typeNSid.split(',')[0]}</option>
                                            </>
                                        )
                                    })
                                }

                            </select>
                            {/* <Button type="submit" className="  px-4">Display Report </Button> */}
                        </div>

                    </div>
                    :
                    ''
            }


            {
                reportName === "Assessment" ?
                    <>
                        <Formik
                            initialValues={{
                                "download": ''
                            }}
                            onSubmit={(values) => {

                                trainingSid === 'ALL' && assessmentSid === 'ALL' ? generateReport() : getTrainingAssessmentDetails()
                            }}>
                            {({ handleSubmit }) => (<>
                                <form onSubmit={handleSubmit} className="my-2">
                                    <div className='row ml-2'>
                                        <div className="jcc">
                                            <><div className='col'>
                                                <label className="mb-2 label form-label ">Training</label>
                                                <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                    setTrainingSid(e.target.value);
                                                    getTrainingContentsByTrainingSid(e.target.value);
                                                }}>
                                                    <option value="ALL">ALL</option>
                                                    {
                                                        trainingList.map((item) => {
                                                            return (
                                                                <>
                                                                    <option value={item.sid}>{item.name}</option>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </select>
                                            </div>

                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <label className="mb-2 label form-label ">Assessment</label>
                                                        <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                            setAssessmentSid(e.target.value);

                                                        }}>
                                                            <option value="ALL">ALL</option>
                                                            {
                                                                assessment.map((item) => {
                                                                    return (
                                                                        <>
                                                                            <option value={item.sid}>{item.contentName}</option>
                                                                        </>
                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>
                                                    {/* {
                                                        alignment === 'Display Report' ? */}
                                                    {
                                                        trainingSid !== 'ALL' || assessmentSid !== 'ALL' ?

                                                            <div>
                                                                <label className="mb-2 label form-label ">Learner</label>
                                                                {
                                                                    assessmentSid !== 'ALL' && trainingSid !== 'ALL' ?

                                                                        <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                                            setSelectLearner(e.target.value);

                                                                        }}>
                                                                            <option value="ALL">ALL</option>
                                                                        </select>
                                                                        :
                                                                        <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                                            setSelectLearner(e.target.value);

                                                                        }}>
                                                                            <option value="ALL">ALL</option>
                                                                            {

                                                                                learnerList.map((item) => {
                                                                                    return (
                                                                                        <>

                                                                                            <option value={item.sid}>{item.name}</option>
                                                                                        </>
                                                                                    )
                                                                                })

                                                                            }

                                                                        </select>
                                                                }

                                                            </div>
                                                            :
                                                            <div className='col-6'>
                                                                <label for="fname" className="mb-2 label form-label ">Pass Percentage:</label>
                                                                <input type="text" value={passPercentage} onChange={e => setPassPercentage(e.target.value)} className="form-control" style={{ borderRadius: "20px", background: "#F8FAFB" }} />
                                                            </div>
                                                    }
                                                    <div className=" mt-5 ml-4">
                                                        <Button type="submit" className="  px-4">Generate Report {DOWNLOAD_ICON} </Button>
                                                    </div>

                                                </div>

                                            </>

                                        </div>
                                    </div>
                                    {

                                        trainingAssessmentList !== null &&
                                            (trainingAssessmentList.oneTrainingAllAssessment !== null) ?
                                            <div className='mt-2'><ReportBarchart2 trainingAssessmentList={trainingAssessmentList} /></div>
                                            : trainingAssessmentList !== null &&
                                                (trainingAssessmentList.oneTrainingOneAssessment !== null) ?
                                                <div className='mt-2'><ReportBarchart trainingAssessmentList={trainingAssessmentList} /></div>
                                                : ''
                                    }
                                    {/* <div className=" mt-5 ml-4">
                                        <Button type="submit" className="  px-4">Generate Report {DOWNLOAD_ICON} </Button>
                                    </div> */}
                                </form>
                            </>)}
                        </Formik>

                    </>
                    : ''}
            {
                reportName === "Attendance" || reportName === "Coding Test Report" ?

                    <p className='ml-4 mb-2 label form-label'>Coming Soon</p>
                    : ''
            }

            {
                reportName === "Lab Usage" ?
                    <>
                        {/* <Formik
                    initialValues={{
                        "download": '',
                    }}
                    onSubmit={(values) => generateLabReport()}>
                    {({ handleSubmit, values }) => (<>
                        <form onSubmit={handleSubmit} >
                            <div className='row ml-2'>
                                <div className="jcc">
                                    <>
                                        <div className='col'>
                                            <label className="mb-2 label form-label ">Training</label>
                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                setTrainingSid(e.target.value);

                                            }}>
                                                <option value="ALL">ALL</option>
                                                {
                                                    trainingList.map((item) => {
                                                        return (
                                                            <>
                                                                <option value={item.sid}>{item.name}</option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='col'>
                                            <label className="mb-2 label form-label ">Labs</label>
                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                setLabId(e.target.value);

                                            }}>
                                                <option value="ALL">ALL</option>
                                                {
                                                    labList.map((item) => {
                                                        return (
                                                            <>
                                                                <option value={item.labId}>
                                                                    {item.labName.length > 22 ? item.labName.substring(0, 22) + "..." : item.labName}
                                                                </option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </select>


                                        </div>
                                    </>

                                </div>

                            </div>
                           
                        </form>
                      
                    </>)}
                </Formik> */}

                        <ReportDonutChar labUsage={labUsage} />
                        {/* <div className=" mt-5 mb-2 ml-4">
                            <Button type="submit" className=" px-4">Generate Report {DOWNLOAD_ICON} </Button>
                        </div> */}
                    </>
                    : ""}

            {
                reportName === "Lab Assessment Report" ?
                    <>
                        <Formik
                            initialValues={{
                                "download": '',
                            }}
                            onSubmit={(values) => getLabScoreDetails()}>
                            {({ handleSubmit, values }) => (<>
                                <form onSubmit={handleSubmit} >
                                    <div className='row ml-2'>
                                        <div className="jcc">
                                            <>
                                                <div className='col'>
                                                    <label className="mb-2 label form-label ">Training</label>
                                                    <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                        setTrainingSid(e.target.value);

                                                    }}>
                                                        <option value="">Select Training</option>
                                                        {
                                                            trainingList.map((item) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.sid}>{item.name}</option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className='col'>
                                                    <label className="mb-2 label form-label ">Labs</label>
                                                    <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                        setLabId(e.target.value);

                                                    }}>
                                                        <option value="ALL">ALL</option>
                                                        {
                                                            labList.map((item) => {
                                                                return (
                                                                    <>
                                                                        <option value={item.labId}>
                                                                            {item.labName.length > 22 ? item.labName.substring(0, 22) + "..." : item.labName}
                                                                        </option>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>


                                                </div>
                                                <div>
                                                    <label className="mb-2 label form-label ">Learner</label>
                                                    {
                                                        trainingSid !== 'ALL' && labId !== 'ALL' ?

                                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                                setSelectLearner(e.target.value);

                                                            }}>
                                                                <option value="ALL">ALL</option>
                                                               
                                                            </select>
                                                            :
                                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                                setSelectLearner(e.target.value);
        
                                                            }}>
                                                                <option value="ALL">ALL</option>
                                                                {
                                                                    // assessmentSid !== 'ALL' && trainingSid !== 'ALL' ?
                                                                    learnerList.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.sid}>{item.name}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                    // : ''
                                                                }
        
                                                            </select>

                                                    }
                                                    <div className=" mt-5 ml-4">
                                                        <Button type="submit" className="  px-4">Generate Report {DOWNLOAD_ICON} </Button>
                                                    </div>
                                                </div>
                                            </>

                                        </div>

                                    </div>

                                </form>

                            </>)}
                        </Formik>

                        <div className='mt-2'>
                            {

                                // : trainingLabsList1 !== null && trainingLabsList1.oneTrainingAllLabs !== null ?
                                // <ReportBarchartLabs trainingLabsList={trainingLabsList1.oneTrainingAllLabs} />
                                trainingLabsList1 !== null && trainingLabsList1.oneTrainingAllLabs !== null
                                    ?
                                    <ReportBarchartLabs2 trainingLabsList={trainingLabsList1} />
                                    :
                                    trainingLabsList1 !== null && trainingLabsList1.oneTrainingOneLab !== null ?
                                        <ReportBarchartLabs trainingLabsList={trainingLabsList1} />
                                        : ''
                            }
                            {/* <ReportBarchartLabs /> */}
                        </div>
                        {/* <div className=" mt-5 mb-2 ml-4">
                            <Button type="submit" className=" px-4">Generate Report {DOWNLOAD_ICON} </Button>
                        </div> */}
                    </>
                    : ""}
            {
                reportName === "Trainer Feedback" || reportName === "Training Feedback" ?
                    // || reportName === "Training Feedback" ?

                    // <Formik
                    //     initialValues={{
                    //         "download": '',
                    //     }}
                    //     onSubmit={(values) => generateLabReport()}>
                    //     {({ handleSubmit, values }) => (<>
                    //         <form onSubmit={handleSubmit} className="my-3">
                    //             <div className='row ml-2'>
                    //                 <div className="jcc">
                    //                     <>
                    //                         <div className='col'>
                    //                             <label className="mb-2 label form-label ">Training</label>
                    //                             <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                    //                                 setTrainingSid(e.target.value);

                    //                             }}>
                    //                                 <option value="ALL">ALL</option>

                    //                                 {
                    //                                     instructorSid === "ALL" && trainingList.map((item) => {
                    //                                         return (
                    //                                             <>
                    //                                                 <option value={item.sid}>{item.name}</option>
                    //                                             </>
                    //                                         )
                    //                                     })
                    //                                 }
                    //                             </select>
                    //                         </div>
                    //                         <div className='col'>
                    //                             <label className="mb-2 label form-label ">Instructor</label>
                    //                             <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                    //                                 setInstructorSid(e.target.value);

                    //                             }}>
                    //                                 <option value="ALL">ALL</option>
                    //                                 {
                    //                                     trainingSid === "ALL" && instructor.map((item) => {
                    //                                         return (
                    //                                             <>
                    //                                                 <option value={item.sid}>
                    //                                                     {item.name.length > 22 ? item.name.substring(0, 22) + "..." : item.name}
                    //                                                 </option>
                    //                                             </>
                    //                                         )
                    //                                     })
                    //                                 }

                    //                             </select>


                    //                         </div>

                    //                     </>

                    //                 </div>

                    //             </div>

                    //             <div className=" mt-5 ml-4">
                    //                 <Button type="submit" className="px-4">Generate Report {DOWNLOAD_ICON} </Button>
                    //             </div>



                    //         </form>
                    //     </>)}
                    // </Formik>
                    <ReportHorizontalBarChart feedback={feedback} name={name} />
                    : ""}

            {

                reportName === "Login History" ?
                    // || reportName === "Lab Test Report"
                    // || reportName === "Coding Test Report" 

                    // <Formik
                    //     initialValues={{
                    //         "download": ''
                    //     }}
                    //     onSubmit={(values) => generateThreeReport()}>
                    //     {({ handleSubmit, values }) => (<>
                    //         <form onSubmit={handleSubmit} className="my-3">

                    //             <div className='row'>
                    //                 <div className="jcc">
                    //                     <div className=" m-4">
                    //                         <Button type="submit" className=" mr-2 px-4">Generate Report {DOWNLOAD_ICON} </Button>
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </form>
                    //     </>)}
                    // </Formik>
                    <ReportHeatmapChart data={data} />
                    : ""}

        </>)
}
export default ReportDownload