import React, { useState, useEffect, useContext } from 'react'
import RestService from '../../../Services/api.service';
import useToast from '../../../Store/ToastHook';
import AppContext from '../../../Store/AppContext';
import ReactQuill from 'react-quill';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Card } from 'react-bootstrap';
import { Button } from '../../Common/Buttons/Buttons';
import "./events.css"
import { useNavigate } from '@reach/router';
import CardHeader from '../../Common/CardHeader';
import {ICN_BACK} from '../../Common/Icon'
const Events = (props) => {

    const [ticketHistory, setTicketHistory] = useState([]);
    const [fieldValue, setFieldValue] = useState('')
    const ticketSid = props.location.state[0];
    const Toast = useToast();
    const { spinner } = useContext(AppContext);
    const ticketNumber = props.location.state[1];
    const status = props.location.state[2];

    //get ticket history
    const getTicketHistory = (ticketSid) => {

        try {
            RestService.getTicketHistory(ticketSid).then(res => {
                if (res.status === 200) {
                    setTicketHistory(res.data.ticketHistory);
                }
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on getTicketHistory', err)
        }
    }

    //start conversation
    const startConversation = () => {
        try {
            let payload = {
                "resolution": fieldValue,
            }
            spinner.show();
            RestService.startConversation(ticketSid, payload).then(res => {
                spinner.hide();
                setFieldValue('');
                getTicketHistory(ticketSid);
            }, err => {
                console.log(err);
                Toast.error({ message: `Something went wrong` });
            }
            );
        }
        catch (err) {
            console.error('error occur on startConversation', err)
        }
    }

    useEffect(() => {
        getTicketHistory(ticketSid);
    }, []);
    const navigate = useNavigate();
    return (
        <>
        <div className='title-lg '>
        <button   onClick={() => navigate(-1)}>{ICN_BACK}Go back</button>
       <div>Timeline for Ticket No : - {ticketNumber} and status is  - {status}</div>
        </div>
        <div className='bg-white mainevent '>
  
           <div className='a'>
           {
                ticketHistory.map((history) => {
                    return (
                        < div className='py-2  container '>
                            <Card className='my-2 p-3 h6'>{history.timeline.split(' ')[1]==='replied'?<p className='text-info h6'>{history.timeline}</p>:history.timeline}</Card>
                            {
                                history.conversation != null ?  
                                    parse(history.conversation.comment)
                                    : ''
                            }
                        </div>
                    )
                })
            }
           </div>
            {
                status==='CLOSED'? '':<div className="full-h column pb-4 mx-5 " style={{background:"#e9ecef",borderRadius:"20px"}}>
                <ReactQuill
            
                className='bg-white '
                    modules={GLOBELCONSTANT.QUILL_EVENTS}
                    value={fieldValue}
                    onChange={setFieldValue}
                />
                <div className="flx px-3 jce"><Button className="btn btn-primary px-4" disabled={fieldValue.length ===11  } onClick={() => startConversation()} >Submit</Button></div>
            
            </div>
            }
        </div >
        </>

    )
}

export default Events