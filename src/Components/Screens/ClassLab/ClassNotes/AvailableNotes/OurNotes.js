import { useEffect, useState } from 'react'
import RestService from '../../../../../Services/api.service';
import { navigate } from '../../../../Common/Router';
import { BtnPrimary } from '../../../../Common/Buttons/Buttons';
import '../../../LabStore.js/Styles.css';
import './style.css';
import { TextInput,SelectInput } from '../../../../Common/InputField/InputField';
import {  Form , Dropdown} from 'react-bootstrap'
const OurNotes = () => {

  const [notesList, getNotesList] = useState([]);

  //get user notes
  const getUserNotes = () => {

    try {
      RestService.getUserNotes().then(res => {
        if (res.status === 200) {
          getNotesList(res.data);
        }
      }, err => console.log(err)
      );
    }
    catch (err) {
      console.error('error occur on getUserNotes', err)
    }
  }

  useEffect(() => {
    getUserNotes();
  }, []);

 

  return (
  <>
 <div className='row py-3' style={{    background: "rgb(172, 235, 253)"}}>
                  <div className='col-3'>
                  <label className="mb-2 label form-label ">Training</label>
                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)"}}>
                                                <option value="ALL">ALL</option>
                                               

                                            </select>
                    </div>  

                     <div className='col-3'>
                     <label className="mb-2 label form-label ">Content</label>
                                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)"}}>
                                                <option value="ALL">ALL</option>
                                               

                                            </select>
                    </div> 

                     <div className='col-3'>
                     <label className="mb-2 label form-label ">Screen Shots</label>
                  
                  <input type="file"className='form-control' name="filefield" multiple="multiple"/>
                    </div>  
                    <div className='col-3 mt-4'>
                   <button type="submit" style={{width:"100%"}} className='btn btn-primary'>submit</button>
                    </div>           
                            
                              
                            </div>
  <hr/>
  <div className="catalog-container-notes  ">


    {notesList.map(res => <div className="catalognote border-primary">
      <div className="catalogBox-info ">

        {/* <div ><img src="https://img.freepik.com/free-vector/notes-concept-illustration_114360-689.jpg?w=740&t=st=1677154291~exp=1677154891~hmac=ca7d5942c831d69ce0376ee07ac793beccaffa53d536287fbbbfa3d50ccf373d" width="100%" height="230px" alt="Lab" title={res.trainingName} style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }} /></div> */}
        <div className="catalog-content-text" >
          <div className="cat-title-md">{res.trainingName}</div>
          {/* <div className="cat-title-sm">{res.desc}</div> */}

          <div className="text-right">
            <BtnPrimary onClick={()=> navigate("/notes/mynotes", { state: [res.trainingSessionNotes, 'My Notes'] })}>Show Notes</BtnPrimary> 
          </div>
        </div>
      </div>
    </div>)}
    
   
  
  </div>
  </>
  )
}

export default OurNotes