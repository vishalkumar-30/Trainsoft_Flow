import React, { useState, useContext, useEffect } from 'react'
import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox"
import { ICN_TRASH, ICN_EDIT, ICN_BOOK, ICN_LIBRARY, ICN_PROGRESS, ICN_STORE } from "../../Common/Icon";
import { navigate, Router, Link } from "../../Common/Router";
import CardHeader from '../../Common/CardHeader'
import { TextInput, SelectInput } from '../../Common/InputField/InputField'
import ReportChart from '../../Charts/ReportChart';
import ReportDownload from './ReportDownload';
import AppContext from '../../../Store/AppContext';
import './report.css'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestService from '../../../Services/api.service';
const Report = ({ location }) => {
  const { user, ROLE, spinner } = useContext(AppContext);
  const [trainingList, setTrainingList] = useState([]);
  const [showReport, setShowReport] = useState(null);
  const [showReportDoc, setShowReportDoc] = useState([]);
  const [showReportVideo, setShowReportVideo] = useState([]);
  const [showReportAssessment, setShowReportAssessment] = useState([]);
  const [showReportLab, setShowReportLab] = useState([]);
  const [showReportCoding, setShowReportCoding] = useState([]);
  const learner = JSON.parse(localStorage.getItem('user'))
  const learnerSid = learner.sid;
  const [scrollLeftInterval, setScrollLeftInterval] = useState(null);
  const [scrollRightInterval, setScrollRightInterval] = useState(null);

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

  //show reports
  const getSupervisorReportTrainingDetails = (value) => {
    try {
      spinner.show();
      RestService.getSupervisorReportTrainingDetails(learnerSid, value).then(
        response => {
          if (response.status === 200) {
            setShowReport(response.data.sectionDetails);
            // setShowReportDoc(response.data.sectionDetails.DOCUMENTS);
            // setShowReportVideo(response.data.sectionDetails.VIDEO);
            // setShowReportAssessment(response.data.sectionDetails.ASSESSMENT);
            // setShowReportLab(response.data.sectionDetails.LAB);
            // setShowReportCoding(response.data.sectionDetails.CODING);
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

  useEffect(() => {
    getLearnerTrainings();
  }, []);


  // console.log(showReportDoc);
  // console.log(showReportVideo);
  // console.log(showReportAssessment);
  // console.log(showReportLab);
  // console.log(showReportCoding);

  return (
    <div className="table-shadow p-3">
      {/* <CardHeader {...{ location }} /> */}
      <p style={{ fontSize: "16px", color: "#49167E", fontWeight: "600" }}>Download Report</p>
      <div className="flx tab-btn-group mb-3">
        {/* <TabBtn active={location.state.subPath === "batch"} onClick={() => navigate("/report", { state: { title: 'Report', subTitle: "Batch", subPath: "batch" } })}>Batch</TabBtn> */}
        {/* <TabBtn active={location.state.subPath === "download"} onClick={() => navigate("/report", { state: { title: 'Report', subTitle: "Download", subPath: "download" } })}>Download</TabBtn> */}
        {/* <TabBtn active={location.state.subPath === "course"} onClick={() => navigate("/report/course", { state: { title: 'Report', subTitle: "Course", subPath: "course" } })}>Course</TabBtn>
               {user.role !== "user" &&  <TabBtn active={location.state.subPath === "participants"} onClick={() => navigate("/report/participants", { state: { title: 'Report', subTitle: "Participants", subPath: "participants" } })}>Participants</TabBtn>} */}
        {/* {user.role !== "user" &&  <TabBtn active={location.state.subPath === "download"} onClick={() => navigate("/report/download", { state: { title: 'Report', subTitle: "Download", subPath: "download" } })}>Download</TabBtn>} */}

      </div>
      <Router>
        {/* <Batch path="/" />
                <Course path="course" />
                <Participants path="participants" /> */}
        <ReportDownload path="/" />
      </Router>



      <div className='table-responsive'>

        <div className='row py-1' style={{ background: "#49167E" }}>
          <div className='col-3'>
            <label className="mb-2 label form-label text-white ">Training</label>
            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}
              onChange={(e) => getSupervisorReportTrainingDetails(e.target.value)}
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
            user.role === ROLE.LEARNER ? "" :

              <div className='col-3'>
                <label className="mb-2 label form-label text-white">Learner</label>
                <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}

                >
                  <option hidden>Select Learner</option>
                  <option>Hrithik</option>
                  <option>Learner</option>
                </select>
              </div>
          }
        </div>

        <div>
          {
            showReport !== null ?
            <>
            <table>
              <div class="row">
                <div class="column1">
                  <table>
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
                <div class="column table-wrapper">
                  <table>
                    <tr>
                      {
                        showReport.DOCUMENTS.map((item) => {
                          return (
                            <th>{item.sectionName}</th>
                          )
                        })

                      }



                      {/* <th>First Name</th>
                      <th>Last Name</th>
                      <th>Points</th>
                      <th>Points1</th>
                      <th>Points2</th>
                      <th>Points3</th>
                      <th>Points4</th>
                      <th>Points5</th> */}
                    </tr>
                    <tr>
                      {
                        showReport.DOCUMENTS.map((item) => {
                          return (
                            <td>{item.documentCompletion}</td>
                          )
                        })

                      }

                      {/* <td>Jill</td>
                      <td>Smith</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td>
                      <td>50</td> */}
                    </tr>
                    <tr>
                      {
                        showReport.VIDEO.map((item) => {
                          return (
                            <td>{item.videoCompletion}</td>
                          )
                        })

                      }
                      {/* <td>Eve</td>
                      <td>Jackson</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td> */}
                    </tr>
                    <tr>
                      {
                        showReport.ASSESSMENT.map((item) => {
                          return (
                            <td>{item.assessmentCompletion}</td>
                          )
                        })

                      }
                      {/* <td>Adam</td>
                      <td>Johnson</td>
                      <td>67</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td> */}
                    </tr>
                    <tr>
                      {
                        showReport.LAB.map((item) => {
                          return (
                            <td>{item.labCompletion}</td>
                          )
                        })

                      }
                      {/* <td>Jill</td>
                      <td>Smith</td>
                      <td>50</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td> */}
                    </tr>
                    <tr>
                    {
                            showReport.CODING.map((item) => {
                              return (
                                <td>{item.codingCompletion}</td>
                              )
                            })

                          }
                      {/* <td>Jill</td>
                      <td>Smith</td>
                      <td>50</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td>
                      <td>94</td> */}
                    </tr>
                  </table>
                </div>
              </div>
            </table>


          </>
          : ''
          }
          

        </div>



      </div>
      <div>
        <button

          onMouseDown={handleLeftMouseDown}
          onMouseUp={handleMouseUp}
        >
          Previous
        </button>
        <button

          onMouseDown={handleRightMouseDown}
          onMouseUp={handleMouseUp}
        >
          Next
        </button>

      </div>






    </div>)
}
export default Report

// const Batch = ({ label = "Progress Overview" }) => {
//     return (<>
//         <div className="report-container">
//             <div className="chart-report">
//                 <div className="mb-3">{label}</div>
//                 <ReportChart ChartType="report" labelLeft="Employee percentile" />
//             </div>
//             <div className="report-action">
//                 <div className="action-list action-list-top ">
//                     <div className="aic">{ICN_BOOK}</div>
//                     <div className="text-center">
//                         <div className="title-lg">ITU_1</div>
//                         <div>Explore More</div>
//                     </div>
//                 </div>
//                 <div className="action-list">
//                     <div className="text-center">
//                         <div>Progress</div>
//                         <div>{ICN_PROGRESS}</div>
//                     </div>
//                     <div>
//                         <div className="title-lg">60%</div>
//                     </div>
//                 </div>
//                 <div className="action-list">
//                     <div className="text-center">
//                         <div>Score</div>
//                         <div>{ICN_STORE}</div>
//                     </div>
//                     <div className="text-center">
//                         <div className="title-lg">65%</div>
//                     </div>
//                 </div>
//                 <div className="action-list">
//                     <div className="text-center">
//                         <div >Lab</div>
//                         <div>{ICN_LIBRARY}</div>
//                     </div>
//                     <div>
//                         <div className="title-lg">60%</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>)
// }

// const Course = () => {
//     return (<>
//         <Batch label="Technology Overview" />
//     </>)
// }

// const Participants = () => {
//     return (<>
//         <Batch label="Participants Overview" />
//     </>)
// }

