import React, { useContext, useState,useEffect } from "react";
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

  useEffect(() => {
    document.documentElement.requestFullscreen();
    const handleBeforeUnload = (e) => {
      
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('fullscreenchange', handleFullscreenChange); // add event listener for fullscreen change

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('fullscreenchange', handleFullscreenChange); // remove event listener when component unmounts
      document.exitFullscreen(); // exit fullscreen when component unmounts
    };
     
  
  }, []);
  function handleFullscreenChange() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen(); // re-enter fullscreen if user exits fullscreen
    }
  }
  return (
    <div className={styles.container}>
      <IntroDialog {...{open: introDialog, setOpen: setIntroDialog,location}} />
      <Header {...{introDialog, instruction,location}} />
      <Main {...{questions: questions}}/>
    </div>
  );
};

export default AssessmentBody;