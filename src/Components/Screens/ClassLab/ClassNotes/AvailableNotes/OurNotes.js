import { useEffect, useState } from 'react'
import RestService from '../../../../../Services/api.service';
import { navigate } from '../../../../Common/Router';
import { BtnPrimary } from '../../../../Common/Buttons/Buttons';
import '../../../LabStore.js/Styles.css';

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

 

  return (<div className="catalog-container">
    {notesList.map(res => <div className="catalogBox">
      <div className="catalogBox-info">

        <div ><img src="https://img.freepik.com/free-vector/notes-concept-illustration_114360-689.jpg?w=740&t=st=1677154291~exp=1677154891~hmac=ca7d5942c831d69ce0376ee07ac793beccaffa53d536287fbbbfa3d50ccf373d" width="100%" height="230px" alt="Lab" title={res.trainingName} style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }} /></div>
        <div className="catalog-content" >
          <div className="cat-title-md">{res.trainingName}</div>
          {/* <div className="cat-title-sm">{res.desc}</div> */}

          <div className="text-right">
            <BtnPrimary onClick={()=> navigate("/notes/mynotes", { state: [res.trainingSessionNotes] })}>Show Notes</BtnPrimary> 
          </div>
        </div>
      </div>
    </div>)}

  </div>)
}

export default OurNotes