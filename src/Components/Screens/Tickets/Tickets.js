import React, { useEffect, useState, useContext } from 'react'
import { BtnPrimary, TabBtn } from "../../Common/Buttons/Buttons";
import { navigate, Router } from "../../Common/Router";
import { Link } from "@material-ui/core";
import CardHeader from '../../Common/CardHeader'
import "../Support/style.css";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import moment from 'moment'
import RestService from '../../../Services/api.service';
import useToast from '../../../Store/ToastHook';
import AppContext from '../../../Store/AppContext';
import '../../Common/InputField/inputField.css';


const Tickets = ({ location }) => {
    return (<>

        <div className="table-shadow p-3">
            <CardHeader {...{ location }} />
            <div className="flx tab-btn-group mb-3 ">

                <TabBtn active={location.state.subPath === "ticket"} onClick={() => navigate("/ticket", { state: { title: 'Ticket', subTitle: "Open Ticket", subPath: "ticket" } })} >Open Ticket</TabBtn>
                <TabBtn active={location.state.subPath === "myticket"} onClick={() => navigate("/ticket/myticket", { state: { title: 'Ticket', subTitle: "My Ticket", subPath: "myticket" } })}>My Ticket</TabBtn>
            </div>
            <Router>
                <OpenTickets path="/" />
                <MyTickets path="myticket" />
            </Router>


        </div></>)
}
export default Tickets


const OpenTickets = () => {
    const [openTicketList, setOpenTicketList] = useState([]);
    const { spinner } = useContext(AppContext);
    const Toast = useToast();

    //get list of open tickets
    const getTicketsByRole = () => {
        let status = "open";
        try {
            RestService.getTicketsByRole(status).then(res => {
                if (res.status === 200) {
                    setOpenTicketList(res.data);
                }
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on getTicketsByRole', err)
        }
    }

    //own the ticket
    const takeTicketOwnership = (ticketSid) => {
        try {
            spinner.show();
            RestService.takeTicketOwnership(ticketSid).then(res => {
                Toast.success({ message: `Ticket Owned Successfully` });
                spinner.hide();
                getTicketsByRole();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on takeTicketOwnership', err)
        }
    }

    const [configuration, setConfiguration] = useState({
        columns: {
            "ticketNumber": {
                "title": "Ticket Number",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: true,

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
            "raisedByName": {
                "title": "Raised By",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "": {

                isSearchEnabled: false,
                render: (data) => <button className='btn btn-sm btn-primary px-3' onClick={() => takeTicketOwnership(data.sid)}>own</button>
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
        getTicketsByRole();
    }, []);

    return (<div className="">

        <DynamicTable {...{ configuration, sourceData: openTicketList }} />
    </div>)
}

const MyTickets = () => {

    const [closeProgessTicketList, setCloseProgessTicketList] = useState([]);

    let status1 = "in_progress";
    //get list of open tickets
    const getTicketsByRole = (status1) => {

        try {
            RestService.getTicketsByRole(status1).then(res => {
                if (res.status === 200) {
                    setCloseProgessTicketList(res.data);
                }
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on getTicketsByRole', err)
        }
    }

    const [configuration, setConfiguration] = useState({
        columns: {
            "ticketNumber": {
                "title": "Ticket Number",
                "sortDirection": null,
                "sortEnabled": true,
                render: (data) => <Link onClick={() => {
                    navigate("/events", { state: [data.sid, data.ticketNumber, data.status]});
                }}>{data.ticketNumber}</Link>
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
            "raisedByName": {
                "title": "Raised By",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
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
        getTicketsByRole(status1);
    }, []);

    return (<div className="">

        <div className="aic mt-3 mb-3 " >

            <div class="form-check aic " style={{ fontSize: "15px" }} >
                <input type="radio" id="in_progress" name="status" value="in_progress" defaultChecked onChange={e => {

                    getTicketsByRole(e.target.id);
                }} />
                <label class="form-check-label mx-3">In Progress</label>
            </div>
            <div className=' form-check aic" mx-5' style={{ fontSize: "15px" }}>
                <input type="radio" id="closed" name="status" value="closed" onChange={e => {
                    getTicketsByRole(e.target.id);
                }} />
                <label class="form-check-label mx-3">Closed</label>
            </div>

        </div>

        <DynamicTable {...{ configuration, sourceData: closeProgessTicketList }} />

    </div>)
}


