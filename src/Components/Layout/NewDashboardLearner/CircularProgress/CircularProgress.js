import React from 'react'
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  
  const percentage = 66;
const CircularProgress = () => {
     
    

  
  return (
    <div ><Example >
    <CircularProgressbar
 
   
      value={percentage}
      text={`${percentage}%`}
      styles={buildStyles({
        pathColor: "#7214AE",
        rotation: 0.5 + (1 - percentage / 100) / 2
      })}
    />
  </Example></div>
  )
  function Example(props) {
    return (
      <div style={{ marginBottom: 60 }}>
    
        <div style={{display: "flex" }}>
          <div style={{width: "50%",
    paddingRight: "30px",
    marginLeft: "100px"
}}>{props.children}</div>
          <div >
            <h3 className="h5">{props.label}</h3>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CircularProgress