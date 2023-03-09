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

const ReportDownload = () => {

    const [report, setReport] = useState([]);
    const [reportName, setReportName] = useState('');
    const [reportSid, setReportSid] = useState('');
    const [trainingSid, setTrainingSid] = useState('ALL');
    const [assessmentSid, setAssessmentSid] = useState('ALL');
    const [passPercentage, setPassPercentage] = useState('50');
    const { user, spinner } = useContext(AppContext);
    const [trainingList, setTrainingList] = useState([]);
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const [labList, setLabList] = useState([]);
    const [labId, setLabId] = useState('ALL');
    const [instructorList, setInstructorList] = useState([]);
    const [instructorSid, setInstructorSid] = useState('ALL');
    let assessment = [];
    let instructor = [];
    let reportTypeWithSid = [];

    const Toast = useToast();
    // get all training
    const getTrainings = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getAllTrainingByPage(user.role, pagination, pageSize).then(
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
    const generateLabReport = () => {
        // const instructor = "ALL";
        try {
            spinner.show();
            RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportSid, trainingSid).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'TrainingLabsReport.xlsx');
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

    for(let i=0; i<report.length; i++){
        reportTypeWithSid.push({
            "typeNSid": `${report[i].reportType},${report[i].sid}`
        })
    }
    useEffect(() => {
        axios.get("https://trainsoft.live/insled/v2/get-report-seed-data").then((res) => {
            setReport(res.data);
        });
        getTrainings();
        getAllLabs();
        getInstructor();

    }, []);

    return (<>
        <div className='col-6'>
            <label className="mb-2 label form-label ">Report Type</label>
            <div className="input-wrapper">

                <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                    setReportName(e.target.value.split(',')[0]);
                    setReportSid(e.target.value.split(',')[1])}}>
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

            </div>
        </div>
        {
            reportName === "Assessment" ?
                <Formik
                    initialValues={{
                        "download": ''
                    }}
                    onSubmit={(values) => generateReport()}>
                    {({ handleSubmit }) => (<>
                        <form onSubmit={handleSubmit} className="my-3">
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
                                                <div className='col-6'>
                                                    <label for="fname">Pass Percentage:</label>
                                                    <input type="text" value={passPercentage} onChange={e => setPassPercentage(e.target.value)} className="form-control" style={{borderRadius:"20px", background:"#F8FAFB"}} />
                                                </div>
                                               
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
                : ''}
        {
            reportName === "Attendance" ?

                <p className='ml-4 mb-2 label form-label'>Coming Soon</p>
                : ''
        }

        {
            reportName === "Labs" ?

                <Formik
                    initialValues={{
                        "download": '',
                    }}
                    onSubmit={(values) => generateLabReport()}>
                    {({ handleSubmit, values }) => (<>
                        <form onSubmit={handleSubmit} className="my-3">
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
                            <div className=" mt-5 ml-4">
                                                <Button type="submit" className=" px-4">Generate Report {DOWNLOAD_ICON} </Button>
                                            </div>
                        </form>
                    </>)}
                </Formik>
                : ""}

        {
            reportName === "Trainer Feedback" ?

                <Formik
                    initialValues={{
                        "download": '',
                    }}
                    onSubmit={(values) => generateLabReport()}>
                    {({ handleSubmit, values }) => (<>
                        <form onSubmit={handleSubmit} className="my-3">
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
                                                    instructorSid === "ALL" && trainingList.map((item) => {
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
                                            <label className="mb-2 label form-label ">Instructor</label>
                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                                setInstructorSid(e.target.value);

                                            }}>
                                                <option value="ALL">ALL</option>
                                                {
                                                    trainingSid === "ALL" && instructor.map((item) => {
                                                        return (
                                                            <>
                                                                <option value={item.sid}>
                                                                    {item.name.length > 22 ? item.name.substring(0, 22) + "..." : item.name}
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
                           
                                <div className=" mt-5 ml-4">
                                    <Button type="submit" className="px-4">Generate Report {DOWNLOAD_ICON} </Button>
                                </div>
                          


                        </form>
                    </>)}
                </Formik>
                : ""}

        {
            reportName === "Training Feedback"
                || reportName === "Login History"
                || reportName === "Lab Test Report"
                || reportName === "Coding Test Report" ?
                
                <Formik
                    initialValues={{
                        "download": ''
                    }}
                    onSubmit={(values) => generateThreeReport()}>
                    {({ handleSubmit, values }) => (<>
                        <form onSubmit={handleSubmit} className="my-3">

                            <div className='row'>
                                <div className="jcc">
                                    <div className=" m-4">
                                        <Button type="submit" className=" mr-2 px-4">Generate Report {DOWNLOAD_ICON} </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>)}
                </Formik>
                : ""}

    </>)
}
export default ReportDownload