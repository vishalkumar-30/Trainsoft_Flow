import React from 'react'
import { Progress } from '../../BsUtils'
import Table from 'react-bootstrap/Table'
import "./TrainingProgress.css"
import HeatMapProgress from './HeatMapProgress'
import { Helmet } from "react-helmet";
import DropdownItem from '../../DropdownItem/DropdownItem'
const TrainingProgress = () => {
  return (
    <div>
          <DropdownItem title="Training Completion" total={<Progress striped label={`70%`}  value={70} />} theme="dark">

   
    <div class="table-responsive">
  <table class="table">
    <thead>
        <tr>

       
      </tr>
    </thead>
    <tbody>
    <tr>
        
        <td className='title-sm'>1</td>
        <td colspan="3">2</td>
       

      </tr>
    
      







    </tbody>
  </table>
</div>
</DropdownItem> 
    </div>
  )
}

export default TrainingProgress