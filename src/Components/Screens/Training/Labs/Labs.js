import { useContext, useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'

import { useNavigate, Link } from "@reach/router"
import "./labs.css"
import useToast from "../../../../Store/ToastHook";
import AppContext from "../../../../Store/AppContext";
import RestService from "../../../../Services/api.service";
import CountdownTimer from "../../../Common/CountdownTimer/CountdownTimer";

function Labs(props) {
    const [labDescription, setLabDescription] = useState(props.location.state.labDescription);
    const [labOverview, setLabOverview] = useState(props.location.state.labOverview);
    const [labSolution, setLabSolution] = useState(props.location.state.labSolution);
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const { spinner } = useContext(AppContext)
    // const {setTraining,training} = useContext(TrainingContext)
    const [vdlink, setVdlink] = useState("");
    const [feed, setFeed] = useState(false);
    const [modal, setModal] = useState(false);
    // const [showcoursename, setShowcoursename] = useState('');
    const [zoomInfo, setZoomInfo] = useState({});
    const [contentLength, setContentLength] = useState(0);
    const [contentSid, setContentSid] = useState(props.location.state.contentSid);
    const [sectionSidArray, setSectionSidArray] = useState([]);
    const [markCompleted, setMarkAsCompleted] = useState([]);
    const [labId, setLabId] = useState(props.location.state.labId);
    const [type, setType] = useState('');
    const [labConnection, setLabConnection] = useState('');
    const [stopConnection, setStopConnection] = useState('');
    const [stopServer, setStopServer] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [labDuration, setLabDuration] = useState(props.location.state.labDuration);
    const [labName, setLabName] = useState(props.location.state.showcoursename);
    const Toast = useToast();
    const navigate = useNavigate();
    
    //start lab 
    const ec2GuacamolePOC = async () => {
        try {
            let trainingSid = props.location.state.trainingSid;
            let sectionSid = contentSid
            spinner.show();
            await RestService.ec2GuacamolePOC(labId, sectionSid, trainingSid).then(
                response => {
                    if (response.status === 200) {
                        Toast.success({ message: 'Lab Started Successfully', time: 3000 });
                        setLabConnection(response.data.split('#')[1]);
                        setStopConnection(response.data.split('#')[1]);
                        localStorage.setItem('connectionString', response.data.split('#')[1]);

                        setStopServer('');
                        setTimeout(function () {
                            setShowButton(true);
                            localStorage.setItem('appearButton', true);
                        }, 18000);
                    }
                },
                err => {
                    spinner.hide();
                    Toast.error({ message: 'Try again', time: 2000 });
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on ec2GuacamolePOC()", err)
        }
    }

    //stop lab 
    const stopEC2InstanceAndTerminateGuacamoleServer = async () => {
        try {
            spinner.show();
            if (labConnection.length > 0) {
                RestService.stopEC2InstanceAndTerminateGuacamoleServer(labConnection).then(
                    response => {
                        Toast.success({ message: 'Lab paused successfully', time: 3000 });
                        setLabConnection('');
                        setStopServer(response.data);
                        // localStorage.removeItem('appearButton');
                        // localStorage.removeItem('connectionString');
                    },
                    err => {
                        Toast.error({ message: 'Try again', time: 3000 });
                        spinner.hide();
                    }
                ).finally(() => {
                    spinner.hide();
                });
            }
            else if (stopConnection.length > 0) {
                RestService.stopEC2InstanceAndTerminateGuacamoleServer(stopConnection).then(
                    response => {
                        Toast.success({ message: 'Lab paused successfully', time: 3000 });
                        setStopServer(response.data);
                        // localStorage.removeItem('appearButton');
                        // localStorage.removeItem('connectionString');
                    },
                    err => {
                        spinner.hide();
                        Toast.error({ message: 'Try again', time: 3000 });
                    }
                ).finally(() => {
                    spinner.hide();
                });

            }
            else {
                const connectionString = localStorage.getItem('connectionString');
                RestService.stopEC2InstanceAndTerminateGuacamoleServer(connectionString).then(
                    response => {
                        Toast.success({ message: 'Lab paused successfully', time: 3000 });
                        setStopServer(response.data);
                        // localStorage.removeItem('appearButton');
                        // localStorage.removeItem('connectionString');
                    },
                    err => {
                        spinner.hide();
                        Toast.error({ message: 'Try again', time: 3000 });
                    }
                ).finally(() => {
                    spinner.hide();
                });
            }

        } catch (err) {
            console.error("error occur on stopEC2InstanceAndTerminateGuacamoleServer()", err)
        }
    }

    //terminate lab 
    const terminateEC2InstanceAndTerminateGuacamoleServer = async () => {
        try {
            spinner.show();
            if (labConnection.length > 0) {
                RestService.terminateEC2InstanceAndTerminateGuacamoleServer(labConnection).then(
                    response => {
                        Toast.success({ message: 'Lab completed successfully', time: 3000 });
                        setLabConnection('');
                        setStopConnection('');
                        setShowButton(false);
                        localStorage.removeItem('appearButton');
                        localStorage.removeItem('connectionString');
                        localStorage.removeItem("end_date");
                    },
                    err => {
                        spinner.hide();
                        Toast.error({ message: 'Try again', time: 3000 });
                    }
                ).finally(() => {
                    spinner.hide();
                });
            } else if (stopConnection.length > 0) {
                RestService.terminateEC2InstanceAndTerminateGuacamoleServer(stopConnection).then(
                    response => {
                        Toast.success({ message: 'Lab completed successfully', time: 3000 });
                        setStopConnection('');
                        setShowButton(false);
                        localStorage.removeItem('appearButton');
                        localStorage.removeItem('connectionString');
                        localStorage.removeItem("end_date");
                    },
                    err => {
                        spinner.hide();
                        Toast.error({ message: 'Try again', time: 3000 });
                    }
                ).finally(() => {
                    spinner.hide();
                });
            }
            else {
                const connectionString = localStorage.getItem('connectionString');
                RestService.terminateEC2InstanceAndTerminateGuacamoleServer(connectionString).then(
                    response => {
                        Toast.success({ message: 'Lab completed successfully', time: 3000 });
                        setStopConnection('');
                        setShowButton(false);
                        localStorage.removeItem('appearButton');
                        localStorage.removeItem('connectionString');
                        localStorage.removeItem("end_date");
                    },
                    err => {
                        spinner.hide();
                        Toast.error({ message: 'Try again', time: 3000 });
                    }
                ).finally(() => {
                    spinner.hide();
                });
            }
        } catch (err) {
            console.error("error occur on terminateEC2InstanceAndTerminateGuacamoleServer()", err)
        }
    }
   
    console.log(labDuration);

    return (
        <div style={{ background: "gray" }}>
            <div className="row" style={{height:"800px"}}>

                <div className="col-3 jumbotron pl-5 lab" >
               
             
           
                    <h3 className="text-center " style={{fontSize:"18px", fontWeight:"bold"}} >{labName}</h3>
                    <hr/>
                    <br/>
                    <h5 style={{fontSize:"18px", fontWeight:"bold"}}>Lab Description</h5>
                    
                   
<ReactMarkdown>

 {labDescription}
                    
</ReactMarkdown>
<br/>
<hr/>
<h5 style={{fontSize:"18px", fontWeight:"bold"}}>Lab Steps</h5>


<ReactMarkdown>

{labOverview}
</ReactMarkdown>
                
                    {/* <p>Lab Solution : &nbsp; {labSolution}</p><br /> */}
                </div>
                <div className="col-9" style={{ background: "black" }}>
                    {/* labbacimg */}
                    <div className=" row ml-1"  >
                        <div style={{ width: "130px", textAlign: "center", textDecoration: "none", background: "#471579 ", padding: "15px 20px", marginLeft: "18px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>

                            {(labConnection.length > 0 && stopConnection.length > 0) && localStorage.getItem('connectionString') ?
                                <div>
                                    <p className="text-white">Started</p>
                                </div>
                                :

                                <button style={{ color: "#fff", fontSize: "15px" }} onClick={() =>


                                    ec2GuacamolePOC()
                                }>Start Lab</button>}
                        </div>

                        {
                            showButton || localStorage.getItem('appearButton') ?
                                <>
                                    <div style={{ width: "130px", textAlign: "center", textDecoration: "none", background: "#471579 ", padding: "15px 20px", marginLeft: "80px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                        <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => stopEC2InstanceAndTerminateGuacamoleServer()}>{stopServer.length === 0 ? "Pause Lab" : "Paused"}</button>
                                    </div>
                                    <div style={{ width: "160px", textAlign: "center", textDecoration: "none", background: "#471579", padding: "15px 20px", marginLeft: "80px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                        <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => terminateEC2InstanceAndTerminateGuacamoleServer()}>Complete Lab</button>
                                    </div>
                                </>
                                : ''}
                        <div style={{ marginLeft: "80px", marginBottom: "50px", marginTop: "50px" }}>
                            {
                                labConnection.length > 0 || localStorage.getItem('connectionString') ?
                                    <CountdownTimer {...{ timeLimit: labDuration, callback: (time) => { } }} />
                                    : ''
                            }
                        </div>


                    </div>


                    <div className="py-2 " style={{ marginTop: "-10px" }}>{
                        (labConnection.length > 0 && stopConnection.length > 0) || localStorage.getItem('connectionString') ?

                            <iframe src={`https://lab.trainsoft.live/#${labConnection}`} width="100%" height="600px" />
                            : <p className="text-white">Please Click on Start Lab</p>}
                    </div>

                </div>
            </div>



        </div>

    )
}

export default Labs