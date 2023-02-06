import React from 'react'
import ReactSpeedometer from "react-d3-speedometer";


const SkillsLevelGraph = () => {
  return (
    <div>
          <div>
      <ReactSpeedometer
        width={540}
        height={400}
        needleHeightRatio={0.8}
        value={1000}
  
       
        currentValueText="Skill Meter"
        customSegmentLabels={[
          {
            text: "Begineer",
            color: "#fff",
            fontSize: "15px",
         
          },
          {
            text: "Elementry",
            color: "#fff",
            fontSize: "15px"
          },
          {
            text: "Intermediate",
            color: "#fff",
            fontSize: "15px"
          },
          {
            text: "Advanced",
            color: "#fff",
            fontSize: "15px"
          },
          {
            text: "Proficient",
            color: "#fff",
            fontSize: "15px"
          },
         
         
          
        ]}
        ringWidth={100}
        needleTransitionDuration={3333}
        needleTransition="easeElastic"
        needleColor={"#90f2ff"}
        textColor={"#d8dee9"}
      />
    </div>
  
    </div>
  )
}

export default SkillsLevelGraph