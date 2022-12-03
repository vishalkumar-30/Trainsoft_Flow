import { useContext, useState, useEffect } from "react";
import '../Batches/batches.css'
import './training.css'
import { TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import TrainingInfo from "./TrainingInfo/TrainingInfo";
import { Router } from "../../Common/Router";
import Session from "./Session/Session";
import Assessment from "./Assessment/Assessment";
import Forum from "./Forum/Forum";
import Report from "./Report/Report";
import { useNavigate } from "@reach/router"
import CardHeader from "../../Common/CardHeader";
import useToast from "../../../Store/ToastHook";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import TrainingContext from "../../../Store/TrainingContext";
import RestService from "../../../Services/api.service";
import DropdownItem from "../../Common/DropdownItem/DropdownItem";
import VideoMediaPlayer from "./TrainingMediaPlayer/VideoMediaPlayer";
import "./TrainingMediaPlayer/MediaPlayer.css";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import Feedback from "../../Common/Feedback/Feedback";
import { Link } from "@material-ui/core";
import { navigate } from "../../Common/Router";
import Qa from "../../Common/QA/Qa";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import DuoIcon from '@mui/icons-material/Duo';
import ProgressBar from "../../Common/ProgressBar/ProgressBar";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const TrainingDetails = ({ location }) => {
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const { spinner } = useContext(AppContext)
    // const {setTraining,training} = useContext(TrainingContext)
    // const Toast = useToast();
    const [vdlink, setVdlink] = useState("https://www.youtube.com/watch?v=RTagtaWSea4");
    const [feed, setFeed] = useState(false);
    const [modal, setModal] = useState(false);
    const [showcoursename, setShowcoursename] = useState('');
    const [zoomInfo, setZoomInfo] = useState({});
    const [contentLength, setContentLength] = useState(0);
    // const [contentSid, setContentSid] = useState('');
    const [sectionSidArray, setSectionSidArray] = useState([]);
    const [markCompleted, setMarkAsCompleted] = useState([]);
    const [view, setView] = useState('View');
    const arr = [ 
        '7EAA2322F1DF4D69892420C9DFA555E633C672A095A340E39CC3C9DC3AE32CE6',
    '2588ECC4305D4A62B2E7B13C29305D195B1963CC78384DAB9EBE798B23FEEE65',
    '32F0EF3805A74E5E8AC6305197608D0E61FF2EC3B58843CE9FACB5E3A6CCDA13',
    '140F96A8FF5E4AC4A3761B87A618CBCB0B2AB3373C934978A3F99DCBD694E20F',
    'ADC87788CE784DC8BA0BDD7C2BA18836A2623A16BD12421C9BF20C32D44C7011',
    'C6F5435B028542D18B64ACA1BE76E22EA815269A736C48ABBA19F44816C46670',
    '7ABE6C677595472CB1E1BDE2E4C6493969BB96E10258424EA7AA22E4CE82C87B',
    '1922A6A6017D45CBBDB02ECBFDDDF8D23874463B61D84869B7D8ADAB44CF01F9',
    '2C0E2529A9314194AB5A71A51DF091814F0A40D83AA84E25AEEF06CBAB53EFBA',
    '5DAD1458B6D647DBB7A035D9AAF106EF276A555DBE7F469BBA19DF754C4B4120',
    '2FFCB00E7BB34782A1ED9CA0C58FDE363BA26CFC581341D5B5BE94E672516CCB',
    '3095BE5A902A4074A493069A2D7965A8B56EEC1F269A45ACBD17A465CB08D351',
    'B4CE5FBC7BCC4776A2B7ED20BBF9F679921FE3BCE2484EACB32CCB94ABA558ED',
    '74F483E3104A43A4B76C762C0AFCA19FE8C24A8BD09F4668AFF14B301B38E8CA',
    'F5C0540029294EFAAF85E32D70B2140178FAD90990BB4FDAA03A5A9DF4482170',
    'B8B1155624DB4CC98ED6A6E293F16AB5874E27301905451991E604195182EEBB',
    'F0F82B9EB9F14BE68947CBA401C0D6CB346C09B229814C94B9F08C3F25024520'
 ]
    const navigate = useNavigate();

    function Show(url) {
        setVdlink(url);

    }
    function showFeedBack(val) {
        setFeed(val);
    }
    function modalF(val) {
        setModal(val)
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
                "title": "Content Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link onClick={() => {

                    if (data.contentLink) {
                        Show(data.contentLink);
                    }
                    showFeedBack(data.last)
                    modalF(data.last);
                    markCourseAsCompleted(data.sid, data.sectionSid);
                    setShowcoursename(data.contentName);
                    setZoomInfo(zoomInfo => ({
                        ...zoomInfo,
                        ...{
                            "meetingId": data.meetingId,
                            "password": data.meetingPwd
                        }
                    }))

                }} style={{ cursor: "pointer" }} > {(data.type === "VIDEO" || data.type === "EXTERNAL_LINK") ? <PlayCircleIcon /> : (data.type === "TRAINING_SESSION") ? <DuoIcon /> : <SummarizeRoundedIcon />}
                    {data.contentName.length > 35 ? data.contentName.substring(0, 35) + "..." : data.contentName} {sectionSidArray.indexOf(data.sid) > -1 ? <p style={{float:"right",color:"blue"}}>Viewed</p>:<p style={{color:"gray"}}> View</p>}
                    
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
        tableCustomClass: "ng-table sort-enabled", // table custom class
        // showCheckbox: true,
        clearSelection: false
    });

    const getTrainingContentsByTrainingSid = async () => {
        try {
            let sum = 0;
            let trainingSid = location.state.sid;
            spinner.show();
            RestService.getTrainingContentsByTrainingSid(trainingSid).then(
                response => {

                    if (response.status === 200) {
                        setTrainingDetailsList(response.data.courseSectionResponseTO);

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
            let sidArray = [];
            spinner.show();
            RestService.markCourseAsCompleted(contentSid, sectionSid, trainingSid).then(
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
            console.error("error occur on markCourseAsCompleted()", err)
        }
    }

    //initialize component
    useEffect(() => {
        getTrainingContentsByTrainingSid();
        getCompletedCourses();
    }, []);

    console.log(markCompleted);
    return (
        <>
            <div className="row" >

                {showcoursename.length === 0 ? "" :
                    <div className=" title-sm col-8">Content Title: {showcoursename}</div>}
                <div className="col-4" >
                    <ProgressBar progress={markCompleted.totalCourseCompletedInTraining === null ? 0 : markCompleted.totalCourseCompletedInTraining > contentLength ? contentLength : markCompleted.totalCourseCompletedInTraining} totalSection={contentLength} trainingSid={location.state.sid}/>
                </div>
            </div>
            <hr />

            <div class="row">

                <div class="col-8  pl-3 " style={{ marginTop: "-25px" }}>
                    {/* <VideoMediaPlayer /> */}
                    {(vdlink.includes("youtube") || vdlink.includes("mp4")) ? <VideoMediaPlayer url={vdlink} />
                        : vdlink.includes("pdf") ? <iframe style={{ marginTop: "-2px" }} src={vdlink} width="100%" height="100%" />
                            : <div style={{ width: "130px", textAlign: "center", textDecoration: "none", color: "white", padding: "15px 20px", marginLeft: "280px", marginBottom: "50px", marginTop: "40px", border: "1px solid #49167E", borderRadius: "10px" }}>
                                <button onClick={() => navigate("/class", { state: zoomInfo })} >Join Now</button>
                            </div>

                    }

                    <div class="tabset">

                        <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked />
                        <label for="tab1">Overview</label>

                        <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                        <label for="tab2">Q&A</label>

                        <div class="tab-panels">
                            <section id="marzen" class="tab-panel">
                                <h2>6A. Overview</h2>
                                <p><strong>Overall Impression:</strong> An elegant, malty German amber lager with a clean, rich, toasty and bready malt flavor, restrained bitterness, and a dry finish that encourages another drink. The overall malt impression is soft, elegant, and complex, with a rich aftertaste that is never cloying or heavy.</p>
                                <p><strong>History:</strong> As the name suggests, brewed as a stronger “March beer” in March and lagered in cold caves over the summer. Modern versions trace back to the lager developed by Spaten in 1841, contemporaneous to the development of Vienna lager. However, the Märzen name is much older than 1841; the early ones were dark brown, and in Austria the name implied a strength band (14 °P) rather than a style. The German amber lager version (in the Viennese style of the time) was first served at Oktoberfest in 1872, a tradition that lasted until 1990 when the golden Festbier was adopted as the standard festival beer.</p>
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
                </div>
            </div>
        </>
    )
}
export default TrainingDetails