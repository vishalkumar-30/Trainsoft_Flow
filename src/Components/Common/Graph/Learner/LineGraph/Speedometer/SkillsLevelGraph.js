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
        value={400}
  
       
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
        needleColor={"#49167E"}
        textColor={"#49167E"}
      />
    </div>
  
    </div>
  )
}

export default SkillsLevelGraph