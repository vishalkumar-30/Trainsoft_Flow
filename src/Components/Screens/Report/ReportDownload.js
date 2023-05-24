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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    // const [labList, setLabList] = useState([]);
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
    const [showReport, setShowReport] = useState(null);
    const [studentSid, setStudentSid] = useState('');
    const [scrollLeftInterval, setScrollLeftInterval] = useState(null);
    const [scrollRightInterval, setScrollRightInterval] = useState(null);
    // const hrithikSid = "354F373847414839374238383836433941374144483839384334335532433331363735364B3545364B413444343438394E453233373831324C33413431434233";
    // const newLearnSid = "401D2043EAF8446E83E6B89D23332414F99CE8AC02D148F0B9F2D22CAA45B28E";

    // const [trainingLabsList2, setTrainingLabsList2] = useState(null);
    // const [trainingLabsList3, setTrainingLabsList3] = useState(null);

    let assessment = [];
    let labList = [];
    let instructor = [];
    let reportTypeWithSid = [];
    let data = [];

    const Toast = useToast();

    function scrollLeft() {
        const tableWrapper = document.querySelector(".table-wrapper");
        if (scrollRightInterval > 0) {
            tableWrapper.scrollLeft -= 50;
        }


        const table = document.querySelector(".table-wrapper table");
        table.querySelectorAll("tr").forEach((row) => {
            row.insertBefore(row.lastElementChild, row.firstElementChild);
        });
    }

    function scrollRight() {
        const tableWrapper = document.querySelector(".table-wrapper");
        tableWrapper.scrollLeft += 50;

        const table = document.querySelector(".table-wrapper table");
        table.querySelectorAll("tr").forEach((row) => {
            row.appendChild(row.firstElementChild);
        });
    }

    function handleLeftMouseDown() {
        scrollLeft();
        setScrollLeftInterval(setInterval(scrollLeft, 500));
    }

    function handleRightMouseDown() {
        scrollRight();
        setScrollRightInterval(setInterval(scrollRight, 500));
    }

    function handleMouseUp() {
        clearInterval(scrollLeftInterval);
        clearInterval(scrollRightInterval);
    }
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
    // const getAllLabs = () => {
    //     try {
    //         spinner.show();
    //         RestService.getAllLabs().then(
    //             response => {

    //                 if (response.status === 200) {
    //                     setLabList(response.data.labDetails);

    //                 }
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         ).finally(() => {
    //             spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on getAllLabs()", err)
    //     }

    // }

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

    //show reports for supervisor only
    const getSupervisorReportTrainingDetailsSupervisor = () => {
        try {
            spinner.show();
            RestService.getSupervisorReportTrainingDetails(studentSid, trainingSid).then(
                response => {
                    if (response.status === 200) {
                        setShowReport(response.data.sectionDetails);
                        // setTrainingSid('');
                        // setStudentSid('');

                    }
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
            if (trainingDetailsList[i].courseContentResposeTOList[j].type === "LAB") {
                labList.push({
                    "labName": trainingDetailsList[i].courseContentResposeTOList[j].contentName,
                    "labId": trainingDetailsList[i].courseContentResposeTOList[j].labId
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
 
    const key = 'contentName';
        const key1 = 'labName';
    assessment = [...new Map(assessment.map(item =>
      [item[key], item])).values()];
      labList = [...new Map(labList.map(item =>
        [item[key1], item])).values()];
        
    useEffect(() => {
        axios.get("https://trainsoft.live/insled/v2/get-report-seed-data").then((res) => {
            setReport(res.data);
        });
        getTrainings();
        // getAllLabs();
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
                                <option value="training progress">Training Progress</option>
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

                                                      
                                                              <div className='col-6'>
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
                                                  
                                                </div>

                                            </>

                                        </div>
                                    </div>
                                    <div className=" mt-5 ml-4">
                                                        <Button type="submit" className="  px-4">Generate Report {DOWNLOAD_ICON} </Button>
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
                                                        getTrainingContentsByTrainingSid(e.target.value);
                                                    }}>
                                                        <option value="" disabled selected hidden>Select Training</option>
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
                                                   
                                                </div>
                                            </>

                                        </div>

                                    </div>
                                    <div className=" mt-5 ml-4">
                                                        <Button type="submit" className="  px-4">Generate Report {DOWNLOAD_ICON} </Button>
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
            {
                reportName === "training progress" ?
                    <div className="" style={{ marginBottom: "120px" }}>

                        <div className='row py-2 ' style={{ background: "#49167E", margin: "0", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                            <div className='col-6 d-flex ' style={{ alignContent: "center", alignItems: "center" }}>
                                <label className="col-3 mt-2 label form-label text-white ">Training Name</label>

                                <select className="form-control col-6" style={{ borderRadius: "10px", backgroundColor: "rgb(248, 250, 251)" }}
                                    onChange={(e) => {
                                        setTrainingSid(e.target.value);
                                    }}
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

                            </div>

                            {
                                trainingSid.length > 0 ?

                                    <div className='col-6 d-flex '>
                                        <label className="mt-2 col-3 label form-label text-white">Learner</label>
                                        <select className="form-control col-6" style={{ borderRadius: "10px", backgroundColor: "rgb(248, 250, 251)" }}
                                            onChange={(e) => setStudentSid(e.target.value)}
                                        >
                                            <option hidden>Select Learner</option>
                                            {


                                                learnerList.map((item) => {
                                                    return (
                                                        <>
                                                            <option value={item.sid}>{item.name}</option>
                                                        </>
                                                    )
                                                })}
                                        </select>
                                        <button className='p-2 mt-1' style={{ marginLeft: "10px", borderRadius: "10px", height: "35px", backgroundColor: "rgb(248, 250, 251)", width: "100px" }} disabled={trainingSid.length === 0 || studentSid.length === 0} onClick={() => getSupervisorReportTrainingDetailsSupervisor()}>Submit</button>
                                    </div>
                                    :
                                    ''
                            }
                        </div>

                        <div>
                            {
                                showReport !== null ?
                                    <>
                                        <table>
                                            <div class="row">
                                                <div class="col-2">
                                                    <table className='c'>
                                                        <tr>
                                                            <th>Section</th>
                                                        </tr>

                                                        <tr>
                                                            <td>Study Material</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Videos</td>

                                                        </tr>
                                                        <tr>
                                                            <td>Assessments</td>

                                                        </tr>
                                                        <tr>
                                                            <td>Labs</td>

                                                        </tr>
                                                        <tr>
                                                            <td>Challenges</td>

                                                        </tr>
                                                    </table>
                                                </div>
                                                <div class="col-10 table-wrapper">
                                                    <table className='c'>
                                                        <tr>
                                                            {
                                                                showReport.DOCUMENTS.map((item) => {
                                                                    return (
                                                                        <th>{item.sectionName.split("", 8)}</th>
                                                                    )
                                                                })

                                                            }




                                                        </tr>
                                                        <tr>
                                                            {
                                                                showReport.DOCUMENTS.map((item) => {
                                                                    return (
                                                                        <td>{item.documentCompletion}</td>
                                                                    )
                                                                })

                                                            }

                                                        </tr>
                                                        <tr>
                                                            {
                                                                showReport.VIDEO.map((item) => {
                                                                    return (
                                                                        <td>{item.videoCompletion}</td>
                                                                    )
                                                                })

                                                            }

                                                        </tr>
                                                        <tr>
                                                            {
                                                                showReport.ASSESSMENT.map((item) => {
                                                                    return (
                                                                        <td>{item.assessmentCompletion}</td>
                                                                    )
                                                                })

                                                            }

                                                        </tr>
                                                        <tr>
                                                            {
                                                                showReport.LAB.map((item) => {
                                                                    return (
                                                                        <td>{item.labCompletion}</td>
                                                                    )
                                                                })

                                                            }

                                                        </tr>
                                                        <tr>
                                                            {
                                                                showReport.CODING.map((item) => {
                                                                    return (
                                                                        <td>{item.codingCompletion}</td>
                                                                    )
                                                                })

                                                            }

                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </table>
                                        <div style={{ marginTop: "-135px", position: "relative" }}>
                                            <button

                                                onMouseDown={handleLeftMouseDown}
                                                onMouseUp={handleMouseUp}
                                                style={{ marginLeft: "230px" }}
                                            >
                                                <ArrowBackIosIcon />
                                            </button>
                                            <button
                                                style={{ float: "right", marginRight: "-20px" }}
                                                onMouseDown={handleRightMouseDown}
                                                onMouseUp={handleMouseUp}
                                            >

                                                <ArrowForwardIosIcon />
                                            </button>

                                        </div>


                                    </>
                                    : ""
                            }

                        </div>

                    </div>
                    : ''
            }

        </>)
}
export default ReportDownload