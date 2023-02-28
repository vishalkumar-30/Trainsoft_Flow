import React, { useEffect, useState, useContext } from 'react'
import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import { navigate, Router } from "../../Common/Router";
import { Link } from "@material-ui/core";
import { Formik } from "formik"
import { Button } from "../../Common/Buttons/Buttons"
import CardHeader from '../../Common/CardHeader'
import "./style.css";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import moment from 'moment'
import { Helmet } from "react-helmet";
import axios from 'axios';
import RestService from '../../../Services/api.service';
import useToast from '../../../Store/ToastHook';
import AppContext from '../../../Store/AppContext';
import '../../Common/InputField/inputField.css';

const Support = ({ location }) => {
    return (<>
        <Helmet>
            {/* <title>Support</title> */}
            <script type='text/javascript' id='myscript_58'>var d=document,c='createElement',ac='appendChild',b=d.body;const eschatInitiatedBy = 'ES_EMBEDDED';const vcSid='DA8DCE0753D14EABAC4E60121C808D906E5E8D472A8249AF9DAA6C415155B2A4';var glcp = (('https:' == document.location.protocol) ? 'https://' : 'http://');const esHst ='https://www.eservecloud.com';var v1 = Math.random();var s = d[c]('script');s.type = 'text/javascript';s.async = true;var scriptId = 'myscript_58';s.src = esHst + '/clientchat/apps/js/visualconnect.loader.min.js?' + 'v=' + v1;var script = d.getElementsByTagName('script')[0];script.parentNode.insertBefore(s, script);</script>
        </Helmet>
        <div className="table-shadow p-3">
            <CardHeader {...{ location }} />
            <div className="flx tab-btn-group mb-3">
                <TabBtn active={location.state.subPath === "support"} onClick={() => navigate("/support", { state: { title: 'SUPPORT', subTitle: "Raise a ticket", subPath: "support" } })}>Raise a ticket</TabBtn>
                <TabBtn active={location.state.subPath === "history"} onClick={() => navigate("/support/history", { state: { title: 'SUPPORT', subTitle: "History", subPath: "history" } })}>History</TabBtn>
            </div>
            <Router>
                <SupportContainer path="/" />
                <SupportHistory path="history" />
            </Router>


        </div></>)
}
export default Support

const SupportContainer = () => {

    const [typeList, setTypeList] = useState([]);
    const [types, setTypes] = useState('');
    const [subTypes, setSubTypes] = useState('');
    const [subject, setSubject] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const Toast = useToast();
    const { spinner } = useContext(AppContext);
    let subtypes = [];

    //get sub types
    const getSupportTypeAndSubTypes = () => {

        axios.get('https://trainsoft.live/insled/v2/get-support-types-sub-types',
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {

                setTypeList(response.data);

            })
            .catch(err => console.error("YO YOU GOT AN ERROR IN getSupportTypeAndSubTypes() ", err))
    }

    // submit ticket
    const submitSupportTicket = () => {
        try {
            let payload = {
                "problemDescription": problemDescription,
                "subType": subTypes,
                "subject": subject,
                "type": types
            }
            spinner.show();
            RestService.submitSupportTicket(payload).then(res => {
                Toast.success({ message: `Ticket Raised Successfully` });
                spinner.hide();
                setProblemDescription('');
                setSubject('');
                setSubTypes('');
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on submitSupportTicket', err)
        }
    }

    typeList.map((i) => {
        return (
            i.subTypes.map((j) => {
                return (
                    subtypes.push({
                        "subtype": j.typeName,
                        "type": `${i.typeName},${j.typeName}`
                    })
                )
            })
        )
    })

    useEffect(() => {
        getSupportTypeAndSubTypes();
    }, []);


    return (<div className="">

        <div className="row">
            <div className="col-md-6">
                <Formik
                    initialValues={{
                        "subject": '',
                    }}
                    // validationSchema={schema}
                    onSubmit={(values) => submitSupportTicket()}>
                    {({ handleSubmit }) => (<>
                        <form onSubmit={handleSubmit}>
                            <label className="mb-2 label form-label ">Ticket Type</label>
                            <select className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} onChange={(e) => {
                                setSubTypes(e.target.value.split(',')[1]);
                                setTypes(e.target.value.split(',')[0]);

                            }}>
                                <option selected="true" disabled="disabled">Select Ticket Types</option>
                                {
                                    subtypes.map((item) => {

                                        return (
                                            <>
                                                <option value={item.type}>{item.subtype}</option>
                                            </>
                                        )
                                    })
                                }
                            </select>

                            <label className="mb-2 label form-label ">Subject</label>
                            <input type="text" className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} value={subject} onChange={e => setSubject(e.target.value)} />
                            <label className="mb-2 label form-label ">Problem description</label>
                            <div className='input-field'>
                                <textarea className="form-control form-control-sm" value={problemDescription} onChange={e => setProblemDescription(e.target.value)} />
                            </div>
                            <div className="text-right mt-4">
                                <Button type="submit" disabled={subTypes.length === 0 || subject.length <= 5 || problemDescription.length <= 5} className="px-4">Submit</Button>
                            </div>
                        </form>
                    </>)}

                </Formik>
            </div>
            <div className="col-md-6">
                <div className="box-shadow bg-light">
                    <div className="title-md text-center">Common FAQs</div>
                </div>
            </div>
        </div>
    </div>)
}

const SupportHistory = ({ location }) => {
    const [historyList, setHistoryList] = useState([]);
    const Toast = useToast();
    const { spinner } = useContext(AppContext);
    let status1 = "closed";

    //get user tickets by status
    const getUserTicketsByStatus = (status1) => {

        try {
            RestService.getUserTicketsByStatus(status1).then(res => {
                if (res.status === 200) {
                    setHistoryList(res.data);
                }
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on getUserTicketsByStatus', err)
        }
    }

    //reopen closed tickets 
    const reopenSupportTicket = (ticketSid) => {
        try {

            spinner.show();
            RestService.reopenSupportTicket(ticketSid).then(res => {
                Toast.success({ message: `Ticket status changed to InProgress Successfully` });
                spinner.hide();
                getUserTicketsByStatus(status1);
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on reopenSupportTicket', err)
        }
    }

    const [configuration, setConfiguration] = useState({
        columns: {
            "ticketNumber": {
                "title": "Ticket Number",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) =>
                    data.status === 'OPEN' ? data.ticketNumber
                        :
                        <>
                            <Link onClick={() => {
                                if (data.status === 'CLOSED' || data.status === 'IN_PROGRESS') {
                                    navigate("/events", { state: [data.sid, data.ticketNumber, data.status, data.raisedByName] });
                                }
                            }}>{data.ticketNumber}</Link>
                        </>

            },
            "subType": {
                "title": "Ticket Type",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "createdOn": {
                "title": "Raised Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => data.createdOn.split('T')[0]
            }
            ,
            "subject": {
                "title": "Subject",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
            },
            "ticketOwnerName": {
                "title": "Ticket Owner",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
            },
            "": {

                isSearchEnabled: false,
                render: (data) => data.status === 'CLOSED' ? <button className='btn btn-sm btn-primary px-3' onClick={()=> reopenSupportTicket(data.sid)}>Reopen</button> : <button style={{ display: "none" }}></button>
            }
        },
        headerTextColor: '#454E50', // user can change table header text color
        sortBy: null,  // by default sort table by name key
        sortDirection: false, // sort direction by default true
        updateSortBy: (sortKey) => {
            configuration.sortBy = sortKey;
            Object.keys(configuration.columns).map(key => configuration.columns[key].sortDirection = (key === sortKey) ? !configuration.columns[key].sortDirection : false);
            configuration.sortDirection = configuration.columns[sortKey].sortDirection;
            setConfiguration({ ...configuration });
        },

        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        clearSelection: false
    });

    useEffect(() => {
        getUserTicketsByStatus(status1);
    }, []);

    return (<div className="">

        <div className="aic mt-3 mb-3 " >

            <div class="form-check aic " style={{ fontSize: "15px" }} >

                <input type="radio" id="closed" name="status" value="closed" defaultChecked onChange={e => {

                    getUserTicketsByStatus(e.target.id);
                }} />
                <label class="form-check-label mx-3">Closed</label>

            </div>
            <div className=' form-check aic" mx-5' style={{ fontSize: "15px" }}>
                <input type="radio" id="open" name="status" value="open" onChange={e => {

                    getUserTicketsByStatus(e.target.id);
                }} />

                <label class="form-check-label mx-3">Open</label>
            </div>
            <div class="form-check aic " style={{ fontSize: "15px" }} >

                <input type="radio" id="in_progress" name="status" value="in_progress" onChange={e => {

                    getUserTicketsByStatus(e.target.id);
                }} />
                <label class="form-check-label mx-3">In Progress</label>

            </div>

        </div>
        <DynamicTable {...{ configuration, sourceData: historyList }} />

    </div>)
}


