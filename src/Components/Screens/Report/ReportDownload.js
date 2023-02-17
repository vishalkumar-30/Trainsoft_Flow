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
            RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportName, trainingSid).then((response) => {
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
            RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportName, trainingSid).then((response) => {
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
            RestService.generateReport(assessmentSid, instructorSid, labId, passPercentage, reportName, trainingSid).then((response) => {
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

                <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => setReportName(e.target.value)}>
                    <option value="" disabled selected hidden>Select Report Type</option>
                    {
                        report.map((item) => {
                            return (
                                <>
                                    <option value={item.sid}>{item.reportType}</option>
                                </>
                            )
                        })
                    }

                </select>

            </div>
        </div>
        {
            reportName === "3B7747C39139C3A84BC2A8C5BE04C2A22BC39B12C2B52FC38CC3A46DC3B4C5BE254310CB9CC39AC39E503FCB86C2A3C281" ?
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
            reportName === "5A62C2B0C2BD382348C692CB9C4F61C2B1C2BCC2B5E280BAC2B356C2B35EC2AE374E416DC592E280B073C38036C5BEC2B2C391" ?

                <p className='ml-4 mb-2 label form-label'>Coming Soon</p>
                : ''
        }

        {
            reportName === "C2AACB9CC5B8C38A2AC2A44FC2A9C2B4C28F4955C2BC4B31C5BDC38457213BE280B92345C3A7C5BDC3B31719C2ADC3AA62C398" ?

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
            reportName === "E2809DC3BE07C3A22F414E22C28D57C3B32A74C39304C3A3C2BA40C2A903764242C2B5CB8632C38441657FC38AC385" ?

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
            reportName === "C28DC3987DC390C387414456C2A25FC593E2809EC3A356C39425C5BDC28F53527CC38C47E284A2E2809C3967C3BBE28093417774"
                || reportName === "6AE2809EC3A4C2B538394DC2BAE2809305C593C2A1C2B7C3BCE280BA20E2809E495EC2B14BC5A14379C69247C3A3740CC3A33CC3AE"
                || reportName === "C2A871114AC2AD2E4243C2A629C3B30E29137BC3A50451C3A2C2A823C2BB4DC3BACB8610C3BBC2AF6C67C387E28094" ?

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