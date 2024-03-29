import { useState, useContext, useEffect } from "react";
import '../Batches/batches.css'
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import { ICN_TRASH, ICN_EDIT, ICN_CLOSE } from '../../Common/Icon';
import { Button } from "../../Common/Buttons/Buttons";
import { Link, Router } from "../../Common/Router";
import GLOBELCONSTANT from "../../../Constant/GlobleConstant";
import TrainingDetails from "./TrainingDetails";
import CardHeader from "../../Common/CardHeader";
import RestService from "../../../Services/api.service";
import useFetch from "../../../Store/useFetch";
import useToast from "../../../Store/ToastHook";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import TrainingContext, { TrainingProvider } from "../../../Store/TrainingContext";
import { Toggle } from "../../Common/BsUtils";
import AddEditTraining from "./AddEditTraining";

const initialVal = {
    name: '',
    instructor: '',
    courseSid: '',
    startDate: '',
    endDate: '',
    trainingBatchs: '',
    instructorName: ""
}

const Trainings = ({ location }) => {
    const { setCourse, setBatches, ROLE, course, spinner, user, batches } = useContext(AppContext);
    const { setTraining } = useContext(TrainingContext);
    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [trainingList, setTrainingList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [initialValues, setInitialValue] = useState(initialVal);
    const [count, setCount] = useState(0);
    // const [enabledCount, setEnabledCount] = useState(0);
    // const [disabledCount, setDisabledCount] = useState(0);
    // const [archivedCount, setArchivedCount] = useState(0);
    const [status, setStatus] = useState('ENABLED');
    const newStatus = user.role === ROLE.SUPERVISOR ? 'Status' : '';
    const newBatches = user.role === ROLE.SUPERVISOR ? 'No of Batches' : '';
    let userSid = JSON.parse(localStorage.getItem('user'))
    userSid = userSid.sid;
    
    // get all batches
    const allBatches = useFetch({
        method: "get",
        url: GLOBELCONSTANT.BATCHES.GET_BATCH_LIST,
        errorMsg: 'error occur on get Batches'
    });

    const [configuration, setConfiguration] = useState({
        columns: {
            "name": {
                "title": "Training Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link onClick={() => setTraining(data)} to={`training-details`} state={{rowData: data, sid: data.sid, subTitle: "Training Info", subPath: '/' }} className="dt-name">{data.name}</Link>

            },
            "noOfBatches": {
                "title": newBatches,
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => user.role === ROLE.SUPERVISOR ? data.noOfBatches
                    : <p style={{ display: "none" }}></p>
            },
            "course": {
                "title": "Course",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,

            },
            "instructor": {
                "title": "Instructor",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false
            },
            "startDate": {
                "title": "Start Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.startDate).format('DD/MM/YYYY')
            }
            ,
            "endDate": {
                "title": "End Date",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => moment(data.endDate).format('DD/MM/YYYY')

            }
            ,
            "status": {
                "title": newStatus,
                "sortDirection": null,
                "sortEnabled": false,
                isSearchEnabled: false,
                render: (data) => user.role === ROLE.SUPERVISOR ? <Toggle onChange={() => user.role === ROLE.SUPERVISOR && getTrainingsBySid(data.sid, "status")} id={data.sid} checked={data.status === 'ENABLED' ? true : false} />
                    : <p style={{ display: "none" }}></p>
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
        actions: user.role === ROLE.SUPERVISOR ? [
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                "onClick": (data, i) => getTrainingsBySid(data.sid, "edit")
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                "onClick": (data) => deleteTraining(data.sid)
            }

        ] : [],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: false,
        clearSelection: false,
    });

    // get training details by sid
    const getTrainingsBySid = async (sid, type = "get") => {
        try {
            RestService.getTrainingBySid(sid).then(
                response => {
                    response && response.data && setTraining(response.data);
                    type === "status" && changeStatus(response.data)
                    if (type === "edit") {
                        let intVal = response.data
                        intVal.courseSid = course.find(res => res.sid === response.data.courseSid)
                        intVal.instructor = (response.data.instructor !== null) ? { ...response.data.instructor.appuser, "vSid": response.data.instructor.sid } : ''
                        intVal.trainingBatchs = response.data.trainingBatchs.map(res => {
                            return batches.find(resp => resp.sid === res.batchSid)
                        })
                        setInitialValue(intVal)
                        setShow(true)
                        setIsEdit(true)
                    }
                },
                err => {
                    console.error("", err)
                }
            )
        } catch (err) {
            console.error("error occur on getTrainingsBySid()", err);
        }
    }

    // editTraining
    const changeStatus = (data) => {
        try {
            spinner.show()
            let payload = data
            payload.status = data.status === "ENABLED" ? "DISABLED" : "ENABLED"
            RestService.editTraining(payload).then(res => {
                getTrainings(status)
                spinner.hide()
                setShow(false)
                Toast.success({ message: `Status change successfully` });
            }, err => {
                spinner.hide()
                console.error(err)
            }
            )
        }
        catch (err) {
            spinner.hide()
            console.error('error occur on changeStatus', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }


    // get all training
    const getTrainings = async (status) => {
        try {
            let pageSize = 10;
            let pagination = "1"
            spinner.show();
            RestService.getAllTrainingByPage(user.role, pagination, pageSize, status).then(
                response => {
                    setTrainingList(response.data);
                    
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getTrainings()", err)
        }
    }
    
    //for pagination
    const getTrainingsForAction = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getAllTrainingByPage(user.role, pagination, pageSize, status).then(
                response => {
                    setTrainingList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getTrainings()", err)
        }
    }

    //get training for learner and instructor
    // const getTrainingsForLearnerAndSupervisor = async (pagination = "1") => {
    //     try {
    //         let pageSize = 10;
    //         // let pagination = "1"
    //         spinner.show();
    //         RestService.getAllTrainingByPage(user.role,pagination, pageSize).then(
    //             response => {
    //                 setTrainingList(response.data);
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         ).finally(() => {
    //             spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on getTrainings()", err)
    //     }
    // }

    // search batches
    const searchTraining = (name) => {
        try {
            spinner.show();
            RestService.searchTraining(name).then(res => {
                setTrainingList(res.data)
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on searchTraining()', err)
            spinner.hide();
        }
    }

    // delete course
    const deleteTraining = (trainingId) => {
        try {
            spinner.show();
            RestService.deleteTraining(trainingId).then(res => {
                spinner.hide();
                console.log(status);
                getTrainings(status)
                Toast.success({ message: `Training is Deleted Successfully ` });
            }, err => { spinner.hide(); }
            )
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on deleteTraining()', err)
            Toast.error({ message: `Something wrong!!` });
        }
    }

    // get training count

    const getTrainingCount = async () => {
        try {
            RestService.getTrainings().then(
                response => {
                    
                        setCount((response.data.filter(i=>i.status === status
                    && i.createdByVASid === userSid).length));
                    
                    
                    // setDisabledCount((response.data.filter(i=>i.status === 'DISABLED'
                    // && i.createdByVASid === userSid).length));
                    // setArchivedCount((response.data.filter(i=>i.status === 'ARCHIVED'
                    // && i.createdByVASid === userSid).length));
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getTrainings()", err)
        }
    }

    const getTrainingCount1 = async () => {
        try {
            RestService.getCount("vw_training").then(
                response => {
                    setCount(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getAllBatch()", err)
        }
    }
    

    // initialize component
    useEffect(() => {
        allBatches.response && setBatches(allBatches.response);
        getTrainingCount1();
        getTrainings(status);
    }, []);

    useEffect(() => {
        getTrainingCount();
        
        
        // if(user.role === ROLE.SUPERVISOR){
        //     getTrainings('ENABLED');
        // }
        // else{
        //     getTrainingsForLearnerAndSupervisor();
        // }
        

    }, [status]);

    console.log(status);
    // console.log(disabledCount);
    // console.log(archivedCount);

    return (<>
        <div className="table-shadow">
            <div className="p-3">
                <CardHeader {...{
                    hideSearch: user.role === ROLE.SUPERVISOR ? false : true,
                    location,
                    onChange: (e) => e.length === 0 && getTrainings(status),
                    onEnter: (e) => searchTraining(e),
                    actionClick: () => { setShow(true); setInitialValue(initialVal); setIsEdit(false) },
                    showAction: user.role === ROLE.SUPERVISOR ? true : false
                }} />
            </div>
            {
                user.role === ROLE.SUPERVISOR ?
                    <div className="aic mt-3 mb-3 " >

                        <div class="form-check aic " style={{ fontSize: "15px" }} >

                            <input type="radio" id={status} name="status" value="ENABLED" defaultChecked
                                onChange={(e) => { setStatus(e.target.value); getTrainings(e.target.value);} }/>
                            <label class="form-check-label mx-3">Enabled</label>

                        </div>
                        <div className=' form-check aic" mx-5' style={{ fontSize: "15px" }}>
                            <input type="radio" id={status} name="status" value="DISABLED"
                                 onChange={(e) => {setStatus(e.target.value); getTrainings(e.target.value);} }/>

                            <label class="form-check-label mx-3">Disabled</label>
                        </div>
                        <div class="form-check aic " style={{ fontSize: "15px" }} >

                            <input type="radio" id={status} name="status" value="ARCHIVED"
                                 onChange={(e) => {setStatus(e.target.value); getTrainings(e.target.value);} }/>
                            <label class="form-check-label mx-3">Archived</label>

                        </div>

                    </div>
                    : ''
            }
            <AddEditTraining {...{ getTrainings, show, setShow, initialValues, isEdit, status }} />

            {
                    user.role === ROLE.SUPERVISOR && status === 'ENABLED'?
                    <>

                        <DynamicTable {...{
                            count, configuration, sourceData: trainingList
                            ,onPageChange: (e) => getTrainingsForAction(e)
                        }} />
                    </>
                    :
                    user.role === ROLE.SUPERVISOR && status === 'DISABLED'?
                    <>

                        <DynamicTable {...{
                            count, configuration, sourceData: trainingList
                            ,onPageChange: (e) => getTrainingsForAction(e)
                        }} />
                    </>
                    :
                    user.role === ROLE.SUPERVISOR && status === 'ARCHIVED'?
                    <>

                        <DynamicTable {...{
                            count, configuration, sourceData: trainingList
                            ,onPageChange: (e) => getTrainingsForAction(e)
                        }} />
                    </>
                    :
                    user.role === ROLE.LEARNER ?
                        <DynamicTable {...{
                            count, configuration, sourceData: trainingList.filter(item => item.status === 'ENABLED')
                        }} />
                        :
                        <>

                            <DynamicTable {...{
                                count, configuration, sourceData: trainingList.filter(item => item.status === 'ENABLED'
                                    || item.status === 'ARCHIVED')
                            }} />
                        </>

            }

        </div>
    </>)
}

const Training = () => {
    return (

        <Router>
            <Trainings path="/" />
            {/* <TrainingDetails2 path="training-details/*" /> */}
            <TrainingDetails path="training-details/*" />
        </Router>

    )

}
export default Training




