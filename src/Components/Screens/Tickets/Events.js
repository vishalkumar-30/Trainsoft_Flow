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
import { ICN_BACK } from '../../Common/Icon'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { border } from '@material-ui/system';

const Events = (props) => {

    const navigate = useNavigate();
    const [ticketHistory, setTicketHistory] = useState([]);
    const [fieldValue, setFieldValue] = useState('');
    const [resolve, setResolve] = useState(false);
    const ticketSid = props.location.state[0];
    const Toast = useToast();
    const { spinner } = useContext(AppContext);
    const ticketNumber = props.location.state[1];
    const status = props.location.state[2];
    const ticketRaisedName = props.location.state[3];
    const user = JSON.parse(localStorage.getItem('user'));
    const userSid = user.sid;
    const { name } = user;

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

    //resolve ticket
    const closeTicket = (commentSid) => {
        try {
            let payload = {
                "resolution": "RESOLVED",
            }
            spinner.show();
            RestService.closeTicket(commentSid, payload).then(res => {
                if (res.status === 200) {
                    spinner.hide();
                    Toast.success({ message: `Ticket Resolved and Closed` });
                    setResolve(true);
                }

            }, err => {
                console.log(err);
                Toast.error({ message: `Something went wrong` });
            }
            );
        }
        catch (err) {
            console.error('error occur on closeTicket', err)
        }
    }

    useEffect(() => {
        getTicketHistory(ticketSid);
    }, []);

    return (
        <>
            <div className='title-md d-flex ' style={{justifyContent:"space-between"}}>
                <div >
                    
                <button onClick={() => navigate(-1)}>{ICN_BACK}Go back</button>
                    </div>
                <div >Your Ticket No : {ticketNumber} and status is : {status}</div>
            </div>
            <div className='bg-white mainevent '>

                <div className='a'>
                    {
                        ticketHistory.map((history, index, { length }) => {
                            return (
                                < div className='p-2 '>
                                    <Card style ={{background: "#e9ecef"}} className='my-1 p-2 h6'>{history.timeline.split(' ')[1] === 'replied' ? <p className='text-info '>{history.timeline}</p> : history.timeline}</Card>
                                    {
                                        history.conversation != null ? 

                                            <div className='d-flex ' >
                                            {
                                                history.timeline.includes('_') ? 
                                                <div className=' p-3 pl-2 mr-3 replyclass' style={{ height:"100%", width:"100%"}}>  { 
                                                    parse(history.conversation.comment)
                                                    }</div>
                                                    :
                                                    <div className='replyclassright p-3 pl-2 ml-3'>
                                                        {parse(history.conversation.comment)}
                                                    </div>

                                            }
                                              
                                                {
                                                    status === "IN_PROGRESS" && userSid !== history.conversation.commentedBySid && ticketRaisedName === name && length - 1 === index ? 
                                                        resolve ? <CheckCircleOutlineIcon /> 
                                                        :
                                                        <button className='mx-3 px-2 bg-info text-white'style={{borderRadius:"10px"}} onClick={() => closeTicket(history.conversation.sid)}>Resolve</button>
                                                        : ''
                                                }

                                            </div>

                                            : ''
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {
                    status === 'CLOSED' ? '' : <div className="full-h py-1  " style={{background: "#e9ecef"}} >
                        <ReactQuill

                            className='bg-white '
                            modules={GLOBELCONSTANT.QUILL_EVENTS}
                            value={fieldValue}
                            onChange={setFieldValue}
                        />
                        <div className="flx px-3 jce"><Button className="btn btn-primary px-4" disabled={fieldValue.length === 11} onClick={() => startConversation()} >Submit</Button></div>

                    </div>
                }
            </div >
        </>

    )
}

export default Events