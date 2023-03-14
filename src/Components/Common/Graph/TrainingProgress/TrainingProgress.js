import React from 'react'
import { Progress } from '../../BsUtils'
import Table from 'react-bootstrap/Table'
import "./TrainingProgress.css"
import HeatMapProgress from './HeatMapProgress'
const TrainingProgress = () => {
  return (
    <div>
    <div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Heading</th>
        <th scope="col" colspan="3">Progress</th>
       
      </tr>
    </thead>
    <tbody>
      <tr class="accordion-toggle collapsed"
        id="accordion1"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion1"
        href="#collapseOne"
        aria-controls="collapseOne"
      >
        <td class="expand-button"></td>
        <td className='title-sm'>Training Completion</td>
        <td colspan="3"><Progress striped label={`70%`}  value={70} /></td>
       

      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="3">
          <div id="collapseOne" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value 1</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value 2</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value 3</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value 4</div>
            </div>
          </div></td>
      </tr>
      <tr class="accordion-toggle collapsed"
        id="accordion2"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion2"
        href="#collapseTwo"
        aria-controls="collapseTwo"
      >
        <td class="expand-button"></td>
        <td className='title-sm'>Session Progress</td>
        <td colspan="3">
            
            
            <Progress striped label={`90%`}  value={90} /></td>
       
      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="4">
          <div id="collapseTwo" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
          </div></td>
      </tr>

      <tr class="accordion-toggle collapsed"
        id="accordion4"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion4"
        href="#collapseTwo"
        aria-controls="collapseTwo"
      >
        <td class="expand-button"></td>
        <td colspan="3" className='title-sm'>Lab Progress</td>
        {/* <td colspan="3"><Progress striped label={`60%`}  value={60} /></td> */}
       
      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="4">
          <div id="collapseTwo" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
          </div></td>
      </tr>


      <tr class="accordion-toggle collapsed"
        id="accordion2"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion2"
        href="#collapseTwo"
        aria-controls="collapseTwo"
      >
        <td class="expand-button"></td>
        <td className='title-sm'>Assesment Score</td>
        <td colspan="3"><Progress striped label={`60%`}  value={60} /></td>
       
      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="4">
          <div id="collapseTwo" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
          </div></td>
      </tr>


      <tr class="accordion-toggle collapsed"
        id="accordion2"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion2"
        href="#collapseTwo"
        aria-controls="collapseTwo"
      >
        <td class="expand-button"></td>
        <td className='title-sm'>Reading Efficiency</td>
        <td colspan="3"><Progress striped label={`60%`}  value={60} /></td>
       
      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="4">
          <div id="collapseTwo" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
          </div></td>
      </tr>

      <tr class="accordion-toggle collapsed"
        id="accordion2"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion2"
        href="#collapseTwo"
        aria-controls="collapseTwo"
      >
        <td class="expand-button"></td>
        <td className='title-sm'>Coding Question</td>
        <td colspan="3"><Progress striped label={`60%`}  value={60} /></td>
       
      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="4">
          <div id="collapseTwo" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
          </div></td>
      </tr>
      <tr class="accordion-toggle collapsed"
        id="accordion2"
        data-mdb-toggle="collapse"
        data-mdb-parent="#accordion2"
        href="#collapseTwo"
        aria-controls="collapseTwo"
      >
        <td class="expand-button"></td>
        <td className='title-sm'>Capstone Project</td>
        <td colspan="3"><Progress striped label={`60%`}  value={60} /></td>
       
      </tr>
      <tr class="hide-table-padding">
        <td></td>
        <td colspan="4">
          <div id="collapseTwo" class="collapse in p-3">
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
            <div class="row">
              <div class="col-2">label</div>
              <div class="col-6">value</div>
            </div>
          </div></td>
      </tr>




    </tbody>
  </table>
</div>
    </div>
  )
}

export default TrainingProgress