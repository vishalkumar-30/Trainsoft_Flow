import {  useContext,useEffect } from "react";
import Login from "./Components/Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/main.css'
import Dashboard from "./Components/Layout/Dashboard/Dashboard";
import { Router } from "./Components/Common/Router";
import ClassLab from "./Components/Screens/ClassLab/ClassLab";
import Spinner from "./Components/Common/Spinner/Spinner";
import AxiosService from './Services/axios.service';
import AppContext from "./Store/AppContext";
import LandingHome from "./Components/LandingPage/Home/LandingHome";
import ResetPwd from "./Components/Screens/Auth/ResetPwd";
import Assessment from "./Components/Screens/Assessment/Assessment";
import { TrainingProvider } from "./Store/TrainingContext";
import VsCode from "./Components/Screens/VsCode/VsCode"; 
import MeetingClose from "./Components/Zoom/MeetingClose";
import { AssessmentProvider } from "./Store/AssessmentContext";
import PrivateRoute from "./Components/Common/PrivateRoute/PrivateRoute";
import { Redirect } from '@reach/router';
import Labs from "./Components/Screens/Training/Labs/Labs";
import IdealLogout from "./Components/Common/IdealLogout/IdealLogout";

function App() {
   const {spinner} = useContext(AppContext);
   const user = JSON.parse(localStorage.getItem('user'));
   
  return (<>
      <Spinner value={spinner}/>
      <AssessmentProvider>
      <TrainingProvider>
         <Router>
            <LandingHome path="/"/>
            <Assessment path="/assessment/:assessmentSid/:companySid/:virtualAccountSid" />
            {
               localStorage.getItem('REACTAPP.TOKEN') && user.role === "SUPERVISOR" ? <Redirect from="/login" to="/dashboard" noThrow /> :
               localStorage.getItem('REACTAPP.TOKEN') && user.role === "INSTRUCTOR"? <Redirect from="/login" to="/instdashboard" noThrow /> : 
               localStorage.getItem('REACTAPP.TOKEN') && user.role === "LEARNER"? <Redirect from="/login" to="/home" noThrow /> :
               localStorage.getItem('REACTAPP.TOKEN') && user.role === "TECHNICAL_SUPPORT"? <Redirect from="/login" to="/techsupport" noThrow /> :
               localStorage.getItem('REACTAPP.TOKEN') && user.role === "OPERATION_SUPPORT"? <Redirect from="/login" to="/techsupport" noThrow /> :
               <Login path="/login"/>
               
            }
            <Login path="/login-edforce"/>
            <PrivateRoute component={MeetingClose} path="zoomclose" />
            <PrivateRoute component={ResetPwd} path="/reset/:token" />
            {/* <PrivateRoute component={Assessment} path="/assessment/:assessmentSid/:companySid/:virtualAccountSid" /> */}
            <PrivateRoute component={Dashboard} path="/*" />
            <PrivateRoute component={ClassLab} path="class/*" />
            <PrivateRoute component={VsCode} path="vscode" />
            <PrivateRoute component={Labs} path="labs" />
            {/* <PrivateRoute component={DisplayNotes} path="/notes/mynotes" /> */}
         </Router>
      </TrainingProvider>
      </AssessmentProvider>
      {
         localStorage.getItem('REACTAPP.TOKEN') ? 
         <IdealLogout /> : ''
      }
      
 </> );
}

export default App;
