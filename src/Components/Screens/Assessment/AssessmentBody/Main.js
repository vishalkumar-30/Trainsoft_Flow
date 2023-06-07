import React, { useContext, useEffect, useState } from "react";
import { AssessmentContext } from "../AssesementContext";
import Submit from "../common/SubmitButton";
import AssessmentCard from "./AssesmentCard";
import styles from "./AssessmentBody.module.css";
import FinishScreen from "./FinishScreen";
import AppContext from '../../../../Store/AppContext';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import useToast from "../../../../Store/ToastHook";
import TimesUpModal from "./TimesUpModal";
import RecordRTC from "recordrtc";
import AWS from 'aws-sdk';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
// const bucketUrl = process.env.REACT_APP_BUCKET_URL;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})


const Main = ({ questions}) => {
    const {
        questionIndex,
        activeQuestion,
        selectedAnswers,
        setFinished,
        finished,
        instruction,
        assUserInfo,
        hasExamEnd
    } = useContext(AssessmentContext);
    const { spinner } = useContext(AppContext);
    const [review, setReview] = useState(true);
    const [show, setShow] = useState(false);
    //start of recording
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
    //end of recording
    const Toast = useToast();

    //update content mark as completed
    const markCourseAsCompleted = () => {
        try {
            let trainingSid = localStorage.getItem("trainingSid");
            let contentSid = localStorage.getItem("sid");
            let sectionSid = localStorage.getItem("sectionSid");
            let payload = {
                "completedInDuration": 0,
                "totalDuration": 0
            }
            spinner.show();
            RestService.markCourseAsCompleted(contentSid, sectionSid, trainingSid, payload).then(
                response => {

                    if (response.status === 200) {
                        // localStorage.removeItem("trainingSid");
                        localStorage.removeItem("sid");
                        localStorage.removeItem("sectionSid");

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

    // this method to submit your answer for both assessment and via training
    const handleSubmitAssessment = async () => {
        try {
            spinner.show("Submitting assessment.. Please wait...");
            let payload;
            let trainingSid = localStorage.getItem("trainingSid");
            if (trainingSid !== null) {
                payload = {
                    "quizSetSid": instruction.sid,
                    "trainingSid": trainingSid,
                    "virtualAccountSid": assUserInfo.sid
                }
            }
            else {
                payload = {
                    "quizSetSid": instruction.sid,
                    "virtualAccountSid": assUserInfo.sid
                }
            }

            await RestService.submitAssessment(payload).then(
                response => {
                    spinner.hide();
                    Toast.success({ message: `Congratulation! You have submitted your assessment successfully`, time: 3000 });
                    if(trainingSid !== null){
                        markCourseAsCompleted();
                        stop();
                    }
                    setFinished(true);
                },
                err => {
                    spinner.hide();
                    if (err && err.response && err.response.status === 403) Toast.error({ message: `You have already submitted your assessment.` });
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("Error occur in handleSubmitAssessment--", err);
        }

    }

    // start of recording
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
        let userSid = JSON.parse(localStorage.getItem('user'))
        userSid = userSid.sid;
        let trainingSid = localStorage.getItem("trainingSid");

        return (
            `assessmentrecording_${instruction.sid}_${trainingSid}_${userSid}.${fileExtension}`
        );
    };

    const uploadFile = async (file) => {
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
                // if (evt.loaded === evt.total) {

                //     insertRecordingSeedDetails();
                // }
            })
            .send((err, data) => {
                if (err) console.log(err);
            });
    };

    //save link to db

    // const insertRecordingSeedDetails = () => {
    //     axios.post(`https://trainsoft.live/insled/v2/insert-seed-recording-details`, {}, {
    //         params: {
    //             recording_link: `${bucketUrl}${getFileName("mp4")}`
    //         }
    //     })
    //         .then(response => console.log(response.status))
    //         .catch(err => console.warn(err));
    // }
    // end of recording    
    // listening when time's up to submit assessment automatically
    useEffect(() => {
        if (hasExamEnd) {
            setShow(true);
        }
    }, [hasExamEnd]);

    useEffect(()=>{
        startScreenRecord();
    },[])

    return (
        <div className={styles.main}>
            {finished && <FinishScreen {...{ questions }} />}
            {
                !finished
                && AppUtils.isNotEmptyArray(questions)
                && <>
                    {
                        questions
                        // if all questions are mandatory
                        //TO DO && Object.keys(selectedAnswers).length === questions.length 
                        && questionIndex === -1
                        && <div className={styles.doneBox}>
                            <div>
                                <div style={{ font: "normal normal 600 14px/26px Montserrat" }}>
                                    Awesome! You have attended {AppUtils.isNotEmptyObject(selectedAnswers) && Object.keys(selectedAnswers).length}/
                                    {questions.length} questions in your assessment!
                                </div>
                                <div>
                                    You can either Submit your assessment now or review your
                                    answers & then submit
                                </div>
                            </div>

                            <Submit onClick={() => { handleSubmitAssessment() }}>Submit Assessment</Submit>
                        </div>
                    }
                    {
                        questionIndex === -1
                            ? <>
                                {
                                    AppUtils.isNotEmptyArray(questions)
                                    && questions.map((question, index) => <AssessmentCard {...{
                                        question,
                                        index,
                                        review,
                                        setReview,
                                        questions
                                    }} />)
                                }
                            </>
                            : <AssessmentCard {...{ question: activeQuestion, questions }} />
                    }
                </>
            }
            {show && <TimesUpModal {...{ show, setShow, callBack: () => handleSubmitAssessment() }} />}

        </div>
    );
}

export default Main;