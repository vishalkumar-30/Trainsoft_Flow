import { React, useState, useEffect } from 'react'
import "../NewDashboardLearner.css";
import "./Timeline.css";

const LeaderboardTimeline = ({ ranking ,leaderboardPercentage}) => {

  const [yTranslation, setYTranslation] = useState(ranking);
  console.log(leaderboardPercentage)

  useEffect(() => {
    // Update the Y translation value to move the element to the top
    setYTranslation(ranking);
    // setTimeout(() => setYTranslation(ranking), 2000);
    // setYTranslation(ranking);
    // Reset the Y translation value after 10 seconds to move the element back to the bottom

  }, [ranking])
  return (
    <>

      <svg width="236" height="270" viewBox="0 0 236 270" fill="none" xmlns="http://www.w3.org/2000/svg">
       
        <rect width="25" height="270" rx="12.5" fill="url(#paint0_linear_75_1293)" />
        <path class="lead" d="M39 24.7321C37.6667 23.9623 37.6667 22.0378 39 21.2679L55.5 11.7417C56.8333 10.9719 58.5 11.9341 58.5 13.4737L58.5 32.5263C58.5 34.0659 56.8333 35.0281 55.5 34.2583L39 24.7321Z" fill="#7214AE" style={{ transform: `translateY(${yTranslation}%)` }} />
        <defs>
          <linearGradient id="paint0_linear_75_1293" x1="12.5" y1="0" x2="12.5" y2="270" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5CC9EE" />
            <stop offset="1" stop-color="#5CC9EE" stop-opacity="0" />
            
          </linearGradient>
        
        </defs>
      
      </svg>
     <div className='mt-2'> <i className='title-sm '>You are amongst top {Math.round(leaderboardPercentage)}</i></div>
    </>
  )
}

export default LeaderboardTimeline