import React, { useState, useContext } from 'react'
import Select from 'react-select';
import ReactPlayer from 'react-player';
import useToast from '../../../Store/ToastHook';
import Remarks from './Instructor/Remarks';
import RestService from '../../../Services/api.service';
import AppContext from '../../../Store/AppContext';

const TrainingObjective = ({ trainingObjective, trainingSid, labId }) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [score, setScore] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [wordCount, setWordCount] = useState(200);
  const MAX_WORDS = 200;
  const Toast = useToast();
  const { course, batches, spinner, user, setBatches, ROLE } = useContext(AppContext);
  
  let learnerData = [];
console.log("trainingsid", trainingSid);
console.log("labId", labId);
console.log("learner", selectedOption);
console.log(userSubmissions);

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
                  <div class="card-text title-sm text-center">Evaluated Submissions</div>
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
              <label className="label form-label">Total Score</label>
            {/* {showValidationMessage && <p style={{ color: 'red' }}>Only numbers are allowed.</p>} */}

            <div class="input-wrapper"><div class="input-field ">
              <input class="form-control form-control-sm" type="text" value={Math.round(trainingObjective.labTotalScore)} disabled/>

            </div></div>
              </div>
              { selectedOption !== null ?
                <div className='col-3 mt-4'>
                <button className='btn btn-primary' style={{ width: "100%" }} onClick={() => { getUserSubmissions() }}>View</button>
              </div>
              : ''
              }
              

            </div>
           

            <Modal show={show} handleClose={() => setShow(false)}  >
              {

                selectedOption !== null && <Remarks trainingSid={trainingSid} labId={labId} learnerSid={selectedOption.value}
                assignmentLink={userSubmissions.link} learner={userSubmissions.userName} />
              }
              

            </Modal>
          </div>
      }
    </>


  )
}

export default TrainingObjective