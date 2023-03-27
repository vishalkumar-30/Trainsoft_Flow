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

const Main = ({ questions }) => {
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
                        localStorage.removeItem("trainingSid");
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

    // this method to submit your answer
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
                    markCourseAsCompleted();
                    Toast.success({ message: `Congratulation! You have submitted your assessment successfully`, time: 3000 });

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

    // listening when time's up to submit assessment automatically
    useEffect(() => {
        if (hasExamEnd) {
            setShow(true);
        }
    }, [hasExamEnd])

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