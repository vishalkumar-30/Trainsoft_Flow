import { Router } from "../../Common/Router";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Home from "../../Screens/Home/Home";
import Report from "../../Screens/Report/Report";
import Setting from "../../Screens/Setting/Setting";
import Batches from "../../Screens/Batches/Batches";
import Calender from "../../Screens/Calender/Calender";
import Labs from "../../Screens/Labs/Labs";
import Support from "../../Screens/Support/Support";
import LabStore from "../../Screens/LabStore.js/LabStore";
import Course from "../../Screens/Course/Course";
import OrgMgmt from "../../Screens/OrgMgmt/OrgMgmt";
import Training from "../../Screens/Training/Traning";
import User from "../../Screens/Users/Users";
import UserHome from "../../Screens/Home/UserHome";

import CodeEditor from "../../Screens/ClassLab/CodeEditor/CodeEditor";
import Zoom from "../../Zoom/Zoom";
import VsCode from "../../Screens/VsCode/VsCode";
import VsCodePage from "../../Screens/VsCode/VsCodePage";

import { Helmet } from "react-helmet";
import QuestionBank from "../../Screens/EAssesments/Questions";
import TopicAssesment from "../../Screens/EAssesments/TopicAssesments";
import AssessmentDashboard from "../../Screens/AssessmentScreen/AssessmentDashbord/AssessmentDashbord";
import Catalogue from "../../Screens/AssessmentScreen/Catalogue/Catalogue";
import MyAssessment from "../../Screens/AssessmentScreen/MyAssessment/MyAssessment";
import InstructorDashboard from "../../Screens/Home/InstructorDashboard";
import Tickets from "../../Screens/Tickets/Tickets";
import TicketDashboard from "../../Screens/Home/TicketDashboard";
import Events from "../../Screens/Tickets/Events";
import OurNotes from "../../Screens/ClassLab/ClassNotes/AvailableNotes/OurNotes";
import DisplayNotes from "../../Screens/ClassLab/ClassNotes/AvailableNotes/DisplayNotes";
import UserProfileSetting from "../Userprofile/UserProfileSetting";
import ChangePassword from "../Userprofile/ChangePassword";
import Expert from "../../Common/Graph/Learner/ExperConnect/Expert";
import NewDashboard from "../../Screens/Home/NewDashboard";
import DashboardLearner from "../NewDashboardLearner/DashboardLearner";

const Dashboard = ({ location }) => {
  return (
    <>
      {/* <Helmet>
                <title>Support</title>
                 <script type='text/javascript' id='myscript_58'>var d=document,c='createElement',ac='appendChild',b=d.body;const eschatInitiatedBy = 'ES_EMBEDDED';const vcSid='DA8DCE0753D14EABAC4E60121C808D906E5E8D472A8249AF9DAA6C415155B2A4';var glcp = (('https:' == document.location.protocol) ? 'https://' : 'http://');const esHst ='https://www.eservecloud.com';var v1 = Math.random();var s = d[c]('script');s.type = 'text/javascript';s.async = true;var scriptId = 'myscript_58';s.src = esHst + '/clientchat/apps/js/visualconnect.loader.min.js?' + 'v=' + v1;var script = d.getElementsByTagName('script')[0];script.parentNode.insertBefore(s, script);</script>
            </Helmet> */}
      <div className="main-page">
        <div>
          <Sidebar {...{ location }} />
        </div>
        <div className={`dashboard-page`}>
          <Header {...{ location }} />
          <div
            // className="dashboard-container"
            className={`dashboard-container ${
              location.state && location.state.title === "VSCode"
                ? "p-0 full-h"
                : ""
            }`}
          >
            <Router>
              <Home path="dashboard" />
              {/* <UserHome path="home" /> */}
              <DashboardLearner path="home"/>
              {/* <NewDashboard path="home" /> */}
              <Expert path="expert-connect"/>
              <TicketDashboard path="/techsupport"/>
              <InstructorDashboard path="instdashboard"/>
              <Report path="report/*" />
              <Setting path="setting" />
              <Batches path="batches/*" />
              <OrgMgmt path="org-mgmt/*" />
              <Course path="course/*" />
              <QuestionBank path="questions/*" />
              <TopicAssesment path="topicAssesments/*" />
              <Training path="training/*" />
              <Calender path="calender/*" />
              <Labs path="labs/*" />
              <User path="user" />
              <UserProfileSetting path="profilesettings" />
              {/* <ChangePassword path="password" /> */}
              <OurNotes path ="notes/*"/>
              <DisplayNotes path="/notes/mynotes" />
              <Support path="support/*" />
             <Tickets path="ticket/*"/>
              <LabStore path="labstore/*" />
              <CodeEditor path="compiler/*" />
              <Zoom path="zoom/:id" />
              <VsCodePage path="vs-code" />
              <AssessmentDashboard path="assessment"/>
              <Catalogue path="catalogue/*"/>
              <MyAssessment path="myAssessment"/>
              <Events path="events"/>
            </Router>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
