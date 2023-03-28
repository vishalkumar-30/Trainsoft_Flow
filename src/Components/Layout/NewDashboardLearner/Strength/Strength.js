import React from 'react'
import "../NewDashboardLearner.css"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
const Strength = () => {
  return (
    <div>

<div class="row w-100 my-3">
        <div class="col-md-4">
            <div class="card bor mx-sm-1 p-3">
                <div class="card  p-2 my-card" ><span ><ThumbUpOffAltIcon/></span></div>
                <div class=" text-center mt-3">Strength</div>
                <div class=" mt-2" style={{textAlign:"justify"}}><ul>
                    <li>
                    Leverage agile frameworks to provide a robust synopsis.
                    </li>
<li>Iterative approaches to corporate strategy.</li>
<li>Organically grow the holistic world view of disruptive.</li>
                  
                    
                    </ul></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bor mx-sm-1 p-3">
                <div class="card  p-2 my-card"><span><ThumbDownIcon/></span></div>
                <div class=" text-center mt-3">Weakness</div>
                <div class=" mt-2" style={{textAlign:"justify"}}><ul>
                    <li>
                    Leverage agile frameworks to provide a robust synopsis.
                    </li>
<li>Iterative approaches to corporate strategy.</li>
<li>Organically grow the holistic world view of disruptive.</li>
                  
                    
                    </ul></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bor mx-sm-1 p-3">
                <div class="card   p-2 my-card" ><span ><CrisisAlertIcon/></span></div>
                <div class="text-center mt-3">Reccomendations</div>
                <div class=" mt-2" style={{textAlign:"justify"}}><ul>
                    <li>
                    Leverage agile frameworks to provide a robust synopsis.
                    </li>
<li>Iterative approaches to corporate strategy.</li>
<li>Organically grow the holistic world view of disruptive.</li>
                  
                    
                    </ul></div>
            </div>
        </div>
      
     </div>

    </div>
  )
}

export default Strength