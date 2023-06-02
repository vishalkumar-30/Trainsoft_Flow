import React, { useState, useContext } from 'react'
import ReactPlayer from 'react-player';
import useToast from '../../../../Store/ToastHook';
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';

const Remarks = ({ trainingSid, labId, learnerSid, assignmentLink, learner, show, setShow }) => {

  const [score, setScore] = useState('');
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [wordCount, setWordCount] = useState(200);
  const MAX_WORDS = 200;
  const Toast = useToast();
  const { course, batches, spinner, user, setBatches, ROLE } = useContext(AppContext);

  const handleChangescore = (event) => {
    const inputscoreValue = event.target.value;
    // Only allow numbers

    if (/^\d*$/.test(inputscoreValue)) {
      setScore(inputscoreValue);
    }

    //   setShowValidationMessage(!/^\d*$/.test(inputValue));
  };


  const handleChange = (event) => {
    const inputValue = event.target.value;
    // const words = inputValue.split(' ');
    // Limit the textarea to the maximum number of words
    if (inputValue.length <= MAX_WORDS) {
      setRemarks(inputValue);
      setWordCount(inputValue.length);
    }
  };

  //  const handleReload = () => {
  //     window.location.reload();
  //   };
  //submit score and remarks
  const scoreLab = () => {
    try {

      let payload = {
        "labId": labId,
        "learnerSid": learnerSid,
        "remarks": remarks,
        "score": score,
        "trainingSid": trainingSid
      }
      spinner.show();
      RestService.scoreLab(payload).then(
        response => {
          if (response.status === 200) {
            setRemarks('');
            setScore('');
            setShow(false);
            Toast.success({ message: "Score and Remarks Successfully Submitted" });
            // handleReload();
          }
        },
        err => {
          spinner.hide();
          Toast.error({ message: "Something went wrong" });
          console.log(err);
        }
      ).finally(() => {
        spinner.hide();

      });
    } catch (err) {
      console.error("error occur on getTrainingBySid()", err)
    }
  }



  return (
    // <Modal show={show} handleClose={() => setShow(false)}  >
      <div className='border m-2 p-2 ' style={{ background: "#F7F7F7", marginBottom: "0px" }}>

        <div class="card-header title-md" style={{ background: "#F7F7F7", marginBottom: "0px" }}>
          Learner Name : {learner}

        </div>
        <div className='row '>
          <div className='col-6 mt-2'>

            <div className='player-wrapper ' >
              <ReactPlayer
                className='react-player '
                url={assignmentLink}
                width='100%'
                height="100%"
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'  //<- this is the important bit
                    }
                  }
                }}
                playing={false}
                // loop={true}
                muted={false}
                controls
              // onProgress={(progress) => {
              //     if (Math.ceil(progress.playedSeconds) >= Math.ceil(0.8 * duration)) {
              //         setPlayed(progress.playedSeconds);
              //     }
              // }}
              // onDuration={(duration) => {
              //     setDuration(duration);
              // }}
              />
            </div>
          </div>
          <div className='col-5 mx-5 mt-2 card'>


            <form>
              <label className="label form-label">Score</label>
              {/* {showValidationMessage && <p style={{ color: 'red' }}>Only numbers are allowed.</p>} */}

              <div class="input-wrapper"><div class="input-field ">
                <input class="form-control form-control-sm" type="text" value={score} onChange={handleChangescore} required />

              </div></div>



              <label className="label form-label">Remarks</label>

              <div class="input-wrapper"><div class="input-field ">
                <textarea class="form-control form-control-sm" value={remarks} onChange={handleChange} required />
              </div>
              {
                wordCount === 200 ?
                <p>Maximum 200 Characters Left</p>
                :
                wordCount > 0 && wordCount < 200 ?

                <p>Maximum { MAX_WORDS - wordCount} Characters Left</p>
                :
                // wordCount === 0 ?
                // <p>0 Characters Left</p>
                // :
                <p>Maximum 200 Characters Left</p>
              }
                
              </div>


              <div className='mt-4' style={{ float: "right" }}>
                <button className='btn btn-primary' onClick={() => scoreLab()}>Submit</button>
              </div>

            </form>






          </div>
        </div>

        {/* <div class="card border" >

<div class="card-body ">
<h5 class="card-title title-md">Training Description</h5>
<p class="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p>

<a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div> */}



      </div>
    // </Modal>

  )
}

export default Remarks