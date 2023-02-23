import { useState, useContext, useEffect } from 'react';
import './classlab.css'
import vid from '../../../Assets/Images/vid.jpg';
import { ICN_ASSESSMENT, ICN_BACK, ICN_CLOSE, ICN_EXIT, ICN_MIC, ICN_PEOPLE, ICN_RECORD, ICN_SCREEN_SHARE, ICN_EXPANDED, ICN_SEND, ICN_VIDEO } from '../../Common/Icon';
import { CustomToggle } from '../../../Services/MethodFactory';
import { Dropdown } from 'react-bootstrap';
import { BtnRound, BtnSquare, Button } from '../../Common/Buttons/Buttons'
import OnlineMedia from './OnlineMedia/OnlineMedia';
import Content from './Content/Content';
import ClassPoll from './ClassPoll/ClassPoll';
import { BsDropDown } from '../../Common/BsUtils';
import CodeEditor from './CodeEditor/CodeEditor';
import WhiteBoard from './WhiteBoard/WhiteBoard';
import NoDataFound from '../../Common/NoDataFound/NoDataFound';
import { navigate } from '../../Common/Router';
import DevelopmentEnv from './DevelopmentEnv/DevelopmentEnv';
import AppContext from '../../../Store/AppContext';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant';
import ClassNotes from './ClassNotes/ClassNotes';
import Zoom from '../../Zoom/Zoom';
import "../../Zoom/zoom.css";
const classTab = ['Media Library', 'Whiteboard', 'Content', 'Code editor', 'Development Env']
const learnerTab = ['Media Library', 'Code editor', "Notes"]

const ClassLab = (props) => {
    let zoomInfo2 = {
        meetingId: props.location.state.meetingId,
        password: props.location.state.password
    }
    const { user, spinner, ROLE, zoomInfo } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const isTrainer = user.role === ROLE.INSTRUCTOR ? true : false
    const menuTab = isTrainer ? classTab : learnerTab
    const [tab, setTab] = useState(isTrainer ? [] : ['Notes'])
    const [selectedTab, setSelectedTab] = useState(isTrainer ? "" : "Notes")
    const [isFull, setIsFull] = useState(false)

    function refreshPage() {
        navigate('training')
        setTimeout(() => {
            window.location.reload(true);
        }, 1);
        console.log('page to reload')
    }

    return (<>

        <div className="p-4 full-w full-h">
            <div className="row full-w full-h ">
                <div className={`full-w  column ${isFull ? "d-none" : "col-sm-6"}`}>
                    <div className="title-lg pointer" onClick={() => navigate('/dashboard')}>TrainSoft - {!isTrainer ? 'Learner' : 'Instructor'}</div>
                    <button className='btn btn-primary mb-2' onClick={refreshPage}>{ICN_BACK}Goback</button>
                    <div className="flx">
                        {tab.length !== 0 ?
                            tab.map((res, i) => <div key={i} className={`class-mode ${selectedTab === res && 'active-tab-class'}`}>
                                <div className="" onClick={() => { setSelectedTab(res) }}>{res}</div><div className={`mode-close }`} onClick={() => { setTab(tab.filter(resp => resp !== res)); setSelectedTab(tab[i - 1]) }}>{ICN_CLOSE}</div>
                            </div>)
                            : <div className="class-mode">New</div>}
                        <Dropdown className="dropdown-menus">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <div className="plus-btn">+</div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu as="div" align="right">
                                {menuTab.map(resp => <Dropdown.Item className={`${tab.some(res => res === resp) ? 'd-none' : 'd-block'}`} onClick={() => { setTab(prevState => [...prevState, resp]); setSelectedTab(resp) }}>{resp}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="class-lab vic">
                        {tab.length > 0 ? <>
                            {selectedTab === "Whiteboard" && <WhiteBoard className={`${selectedTab === "Whiteboard" ? 'd-block' : 'd-none'}`} />}
                            <div className={`${selectedTab === "Content" ? 'd-block' : 'd-none'} full-h full-w`}><Content /> </div>
                            <div className={`${selectedTab === "Code editor" ? 'column' : 'd-none'} full-h full-w `}><CodeEditor {...{ themesColor: false }} /></div>
                            <div className={`${selectedTab === "Media Library" ? 'd-block' : 'd-none'} full-h full-w`}><OnlineMedia /></div>
                            <div className={`${selectedTab === "Notes" ? 'd-block' : 'd-none'} full-h full-w`}><ClassNotes trainingSid={props.location.state.trainingSid} trainingSessionSid={props.location.state.trainingSessionSid} /></div>

                            {selectedTab === "Development Env" && <div>
                                <DevelopmentEnv />
                            </div>}
                        </> : <div className="">
                            <div className="title-md mb-3">You are currently not sharing anything </div>
                            <div>Start sharing now!</div>
                        </div>}
                    </div>
                </div>

                {/* right panel */}
                <div className={`${isFull ? "col-md-12" : "col-sm-6"} column `} >
                    <div className="flx jce">
                        {/* <BtnSquare className="mr-3 expZoom" onClick={()=>setIsFull(!isFull)}>{ICN_EXPANDED}</BtnSquare> */}
                        {/* <BtnSquare className="mr-3">{ICN_RECORD}</BtnSquare>
                        <BtnSquare className="mr-3"> {ICN_PEOPLE}</BtnSquare>
                        <BsDropDown
                            header={<BtnSquare className="mr-3">{ICN_ASSESSMENT}</BtnSquare>}>
                            <Dropdown.Item onClick={() => setShow(true)}>Create a poll</Dropdown.Item>
                            <Dropdown.Item>Result</Dropdown.Item>
                        </BsDropDown>
                        <BtnSquare className="mr-3">{ICN_ASSESSMENT}</BtnSquare>
                        <BtnSquare className="mr-3">{ICN_EXIT}</BtnSquare> */}
                    </div>


                    <div className="video-container " >
                        {/* <div className="video-action">
                                    <img src={vid}/>
                                <div></div>
                            </div>
                            <div className="footer-video-action">
                                <BtnRound className="mr-3">{ICN_VIDEO}</BtnRound>
                                <BtnRound>{ICN_MIC}</BtnRound>
                            </div> */}
                        {/* <object type="text/html" data={GLOBELCONSTANT.ZOOM_PATH + '/'+ zoomInfo.meetingId} style={{ width: "100%", height: "100%" }}>
                                <p>backup content</p>
                            </object>  */}

                        <Zoom zoomInfo={zoomInfo2} />
                        {/* <Zoom zoomInfo={zoomInfo}   /> */}


                    </div>


                    {/* <div className="flx mt-3 ">
                        <div className="tab-btn">Class conversation</div>
                        <div className="tab-btn secondary-color">Private message</div>
                    </div>
                    <div className="chat-container">
                        <div className="chat-body">
                            <div className="inbound-chat">
                                <div className="user-img">
                                    US
                                </div>
                                <div className="chat-bubble">
                                    <div>You</div>
                                    <div> You did a really great work! Can you please make me one more report until tomorrow EOB?</div>

                                </div>
                            </div>
                            <div className="outbound-chat">
                                <div className="chat-bubble">
                                    <div>You</div>
                                    <div>Tnx Monica, sure! Tell me what you need.</div>
                                </div>
                            </div>
                        </div>
                        <div className="jcb">
                            <div className="chat-send">
                                <div><input type="text" className="form-control" placeholder="Type your message..." /></div>
                                <div className="primary-cir text-white">{ICN_SEND}</div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* end right panel */}
            </div>
        </div>
        <ClassPoll {...{ setShow, show }} />
    </>)
}
export default ClassLab