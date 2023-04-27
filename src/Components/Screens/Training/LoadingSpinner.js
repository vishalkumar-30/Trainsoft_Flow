import React from 'react'
import "./spinner.css";
import spinner from "../../../Assets/Images/spinner.gif" 
const LoadingSpinner = () => {
  return (
    <div> <div id="spinner" class="load">
    {/* <!-- <div class="loading"></div> --> */}
    <img src={spinner} />
  </div></div>
  )
}

export default LoadingSpinner