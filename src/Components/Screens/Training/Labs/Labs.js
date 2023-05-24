import { useContext, useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from "@reach/router";
import useToast from "../../../../Store/ToastHook";
import AppContext from "../../../../Store/AppContext";
import RestService from "../../../../Services/api.service";
import CountdownTimer from "../../../Common/CountdownTimer/CountdownTimer";
import CodeEditor from "../../ClassLab/CodeEditor/CodeEditor";
import "./labs.css";
import { ICN_BACK } from "../../../Common/Icon";
import LabSpinner from "./LabSpinner";
import RecordRTC from "recordrtc";
import AWS from 'aws-sdk';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, Button, Row } from "reactstrap";

const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;
const bucketUrl = process.env.BUCKET_URL

AWS.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

function Labs(props) {
    const [labDescription, setLabDescription] = useState(props.location.state.labDescription);
    const [codingQuestiondesc, setcodingQuestiondesc] = useState(false);
    const [labOverview, setLabOverview] = useState(props.location.state.labOverview);
    const [labType, setLabType] = useState(props.location.state.type);
    const { spinner } = useContext(AppContext)
    const [contentSid, setContentSid] = useState(props.location.state.contentSid);
    const [labId, setLabId] = useState(props.location.state.labId);
    const [startLabConnection, setStartLabConnection] = useState('');
    // const [labConnection, setLabConnection] = useState('');
    const [stopConnection, setStopConnection] = useState('');
    const [stopServer, setStopServer] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [labDuration, setLabDuration] = useState(props.location.state.labDuration);
    const [labName, setLabName] = useState(props.location.state.showcoursename);
    const [evaluatedLab, setEvaluatedLab] = useState(props.location.state.evaluatedLab);
    const [isLoading, setIsLoading] = useState(true);
    const [offStartButton, setOffStartButton] = useState(true);

    //for recording
    const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
    const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
    const [screen, setScreen] = useState(null);
    const [camera, setCamera] = useState(null);
    const [recorder, setRecorder] = useState(null);
    const [startDisable, setStartDisable] = useState(false);
    const [stopDisable, setStopDisable] = useState(true);
    const [loadModal, setLoadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const Toast = useToast();
    const navigate = useNavigate();

    // strechable layout start
    const [leftWidth, setLeftWidth] = useState(40);

    const handleMouseMove = (e) => {
        setLeftWidth(e.clientX / window.innerWidth * 100);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // strechable layout end

    //recording method starts
    const captureCamera = (cb) => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true, //make it true for video
            })
            .then(cb);
    };

    const startScreenRecord = async () => {
        await setStopDisable(false);
        setStartDisable(true);

        captureScreen((screen) => {
            captureCamera(async (camera) => {
                screen.width = window.screen.width;
                screen.height = window.screen.height;
                screen.fullcanvas = true;
                camera.width = 320;
                camera.height = 240;
                camera.top = screen.height - camera.height;
                camera.left = screen.width - camera.width;

                setScreen(screen);
                setCamera(camera);

                const newRecorder = RecordRTC([screen, camera], {
                    type: "video",
                });

                newRecorder.startRecording();
                newRecorder.screen = screen;

                setRecorder(newRecorder);
            });
        });
    };

    const captureScreen = (callback) => {
        invokeGetDisplayMedia(
            (screen) => {
                addStreamStopListener(screen, () => { });
                callback(screen);
            },
            (error) => {
                console.error(error);
                alert(
                    "Unable to capture your screen. Please check console logs.\n" + error
                );
                setStopDisable(true);
                setStartDisable(false);
            }
        );
    };

    const stopLocalVideo = async (screen, camera) => {
        [screen, camera].forEach(async (stream) => {
            stream.getTracks().forEach(async (track) => {
                track.stop();
            });
        });
    };

    const invokeGetDisplayMedia = (success, error) => {
        var displaymediastreamconstraints = {
            video: {
                displaySurface: "monitor", // monitor, window, application, browser
                logicalSurface: true,
                cursor: "always", // never, always, motion
            },
        };
        displaymediastreamconstraints = {
            video: true,
            audio: true,
        };
        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices
                .getDisplayMedia(displaymediastreamconstraints)
                .then(success)
                .catch(error);
        } else {
            navigator
                .getDisplayMedia(displaymediastreamconstraints)
                .then(success)
                .catch(error);
        }
    };

    const addStreamStopListener = (stream, callback) => {
        stream.addEventListener(
            "ended",
            () => {
                callback();
                callback = () => { };
            },
            false
        );
        stream.addEventListener(
            "inactive",
            () => {
                callback();
                callback = () => { };
            },
            false
        );
        stream.getTracks().forEach((track) => {
            track.addEventListener(
                "ended",
                () => {
                    callback();
                    callback = () => { };
                },
                false
            );
            track.addEventListener(
                "inactive",
                () => {
                    callback();
                    callback = () => { };
                },
                false
            );
        });
        stream.getVideoTracks()[0].onended = () => {
            stop();
        };
    };

    const stop = async () => {
        await setStartDisable(true);
        recorder.stopRecording(stopRecordingCallback);
    };

    const stopRecordingCallback = async () => {
        await stopLocalVideo(screen, camera);

        let recordedVideoUrl;
        let blob = recorder.getBlob();

        if (recorder.getBlob()) {
            setRecordedVideoUrl(URL.createObjectURL(recorder.getBlob()));
        }

        setScreen(null);
        setIsOpenVideoModal(true);
        setStartDisable(false);
        setStopDisable(true);
        setCamera(null);

        recorder.screen.stop();
        recorder.destroy();
        setRecorder(null);

        var file = new File([blob], getFileName("mp4"), {
            type: "video/mp4",
        });

        uploadFile(file);
    };

    const videoModalClose = () => {
        setIsOpenVideoModal(false);
    };

    const openModal = async () => {
        await setLoadModal(false);
    };

    const getFileName = (fileExtension) => {
        let trainingSid = props.location.state.trainingSid;
        let userSid = JSON.parse(localStorage.getItem('user'))
        userSid = userSid.sid;

        return (
            `labrecording_${labId}_${trainingSid}_${userSid}.${fileExtension}`
        );
    };

    const uploadFile = async(file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100));
                // console.log("success");
                if (evt.loaded === evt.total) {
                    
                    insertRecordingSeedDetails();
                }
            })
            .send((err, data) => {
                if (err) console.log(err);
            });
    };

    //save link to db

    const insertRecordingSeedDetails = () => {
        axios.post(`https://trainsoft.live/insled/v2/insert-seed-recording-details`, {}, {
            params: {
                recording_link: `${bucketUrl}${getFileName("mp4")}`
            }
        })
            .then(response => console.log(response.status))
            .catch(err => console.warn(err));
    }

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
                        setStartLabConnection(response.data);
                        setStopConnection(response.data.split('#')[1]);
                        localStorage.setItem('connectionString', response.data.split('#')[1]);
                        setStopServer('');
                        setTimeout(function () {
                            setShowButton(true);
                            setIsLoading(false);
                            localStorage.setItem('appearButton', true);
                            startScreenRecord();
                        }, 18000);
                        // setLabConnection(response.data.split('#')[1]);
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
            if (startLabConnection.length > 0) {
                RestService.stopEC2InstanceAndTerminateGuacamoleServer(startLabConnection.split('#')[1]).then(
                    response => {
                        Toast.success({ message: 'Lab paused successfully', time: 3000 });
                        setStartLabConnection('');
                        setStopServer(response.data);
                        // setLabConnection('');
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
            if (startLabConnection.length > 0) {
                RestService.terminateEC2InstanceAndTerminateGuacamoleServer(startLabConnection.split('#')[1]).then(
                    response => {
                        Toast.success({ message: 'Lab completed successfully', time: 3000 });
                        setStartLabConnection('');
                        setStopConnection('');
                        setShowButton(false);
                        markCourseAsCompletedLabs();
                        localStorage.removeItem('appearButton');
                        localStorage.removeItem('connectionString');
                        localStorage.removeItem("end_date");
                        setOffStartButton(true);
                        stop()
                        // setLabConnection('');
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
                        markCourseAsCompletedLabs();
                        localStorage.removeItem('appearButton');
                        localStorage.removeItem('connectionString');
                        localStorage.removeItem("end_date");
                        setOffStartButton(true);
                        stop()
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
                        markCourseAsCompletedLabs();
                        localStorage.removeItem('appearButton');
                        localStorage.removeItem('connectionString');
                        localStorage.removeItem("end_date");
                        setOffStartButton(true);
                        stop()
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
    //mark course as complete labs
    const markCourseAsCompletedLabs = () => {
        try {
            let trainingSid = props.location.state.trainingSid;
            let timestamp = new Date(localStorage.getItem("end_date") - Date.now());
            let splitMinutes = timestamp.toUTCString().slice(-11, -4).split(':');
            let minutes = (+splitMinutes[0]) * 60 + (+splitMinutes[1]);

            let payload = {
                "completedInDuration": minutes,
                "totalDuration": labDuration
            }

            spinner.show();
            RestService.markCourseAsCompletedLabs(labId, contentSid, trainingSid, payload).then(
                response => {

                    if (response.status === 200) {
                        console.log(response.data);

                    }
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on markCourseAsCompletedLabs()", err)
        }
    }

    useEffect(() => {
        props.location.state.codingQuestiondesc ?
            setcodingQuestiondesc(props.location.state.codingQuestiondesc) : setcodingQuestiondesc(false)

    }, []);

    return (
        <div >
            <div style={{ display: 'flex', height: '100vh', background: "#e9ecef" }} >
                {/* <p className='text-center'><Link to="/training/training-details"  >{ICN_BACK}Go Back </Link></p> */}

                <div className="jumbotron pl-5 lab" style={{ width: `${leftWidth}%`, height: '100%', overflow: 'auto' }} >
                    {/* {showButton || localStorage.getItem('appearButton') ?

                        evaluatedLab && <ScreenRecording trainingSid={props.location.state.trainingSid} sectionSid={contentSid}
                            labId={labId} />
                        : ''} */}
                    <button onClick={() => navigate(-1)}>{ICN_BACK}Go back</button>
                    <h3 className="text-center " style={{ fontSize: "18px", fontWeight: "bold" }} >{labName}</h3>
                    <hr />
                    <br />
                    <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>Lab Description</h5>
                    {
                        codingQuestiondesc !== false ? <ReactMarkdown>
                            {codingQuestiondesc}
                        </ReactMarkdown>
                            : <ReactMarkdown>
                                {labDescription}
                            </ReactMarkdown>
                    }
                    <br />
                    <hr />

                    {codingQuestiondesc !== false ? "" : <><h5 style={{ fontSize: "18px", fontWeight: "bold" }}>Lab Steps</h5>
                        <ReactMarkdown>

                            {labOverview}
                        </ReactMarkdown></>

                    }
                    {/* <p>Lab Solution : &nbsp; {labSolution}</p><br /> */}
                </div>
                {
                    labType === 'CODING' ?
                        <div className="col-9 mainbody" >
                            {
                                !showEditor ? <button className="btn btn-primary mt-3" style={{ color: "#fff", fontSize: "15px" }} onClick={() => { setShowEditor(true) }}>Start Lab</button>
                                : <div className="btn btn-primary mt-3" style={{ color: "#fff", fontSize: "15px" }}>Started</div>
                            }
                            
                            {
                                showEditor ?
                                    <CodeEditor trainingSid={props.location.state.trainingSid} codingQuestionId={props.location.state.codingQuestionId} sectionSid={props.location.state.contentSid} />
                                    : <div className="title-sm mt-3">Please Click on Start Lab</div>
                            }
                        </div>
                        :

                        <>
                            <div style={{ width: '10px', background: '#ddd', cursor: 'col-resize' }} onMouseDown={handleMouseDown}></div>
                            <div className=" mainbody ml-2" style={{ flex: '1', height: '100%', overflow: 'auto', background: "black" }}>
                                {/* labbacimg */}
                                <div className=" row ml-1"  >
                                    <div className="col-2" style={{ textAlign: "center", textDecoration: "none", background: "#471579 ", padding: "15px 20px", marginLeft: "18px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>

                                        {
                                            (startLabConnection.length > 0 && stopConnection.length > 0) && localStorage.getItem('connectionString') && !isLoading ?
                                                <div>
                                                    <p className="text-white">Started</p>
                                                </div>
                                                :
                                                offStartButton && 
                                                 <button style={{ color: "#fff", fontSize: "15px" }} onClick={() =>{
                                                    ec2GuacamolePOC(); setOffStartButton(false)}
                                                }>Start Lab</button>}
                                    </div>
                                    {
                                        showButton || localStorage.getItem('appearButton') ?
                                            <>
                                                <div className="col-2" style={{ textAlign: "center", textDecoration: "none", background: "#471579 ", padding: "15px 20px", marginLeft: "25px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                                    <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => stopEC2InstanceAndTerminateGuacamoleServer()}>{stopServer.length === 0 ? "Pause Lab" : "Paused"}</button>
                                                </div>
                                                <div className="col-2" style={{ textAlign: "center", textDecoration: "none", background: "#471579", padding: "15px 20px", marginLeft: "25px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                                    <button style={{ color: "#fff", fontSize: "15px" }} onClick={() => terminateEC2InstanceAndTerminateGuacamoleServer()}>Complete Lab</button>
                                                </div>
                                                {/* <div className="col-2" style={{ textAlign: "center", textDecoration: "none", background: "#471579", padding: "15px 20px", marginLeft: "25px", marginBottom: "50px", marginTop: "40px", border: "1px solid #471579", borderRadius: "10px" }}>
                                                    <button style={{ color: "#fff", fontSize: "15px" }}>Start Recording</button>
                                                </div> */}
                                                {/* <ScreenRecording /> */}
                                            </>
                                            : ''}
                                    <div className="col-2" style={{ marginLeft: "25px", marginBottom: "50px", marginTop: "50px" }}>
                                        {
                                            (startLabConnection.length > 0 || localStorage.getItem('connectionString')) && !isLoading ?
                                                <CountdownTimer {...{ timeLimit: labDuration, callback: (time) => { } }} />
                                                : ''
                                        }
                                    </div>
                                </div>

                                <div className="py-2 " style={{ marginTop: "-10px" }}>{
                                    (startLabConnection.length > 0 && stopConnection.length > 0) || localStorage.getItem('connectionString') ?
                                        // <iframe src={`https://lab.trainsoft.live/#${labConnection}`} width="100%" height="600px" />

                                        isLoading ?
                                            <LabSpinner />

                                            :
                                            <iframe src={startLabConnection} width="100%" height="600px" />

                                        :
                                        <p className="text-white">Please Click on Start Lab</p>}
                                </div>

                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Labs