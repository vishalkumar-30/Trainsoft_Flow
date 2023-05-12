import React from 'react'

const TrainingObjective = ({trainingObjective}) => {
  return (
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

    <div class="card border" >
 
  <div class="card-body ">
    <h5 class="card-title title-md">Training Description</h5>
    {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p> */}
    <p class="card-text">{trainingObjective.trainingDescription}</p>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>



    </div>
  )
}

export default TrainingObjective