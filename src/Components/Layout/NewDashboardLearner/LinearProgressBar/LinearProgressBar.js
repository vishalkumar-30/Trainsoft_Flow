import  React,{useEffect,useState, useContext} from 'react';

import "../NewDashboardLearner.css"
import DuoIcon from '@mui/icons-material/Duo';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import Groups3Icon from '@mui/icons-material/Groups3';
import AppContext from '../../../../Store/AppContext';
import ScienceIcon from '@mui/icons-material/Science';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import RestService from '../../../../Services/api.service';
import { useNavigate } from '@reach/router';


const LinearProgressBar = () => {
const [upcomingDocuments,setUpcomingDocuments] =useState({});
const [upcomingVideo,setUpcomingVideo] =useState({});
const [upcomingTrainingSession,setUpcomingTrainingSession] =useState({});
const [upcomingAssessment,setUpcomingAssessment] =useState({});
const [upcomingPracticeLab,setUpcomingPracticeLab] =useState({});
const [upcomingCapstoneLab,setUpcomingCapstoneLab] =useState({});
const { user, batches, course, ROLE, spinner, setCategory } = useContext(AppContext);


// const navigate = useNavigate();

// function handleClick() {
//   navigate("/training/training-details");
// }

// getLearnerUpcomingContent
const getLearnerUpcomingContent = () => {
  try {
    RestService.getLearnerUpcomingContent().then(
        response => {
            if (response.status === 200) {
              setUpcomingDocuments(response.data.upcomingDocuments);
              setUpcomingVideo(response.data.upcomingVideo);
              setUpcomingTrainingSession(response.data.upcomingTrainingSession);
              setUpcomingAssessment(response.data.upcomingAssessment);
              setUpcomingPracticeLab(response.data.upcomingPracticeLab);
              setUpcomingCapstoneLab(response.data.upcomingCapstoneLab);
            }

        },
        err => {
            spinner.hide();
        }
    ).finally(() => {
        spinner.hide();
    });
} catch (err) {
    console.error("error occur on getLearnerUpcomingContent()", err)
}
}
useEffect(()=>{
  getLearnerUpcomingContent()
},[])

  return (
    <>
    <div className='row'>


<div className="col-md-4 col-sm-4 my-2">
      <div className="card p-3 mb-2 shadow-sm rounded h-100" style={{ background: "#F7F7F9" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <div className="ms-2 c-details">
              <div className="mb-0">
                <DuoIcon  /> Videos
              </div>
            </div>
          </div>
          <div className="continue cat-title-md px-3" >Continue</div>
        </div>
        <div className="c-details1" style={{ textAlign: "justify"}}>
          <span className='title-sm' style={{textTransform:"capitalize"}}>{upcomingVideo.contentName !==null ? upcomingVideo.contentName : "Everything Caught Up!!"}</span>
{/*        
       <span className='title-sm'>{upcomingVideo.trainingName }  </span> */}
        </div>
      </div>
    </div>
      <div className='col-md-4 col-sm-4 my-2'>
        <div class="card p-3 mb-2 shadow-sm   rounded h-100" style={{background:"#F7F7F9"}}>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">

              <div class="ms-2 c-details">
                <div class="mb-0"><SummarizeIcon/>Document</div>
              </div>

            </div>
            <div className='continue cat-title-md px-3' > Continue </div>
          </div>

          <div className="c-details1" style={{ textAlign: "justify" }}>
      <span className='title-sm' style={{textTransform:"capitalize"}}> {upcomingDocuments.contentName !==null ?upcomingDocuments.contentName :"Everything Caught Up!!"}</span>
        </div>
         

        </div>
      </div>
      <div className='col-md-4 col-sm-4 my-2'>
        <div class="card p-3 mb-2 shadow-sm   rounded h-100" style={{background:"#F7F7F9"}}>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">

              <div class="ms-2 c-details">
                <div class="mb-0"><ScienceIcon/>Practice Lab</div>
              </div>

            </div>
            <div className='continue cat-title-md px-3'  > Continue </div>
          </div>
          <div className="c-details1" style={{ textAlign: "justify" }}>
       <span className='title-sm'style={{textTransform:"capitalize"}}>{upcomingPracticeLab.contentName !== null ? upcomingPracticeLab.contentName:"Everything Caught Up!!"}</span>
        </div>
          

        </div>
      </div>
      <div className='col-md-4 col-sm-4'>
        <div class="card p-3 mb-2 shadow-sm   h-100" style={{background:"#F7F7F9"}}>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">

              <div class="ms-2 c-details">
                <div class="mb-0"><AssessmentIcon/>Assessment </div>
              </div>

            </div>
            <div className='continue cat-title-md px-3' > Continue </div>
          </div>

          <div className="c-details1" style={{ textAlign: "justify" }}>
       <span className='title-sm'style={{textTransform:"capitalize"}}>{upcomingAssessment.contentName !== null ? upcomingAssessment.contentName : "Everything Caught Up!!"}</span>
        </div>
         

        </div>
      </div>
      <div className='col-md-4 col-sm-4'>
        <div class="card p-3 mb-2 shadow-sm   h-100" style={{background:"#F7F7F9"}}>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">

              <div class="ms-2 c-details">
                <div class="mb-0"><AssessmentIcon/>Capstone </div>
              </div>

            </div>
            <div className='continue cat-title-md px-3' > Continue </div>
          </div>
         
          <div className="c-details1" style={{ textAlign: "justify" }}>
 <span className='title-sm'style={{textTransform:"capitalize"}}> {upcomingCapstoneLab.contentName !==null ? upcomingCapstoneLab.contentName :"Everything Caught Up!!"}</span>
        </div>
         
         

        </div>
      </div>
      <div className='col-md-4 col-sm-4'>
        <div class="card p-3 mb-2 shadow-sm   h-100" style={{background:"#F7F7F9"}}>
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">

              <div class="ms-2 c-details">
                <div class="mb-0"><Groups3Icon/>Meeting </div>
              </div>

            </div>
            <div className='continue cat-title-md px-3' > Continue </div>
          </div>
          <div className="c-details1" style={{ textAlign: "justify" }}>
     <span className='title-sm'style={{textTransform:"capitalize"}}>  {upcomingTrainingSession.contentName !==null ? upcomingTrainingSession.contentName :"Everything Caught Up!!"} </span>
        </div>
      

        </div>
      </div>
    



    </div>
    </>
  );
}

export default LinearProgressBar