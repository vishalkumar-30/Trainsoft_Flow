import React, { useState, useEffect, useContext } from 'react'
import RestService from '../../../Services/api.service';
import useToast from '../../../Store/ToastHook';
import AppContext from '../../../Store/AppContext';
import ReactQuill from 'react-quill';
import GLOBELCONSTANT from '../../../Constant/GlobleConstant';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import { Card } from 'react-bootstrap';

const Events = (props) => {

    const [ticketHistory, setTicketHistory] = useState([]);
    const [fieldValue, setFieldValue] = useState('')
    const ticketSid = props.location.state[0];
    const Toast = useToast();
    const { spinner } = useContext(AppContext);

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

    return (
        <div>
            {
                ticketHistory.map((history) => {
                    return (
                        <>
                            <Card><p>{history.timeline}</p></Card>
                            {
                                history.conversation != null ?  
                                    parse(history.conversation.comment)
                                    : ''
                            }
                        </>
                    )
                })
            }
            <div className="full-h column">
                <ReactQuill
                    modules={GLOBELCONSTANT.QUILL_EVENTS}
                    value={fieldValue}
                    onChange={setFieldValue}
                />
                <div className="flx px-3 jce"><button onClick={() => startConversation()} className="px-4">Submit</button></div>
            </div>
        </div >

    )
}

export default Events