import React from 'react'
import "react-circular-progressbar/dist/styles.css";
import {
 
  CircularProgressbarWithChildren,
 
} from "react-circular-progressbar";
import "./progressbar.css"
import FastForwardIcon from '@mui/icons-material/FastForward';
function Example(props) {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "10%", paddingRight: 4 }}>
            {props.children}
          </div>
         

<div class="product" style={{ display:"flex", paddingTop:6 }}>
  <h6 style={{color:"#3f51b5", fontSize:"14px"}}> {props.label}
  <span><FastForwardIcon/></span>
  </h6>
    <div class="product-text">
        <h6>&nbsp;: &nbsp;{props.progress} of {props.totalSection} complete.</h6>
    
    </div>
 
</div>





        </div>
      </div>
    );
  }

const ProgressBar = (props) => {
  return (
    <>
    <Example label="Your Progress" progress={props.progress} totalSection={props.totalSection}>
      <CircularProgressbarWithChildren value={(props.progress/props.totalSection)*100}>
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        <img
          style={{ width: 20, margin: -5 }}
          src="https://cdn-icons-png.flaticon.com/512/1021/1021220.png"
          alt="doge"
        />
        {/* <div style={{ fontSize: 12, marginTop: -5 }}>
        <strong>66%</strong> mate
      </div> */}
      </CircularProgressbarWithChildren>
    </Example>
  </>

  )
}

export default ProgressBar