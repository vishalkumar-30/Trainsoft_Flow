import { useState, useContext } from 'react'
import ReactQuill from 'react-quill';
import RestService from '../../../../Services/api.service';
import AppContext from '../../../../Store/AppContext';
import useToast from '../../../../Store/ToastHook';
import 'react-quill/dist/quill.snow.css';
import GLOBELCONSTANT from '../../../../Constant/GlobleConstant';
import { Button } from '../../../Common/Buttons/Buttons';
import './ClassNote.css'

const ClassNotes = (props) => {
    const [fieldValue, setFieldValue] = useState('');
    const { spinner } = useContext(AppContext);
    const Toast = useToast();

    const trainingSessionSid = props.trainingSessionSid;
    const trainingSid = props.trainingSid;
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.role;

    //saves notes
    const saveUserNotes = () => {

        if (role === "LEARNER") {
            try {
                let payload = {
                    "formattedNotes": fieldValue,
                }
                spinner.show();
                RestService.saveUserNotes(trainingSessionSid, trainingSid, payload).then(res => {
                    Toast.success({ message: `Notes Saved Successfully to Notes Section` });
                    spinner.hide();

                }, err => console.log(err)
                );
            }
            catch (err) {
                console.error('error occur on saveUserNotes', err)
            }
        }

    }

    return (<div className="full-h column">
        <ReactQuill
            modules={GLOBELCONSTANT.QUILL_EVENTS}
            value={fieldValue}
            onChange={setFieldValue}
        />
        <div className="flx px-3 jce"><Button className="px-4" onClick={() => saveUserNotes()}>Save</Button></div>
    </div>)
}
export default ClassNotes