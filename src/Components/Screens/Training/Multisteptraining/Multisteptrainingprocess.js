import { useState } from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import "./Step.css";
import Stepone from "./Stepone";
import Steptwo from "./Steptwo";
import Stepthree from "./Stepthree";
import Stepfour from "./Stepfour";
import Stepfive from "./Stepfive";



const Multisteptrainingprocess = ({location}) => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
  
    const handleNext = () => {     
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
   
    function getSteps() {
      return ['Training Info', 'Batch Info', 'Course Info',"Instructor","Complete"];
    }
  return (<>
    <div className="ass-step">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </div>
        <div className="table-shadow " style={{ padding: "10px 40px 10px 40px" }}>
        {activeStep === 0 && <><Stepone {...{handleNext,handleBack}}/></>}
        {activeStep === 1 && <><Steptwo {...{handleNext,handleBack}} /></>}
        {activeStep === 2 && <><Stepthree {...{handleNext,handleBack}} /></>}
        {activeStep === 3 && <><Stepfour {...{handleNext,handleBack}} /></>}
        {activeStep === 4 && <><Stepfive {...{handleNext,handleBack}} /></>}
      </div>
      </>
  )
}

export default Multisteptrainingprocess