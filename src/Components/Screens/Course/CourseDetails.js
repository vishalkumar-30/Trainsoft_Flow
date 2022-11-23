import React, { useState, useEffect, useContext } from 'react'
import { Formik } from "formik"
import { Link, Router } from "../../Common/Router";
import { BsModal } from "../../Common/BsUtils";
import moment from 'moment';
import { ICN_TRASH, ICN_EDIT } from "../../Common/Icon";
import { Button } from "../../Common/Buttons/Buttons"
import { TextArea, DateInput, TimeInput, TextInput } from "../../Common/InputField/InputField"
import CardHeader from '../../Common/CardHeader'

import SessionList from '../../Common/SessionList/SessionList'
import RestService from '../../../Services/api.service'
import useFetch from '../../../Store/useFetch'
import GLOBELCONSTANT from '../../../Constant/GlobleConstant'
import useToast from "../../../Store/ToastHook";
import * as Yup from 'yup';
import AppContext from '../../../Store/AppContext'
import DynamicTable from '../../Common/DynamicTable/DynamicTable'
import DropdownItem from '../../Common/DropdownItem/DropdownItem';

import AddSession from '../Training/Session/AddSession';

const CourseDetails = ({ location }) => {
    const [showhide, setShowhide] = useState('');

    const handleshowhide = (event) => {
        const getuser = event.target.value;
        setShowhide(getuser);

    }
    const { user, spinner } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [initialValues, setInitialValue] = useState()

    const Toast = useToast();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(true);
    const [sessionList, setSessionList] = useState([]);
    const [document, setDocument] = useState('');
    const [contentTitle, setContentTitle] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [videoUpload, setVideoUpload] = useState('');
    const [contentType, setContentType] = useState('');

    const schema = Yup.object().shape({
        topicDescription: Yup.string()
            .min(2, 'Too Short!')
            .required("Required!"),
        topicName: Yup.string()
            .min(2, 'Too Short!')
            .required("Required!"),
    });

    const [configuration, setConfiguration] = useState({
        columns: {

            "contentName": {
                "title": "Content Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => data.contentName
            },
            // "description": {
            //     "title": "Description",
            //     "sortDirection": null,
            //     "sortEnabled": true,
            //     isSearchEnabled: false,

            // },
            "contentLink": {
                "title": "Content Link",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Button onClick={() => window.open(`${data.contentLink}`, "_blank")} >Link</Button>
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
        actions: [
            {
                "title": "Edit",
                "icon": ICN_EDIT,
                // "onClick": (data, i) => { setIsEdit(true); setShow(true); setInitialValues({ name: data.name, description: data.description, sid: data.sid }) }
            },
            {
                "title": "Delete",
                "icon": ICN_TRASH,
                // "onClick": (data) => deleteCourse(data.sid)
            }
        ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: true,
        clearSelection: false
    });

    // get All section
    const getSection = async () => {
        try {
            let courseSid = location.state.sid;
            console.log(courseSid)
            spinner.show();
            RestService.getAllSectionsAndCourseContents(courseSid).then(
                response => {
                    console.log(response.data.courseSectionResponseTO);
                    setSessionList(response.data.courseSectionResponseTO);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }

    // get All session
    const getSessionByPage = async (pagination = "1") => {
        try {
            let pageSize = 10;
            spinner.show();
            RestService.getCourseSessionByPage(location.state.sid, pageSize, pagination).then(
                response => {
                    setSessionList(response.data);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }


    // create new session
    // const createSession = (data) => {
    //     try {
    //         spinner.show();
    //         let payload = {
    //             "courseSid": location.state.sid,
    //             "topicDescription": data.topicDescription,
    //             "topicName": data.topicName
    //         }

    //         RestService.CreateSession(payload).then(res => {
    //             setShow(false)
    //             setSessionList([...sessionList,res.data])
    //             Toast.success({ message: `Topic is Successfully Created`});
    //             spinner.hide();
    //         }, err => console.log(err)
    //         );
    //     }
    //     catch (err) {
    //         console.error('error occur on createCourse', err)
    //     }
    // }

    // create new Section
    const createSection = (data) => {
        const courseSid = location.state.sid;
        try {
            spinner.show();

            let payload = {
                // "courseSid": location.state.sid,
                "description": data.topicDescription,
                "sectionName": data.topicName
            }

            RestService.createCourseSection(payload, courseSid).then(res => {
                setShow(false)
                setSessionList([...sessionList, res.data])
                Toast.success({ message: `Section is Successfully Created` });
                spinner.hide();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    //create new upload in course section
    const createUploadCourseSection = () => {
        const courseSectionSid = "1C27DDE1C0B84DDB95300C221B6F012F59B18024A023494DAAA3EF0B62F1890F";
        try {
            spinner.show();
            let formData = new FormData();
            let payload = {};
            // if(document.length > 0){
            formData.append("file", document);
            formData.append("content-title", contentTitle);
            //  payload = {
            //     // "courseSid": location.state.sid,
            //     "content-title": contentTitle,
            //     "file": formData
            // }
            // }

            RestService.uploadCourseContent(formData, courseSectionSid).then(res => {
                console.log(res.json());
                setShow(false)
                setSessionList([...sessionList, res.data])
                Toast.success({ message: `Section Content is Successfully Created` });
                spinner.hide();
            }, err => console.log(err)
            );
        }
        catch (err) {
            console.error('error occur on createCourse', err)
        }
    }

    // create new session
    const editSession = (data) => {
        try {
            spinner.show();
            let payload = {
                "sid": data.sid,
                "courseSid": data.courseSid,
                "topicDescription": data.topicDescription,
                "topicName": data.topicName
            }

            RestService.updateSession(payload).then(res => {
                getSessionByPage()
                setShow(false)
                spinner.hide();
                Toast.success({ message: `Topic is Successfully Updated` });
            }, err => spinner.hide()
            );
        }
        catch (err) {
            spinner.hide();
            console.error('error occur on createCourse', err)
        }
    }


    // search session
    const searchSession = (name) => {
        try {
            spinner.show();
            RestService.searchSession(name).then(res => {
                setSessionList(res.data)
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on searchSession()', err)
            spinner.hide();
        }
    }

    // search session
    const deleteSession = (e) => {
        try {
            spinner.show();
            RestService.deleteSession(e.sid).then(res => {
                getSessionByPage()
                spinner.hide();
            }, err => {
                spinner.hide();
            }
            );
        }
        catch (err) {
            console.error('error occur on deleteSession()', err)
            spinner.hide();
        }
    }
    const AddContent = () => {
        return (
            <>
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            {!isEdit && <TextInput name="topic" label="Agenda" />}
                        </div>
                        <div className="col-md-12 mb-3">
                            <TextArea name="agenda" label="Description" />
                        </div>

                        <div className="col-md-4 ">
                            <DateInput name="sessionDate" label="Start date" />
                        </div>
                        <div className="col-md-4">
                            <TimeInput name="startTime" placeholder="Select Time" label="Start Time" />
                        </div>
                        <div className="col-md-4">
                            <TimeInput name="endTime" placeholder="Select Time" label="End Time" />
                        </div>
                        <div className="col-md-12">
                            {/* <TextInput name="assets" label="Assets" /> */}
                            {<div className="col-6 pl-0">
                                <div><span className="title-sm ">Assets</span></div> <div><input multiple placeholder="Browse File" type="file" /></div>
                            </div>
                            }
                        </div>
                    </div>
                    <div>
                        <Button className="btn-block py-2 mt-3" type="submit">Confirm</Button>
                    </div>
                </form>
            </>
        )
    }

    useEffect(() => {
        getSection();
    }, [])

    return (<>
        <div className="table-shadow p-3">
            <CardHeader {...{
                location,
                onChange: (e) => e.length === 0 && getSessionByPage(),
                onEnter: (e) => searchSession(e)
            }} >
                <Button className=" ml-2" onClick={() => { setShow(true); setIsEdit(false); setContentType("Add Section") }}>+ Add Section</Button>

            </CardHeader>

            {/* <SessionList {...{
                sessionList: sessionList.slice().reverse(),
                onDelete: (e) => deleteSession(e),
                onEdit: (data) => { setIsEdit(true); setShow(true); setInitialValue(data) }
            }}
            /> */}
            <div className="full-w mt-2"></div>
            {contentType === "Add Section" ?

                <BsModal {...{ show, setShow, headerTitle: "Add Section", size: "lg" }}>
                    <div className="">
                        <div>
                            <Formik
                                initialValues={
                                    !isEdit ? { "topicName": '', "topicDescription": '', }
                                        : initialValues}
                                validationSchema={schema}
                                onSubmit={(values) => { !isEdit ? createSection(values) : editSession(values) }}>
                                {({ handleSubmit }) => (<>
                                    <form onSubmit={handleSubmit}>
                                        <TextInput name="topicName" label="Section Name" />
                                        <TextArea name="topicDescription" label="Description" />
                                        <div className="text-right mt-2">
                                            <Button type="submit" className=" px-4">Add  </Button>
                                        </div>

                                    </form>
                                </>)}

                            </Formik>
                        </div>
                    </div>
                </BsModal>
                :
                <BsModal {...{ show, setShow, headerTitle: "Add Content", size: "lg" }}>
                    <div className="">
                        <Formik>
                            {({ handleSubmit }) => (<>
                                <form>
                                    <div >
                                        <label className="mb-2 label form-label">Content Title</label>
                                        <TextInput type="text" name="content-title" value={contentTitle} onChange={e => setContentTitle(e.target.value)} />
                                    </div>
                                    <div className="row mb-3 mx-1">
                                        <label className="mb-2 label form-label">Content Type</label>
                                        {/* <TextInput name="topicName" label="Content Title" /> */}
                                        <select name="usertype" className="form-control" onChange={(e) => (handleshowhide(e))} style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}>
                                            <option value="">--Select Type--</option>
                                            <option value="1">Video</option>
                                            <option value="2">Document</option>
                                            <option value="3">Meeting</option>
                                        </select>
                                    </div>

                                    {
                                        showhide === '1' && (
                                            <>
                                                <div className='row'>
                                                    <div className="col-md-5 mx-1 ">
                                                        <label className="mb-2 label form-label">Video Link</label>

                                                        <input name="address1" type="url" placeholder='url' onChange={e => setVideoLink(e.target.value)} className="form-control" style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} />

                                                    </div>
                                                    <span> Or</span>
                                                    <div className="col-md-5  mx-1 mb-3">
                                                        <label className="mb-2 label form-label">Video Upload</label>

                                                        <input type="file" name="address1" className="form-control" onChange={e => setVideoUpload(e.target.files[0])} style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    {
                                        showhide === '2' && (
                                            <div className="row form-group mx-1 mb-3">
                                                <label className="mb-2 label form-label">Document</label>
                                                <input name="file" type="file" className="form-control" onChange={e => setDocument(e.target.files[0])} style={{ borderRadius: "30px", backgroundColor: "rgb(248, 250, 251)" }}></input>
                                            </div>
                                        )}

                                    {
                                        showhide === '3' && (
                                            <div className="col-md-12 form-group">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            {!isEdit && <TextInput name="topic" label="Agenda" />}
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <TextArea name="agenda" label="Description" />
                                                        </div>

                                                        <div className="col-md-4 ">
                                                            <DateInput name="sessionDate" label="Start date" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <TimeInput name="startTime" placeholder="Select Time" label="Start Time" />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <TimeInput name="endTime" placeholder="Select Time" label="End Time" />
                                                        </div>
                                                        <div className="col-md-12">
                                                            {/* <TextInput name="assets" label="Assets" /> */}
                                                            {<div className="col-6 pl-0">
                                                                <div><span className="title-sm ">Assets</span></div> <div><input multiple placeholder="Browse File" type="file" /></div>
                                                            </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Button className="btn-block py-2 mt-3" type="submit">Confirm</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                    {/* <TextArea name="topicDescription" label="Description" /> */}
                                    <div className="text-right mt-2" >
                                        {showhide === '3' ? "" : <Button type="submit" className=" px-4" onClick={createUploadCourseSection}>Add </Button>}
                                        
                                    </div>
                                </form>
                            </>)}
                        </Formik>

                    </div>
                </BsModal>
            }

            {/* <DynamicTable {...{ configuration, sourceData: sessionList, onPageChange: (e) => getSection(e) }} /> */}
            <div style={{ width: "100%", background: "#FAFAFA" }}>
                {sessionList.map((item) => {
                    return (
                        <>
                            <DropdownItem title={item.sectionName} theme="dark">
                                <Button className=" ml-2 mb-2" onClick={() => { setShow(true); setContentType("Add Content") }}>Add Content</Button>
                                <DynamicTable  {...{ configuration, sourceData: item.courseContentResposeTOList, onPageChange: (e) => getSection(e) }} />
                            </DropdownItem>
                        </>
                    )
                })}
                {/* <DropdownItem title="Item 4" theme="dark">
                    <DynamicTable {...{ configuration, sourceData: sessionList, onPageChange: (e) => getSection(e) }} />
                </DropdownItem> */}

            </div>
            <div>
                {/* <button onClick={AddContent}>meet</button> */}
            </div>
            {/* <AddSession {...{show1, setShow1, title: "Meet"}} /> */}
        </div>
    </>)
}
export default CourseDetails