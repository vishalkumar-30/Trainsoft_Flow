import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select';
import ReactPlayer from 'react-player';
import useToast from '../../../Store/ToastHook';
import Remarks from './Instructor/Remarks';
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const TrainingObjective = ({ trainingObjective, trainingSid, labId }) => {
  const [show, setShow] = useState(false);
  const [showLearnerTable, setShowLearnerTable] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [allLearnersScore, setAllLearnersScore] = useState([]);
  const [scoreNRemarks, setScoreNRemarks] = useState([]);
  const [score, setScore] = useState('');
  const [remarks, setRemarks] = useState('');
  const Toast = useToast();
  const { course, batches, spinner, user, setBatches, ROLE } = useContext(AppContext);

  let learnerData = [];

  const AllLearnsScoreNRemarks = () => {
    return (
      <>
        <div class="card " >
          <div class="card-header title-md" style={{ background: "#F7F7F7", marginBottom: "0px" }}>
            Evaluated Submissions
          </div>
        </div>
        <table className='mb-3 p-3'>
          <thead style={{ background: "#F7F7F7", marginBottom: "0px" }}>
            <tr>

              <th>Name</th>
              <th>Score</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allLearnersScore.map((row) => (
              <tr key={row.learnerSid}>

                <td className='text-center'>
                  {

                    row.learnerName
                  }
                </td>
                <td className='text-center'>
                  {editMode === row.learnerSid ? (
                    <input
                      type="text"
                      value={row.score}
                      onChange={(e) =>
                        handleInputChange(row.learnerSid, 'score', e.target.value)

                      }
                     
                    />
                  ) : (
                    row.score
                  )}
                </td>
                <td className='text-center'>
                  {editMode === row.learnerSid ? (
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) =>
                        handleInputChange(row.learnerSid, 'remarks', e.target.value)

                      }
                     
                    />
                  ) : (
                    row.remarks
                  )}
                </td>
                <td className='text-center'>
                  {editMode === row.learnerSid ? (
                    <div>
                      <button onClick={() => handleSave(row.learnerSid)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => handleEdit(row.learnerSid)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  // editable remarks and name score


  // const [data, setData] = useState([
  //   { id: 1, name: 'John Doe', score: 25, remarks: "good" },
  //   { id: 2, name: 'Jane Smith', score: 30, remarks: "good" },
  //   { id: 3, name: 'Bob Johnson', score: 40, remarks: "good" },
  // ]);

  const [editMode, setEditMode] = useState(null);

  const handleEdit = (id) => {
    setEditMode(id);
  };

  const handleSave = (id) => {
    setEditMode(null);
    // editLearnerScoreAndRemarks(id);
    // Save the edited row data to the backend or perform other operations
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  const handleInputChange = (id, field, value) => {
    // console.log(id, field, value);
    if (field === "score") {
      setScore(value)
    } else {
      setRemarks(value)
    }
    setAllLearnersScore((prevData) =>
      prevData.map((row) =>
        row.learnerSid === id ? { ...row, [field]: value } : row
      )
    );
  };

  //get user submissions
  const getUserSubmissions = () => {
    try {
      const learnerSid = selectedOption.value
      spinner.show();
      RestService.getUserSubmissions(labId, learnerSid, trainingSid).then(
        response => {
          if (response.status === 200) {
            setUserSubmissions(response.data);
            setShow(true);

          }
        },
        err => {
          spinner.hide();
          console.log(err);
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getUserSubmissions()", err)
    }
  }

  //get all learners score
  const getAllLearnersScore = () => {
    try {
      spinner.show();
      RestService.getAllLearnersScore(labId, trainingSid).then(
        response => {
          if (response.status === 200) {
            setAllLearnersScore(response.data);

          }
        },
        err => {
          spinner.hide();
          console.log(err);
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on getAllLearnersScore()", err)
    }
  }

  //edit learners score and remarks
  const editLearnerScoreAndRemarks = (learnerSid) => {
    try {
      let payload = {
        "labId": 0,
        "learnerSid": "string",
        "remarks": "string",
        "score": 0,
        "trainingSid": "string"
      };
      spinner.show();
      RestService.editLearnerScoreAndRemarks(payload).then(
        response => {
          if (response.status === 200) {
            getAllLearnersScore();

          }
        },
        err => {
          spinner.hide();
          console.log(err);
        }
      ).finally(() => {
        spinner.hide();
      });
    } catch (err) {
      console.error("error occur on editLearnerScoreAndRemarks()", err)
    }
  }

  if ("submittedUnscoredLearnerDetails" in trainingObjective) {
    for (const key in trainingObjective.submittedUnscoredLearnerDetails) {
      learnerData.push(
        { label: trainingObjective.submittedUnscoredLearnerDetails[key], value: key }
      )

      // console.log(`${key}: ${trainingObjective.submittedUnscoredLearnerDetails[key]}`);
    }
  }

  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return (

      <div className={showHideClassName} >

        <div className="modal-container modal-xl">
          <div style={{ float: "right" }} className='circle-md'> <div className="modal-close" onClick={handleClose}>
            X
          </div></div>
          {children}

        </div>
      </div>
    );
  };

  // useEffect(()=>{
  //   getAllLearnersScore();
  // },[]);

  console.log(score);
  console.log(remarks);


  return (

    <>


      {
        "trainingDescription" in trainingObjective || "sectionDescription" in trainingObjective ?

          <div className='border m-2 p-2 '>
            <div class="card " >
              <div class="card-header title-md" style={{ background: "#F7F7F7", marginBottom: "0px" }}>
                Training Objective
              </div>
            </div>
            <div className='row mt-2 ' >
              <div className='col-2 '>
                <div class="card  mb-3 pl-1 pt-2 border ">
                  <div class="card-text title-sm text-center">Videos</div>
                  <div class="title-md text-center">
                    {/* 2/4 */}
                    {trainingObjective.videos === '0/0' ? 'N/A' : trainingObjective.videos}

                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div class="card  mb-3 pl-1 pt-2 border">
                  <div class="card-text title-sm text-center">Assessment</div>
                  <div class="title-md text-center">
                    {/* 2/4 */}
                    {trainingObjective.assessments === '0/0' ? 'N/A' : trainingObjective.assessments}
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div class="card  mb-3 pl-1 pt-2 border">
                  <div class="card-text title-sm text-center">Study Material</div>
                  <div class="title-md text-center">
                    {/* 2/4 */}
                    {trainingObjective.studyMaterials === '0/0' ? 'N/A' : trainingObjective.studyMaterials}
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div class="card  mb-3 pl-1 pt-2 border">
                  <div class="card-text title-sm text-center" >Training Session</div>
                  <div class="title-md text-center">
                    {/* 2/4 */}
                    {trainingObjective.meetingSessions === '0/0' ? "N/A" : trainingObjective.meetingSessions}
                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div class="card  mb-3 pl-1 pt-2 border">
                  <div class="card-text title-sm text-center" >Labs Assessment</div>
                  <div class="title-md text-center">
                    {/* 2/4 */}
                    {trainingObjective.labs === '0/0' ? 'N/A' : trainingObjective.labs}
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div class="card mb-3 pl-1 pt-2 border" >
                  <div class=" card-text title-sm text-center ">Coding Questions</div>
                  <div class="title-md text-center">
                    {/* 2/4 */}
                    {trainingObjective.codingQuestions === '0/0' ? 'N/A' : trainingObjective.codingQuestions}
                  </div>
                </div>
              </div>
            </div>
            <div class="card border" >

              <div class="card-body ">
                <h5 class="card-title title-md">Training Description</h5>
                {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p> */}
                <p class="card-text">{"trainingDescription" in trainingObjective ? trainingObjective.trainingDescription : trainingObjective.sectionDescription}</p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          </div>
          :

          <div className='border m-2 p-2 '>
            <div className='row'>

              <div className='col-4  '>
                <div class="card  mb-3 pt-2 border ">
                  <div class="card-text title-sm text-center">Batch-Strength</div>
                  <div class="title-md text-center">
                    {trainingObjective.batchStrength}
                  </div>
                </div>
              </div>

              <div className='col-4'>
                <div class="card  mb-3  pt-2 border">
                  <div class="card-text title-sm text-center">Total Submissions</div>
                  <div class="title-md text-center">
                    {trainingObjective.submissions}

                  </div>
                </div>
              </div>
              <div className='col-4'>
                <div class="card  mb-3  pt-2 border">
                  {
                    trainingObjective.scored > 0 ?
                      <div class="card-text title-sm text-center" style={{ cursor: "pointer" }}
                        onClick={() => {
                          // setShow(true);
                          setShowLearnerTable(true)
                          getAllLearnersScore();
                        }}>Evaluated Submissions <ArrowDropDownIcon />
                      </div>
                      :
                      <div class="card-text title-sm text-center">Evaluated Submissions</div>
                  }

                  <div class="title-md text-center">
                    {trainingObjective.scored}

                  </div>
                </div>
              </div>


            </div>

            <div className='row'>
              <div className='col-6'>
                <div className=" form-group mx-2">
                  <label className="label form-label">Select Learner</label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={learnerData}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />

                </div>
              </div>
              <div className='col-3 '>
                <label className="label form-label">Lab Weightage</label>
                {/* {showValidationMessage && <p style={{ color: 'red' }}>Only numbers are allowed.</p>} */}

                <div class="input-wrapper"><div class="input-field ">
                  <input class="form-control form-control-sm" type="text" value={Math.round(trainingObjective.labTotalScore)} disabled />

                </div></div>
              </div>
              {selectedOption !== null ?
                <div className='col-3 mt-4'>
                  <button className='btn btn-primary' style={{ width: "100%" }} onClick={() => { getUserSubmissions() }}>View</button>
                </div>
                : ''
              }


            </div>


            {/* <Modal show={show} handleClose={() => setShow(false)}  > */}
            {

              selectedOption !== null && <Remarks trainingSid={trainingSid} labId={labId} learnerSid={selectedOption.value}
                assignmentLink={userSubmissions.link} learner={userSubmissions.userName} show={show} setShow={setShow} />
            }


            {/* </Modal> */}


            <Modal show={showLearnerTable} handleClose={() => setShowLearnerTable(false)}  >
              <AllLearnsScoreNRemarks />
            </Modal>
          </div>
      }
    </>


  )
}

export default TrainingObjective