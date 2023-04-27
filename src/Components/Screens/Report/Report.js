import React, { useState,useContext } from 'react'
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
const Report = ({ location }) => {
    const {user ,ROLE} = useContext(AppContext)
    return (
        <div className="table-shadow p-3">
            {/* <CardHeader {...{ location }} /> */}
            <p style={{fontSize: "16px", color: "#49167E", fontWeight: "600"}}>Download Report</p>
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
          
          >
            <option hidden>Select Training</option>
         <option>Kubernetes Engineer Track Training</option>
         <option>testing duration 3</option>

         <option>Stochastic Learning</option>
         <option>Kubernetes for Cloud Native</option>

         <option>Cloud Computing, Docker And Kubernetes Journey</option>
         <option>Windows Server</option>
         <option>Microservices with Spring and Spring Cloud</option>
        
          </select>
        </div>
        {
            user.role === ROLE.LEARNER ? "":

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
  <Carousel >
    <Carousel.Item>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
            <th>Day 8</th>
            <th>Day 9</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Documents</td>
            <td>1/3</td>
            <td>2/4</td>
            <td>3/4</td>
            <td>4/6</td>
            <td>5/7</td>
            <td>6/7</td>
            <td>7/8</td>
            <td>8/10</td>
            <td>9/10</td>
          </tr>
          <tr>
            <td>Videos</td>
            <td>2/5</td>
            <td>2/7</td>
            <td>3/6</td>
            <td>4/8</td>
            <td>5/10</td>
            <td>6/12</td>
            <td>7/8</td>
            <td>8/10</td>
            <td>9/14</td>
          </tr>
          <tr>
            <td>Assesments</td>
            <td>1/3</td>
            <td>2/4</td>
            <td>3/4</td>
            <td>4/6</td>
            <td>5/7</td>
            <td>6/7</td>
            <td>7/8</td>
            <td>8/10</td>
            <td>9/10</td>
          </tr>
          <tr>
            <td>Labs</td>
            <td>2/5</td>
            <td>2/7</td>
            <td>3/6</td>
            <td>6/7</td>
            <td>7/8</td>
            <td>8/10</td>
            <td>9/10</td>
            <td>7/8</td>
            <td>6/7</td>
          </tr>
          <tr>
            <td>Coding Questions</td>
            <td>3/6</td>
            <td>6/7</td>
            <td>7/8</td>
            <td>8/10</td>
            <td>9/10</td>
            <td>6/12</td>
            <td>7/8</td>
            <td>8/10</td>
            <td>9/14</td>
          </tr>
        </tbody>
      </table>
    </Carousel.Item>
    <Carousel.Item>
      <table>
        <thead>
          <tr>
            <th>Day 10</th>
            <th>Day 11</th>
            <th>Day 13</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>6/12</td>
            <td>7/8</td>
            <td>8/10</td>
           
            
          </tr>
          <tr>
          <td>3/6</td>
            <td>6/7</td>
            <td>7/8</td>
          
          </tr>
          <tr>
          <td>1/6</td>
            <td>6/7</td>
            <td>5/8</td>
           
          </tr>
          <tr>
          <td>3/6</td>
            <td>6/7</td>
            <td>7/8</td>
         
          </tr>
          <tr>
            <td></td>
            <td>3/6</td>
            <td>6/7</td>
            
          </tr>
        </tbody>
      </table>
    </Carousel.Item>
  </Carousel>
</div>

   

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

