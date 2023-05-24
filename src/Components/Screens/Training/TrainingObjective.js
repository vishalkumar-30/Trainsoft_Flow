import React,{useState} from 'react'
import Select from 'react-select';
import Remarks from './Instructor/Remarks';


const TrainingObjective = ({trainingObjective}) => {
  const [show, setShow] = useState(false);

  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return (

        <div className={showHideClassName} >

            <div className="modal-container modal-xl">
                <div style={{float:"right"}} className='circle-md'> <div className="modal-close" onClick={handleClose}>
                    X
                </div></div>
                {children}

            </div>
        </div>
    );
};




  return (
    <>
      <Modal show={show} handleClose={() => setShow(false)}  >
                            <Remarks/>

                            </Modal>
  
    <div className='border m-2 p-2 '>
         <div class="card " >
  <div class="card-header title-md" style={{background: "#F7F7F7", marginBottom:"0px"}}>
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




    {/* recording labs */}
    <div className='row'>

<div className='col-3 ml-2 '>
<div class="card  mb-3 pt-2 border ">
<div class="card-text title-sm text-center">Batch-Strength</div>
<div class="title-md text-center">
2/4


</div>
</div>
</div>

<div className='col-3'>
<div class="card  mb-3  pt-2 border">
<div class="card-text title-sm text-center">Total Submissions</div>
<div class="title-md text-center">
2/4

</div>
</div>
</div>
<div className='col-3'>
<div class="card  mb-3  pt-2 border">
<div class="card-text title-sm text-center">Evaluated Submissions</div>
<div class="title-md text-center">
2/4

</div>
</div>
</div>

</div>

<div className='row'>
  <div className='col-9'>
  <div className=" form-group mx-2">
                      <label className="label form-label">Select Learner</label>
                      <Select

                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="select"
                      />

                  </div>
  </div>
  <div className='col-3 mt-4'>
<button className='btn btn-primary' style={{width:"100%"}}  onClick={() => { setShow(true) }}>hello</button>
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
    </>

  )
}

export default TrainingObjective