import { useContext, useState, useEffect } from "react";
import '../Batches/batches.css'
import './training.css'
import { useNavigate } from "@reach/router"
import AppContext from "../../../Store/AppContext";
import RestService from "../../../Services/api.service";
import DropdownItem from "../../Common/DropdownItem/DropdownItem";
import VideoMediaPlayer from "./TrainingMediaPlayer/VideoMediaPlayer";
import "./TrainingMediaPlayer/MediaPlayer.css";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import Feedback from "../../Common/Feedback/Feedback";
import { Link } from "@material-ui/core";
import Qa from "../../Common/QA/Qa";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import DuoIcon from '@mui/icons-material/Duo';
import ProgressBar from "../../Common/ProgressBar/ProgressBar";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ScienceIcon from '@mui/icons-material/Science';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import useToast from "../../../Store/ToastHook";

const TrainingDetails = ({ location }) => {
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const { user, ROLE, spinner } = useContext(AppContext);
    // const {setTraining,training} = useContext(TrainingContext)
    const [vdlink, setVdlink] = useState("");
    const Toast = useToast();
    const [feed, setFeed] = useState(false);
    const [modal, setModal] = useState(false);
    const [showcoursename, setShowcoursename] = useState('');
    const [zoomInfo, setZoomInfo] = useState({});
    const [contentLength, setContentLength] = useState(0);
    const [contentSid, setContentSid] = useState('');
    const [sectionSidArray, setSectionSidArray] = useState([]);
    const [markCompleted, setMarkAsCompleted] = useState([]);
    const [trainingBySid, setTrainingBySid] = useState({});
    const [labId, setLabId] = useState('');
    const [type, setType] = useState('');
    const [labDescription, setLabDescription] = useState('');
    const [labOverview, setLabOverview] = useState('');
    const [labSolution, setLabSolution] = useState('');
    const [labDuration, setLabDuration] = useState('');
    const [codingQuestionId, setCodingQuestionId] = useState('');
    const [codingQuestiondesc, setCodingQuestiondesc] = useState('');
    const navigate = useNavigate();
    let trainingSid = location.state.sid;
    let username = JSON.parse(localStorage.getItem('user'))

    function Show(url) {
        setVdlink(url);

    }
    function showFeedBack(val) {
        setFeed(val);
    }
    function modalF(val) {
        setModal(val)
    }
    function storeLabId(val) {
        setLabId(val)
    }
    function storeType(val) {
        setType(val)
    }
    const Modal = ({ handleClose, show, children }) => {
        const showHideClassName = show ? "modal d-block" : "modal d-none";

        return (

            <div className={showHideClassName}>

                <div className="modal-container">
                    <div style={{ marginLeft: "95%", marginTop: "-15px" }}> <a href="javascript:;" className="modal-close" onClick={handleClose}>
                        X
                    </a></div>
                    {children}

                </div>
            </div>
        );
    };

    const [configuration, setConfiguration] = useState({
        columns: {

            "contentName": {
                // "title": "Content Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link onClick={() => {

                    if (data.contentLink) {
                        Show(data.contentLink);
                    }
                    if (data.labId !== null) {
                        storeLabId(data.labId);
                        setContentSid(data.sectionSid);
                        setLabDescription(data.labContent.labDescription);
                        setLabOverview(data.labContent.labOverview);
                        setLabSolution(data.labContent.labSolution);
                        setLabDuration(Number(data.durationInMinutes.split('.')[0]));
                    }
                    if (data.type) {
                        storeType(data.type)
                    }
                    if (data.sid != null && (data.type === "DOCUMENTS" || data.type === "MS_OFFICE" )) {
                        markCourseAsCompleted(data.sid, data.sectionSid);
                    }
                    // if (data.labId != null) {
                    //     markCourseAsCompleted(data.labId, data.sectionSid);
                    // }
                    // if(data.codingQuestionId != null){
                    //     markCourseAsCompleted(data.codingQuestionId, data.sectionSid);
                    // }
                    if (data.codingQuestionId !== null) {
                        setCodingQuestionId(data.codingQuestionId);
                        setCodingQuestiondesc(data.codingQuestionDescription);
                        markCourseAsCompletedLabs(data.codingQuestionId, data.sectionSid);
                    }
                    showFeedBack(data.last)

                    modalF(data.last);

                    setShowcoursename(data.contentName);
                    setZoomInfo(zoomInfo => ({
                        ...zoomInfo,
                        ...{
                            "meetingId": data.meetingId,
                            "password": data.meetingPwd,
                            "trainingSid": location.state.sid,
                            "trainingSessionSid": data.sid
                        }
                    }))

                }} style={{ cursor: "pointer" }} > {(data.type === "VIDEO" || data.type === "EXTERNAL_LINK") ? <PlayCircleIcon /> : (data.type === "TRAINING_SESSION") ? <DuoIcon /> : (data.type === "LAB") ? <ScienceIcon />
                    : (data.type === "ASSESSMENT") ? <AssessmentIcon /> : (data.type === "CODING") ? <CodeIcon /> : <SummarizeRoundedIcon />}
                    {data.contentName.length > 35 ? data.contentName.substring(0, 35) + "..." : data.contentName}

                    {/* <button style={{
                        backgroundColor: "transparent",
                        border: "1px solid #1c1d1f",
                        borderRadius: "4px",
                        color: "black",
                        marginRight: "10px",
                        padding: "0px 10px 0px 10px  ",
                        textAlign: "center",
                        textDecoration: "none",


                        float: "right"
                    }}>Resources </button> */}
                </Link>
            }
        },
        headerTextColor: '#454E50', // user can change table header text color
        sortBy: null,  // by default sort table by name key
        sortDirection: false, // sort direction by default true
        updateSortBy: (sortKey) => {
            configuration.sortBy = sortKey;
            Object.keys(configuration.columns).map(key => configuration.columns[key].sortDirection = (key === sortKey) ? !configuration.columns[key].sortDirection : false);
            configuration.sortDirection = configuration.columns[sortKey].sortDirection;
            setConfiguration({ ...configuration });
        },
        // actions: [
        //     {
        //         "title": "Edit",
        //         "icon": ICN_EDIT,
        //         // "onClick": (data, i) => { setIsEdit(true); setShow(true); setInitialValues({ name: data.name, description: data.description, sid: data.sid }) }
        //     },
        //     {
        //         "title": "Delete",
        //         "icon": ICN_TRASH,
        //         // "onClick": (data) => deleteCourse(data.sid)
        //     }
        // ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table1 sort-enabled", // table custom class
        // showCheckbox: true,
        clearSelection: false
    });


    //get all section and content
    const getTrainingContentsByTrainingSid = async () => {
        try {
            let sum = 0;
            let trainingSid = location.state.sid;
            spinner.show();
            RestService.getTrainingContentsByTrainingSid(trainingSid).then(
                response => {

                    if (response.status === 200) {
                        setTrainingDetailsList(response.data.courseSectionResponseTO);
                        setType(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].type);
                        setVdlink(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].contentLink !== null ?
                            response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].contentLink : '');
                        setLabId(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labId !== null ?
                            response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labId : '');
                        setContentSid(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].sectionSid);
                        setLabDescription(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labContent
                            !== null ? response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labContent.labDescription
                            : '');
                        setLabOverview(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labContent
                            !== null ? response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labContent.labOverview
                            : '');

                        setLabSolution(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labContent
                            !== null ? response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].labContent.labSolution : '');
                        setLabDuration(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].durationInMinutes !== null ?
                            response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].durationInMinutes : '');

                        setShowcoursename(response.data.courseSectionResponseTO[0].courseContentResposeTOList[0].contentName);

                    }

                    response.data.courseSectionResponseTO.map((i) => {
                        sum += i.courseContentResposeTOList.length;
                        setContentLength(sum);
                    })
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }
    //update content mark as completed
    const markCourseAsCompleted = (contentSid, sectionSid) => {
        try {
            let trainingSid = location.state.sid;
            let payload = {
                "completedInDuration": 0,
                "totalDuration": 0
            }
            spinner.show();
            RestService.markCourseAsCompleted(contentSid, sectionSid, trainingSid, payload).then(
                response => {

                    if (response.status === 200) {
                        setMarkAsCompleted(response.data);

                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on markCourseAsCompleted()", err)
        }
    }

    //mark course as complete labs
    const markCourseAsCompletedLabs = (contentSid, sectionSid) => {
        try {
            let trainingSid = location.state.sid;
            let payload = {
                "completedInDuration": 0,
                "totalDuration": 0
            }
            spinner.show();
            RestService.markCourseAsCompletedLabs(contentSid, sectionSid, trainingSid, payload).then(
                response => {

                    if (response.status === 200) {
                        setMarkAsCompleted(response.data);

                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on markCourseAsCompleted()", err)
        }
    }

    //get completed courses 
    const getCompletedCourses = () => {

        try {
            let trainingSid = location.state.sid;
            spinner.show();
            RestService.getCompletedCourses(trainingSid).then(
                response => {

                    if (response.status === 200) {
                        setMarkAsCompleted(response.data);

                    }
                    for (let i = 0; i < response.data.completedSection.length; i++) {
                        for (let j = 0; j < response.data.completedSection[i].completedCourseContentDetails.length;
                            j++) {
                            setSectionSidArray(...sectionSidArray, response.data.completedSection[i].completedCourseContentDetails[j].sid);
                        }
                    }


                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getCompletedCourses()", err)
        }
    }

    //get training by sid
    const getTrainingBySid = () => {

        try {
            let trainingSid = location.state.sid;
            spinner.show();
            RestService.getTrainingBySid(trainingSid).then(
                response => {
                    if (response.status === 200) {
                        setTrainingBySid(response.data);

                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getTrainingBySid()", err)
        }
    }

    //initialize component
    useEffect(() => {
        getTrainingContentsByTrainingSid();
        getCompletedCourses();
        getTrainingBySid();

        //Disable right click ;
        // document.addEventListener('contextmenu', (e) => {
        //     Toast.error({ message: `Right click not allowed` });
        //     e.preventDefault();
        //   })

    }, []);

    if (user.role === ROLE.LEARNER) {
        for (let i = 0; i < trainingDetailsList.length; i++) {
            console.log(trainingDetailsList[i].courseContentResposeTOList.length)
            for (let j = 0; j < trainingDetailsList[i]["courseContentResposeTOList"].length; j++) {
                if (trainingDetailsList[i].courseContentResposeTOList[j]["instructorSpecific"] === true) {
                    console.log("d");
                    trainingDetailsList[i].courseContentResposeTOList.splice(j, 1);

                }

            }
        }
    }


    return (
        <>
            <div className="row" >

                {showcoursename.length === 0 ? "" :
                    <div className=" title-sm col-6">Content Title: {showcoursename}</div>}
                {/* {type === "LAB" ?
                    <div className="col-2" >
                        <button onClick={() => markCourseAsCompleted(labId, contentSid)}>Mark as Completed</button>
                    </div>
                    : ''
                } */}
                <div className="col-4" >
                    <ProgressBar progress={markCompleted.totalCourseCompletedInTraining === null ? 0 : markCompleted.totalCourseCompletedInTraining > contentLength ? contentLength : markCompleted.totalCourseCompletedInTraining} totalSection={contentLength} trainingSid={location.state.sid} />
                </div>
            </div>
            <hr />

            <div class="row">

                <div class="col-8  pl-3 " style={{ marginTop: "-25px" }}>
                    {/* <VideoMediaPlayer /> */}
                    {(type === "EXTERNAL_LINK" || type === "VIDEO") ? <VideoMediaPlayer url={vdlink} />
                        : (type === "PHOTO" || type === "DOCUMENTS") ? <iframe style={{ marginTop: "-2px" }} src={vdlink} width="100%" height="100%" />
                            : (type === "LAB" || type === "CODING") ?
                                <div className=" jumbotron row ml-1" style={{ display: "flex", flexDirection: "column" }} >
                                    <div style={{ width: "160px", textAlign: "center", textDecoration: "none", background: "rgb(73,22,126) ", padding: "15px 20px", marginLeft: "240px", marginBottom: "50px", marginTop: "40px", border: "1px solid rgb(73,22,126)", borderRadius: "10px" }}>

                                        {
                                            <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => navigate("/labs", {
                                                state: {
                                                    labDescription, labOverview, labSolution, labId, contentSid, trainingSid, labDuration, showcoursename, type, codingQuestionId, codingQuestiondesc
                                                }
                                            })
                                            }>Open Sandbox</button>}
                                    </div>

                                </div>
                                :
                                (type === "ASSESSMENT") ?
                                    <div className="assesmentimg row ml-1" >
                                        <div style={{ width: "180px", textAlign: "center", textDecoration: "none", background: "blue", padding: "15px 20px", marginLeft: "250px", marginBottom: "10px", marginTop: "100px", border: "1px solid #49167E", borderRadius: "10px" }}>
                                            <a href={vdlink} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontSize: "15px" }}>Start Assessment</a>
                                        </div>
                                    </div>
                                    :
                                    (type === "TRAINING_SESSION") ?
                                        <div className="zoommeeting row ml-1">
                                            <div style={{ width: "120px", textAlign: "center", textDecoration: "none", color: "white", background: "blue", padding: "10px 10px", marginLeft: "20px", marginBottom: "80px", marginTop: "85px", border: "1px solid #49167E", borderRadius: "10px" }}>
                                                <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => navigate("/class", { state: zoomInfo })} >Join Now</button>
                                            </div>
                                        </div>
                                        : ''

                    }

                    <div class="tabset">

                        <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked />
                        <label for="tab1">Overview</label>

                        <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                        <label for="tab2">Q&A</label>

                        <div class="tab-panels">
                            <section id="marzen" class="tab-panel">

                                {
                                    trainingBySid.trainingOverview != null ?
                                        <p className="title-lg text-capitalize">{trainingBySid.trainingOverview}</p>
                                        : 'Overview not Provided'
                                }

                            </section>
                            <section id="rauchbier" class="tab-panel">
                                <Qa />
                            </section>

                        </div>

                    </div>

                </div>

                <div class="col-4 " style={{ height: "535px", overflowY: "scroll", marginLeft: "-12px", marginTop: "-25px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", background: "#F7F9FA", boxShadow: "#00000033 0px 0px 0px 1px, #00000033 0px 1px 1px -1px, #00000033 0px 1px 0px " }}>

                    {trainingDetailsList.length > 0 ? trainingDetailsList.map((train) => {
                        return (
                            <>
                                <div >
                                    <DropdownItem title={train.sectionName} total={train.courseContentResposeTOList.length} theme="dark">

                                        <DynamicTable  {...{ configuration, sourceData: train.courseContentResposeTOList }} />
                                    </DropdownItem>
                                    {
                                        feed ? <Modal show={modal} handleClose={() => setModal(false)}>

                                            <Feedback sectionsid={train.sid} trainingsid={location.state.sid} />

                                        </Modal> : ''
                                    }
                                </div>
                            </>
                        )
                    }) : ''}


                    <DropdownItem title="Fun Activity" total="2" theme="dark">


                        {username.name === "Wipro" ?
                            <div>
                                <div className="py-3"> <AssessmentIcon /><a href="https://course-content-storage.s3.amazonaws.com/enterprise-administrator.html" target="_blank">Fun With Enterprise Administrator</a></div>
                                <div className="py-2"> <AssessmentIcon /><a href="https://course-content-storage.s3.amazonaws.com/ms-training.html" target="_blank">Fun With MS Training</a></div>
                            </div> :
                            <div>
                                <div className="py-3"> <AssessmentIcon /><a href="https://course-content-storage.s3.amazonaws.com/cloud-native-jeopardy.html" target="_blank">Fun With Cloud Native</a></div>
                                <div className="py-2"> <AssessmentIcon /><a href="https://course-content-storage.s3.amazonaws.com/kubernetes-jeopardy-game.html" target="_blank">Fun With Kubernetes</a></div>
                            </div>}




                    </DropdownItem>
                </div>
            </div>
        </>
    )
}
export default TrainingDetails