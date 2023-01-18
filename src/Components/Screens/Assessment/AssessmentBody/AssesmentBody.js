import React, { useContext, useState } from "react";
import { AssessmentContext } from "../AssesementContext";
import { IntroDialog } from "../IntroDialog";
import styles from "./AssessmentBody.module.css";
import Header from "./Header";
import Main from "./Main";

const AssessmentBody = ({location}) => {
  const {
    instruction,
    questions
  } = useContext(AssessmentContext);
  const [introDialog, setIntroDialog] = useState(true);
  const [intro, setIntro] = useState(false);
  
  const status = () => {
    localStorage.setItem("status", false);
    localStorage.setItem('instruction', JSON.stringify(instruction));
    setIntro(false);
  }
  setTimeout(status, 5000);
console.log(instruction);
  return (
    <div className={styles.container}>
      {
        localStorage.getItem("status") === "false" ? 
        <IntroDialog {...{open: intro, setOpen: setIntroDialog,location}} />
        :
        <IntroDialog {...{open: introDialog, setOpen: setIntroDialog,location}} />
      }
      <Header {...{introDialog, instruction,location}} />
      
      <Main {...{questions: questions}}/>
    </div>
  );
};

export default AssessmentBody;
