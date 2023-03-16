import React, { useContext, useEffect, useState} from "react";
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
    
    // this method to submit your answer

    //update content mark as completed
    // const markCourseAsCompleted =  () => {
    //     try {
    //         let trainingSid = "661E0409F66A499493004E8405F0F2C897C22E259D8445ADBBFCC9A54D84A6CA";
    //         let contentSid = "5571F1F543C645D38BC72C4996F85C0411F3C09CAD0E4725900AE875A0F20050";
    //         let sectionSid = "7C25EE2B8BC14F888BAFB25ADDBEB934A9DD38505E1349A4B01D6DB9E5BC1F51"
    //         let payload = {
    //             "completedInDuration": 0,
    //             "totalDuration": 0
    //         }
    //         spinner.show();
    //          RestService.markCourseAsCompleted(contentSid, sectionSid, trainingSid, payload).then(
    //             response => {

    //                 if (response.status === 200) {
    //                     console.log(response.data);

    //                 }
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         ).finally(() => {
    //             spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on markCourseAsCompleted()", err)
    //     }
    // }

    const handleSubmitAssessment = async() => {
        try {
            spinner.show("Submitting assessment.. Please wait...");
            let payload = {
                "quizSetSid": instruction.sid,
                "virtualAccountSid": assUserInfo.sid
            }
            await RestService.submitAssessment(payload).then(
                response => {
                    spinner.hide();
                    Toast.success({ message: `Congratulation! You have submitted your assessment successfully`, time: 3000 });
                    
                    setFinished(true);
                },
                err => {
                    spinner.hide();
                    if(err && err.response && err.response.status === 403) Toast.error({ message: `You have already submitted your assessment.` });
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
        if(hasExamEnd) {
            setShow(true);
            // markCourseAsCompleted();
        }
    }, [hasExamEnd])

    return (
        <div className={styles.main}>
            { finished && <FinishScreen {...{ questions }} /> }
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
                            
                            <button onClick={() => {handleSubmitAssessment()}}>Submit Assessment</button>
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
                                }}/>)
                            }
                        </> 
                        : <AssessmentCard {...{question: activeQuestion, questions}} />
                    }
                </>
            }
            {show && <TimesUpModal {...{show, setShow, callBack: () => handleSubmitAssessment()}}/>}
         
        </div>
    );
}

export default Main;