import { useContext, useState, useEffect } from "react";

import { useNavigate } from "@reach/router"

import useToast from "../../../../Store/ToastHook";
import AppContext from "../../../../Store/AppContext";
import RestService from "../../../../Services/api.service";


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
    const [showcoursename, setShowcoursename] = useState('');
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
                        Toast.success({ message: 'You can start lab now', time: 3000 });
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


    return (
        <>
           <div className="row">

           <div className="col-3 jumbotron pl-5">
           <p>Labs</p>
            <p>Lab Description : &nbsp; {labDescription}</p><br/>
            <p>Lab Overview : &nbsp; {labOverview}</p><br/>
            <p>Lab Solution : &nbsp; {labSolution}</p><br/>
           </div>
            <div className="col-9" style={{background:"gray"}}>
{/* labbacimg */}
                <div className=" row ml-1"  >
                    <div style={{ width: "130px", textAlign: "center", textDecoration: "none", background: "#471579 ", padding: "15px 20px", marginLeft: "18px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>

                        {(labConnection.length > 0 && stopConnection.length > 0) || localStorage.getItem('connectionString') ?
                            <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => window.open(`https://lab.trainsoft.live/#${labConnection}`, '_blank')}>Start Now</button>
                            :
                            <button style={{ color: "#fff", fontSize: "15px" }} onClick={() =>


                                ec2GuacamolePOC()
                            }>Start Lab</button>}
                    </div>
                   
                    {
                        (localStorage.getItem('appearButton')) ?
                            <>
                                <div style={{ width: "130px", textAlign: "center", textDecoration: "none", background: "#471579 ", padding: "15px 20px", marginLeft: "80px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                    <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => stopEC2InstanceAndTerminateGuacamoleServer()}>{stopServer.length === 0 ? "Pause Lab" : "Paused"}</button>
                                </div>
                                <div style={{ width: "160px", textAlign: "center", textDecoration: "none", background: "#471579", padding: "15px 20px", marginLeft: "80px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                    <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => terminateEC2InstanceAndTerminateGuacamoleServer()}>Complete Lab</button>
                                </div>
                            </>
                            : ''}
                </div>

                
            <div className="py-2 " style={{marginTop:"-10px"}}>{
                        (labConnection.length > 0 && stopConnection.length > 0) || localStorage.getItem('connectionString') ?
                    
                        <iframe src={`https://lab.trainsoft.live/#${labConnection}`} width="100%" height="600px"  />
                        : <p>Please Click on Start Lab</p>}
                </div>
                
            </div>
           </div>



        </>

    )
}

export default Labs