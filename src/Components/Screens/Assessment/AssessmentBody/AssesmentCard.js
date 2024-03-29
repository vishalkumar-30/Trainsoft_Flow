import React, { useContext, useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
import { AssessmentContext } from '../AssesementContext';
import Submit from "../common/SubmitButton";
import styles from "./AssessmentBody.module.css";
import AnswerOption from './AnswerOption';
import RestService from '../../../../Services/api.service';
import AppUtils from '../../../../Services/Utils';
import { IcnEdit } from '../../../Common/Icon';
// import CodeEditor from '../../ClassLab/CodeEditor/CodeEditor';

const AssessmentCard = ({ question, review = false, setReview, index, correct = false, result = false, questions }) => {
  const {
    setAnswer,
    selectedAnswers,
    finished,
    setQuestionIndex,
    questionIndex,
    activeQuestion,
    selectedAnswer,
    setSelectedAnswer,
    correctAnswerMulti,
    setCorrectAnswerMulti,
    instruction,
    assUserInfo,
    inReview,
    setInReview
  } = useContext(AssessmentContext);
  const [activeOption, setActiveOption] = useState(selectedAnswers[question?.sid]?.answerId);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [questionType, setQuestionType] = useState('');
  // const [correctAnswerMulti, setCorrectAnswerMulti] = useState([]);
  // this method to submit your answer
  // localStorage.setItem("assessmentSid", instruction.sid);

  //handle multiple checkbox
  const handleMultiCheck = (event, id) => {
    const { checked } = event.target;

    // Update the checkboxArray based on whether the checkbox was checked or unchecked
    if (checked) {
      setCorrectAnswerMulti((prevArray) => [...prevArray, id]);
    } else {
      setCorrectAnswerMulti((prevArray) => prevArray.filter((item) => item !== id));
    }
  };
  const handleSubmitAnswer = () => {
    if (AppUtils.isNotEmptyObject(selectedAnswer) && AppUtils.isNotEmptyObject(question)) {
      try {
        setSubmitStatus(true);
        let payload;
        if (questionType === "MS_MCQ") {
          payload = {
            "sid": inReview ? selectedAnswers[activeQuestion.sid]?.sid : null,
            // "answerSid": selectedAnswer.sid,
            "multiple_select_answer_sids": correctAnswerMulti,
            "questionSid": activeQuestion.questionId.sid,
            "quizSetSid": instruction.sid,
            "virtualAccountSid": assUserInfo.sid
          }
        }
        else {
          payload = {
            "sid": inReview ? selectedAnswers[activeQuestion.sid]?.sid : null,
            "answerSid": selectedAnswer.sid,
            "questionSid": activeQuestion.questionId.sid,
            "quizSetSid": instruction.sid,
            "virtualAccountSid": assUserInfo.sid
          }
        }
        console.log(payload);
        RestService.submitAnswer(payload).then(
          response => {

            setSubmitStatus(false);
            setQuestionIndex(inReview ? -1 : questionIndex + 1);
            setAnswer(question.sid, activeOption, response.data.sid);
            setSelectedAnswer({});
            setInReview(false);
          },
          err => {
            setSubmitStatus(false);
          }
        ).finally(() => {
          setSubmitStatus(false);
        });
      } catch (err) {
        console.error("Error occur in handleSubmitAnswer--", err);
      }
    }
  }

  useEffect(() => {
    setActiveOption(selectedAnswers[question?.sid]?.answerId);
  }, [question, selectedAnswers]);

  return (
    <div className={styles.AssessmentCard}>
      <div className={`${styles.questionNumber} aic mb20`}>
        <div>
          Question {questionIndex === -1 ? index + 1 : questionIndex + 1} / {Array.isArray(questions) && questions.length}
        </div>
        <div>
          {
            review
            && <div className={`${styles.editButton} aic`} onClick={() => { setQuestionIndex(index); setInReview(true); setReview(true) }}>
              <div className="mr5"><IcnEdit {...{ stroke: "#fff" }} /></div><div className="pt2">Edit</div>
            </div>
          }
        </div>
      </div>
      <div className={styles.title}>{question && question.questionId?.name}</div>
      <div>

        {/* {
          question && question.questionId?.sid === null &&
          <ReactMarkdown>
            {
              question.questionId.description
            }
          </ReactMarkdown>

        } */}

      </div>
      {
        question
        && question.questionId
        && Array.isArray(question.questionId.answer)
        && question.questionId.answer.length > 0
        && question.questionId.answer.map((option, i) =>
          <>
            <div
              onClick={() => {
                if (!finished && !review) {
                  setActiveOption(option?.sid);
                  setSelectedAnswer(option);
                  console.log(option)
                  setQuestionType(question.questionId.questionType)
                }
              }}
            >
             <div style={{display:"flex" }}>
             {
                question.questionId.questionType === "MS_MCQ" &&
                  <input className='mb-3 mr-2' type="checkbox" value={option.sid} checked={correctAnswerMulti.includes(option.sid)}
                    onChange={(event) => {
                      handleMultiCheck(event, option.sid);

                    }} disabled={review || finished? true : false} style={{outline:"none"}}/>
               
              }
              <AnswerOption
                {...option}
                correct={result ? option.correct : correct}
                key={option?.sid}
                index={i}
                active={activeOption === option?.sid}
                result={result}
                isAlphabet={question.questionId.alphabet}
                questionType={question.questionId.questionType}
              />
             </div>
              
            </div>
          </>)
      }

      {/* {
        question
        && question.questionId && question.questionId.sid === null &&
        <div>
          {localStorage.setItem("codingQuestionId", question.questionId.codingQuestionId)}
          <CodeEditor/>
        </div>

      } */}
      {
        question
        && question.questionId
        && Array.isArray(question.questionId.answer)
        && question.questionId.answer.length > 0
        && question.questionId.answer.map((option, i) => <>
          {
            result
            && <div className="row">
              <div className="col-10">
                {
                  finished
                    && result
                    ? (<>
                      {
                        option.correct
                        && activeOption === option?.sid
                        && <div class={`alert alert-success correct-answer-box mt5`} role="alert">
                          <h4 class="alert-heading f16 text-semi-bold">{"Correct Answer!"}</h4>
                          <p className="description">{question.questionId.answerExplanation}</p>
                        </div>

                      }
                      {
                        !option.correct
                        && activeOption === option?.sid
                        && <div class={`alert alert-danger wrong-answer-box mt5`} role="alert">
                          <h4 class="alert-heading f16 text-semi-bold">{"Your answer is wrong! The correct answer is,"}</h4>
                          <p className="description">{question.questionId.answerExplanation}</p>
                        </div>

                      }
                    </>)
                    : ""
                }
              </div>
            </div>
          }
        </>)
      }

      <div className={styles.divider} />
      {
        !review
        && !finished
        &&
        // question
        // && question.questionId && question.questionId.sid !== null &&
        <div className={styles.button}>
          <Submit onClick={() => { handleSubmitAnswer(); }} disabled={AppUtils.isEmptyObject(selectedAnswer)} assessment={true} loading={submitStatus}>{submitStatus ? "Submit..." : "Submit"}</Submit>
        </div>
      }
    </div>
  );
}

export default AssessmentCard;