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
            reportName === "3B7747C383E2809839C383C2A84BC382C2A8C385C2BE04C382C2A22BC383E280BA12C382C2B52FC383C592C383C2A46DC383C2B4C385C2BE254310C38BC593C383C5A1C383C5BE503FC38BE280A0C382C2A3C382C281" ?
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
            reportName === "5A62C382C2B0C382C2BD382348C386E28099C38BC5934F61C382C2B1C382C2BCC382C2B5C3A2E282ACC2BAC382C2B356C382C2B35EC382C2AE374E416DC385E28099C3A2E282ACC2B073C383E282AC36C385C2BEC382C2B2C383E28098" ?

                <p className='ml-4 mb-2 label form-label'>Coming Soon</p>
                : ''
        }

        {
            reportName === "C382C2AAC38BC593C385C2B8C383C5A02AC382C2A44FC382C2A9C382C2B4C382C28F4955C382C2BC4B31C385C2BDC383E2809E57213BC3A2E282ACC2B92345C383C2A7C385C2BDC383C2B31719C382C2ADC383C2AA62C383CB9C" ?

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
            reportName === "C3A2E282ACC29DC383C2BE07C383C2A22F414E22C382C28D57C383C2B32A74C383E2809C04C383C2A3C382C2BA40C382C2A903764242C382C2B5C38BE280A032C383E2809E41657FC383C5A0C383E280A6" ?

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
            reportName === "C382C2A871114AC382C2AD2E4243C382C2A629C383C2B30E29137BC383C2A50451C383C2A2C382C2A823C382C2BB4DC383C2BAC38BE280A010C383C2BBC382C2AF6C67C383E280A1C3A2E282ACE2809D"
                || reportName === "C382C28DC383CB9C7DC383C290C383E280A1414456C382C2A25FC385E2809CC3A2E282ACC5BEC383C2A356C383E2809D25C385C2BDC382C28F53527CC383C59247C3A2E2809EC2A2C3A2E282ACC5933967C383C2BBC3A2E282ACE2809C417774"
                || reportName === "6AC3A2E282ACC5BEC383C2A4C382C2B538394DC382C2BAC3A2E282ACE2809C05C385E2809CC382C2A1C382C2B7C383C2BCC3A2E282ACC2BA20C3A2E282ACC5BE495EC382C2B14BC385C2A14379C386E2809947C383C2A3740CC383C2A33CC383C2AE"
                || reportName === "C2A8E280935015C390094A1AC2B077745DC392C5BD49C3A8595A0B1C5D3E43C692C28DC38CC383E280A0C3B9225979" ?
                
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