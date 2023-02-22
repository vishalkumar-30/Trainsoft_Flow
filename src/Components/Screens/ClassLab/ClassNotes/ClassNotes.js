import { useState } from 'react'
import ReactQuill from 'react-quill';
import { saveAs } from "file-saver";
import moment from 'moment';
import striptags from 'striptags';
import 'react-quill/dist/quill.snow.css';
import GLOBELCONSTANT from '../../../../Constant/GlobleConstant';
import { Button } from '../../../Common/Buttons/Buttons';
import './ClassNote.css'


const ClassNotes = () => {
    const [fieldValue, setFieldValue] = useState('');
    const CurrentDate = moment();
    function exportFile() {
        let notes = striptags(fieldValue);
        var blob = new Blob([notes], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `session_${CurrentDate}.txt`);
    }
    
    return (<div className="full-h column">
        <ReactQuill
            modules={GLOBELCONSTANT.QUILL_EVENTS}
            value={fieldValue}
            onChange={setFieldValue}
        />
        <div className="flx px-3 jce"><Button className="px-4" onClick={() => exportFile()}>Save</Button></div>
    </div>)
}
export default ClassNotes